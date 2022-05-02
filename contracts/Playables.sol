// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ICoin.sol";
import "./interfaces/IPromoter.sol";

/**
 * Playables contract.
 */
contract Playables is ERC1155, ERC2981, AccessControl, Pausable {
  /**
   * @dev token represents nft playable.
   */
  struct Token {
    string uri;
    uint256 createdAt;
    uint256 launchedAt;
    uint64 supply;
    uint64 minted;
    uint128 weight;
    uint256 price;
  }

  /**
   * @dev contains all tokens.
   */
  mapping(uint256 => Token) public tokens;

  /**
   * @dev Coin address;
   */
  address payable public liqudityReceiver;

  /**
   * @dev Rewarder address;
   */
  IPromoter public promoters;

  /**
   * @dev keeps the defaul non-reaveal contract uri.
   */
  string public contractURI;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant REWARDER = keccak256("REWARDER");

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(
    address payable _receiver,
    address _promoter,
    string memory _preURI
  ) ERC1155(_preURI) {
    _setRoleAdmin(REWARDER, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setupRole(REWARDER, _msgSender());
    _setDefaultRoyalty(_receiver, 500);
    setLiquidityReceiver(_receiver);
    setPromoterContract(_promoter);
  }

  /**
   * @dev will set contract uri.
   * @dev See https://docs.opensea.io/docs/contract-level-metadata.
   */
  function setContractURI(string calldata _uri) public onlyRole(ADMIN) {
    contractURI = _uri;
  }

  /**
   * @dev Will add token metadata to given token id
   */
  function setToken(uint256 tokenId, Token memory token) public onlyRole(ADMIN) {
    tokens[tokenId] = token;
    tokens[tokenId].createdAt = block.timestamp;
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() public onlyRole(ADMIN) {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() public onlyRole(ADMIN) {
    _unpause();
  }

  /**
   * @dev See {IERC1155-isApprovedForAll}.
   */
  function isApprovedForAll(address account, address operator) public view override returns (bool) {
    return hasRole(ADMIN, operator) || super.isApprovedForAll(account, operator);
  }

  /**
   * @dev will set the liquidity receiver. IE wallet receiving all funds.
   */
  function setLiquidityReceiver(address payable receiver) public onlyRole(ADMIN) {
    require(receiver != address(0), "invalid address");
    liqudityReceiver = receiver;
  }

  /**
   * @dev will set the promoter contract.
   */
  function setPromoterContract(address kontrakt) public onlyRole(ADMIN) {
    require(kontrakt != address(0), "invalid address");
    promoters = IPromoter(kontrakt);
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
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function uri(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "URI query for nonexistent token");
    string memory link = tokens[tokenId].uri;
    return bytes(link).length > 0 ? link : super.uri(tokenId);
  }

  /**
   * @dev MintParams containing parameters for minting a token.
   */
  struct MintParams {
    uint256 tokenId;
    uint64 amount;
    string promoCode; // optional
  }

  /**
   * @dev mint function which is using discount
   */
  function mint(MintParams memory p) external payable whenNotPaused {
    require(_exists(p.tokenId), "nonexistent token");

    Token storage token = tokens[p.tokenId];
    require(block.timestamp >= token.launchedAt, "not launched yet");
    require(p.amount > 0, "amount must be greater than 0");
    require(token.minted + p.amount <= token.supply, "maximum supply exceeded");

    uint256 price = token.price * p.amount;

    if (bytes(p.promoCode).length > 0) {
      uint256 rewardAmount = promoters.addRevenueByCode(p.promoCode, price);
      price = price - rewardAmount;
    }

    require(msg.value >= price, "not enough eth given");
    Address.sendValue(liqudityReceiver, msg.value);

    _mint(_msgSender(), p.tokenId, p.amount, "");
    token.minted = token.minted + p.amount;
  }

  /**
   * @dev mint function which is intended for external contracs as well as admins to giveaway tokens.
   */
  function reward(uint256 tokenId, uint64 amount) external onlyRole(REWARDER) {
    require(_exists(tokenId), "nonexistent token");

    Token storage token = tokens[tokenId];
    require(block.timestamp >= token.launchedAt, "not launched yet");
    require(amount > 0, "amount must be greater than 0");
    require(token.minted + amount <= token.supply, "maximum supply exceeded");

    _mint(_msgSender(), tokenId, amount, "");
    token.minted = token.minted + amount;
  }

  /**
   * @dev only receive eth with mint function
   */
  receive() external payable {
    revert("use minting function explicitly");
  }

  /**
   * @dev  To comply with Stakable. It returns weight of produced stake.
   */
  function getStakingWeight(uint256 tokenId) external view virtual returns (uint128) {
    require(_exists(tokenId), "query for nonexistent token");
    return tokens[tokenId].weight;
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

  /**
   * @dev Returns whether `tokenId` exists.
   */
  function _exists(uint256 tokenId) internal view virtual returns (bool) {
    return tokens[tokenId].createdAt != 0;
  }
}
