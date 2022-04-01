// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/ICoin.sol";

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
  mapping(string => address) private codes;

  /**
   * @notice mapping of affiliate to codes.
   */
  mapping(address => string) private affiliaters;

  /**
   * @notice addresses of contracts and rewards (gas) their are distributing.
   */
  mapping(address => uint256) private _kontracts;

  /**
   * @notice wallets which already used discount
   */
  mapping(address => bool) private _used;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  /**
   * @param _coin is ERC20 coin with spend allowed.
   */
  constructor(address _coin) {
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
    require(codes[code] == address(0), "code already used");
    codes[code] = _msgSender();
    affiliaters[_msgSender()] = code;
  }

  /**
   * Will allow contract to distribute reward.
   * @param kontrakt address of the contract
   * @param gas maximum gas needed
   */
  function allowContractToReward(address kontrakt, uint256 gas) public onlyRole(ADMIN) {
    require(kontrakt != address(0), "invalid address");
    require(gas != 0, "invalid reward");
    _kontracts[kontrakt] = gas;
  }

  /**
   * Will return rewards in form of bhc and eth for given contract.
   */
  function _payoff(address kontrakt) internal view returns (uint256 eth, uint256 bhc) {
    require(kontrakt != address(0), "invalid address");
    require(_kontracts[kontrakt] != 0, "invalid address");

    eth = _kontracts[kontrakt].mul(tx.gasprice > 0 ? tx.gasprice : 1);
    bhc = coin.getEthToTokenInputPrice(eth);
  }

  /**
   * Will return rewards in form of bhc and eth.
   * @return eth - amount of eth given to affiliater
   * @return bhc - amount of eth given to affiliater converted to bhc
   * @return eligible - whether can be given
   */
  function reward(string memory code, address user)
    external
    view
    returns (
      uint256 eth,
      uint256 bhc,
      bool eligible
    )
  {
    address affiliater = codes[code];
    if (affiliater == address(0)) {
      return (0, 0, false);
    }
    (eth, bhc) = _payoff(_msgSender());
    eligible = !_used[user];
  }

  /**
   * Reward will distribte reward according to register.
   * @param code marketing code
   */
  function use(string memory code, address user) external returns (uint256 eth, uint256 bhc) {
    address addr = codes[code];
    require(addr != address(0), "invalid affiliate code");

    // Make sure address uses discount only once
    require(!_used[user], "already used discount");
    _used[user] = true;

    (eth, bhc) = _payoff(_msgSender());
    balances[addr] += bhc;
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
