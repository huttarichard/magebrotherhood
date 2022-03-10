// SPDX-License-Identifier: MIT

pragma solidity 0.8.12;

/**
 * @notice Affiliate is interface allowing to give affiliaters reward.
 */
interface IAffiliate {
  /**
   * @param code affiliaters marketing code.
   */
  function reward(string memory code) external returns (uint256);
}
