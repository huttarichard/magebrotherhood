// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ICoin.sol";
import "hardhat/console.sol";

/**
 * @notice Affiliate marketing is contract distibuting rewards for marketing.
 */
contract Affiliate is Context, AccessControl, Pausable {
  using SafeMath for uint256;

  ICoin public coin;

  /**
   * @notice mapping of addresses and balances.
   */
  mapping(address => uint256) public balances;

  /**
   * @notice mapping of affiliate codes and addresses.
   */
  mapping(string => address) private _codes;

  /**
   * @notice addresses of contracts and rewards (gas) their are distributing.
   */
  mapping(address => uint256) private _rewarders;

  /**
   * @notice wallets which already used discount
   */
  mapping(address => bool) private _used;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant REWARDER = keccak256("REWARDER");

  /**
   * @param _coin is ERC20 coin with spend allowed.
   */
  constructor(address _coin) {
    _setRoleAdmin(REWARDER, ADMIN);
    _setupRole(ADMIN, _msgSender());

    setCoin(_coin);
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
   * @dev will set the coin contract
   */
  function setBalance(address _affiliate, uint256 bhc) public onlyRole(ADMIN) {
    require(_affiliate != address(0), "invalid address");
    balances[_affiliate] = bhc;
  }

  /**
   * Marketing code used for promotion.
   * @param code string marketing code.
   */
  function register(string memory code) public whenNotPaused {
    require(bytes(code).length > 0 && bytes(code).length <= 20, "invalid code length");
    require(_codes[code] == address(0), "code already used");
    _codes[code] = _msgSender();
  }

  /**
   * Will allow contract to distribute reward.
   * @param addr address of the contract
   * @param gas maximum gas needed
   */
  function allowRewarding(address addr, uint256 gas) public onlyRole(REWARDER) {
    require(addr != address(0), "invalid address");
    require(gas != 0, "invalid reward");
    _rewarders[addr] = gas;
  }

  /**
   * Will return rewards in form of bhc and eth.
   */
  function _payoff(address addr) internal view returns (uint256 eth, uint256 bhc) {
    require(addr != address(0), "invalid address");
    require(_rewarders[addr] != 0, "invalid address");

    eth = _rewarders[addr].mul(tx.gasprice > 0 ? tx.gasprice : 1);
    bhc = coin.getEthToTokenInputPrice(eth);
  }

  /**
   * Will return rewards in form of bhc and eth.
   */
  function payoff(address addr) external view returns (uint256 eth, uint256 bhc) {
    return _payoff(addr);
  }

  /**
   * Reward will distribte reward according to register.
   * @param code marketing code
   */
  function reward(string memory code) external returns (uint256) {
    address addr = _codes[code];
    require(addr != address(0), "invalid affiliate code");

    // Make sure address uses discount only once
    require(!_used[addr], "already used discount");
    _used[addr] = true;

    (uint256 eth, uint256 bhc) = _payoff(_msgSender());
    balances[addr] += bhc;

    return eth;
  }

  /**
   * Allows to withdraw funds.
   * @param affiliater address of the affiliater
   */
  function release(address affiliater) public {
    uint256 cds = balances[affiliater];
    require(cds != 0, "zero balance");
    require(coin.transferFrom(address(coin), affiliater, cds), "could not be paid");
    balances[affiliater] = 0;
  }
}
