// SPDX-License-Identifier: MIT

pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./ICoin.sol";

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
  function register(string memory code) public {
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
   * payoff calculates discount for given rewarder.
   * @param cont as contract address which is allowed to reward. See `allowRewarding`.
   */
  function payoff(address cont) public view returns (uint256) {
    require(_rewarders[cont] != 0, "invalid rewarder");
    return _rewarders[cont] * tx.gasprice;
  }

  /**
   * Reward will distribte reward according to register.
   * @param code marketing code
   */
  function reward(string memory code) external returns (uint256) {
    address addr = _codes[code];
    require(addr != address(0), "invalid affiliate code");
    require(!_used[addr], "already used discount");
    uint256 rw = payoff(_msgSender());
    balances[addr] += rw;
    _used[addr] = true;
    return rw;
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
