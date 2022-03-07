// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "./IAffiliate.sol";
import "./ICoin.sol";

/**
 * Playables contract.
 */
contract Playables is ERC1155, ERC2981, Ownable, Pausable {
  /**
   * @dev collection represents nft collection.
   */
  struct Collection {
    string uri;
    uint256 createdAt;
    uint256 launchedAt;
    uint256 supply;
    uint256 minted;
    uint128 weight;
    uint256 price;
    address artist;
  }

  ICoin public immutable coin;

  mapping(uint256 => Collection) public collections;

  /**
   * @dev Rewarder address;
   */
  IAffiliate public rewarder;

  /**
   * @dev keeps contract uri.
   */
  string public contractURI;

  modifier whenLaunched(uint256 tokenId) {
    require(_exists(tokenId), "query for nonexistent token");
    require(block.timestamp < collections[tokenId].launchedAt, "not launched yet");
    _;
  }

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(
    address _rewarder,
    address _coin,
    string memory _uri
  ) ERC1155(_uri) {
    coin = ICoin(_coin);
    rewarder = IAffiliate(_rewarder);
    _setDefaultRoyalty(_coin, 500);
  }

  /**
   * @dev Will add collection metadata to given token id
   */
  function setCollection(uint256 tokenId, Collection memory collection) public onlyOwner {
    collections[tokenId] = collection;
    collection.createdAt = block.timestamp;
  }

  /**
   * @dev will set contract uri. See https://docs.opensea.io/docs/contract-level-metadata.
   */
  function setContractURI(string calldata _uri) public onlyOwner {
    contractURI = _uri;
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() external onlyOwner {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() external onlyOwner {
    _unpause();
  }

  /**
   * @dev will set default royalty info.
   */
  function setDefaultRoyalty(address _receiver, uint96 feeNumerator) public onlyOwner {
    _setDefaultRoyalty(_receiver, feeNumerator);
  }

  /**
   * @dev will set token royalty.
   */
  function setTokenRoyalty(
    uint256 tokenId,
    address _receiver,
    uint96 feeNumerator
  ) public onlyOwner {
    _setTokenRoyalty(tokenId, _receiver, feeNumerator);
  }

  /**
   * @dev  To comply with Stakable. It returns weight of produced stake.
   */
  function getStakingWeight(uint256 tokenId) public view virtual returns (uint128) {
    require(_exists(tokenId), "query for nonexistent token");
    return collections[tokenId].weight;
  }

  /**
   * @dev Returns whether `tokenId` exists.
   */
  function _exists(uint256 tokenId) internal view virtual returns (bool) {
    return collections[tokenId].createdAt != 0;
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function uri(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "URI query for nonexistent token");
    string memory link = collections[tokenId].uri;
    return bytes(link).length > 0 ? link : super.uri(tokenId);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC2981) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  /**
   * @dev mint function, use this to min tokenId
   */
  function mint(
    uint256 tokenId,
    uint64 amount,
    bool payWithCoin
  ) public payable whenNotPaused whenLaunched(tokenId) {
    require(_exists(tokenId), "nonexistent token");
    Collection storage collection = collections[tokenId];
    require(collection.minted + amount <= collection.supply, "supply exceeded");
    uint256 price = collection.price * amount;

    _payment(price, payWithCoin);
    _mint(_msgSender(), tokenId, amount, "");
    collection.minted += amount;
  }

  /**
   * @dev mint function which is using discount
   */
  function mint(
    uint256 tokenId,
    uint64 amount,
    bool payWithCoin,
    string memory discount
  ) public payable whenNotPaused whenLaunched(tokenId) {
    require(_exists(tokenId), "nonexistent token");
    Collection storage collection = collections[tokenId];

    require(collection.minted + amount <= collection.supply, "supply exceeded");
    uint256 rw = rewarder.reward(discount);
    uint256 price = collection.price * amount - rw;

    _payment(price, payWithCoin);
    _mint(_msgSender(), tokenId, amount, "");
    collection.minted += amount;
  }

  /**
   * @dev will perform payment in form of coin burn or eth transfer
   */
  function _payment(uint256 eth, bool payWithCoin) internal {
    if (payWithCoin) {
      coin.tokenEthBurn(_msgSender(), eth);
      return;
    }
    require(msg.value >= eth, "not enough eth given");
    Address.sendValue(payable(address(coin)), msg.value);
  }

  /**
   * @dev only receive eth with mint function
   */
  receive() external payable {
    revert("use minting function explicitly");
  }
}
