// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ICoin.sol";
import "./interfaces/IExchange.sol";

/**
 * @dev Promoter contract is here to intencivize affiliaters and marketers.
 * It does so by allowing other contracts to add revenue to speicific accounts of promoters.
 * This contract will also allow promoters to withdraw their rewards in form of BHC.
 * @notice it is required this contract has correct permission set on BHC coin side.
 */
contract Promoter is AccessControl, Pausable {
  using SafeMath for uint256;

  IDistributor public coin;
  IExchange public exchange;

  /**
   * @dev account details of given promoter.
   */
  struct Account {
    bool enabled;
    string name;
    uint8 shares;
    string code;
    uint256 revenue;
    uint256 reward;
    uint256 lastRewardBlock;
  }

  /**
   * @dev emitted when new promoter is registered.
   */
  event Registered(address indexed promoter, Account account);

  /**
   * @dev when promoter is updated by manager.
   */
  event Updated(address indexed promoter, Account account);

  /**
   * @dev when promoter generates revenue he is rewarded.
   */
  event Rewarded(address indexed promoter, uint256 eth);

  /**
   * @dev when promoter requests funds to be paid in form of BHC.
   */
  event Paid(address indexed promoter, uint256 bhc);

  /**
   * @dev mapping of addresses and accounts of promoters.
   */
  mapping(address => Account) public promoters;

  /**
   * @dev mapping of codes of promoers and promoters addresses.
   */
  mapping(string => address) public promotersbyCode;

  /**
   * @dev addresses of contracts allowed for adding revenue.
   */
  mapping(address => bool) private contracts;

  /**
   * @dev default reward used, this can be changed by manager for each promoter.
   */
  uint8 public constant DEFAULT_SHARES = 5;

  uint8 public constant MAX_SHARES = 20;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant MANAGER = keccak256("MANAGER");

  /**
   * @param _coin is ERC20 coin with spend allowed.
   */
  constructor(address _coin) {
    _setRoleAdmin(MANAGER, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setupRole(MANAGER, _msgSender());

    setCoinContract(_coin);
  }

  /**
   * @dev will pause the contract.
   */
  function pause() public onlyRole(ADMIN) {
    _pause();
  }

  /**
   * @dev will unpause the contract.
   */
  function unpause() public onlyRole(ADMIN) {
    _unpause();
  }

  /**
   * @dev will set the coin contract address.
   * @param _coin address of the coin contract.
   */
  function setCoinContract(address _coin) public onlyRole(ADMIN) {
    require(_coin != address(0), "invalid address");
    coin = ICoin(_coin);
  }

  /**
   * Will allow contract to add revenue.
   * @param kontrakt address of the contract allowed to add revenue to promoters.
   */
  function allowContract(address kontrakt) public onlyRole(ADMIN) {
    require(kontrakt != address(0), "invalid address");
    contracts[kontrakt] = true;
  }

  /**
   * @dev set promoter account. It will delete old code and create new one.
   * @param promoter is address of promoter.
   * @param account is new account details.
   */
  function setPromoter(address promoter, Account memory account) public onlyRole(MANAGER) {
    require(promoter != address(0), "invalid address");
    require(account.shares <= MAX_SHARES, "discount can be maximum of 20%");
    // Delete previous promoter code
    string memory prevCode = promoters[promoter].code;
    if (bytes(prevCode).length > 0) {
      delete promotersbyCode[prevCode];
    }
    promoters[promoter] = account;
    promotersbyCode[account.code] = promoter;
  }

  /**
   * @dev register new promoter with given code.
   * @notice by default account is enabled with default reward. Will not allow to register same code twice.
   * @param code is marketing code promoter will use.
   * @param name is social media nickname.
   */
  function register(string memory code, string memory name) public whenNotPaused {
    uint256 nameLen = bytes(name).length;
    uint256 codeLen = bytes(code).length;
    require(nameLen > 0 && nameLen < 50, "invalid code");
    require(codeLen > 0 && nameLen < 30, "invalid name");
    require(promotersbyCode[code] == address(0), "code already exists");
    promoters[_msgSender()] = Account(true, name, DEFAULT_SHARES, code, 0, 0, 0);
    promotersbyCode[code] = _msgSender();
  }

  /**
   * @dev get account of promoter by code, only if its enabled.
   * @param code is marketing code of promoter.
   */
  function getAccountByCode(string memory code) public view returns (Account memory account) {
    account = promoters[promotersbyCode[code]];
    require(account.enabled, "promoter is disabled");
  }

  /**
   * @dev add revenue to promoter. Revenue is in form of eth.
   * @notice if contract is not allowed to add revenue, it will not be added.
   * @param promoter is address of promoter.
   * @param ethRevenue revenue collected in ETH thanks to promoter.
   */
  function addRevenue(address promoter, uint256 ethRevenue) external returns (uint256 reward) {
    require(contracts[_msgSender()], "contract is not registered");
    return _addRevenue(promoter, ethRevenue);
  }

  /**
   * @dev does the same as addRevenue but with code instead of address.
   * @notice if contract is not allowed to add revenue, it will not be added.
   * @param code is marketing code of promoter.
   * @param ethRevenue revenue collected in ETH thanks to promoter.
   */
  function addRevenueByCode(string memory code, uint256 ethRevenue) external returns (uint256 reward) {
    require(contracts[_msgSender()], "contract is not registered");
    address promoter = promotersbyCode[code];
    reward = _addRevenue(promoter, ethRevenue);
  }

  /**
   * @dev allows to release funds to promoter. It calculates amount of BHC based on
   * reward promoter collected.
   * @param promoter is address of promoter.
   */
  function release(address promoter) public whenNotPaused {
    Account memory p = promoters[promoter];
    require(p.revenue > 0, "no revenue to release");
    // Just a safety check in case flashloans are used.
    require(p.lastRewardBlock + 2 < block.number, "reward is not yet ready");
    uint256 bhc = exchange.getEthToTokenInputPrice(p.reward);
    coin.distribute(promoter, bhc);
    emit Paid(promoter, bhc);
  }

  /**
   * @dev internal function which checks if the promoter is enabled and adds revenue.
   * @param promoter is address of promoter.
   * @param ethRevenue revenue collected in ETH thanks to promoter.
   */
  function _addRevenue(address promoter, uint256 ethRevenue) private returns (uint256) {
    require(promoter != address(0), "invalid address");
    Account storage p = promoters[promoter];
    require(p.enabled, "promoter is disabled");
    p.revenue += ethRevenue;
    uint256 reward = ethRevenue.div(100).mul(p.shares);
    p.reward += reward;
    p.lastRewardBlock = block.number;
    // todo emit event
    emit Rewarded(promoter, reward);
    return reward;
  }
}
