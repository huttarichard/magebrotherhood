// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

/**
 * Interface used for distributing rewards.
 */
interface IDistributor {
  /**
   * @dev This will distribute BHC to the specified address.
   * @param recipient of BHC token.
   * @param amount of BHC.
   */
  function distribute(address recipient, uint256 amount) external;

  /**
   * @dev will take owner tokens and put them back to the contract.
   * @param owner of BHC token.
   * @param amount of BHC.
   */
  function take(address owner, uint256 amount) external;
}
