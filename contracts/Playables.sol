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
import "./interfaces/IPlayables.sol";

/**
 * Playables contract.
 */
contract Playables is IPlayables, ERC1155, ERC2981, AccessControl, Pausable {
  /**
   * @dev token represents nft playable.
   */
  struct Token {
    string uri;
    uint256 createdAt;
    uint256 launchedAt;
    uint256 supply;
    uint256 minted;
    uint128 weight;
    uint256 price;
    address royalty;
  }

  /**
   * @dev Coin address;
   */
  ICoin public coin;

  /**
   * @dev Rewarder address;
   */
  IAffiliate public affiliate;

  /**
   * @dev contains all tokens.
   */
  mapping(uint256 => Token) public tokens;

  /**
   * @dev keeps contract uri.
   */
  string public contractURI;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant TOKENIZER = keccak256("TOKENIZER");

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(
    address _coin,
    address _affiliate,
    string memory _preURI
  ) ERC1155(_preURI) {
    _setRoleAdmin(TOKENIZER, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setDefaultRoyalty(_coin, 500);

    setCoin(_coin);
    setAffiliate(_affiliate);
  }

  /**
   * @dev Will add token metadata to given token id
   */
  function setToken(uint256 tokenId, Token memory token) public onlyRole(TOKENIZER) {
    tokens[tokenId] = token;
    tokens[tokenId].createdAt = block.timestamp;
    _setTokenRoyalty(tokenId, token.royalty, 500);
  }

  /**
   * @dev Will add token metadata to given token id
   */
  function deleteToken(uint256 tokenId) public onlyRole(ADMIN) {
    tokens[tokenId] = Token("", 0, 0, 0, 0, 0, 0, address(0));
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
    return tokens[tokenId].weight;
  }

  /**
   * @dev Returns whether `tokenId` exists.
   */
  function _exists(uint256 tokenId) internal view virtual returns (bool) {
    return tokens[tokenId].createdAt != 0;
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function uri(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "URI query for nonexistent token");
    string memory link = tokens[tokenId].uri;
    return bytes(link).length > 0 ? link : super.uri(tokenId);
  }

  /**
   * @dev Allows execution of only mintable collections.
   */
  modifier onlyMintable(uint256 tokenId, uint256 amount) {
    Token memory cl = tokens[tokenId];
    require(_exists(tokenId), "nonexistent token");
    require(block.timestamp >= cl.launchedAt, "not launched yet");
    require(amount > 0, "amount must be greater than 0");
    require(cl.minted + amount <= cl.supply, "maximum supply exceeded");
    _;
  }

  /**
   * @dev mint function which is using discount
   */
  function mint(MintParams memory p) external payable whenNotPaused onlyMintable(p.tokenId, p.amount) {
    Token storage token = tokens[p.tokenId];

    uint256 price = token.price * p.amount;

    if (bytes(p.discount).length > 0) {
      (uint256 eth, ) = affiliate.use(p.discount, _msgSender());
      price -= eth;
    }

    require(msg.value >= price, "not enough eth given");
    Address.sendValue(payable(address(coin)), msg.value);

    _mint(_msgSender(), p.tokenId, p.amount, "");
    token.minted += p.amount;
  }

  /**
   * @dev will perform analysis of tokenId and will return its price and mintability
   */
  function mintPrice(MintParams memory p)
    external
    view
    whenNotPaused
    onlyMintable(p.tokenId, p.amount)
    returns (uint256 price)
  {
    Token memory token = tokens[p.tokenId];
    price = token.price * p.amount;

    if (bytes(p.discount).length == 0) {
      return price;
    }

    (uint256 eth, , bool eligible) = affiliate.reward(p.discount, address(this));
    require(eligible, "not eligible for discount");
    price -= eth;
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
    override(IERC165, ERC1155, ERC2981, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
