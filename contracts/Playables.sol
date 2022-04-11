// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./interfaces/ICoin.sol";
import "./interfaces/IPromoter.sol";

/**
 * Playables contract.
 */
contract Playables is ERC1155, ERC2981, AccessControl, Pausable {
  using SafeMath for uint256;

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
   * @dev MintParams containing parameters for minting a token.
   */
  struct MintParams {
    uint256 tokenId;
    uint64 amount;
    string promoCode;
  }

  /**
   * @dev Coin address;
   */
  address payable public liqudityReceiver;

  /**
   * @dev Rewarder address;
   */
  IPromoter public promoters;

  /**
   * @dev contains all tokens.
   */
  mapping(uint256 => Token) public tokens;

  /**
   * @dev keeps contract uri.
   */
  string public contractURI;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant MANAGER = keccak256("MANAGER");

  // TODO: add token transfer from address(this)

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(
    address payable _receiver,
    address _promoter,
    string memory _preURI
  ) ERC1155(_preURI) {
    _setRoleAdmin(MANAGER, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setupRole(MANAGER, _msgSender());

    _setDefaultRoyalty(_receiver, 500);

    setLiquidityReceiver(_receiver);
    setPromoterContract(_promoter);
  }

  /**
   * @dev Will add token metadata to given token id
   */
  function setToken(uint256 tokenId, Token memory token) public onlyRole(MANAGER) {
    tokens[tokenId] = token;
    tokens[tokenId].createdAt = block.timestamp;
    _setTokenRoyalty(tokenId, token.royalty, 500);
  }

  /**
   * @dev Will add token metadata to given token id
   */
  function deleteToken(uint256 tokenId) public onlyRole(MANAGER) {
    tokens[tokenId] = Token("", 0, 0, 0, 0, 0, 0, address(0));
  }

  /**
   * @dev will set contract uri. See https://docs.opensea.io/docs/contract-level-metadata.
   */
  function setContractURI(string calldata _uri) public onlyRole(MANAGER) {
    contractURI = _uri;
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
   * @dev will set the coin contract
   */
  function setLiquidityReceiver(address payable receiver) public onlyRole(ADMIN) {
    require(receiver != address(0), "invalid address");
    liqudityReceiver = receiver;
  }

  /**
   * @dev will set the rewarder
   */
  function setPromoterContract(address kontrakt) public onlyRole(ADMIN) {
    require(kontrakt != address(0), "invalid address");
    promoters = IPromoter(kontrakt);
  }

  /**
   * @dev will set default royalty info.
   */
  function setDefaultRoyalty(address _receiver, uint96 feeNumerator) public onlyRole(MANAGER) {
    _setDefaultRoyalty(_receiver, feeNumerator);
  }

  /**
   * @dev will set token royalty.
   */
  function setTokenRoyalty(
    uint256 tokenId,
    address _receiver,
    uint96 feeNumerator
  ) public onlyRole(MANAGER) {
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
   * @dev mint function which is using discount
   */
  function mint(MintParams memory p) external payable whenNotPaused {
    require(_exists(p.tokenId), "nonexistent token");

    Token storage token = tokens[p.tokenId];
    require(block.timestamp >= token.launchedAt, "not launched yet");
    require(p.amount > 0, "amount must be greater than 0");
    require(token.minted.add(p.amount) <= token.supply, "maximum supply exceeded");

    uint256 price = token.price.mul(p.amount);

    if (bytes(p.promoCode).length > 0) {
      uint256 reward = promoters.addRevenueByCode(p.promoCode, price);
      price = price.sub(reward);
    }

    require(msg.value >= price, "not enough eth given");
    Address.sendValue(liqudityReceiver, msg.value);

    _mint(_msgSender(), p.tokenId, p.amount, "");
    token.minted = token.minted.add(p.amount);
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
