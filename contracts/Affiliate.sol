// SPDX-License-Identifier: MIT

pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./interfaces/ICoin.sol";

/**
 * @notice Affiliate marketing is contract distibuting rewards for marketing.
 */
contract Affiliate is Context, Ownable, Pausable {
  ICoin public immutable coin;

  /**
   * @notice mapping of addresses and balances.
   */
  mapping(address => uint256) public balances;

  /**
   * @notice mapping of affiliate codes and addresses.
   */
  mapping(string => address) private _codes;

  /**
   * @notice addresses of contracts and rewwards their are distributing.
   */
  mapping(address => uint256) private _rewarders;

  /**
   * @notice wallets which already used discount
   */
  mapping(address => bool) private _used;

  /**
   * @param _coin is ERC20 coin with spend allowed.
   */
  constructor(address _coin) {
    coin = ICoin(_coin);
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
  function allowRewarding(address addr, uint256 gas) public onlyOwner {
    require(addr != address(0), "invalid address");
    _rewarders[addr] = gas;
  }

  /**
   * Reward will distribte reward according to register.
   * @param code marketing code
   */
  function reward(string memory code) external returns (uint256) {
    address addr = _codes[code];
    require(addr != address(0), "invalid affiliate code");
    uint256 ratio = _rewarders[_msgSender()];
    require(ratio != 0, "invalid rewarder");
    require(!_used[addr], "already used discount");
    uint256 payoff = ratio * tx.gasprice;
    balances[addr] += payoff;
    _used[addr] = true;
    return payoff;
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
