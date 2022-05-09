// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IPromoter.sol";

/**
 * @dev Playables contract.
 */
contract Playables is ERC1155, Ownable, Pausable {
  /**
   * @dev Token represents nft playable.
   */
  struct Token {
    string uri;
    uint256 createdAt;
    uint256 launchedAt;
    uint256 supply;
    uint256 minted;
    uint128 weight;
    uint256 price;
    bool revealed;
  }

  /**
   * @dev Mapping contains all tokens: id <–> Token.
   */
  mapping(uint256 => Token) public tokens;

  /**
   * @dev Current token index, useful if you wan to fetch all tokens.
   */
  uint256 public tokensCount;

  /**
   * @dev Coin address;
   */
  address payable public liqudityReceiver;

  /**
   * @dev Rewarder address;
   */
  IPromoter public promoters;

  /**
   * @dev Verifies that token exists based on its createdAt property set by addToken(s).
   */
  modifier tokenExists(uint256 tokenId) {
    require(tokenId <= tokensCount && tokenId > 0, "token does not exists");
    _;
  }

  /**
   * @param _receiver as liquidity receiver.
   * @param _promoter contract address
   * @param _defaultURI as nonrevealed token uri.
   */
  constructor(
    address payable _receiver,
    address _promoter,
    string memory _defaultURI
  ) ERC1155(_defaultURI) {
    setLiquidityReceiver(_receiver);
    setPromoterContract(_promoter);
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() public onlyOwner {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() public onlyOwner {
    _unpause();
  }

  /**
   * @dev See {IERC1155-isApprovedForAll}.
   */
  function isApprovedForAll(address account, address operator) public view override returns (bool) {
    return owner() == operator || super.isApprovedForAll(account, operator);
  }

  /**
   * @dev Will set the liquidity receiver. IE wallet receiving all funds.
   */
  function setLiquidityReceiver(address payable receiver) public onlyOwner {
    require(receiver != address(0), "invalid address");
    liqudityReceiver = receiver;
  }

  /**
   * @dev Will set the promoter contract.
   */
  function setPromoterContract(address kontrakt) public onlyOwner {
    require(kontrakt != address(0), "invalid address");
    promoters = IPromoter(kontrakt);
  }

  /**
   * @dev Will add token to list of available tokens.
   */
  function addToken(Token memory newToken) public onlyOwner {
    Token[] memory tks = new Token[](1);
    tks[0] = newToken;
    addTokens(tks);
  }

  /**
   * @dev Will add tokens to list of available tokens.
   */
  function addTokens(Token[] memory newTokens) public onlyOwner {
    for (uint256 i = 0; i < newTokens.length; i++) {
      Token memory token = newTokens[i];
      require(token.launchedAt != 0, "invalid launch at");
      require(token.supply >= 1, "invalid supply");
      tokensCount++;
      tokens[tokensCount] = token;
      tokens[tokensCount].createdAt = block.timestamp;
    }
  }

  /**
   * @dev Will set the token except for the createdAt, launchedAt, minted fields.
   */
  function setToken(uint256 tokenId, Token memory newData) public onlyOwner tokenExists(tokenId) {
    require(newData.launchedAt != 0, "invalid launch at");
    Token memory t = tokens[tokenId];
    require(newData.supply >= t.minted, "invalid supply");

    newData.createdAt = t.createdAt;
    newData.launchedAt = t.launchedAt;
    newData.minted = t.minted;
    tokens[tokenId] = newData;
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function uri(uint256 tokenId) public view virtual override tokenExists(tokenId) returns (string memory) {
    string memory link = tokens[tokenId].uri;
    return bytes(link).length > 0 ? link : super.uri(tokenId);
  }

  /**
   * @dev To comply with Stakable. It returns weight of produced stake.
   */
  function getStakingWeight(uint256 tokenId) external view virtual tokenExists(tokenId) returns (uint128) {
    return tokens[tokenId].weight;
  }

  /**
   * @dev This function will return all known tokens.
   */
  function getTokens() external view returns (Token[] memory) {
    Token[] memory result = new Token[](tokensCount);
    for (uint256 i = 0; i < result.length; i++) {
      result[i] = tokens[i + 1];
      result[i].uri = uri(i + 1);
    }
    return result;
  }

  /**
   * @dev MintParams containing parameters for minting a token.
   */
  struct MintParams {
    uint256 tokenId;
    uint256 amount;
    string promoCode; // optional
  }

  /**
   * @dev Mint function, optionaly you can use discount.
   */
  function mint(MintParams memory p) external payable tokenExists(p.tokenId) whenNotPaused {
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
   * @dev RewardParams containing parameters for rewarding function.
   */
  struct RewardParams {
    uint256 tokenId;
    uint256 amount;
    address recipient;
  }

  /**
   * @dev Reward function which is intended for giving tokens to community.
   */
  function reward(RewardParams memory p) external tokenExists(p.tokenId) onlyOwner {
    require(p.recipient != address(0), "invalid address");

    Token storage token = tokens[p.tokenId];
    require(p.amount > 0, "amount must be greater than 0");
    require(token.minted + p.amount <= token.supply, "maximum supply exceeded");

    _mint(p.recipient, p.tokenId, p.amount, "");
    token.minted = token.minted + p.amount;
  }

  /**
   * @dev Only receive eth with mint function.
   */
  receive() external payable {
    revert("use minting function explicitly");
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
