// SPDX-License-Identifier: MIT
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
 * ERC721Base is base contract for easy start with some basic commong
 * properties. Such as staking, access and minting.
 */
abstract contract ERC1155B is ERC1155, ERC2981, Ownable, Pausable {
  using Counters for Counters.Counter;
  using Address for address;

  struct Collection {
    uint256 createdAt;
    uint256 launchedAt;
    // token properties
    string uri;
    uint256 supply;
    uint256 minted;
    uint128 weight;
    uint256 price;
    uint256 discounted;
    // rewards
    address artist;
  }

  ICoin public immutable coin;

  mapping(uint256 => Collection) public collections;

  /**
   * @dev liquidity receiver address.
   */
  address payable public receiver;

  /**
   * @dev Rewarder address;
   */
  IAffiliate public rewarder;

  /**
   * @dev Private counter, incrementing with every mint.
   */
  Counters.Counter private tokenIds;

  /**
   * @dev keeps contract uri.
   */
  string private _contractURI;

  modifier whenLaunched(uint256 tokenId) {
    require(_exists(tokenId), "ERC1155: URI query for nonexistent token");
    require(block.timestamp < collections[tokenId].launchedAt, "ERC1155: not launched yet");
    _;
  }

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(
    address _receiver,
    address _rewarder,
    address _coin
  ) {
    receiver = payable(_receiver);
    rewarder = IAffiliate(_rewarder);
    coin = ICoin(_coin);
    _setDefaultRoyalty(receiver, 500);
  }

  /**
   * @dev  To comply with Stakable. It returns weight of produced stake.
   */
  function getStakingWeight(uint256 tokenId) public view virtual returns (uint128) {
    require(_exists(tokenId), "ERC1155: URI query for nonexistent token");
    return collections[tokenId].weight;
  }

  /**
   * @dev Returns whether `tokenId` exists.
   *
   * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
   *
   * Tokens start existing when they are minted (`_mint`),
   * and stop existing when they are burned (`_burn`).
   */
  function _exists(uint256 tokenId) internal view virtual returns (bool) {
    return collections[tokenId].createdAt != 0;
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function uri(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC1155: URI query for nonexistent token");
    return collections[tokenId].uri;
  }

  /**
   * @dev set liquidity receiver.
   */
  function setReceiver(address _receiver) external onlyOwner {
    receiver = payable(_receiver);
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
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC2981) returns (bool) {
    return super.supportsInterface(interfaceId);
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
   * @dev will set contract uri. See https://docs.opensea.io/docs/contract-level-metadata.
   */
  function setContractURI(string calldata _uri) public onlyOwner {
    _contractURI = _uri;
  }

  /**
   * @dev will return contract uri. See https://docs.opensea.io/docs/contract-level-metadata.
   */
  function contractURI() public view returns (string memory) {
    return _contractURI;
  }

  /**
   * @dev mint function
   */
  function mint(uint256 tokenId, uint64 amount) public payable whenNotPaused whenLaunched(tokenId) {
    require(_exists(tokenId), "ERC1155: URI query for nonexistent token");
    Collection storage collection = collections[tokenId];

    require(msg.value >= collection.price * amount, "not enough eth given");
    require(collection.minted + amount > collection.supply, "supply exceeded");

    _mint(_msgSender(), tokenId, amount, "");
    collection.minted += amount;
  }

  /**
   * @dev coinmint function
   */
  function coinmint(uint256 tokenId, uint64 amount) public payable whenNotPaused whenLaunched(tokenId) {
    require(_exists(tokenId), "ERC1155: URI query for nonexistent token");
    Collection storage collection = collections[tokenId];

    // coin.getTokenToEthInputPrice();

    require(collection.minted + amount > collection.supply, "supply exceeded");

    _mint(_msgSender(), tokenId, amount, "");
    collection.minted += amount;
  }

  /**
   * @dev mint function which is using discount
   */
  function mint(
    uint256 tokenId,
    uint64 amount,
    string memory discount
  ) public payable whenNotPaused whenLaunched(tokenId) {
    require(_exists(tokenId), "ERC1155: URI query for nonexistent token");
    Collection storage collection = collections[tokenId];

    require(collection.minted + amount > collection.supply, "supply exceeded");

    _mint(_msgSender(), tokenId, amount, "");
    collection.minted += amount;

    uint256 rw = rewarder.reward(discount);
    uint256 price = collection.price * amount - rw;
    require(msg.value >= price, "not enough eth given");
  }

  receive() external payable {
    revert();
  }

  /**
   * @dev withdraw funds againts the liquidity receiver.
   */
  function withdrawal() public onlyOwner {
    Address.sendValue(receiver, address(this).balance);
  }
}
