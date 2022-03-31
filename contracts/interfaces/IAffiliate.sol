// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

/**
 * @notice Affiliate is interface allowing to give affiliaters reward.
 */
interface IAffiliate {
  /**
   * Calculate affiliate reward.
   *
   * @param code affiliaters marketing code.
   * @param user end user address.
   */
  function reward(string memory code, address user)
    external
    view
    returns (
      uint256 eth,
      uint256 bhc,
      bool eligible
    );

  /**
   * Will use the discount for the first time.
   *
   * @param code affiliaters marketing code.
   * @param user end user address.
   */
  function use(string memory code, address user) external returns (uint256 eth, uint256 bhc);
}
