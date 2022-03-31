// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ICoin.sol";
import "./interfaces/IAffiliate.sol";

/**
 * Playables contract.
 */
contract Playables is ERC1155, ERC2981, AccessControl, Pausable {
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

  /**
   * @dev Coin address;
   */
  ICoin public coin;

  /**
   * @dev contains all collections.
   */
  mapping(uint256 => Collection) public collections;

  /**
   * @dev Rewarder address;
   */
  IAffiliate public affiliate;

  /**
   * @dev keeps contract uri.
   */
  string public contractURI;

  modifier whenLaunched(uint256 tokenId) {
    require(_exists(tokenId), "query for nonexistent token");
    require(block.timestamp < collections[tokenId].launchedAt, "not launched yet");
    _;
  }

  bytes32 public constant ADMIN = keccak256("ADMIN");

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(
    address _coin,
    address _affiliate,
    string memory _uri
  ) ERC1155(_uri) {
    _setupRole(ADMIN, _msgSender());

    setCoin(_coin);
    setAffiliate(_affiliate);
    _setDefaultRoyalty(_coin, 500);
  }

  /**
   * @dev Will add collection metadata to given token id
   */
  function setCollection(uint256 tokenId, Collection memory collection) public onlyRole(ADMIN) {
    collections[tokenId] = collection;
    collection.createdAt = block.timestamp;
  }

  /**
   * @dev will set contract uri. See https://docs.opensea.io/docs/contract-level-metadata.
   */
  function setContractURI(string calldata _uri) public onlyRole(ADMIN) {
    contractURI = _uri;
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() external onlyRole(ADMIN) {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() external onlyRole(ADMIN) {
    _unpause();
  }

  /**
   * @dev will set the coin contract
   */
  function setCoin(address _coin) public onlyRole(ADMIN) {
    require(_coin != address(0), "invalid address");
    coin = ICoin(_coin);
  }

  /**
   * @dev will set the rewarder
   */
  function setAffiliate(address _affiliate) public onlyRole(ADMIN) {
    affiliate = IAffiliate(_affiliate);
  }

  /**
   * @dev will set default royalty info.
   */
  function setDefaultRoyalty(address _receiver, uint96 feeNumerator) public onlyRole(ADMIN) {
    _setDefaultRoyalty(_receiver, feeNumerator);
  }

  /**
   * @dev will set token royalty.
   */
  function setTokenRoyalty(
    uint256 tokenId,
    address _receiver,
    uint96 feeNumerator
  ) public onlyRole(ADMIN) {
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
   * @dev MintParams containing parameters for minting a token.
   */
  struct MintParams {
    uint256 tokenId;
    uint256 amount;
    string discount;
    bool payWithCoin;
  }

  /**
   * @dev mint function which is using discount
   */
  function mint(MintParams memory p) public payable whenNotPaused whenLaunched(p.tokenId) {
    require(_exists(p.tokenId), "nonexistent token");
    Collection storage collection = collections[p.tokenId];

    require(p.amount > 0, "amount must be greater than 0");
    require(collection.minted + p.amount <= collection.supply, "supply exceeded");
    uint256 mintPrice = collection.price * p.amount;

    if (bytes(p.discount).length > 0) {
      uint256 rw = affiliate.reward(p.discount);
      mintPrice -= rw;
    }

    if (p.payWithCoin) {
      coin.tokenEthBurn(_msgSender(), mintPrice);
    } else {
      require(msg.value >= mintPrice, "not enough eth given");
      Address.sendValue(payable(address(coin)), msg.value);
    }

    _mint(_msgSender(), p.tokenId, p.amount, "");
    collection.minted += p.amount;
  }

  /**
   * @dev will perform analysis of tokenId and will return its price and mintability
   */
  function price(MintParams memory p) public view returns (bool, uint256) {
    if (!_exists(p.tokenId)) {
      return (false, 0);
    }
    Collection memory collection = collections[p.tokenId];
    if (collection.minted + p.amount > collection.supply) {
      return (false, 0);
    }

    uint256 mintPrice = collection.price * p.amount;

    if (bytes(p.discount).length > 0) {
      (uint256 rw, ) = affiliate.payoff(address(this));
      mintPrice -= rw;
    }

    return (true, mintPrice);
  }

  /**
   * @dev only receive eth with mint function
   */
  receive() external payable {
    revert("use minting function explicitly");
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC1155, ERC2981, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
