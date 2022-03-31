// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

/**
 * @notice Affiliate is interface allowing to give affiliaters reward.
 */
interface IAffiliate {
  /**
   * @param code affiliaters marketing code.
   */
  function reward(string memory code) external returns (uint256);

  /**
   * Will return rewards in form of bhc and eth.
   */
  function payoff(address addr) external view returns (uint256 eth, uint256 bhc);
}
