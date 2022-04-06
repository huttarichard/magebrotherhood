// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

/**
 * Promoter contract is here to intencivize affiliaters and marketers.
 * It does so by allowing other contracts to add revenue to speicific accounts of promoters.
 * This contract will also allow promoters to withdraw their rewards in form of BHC.
 * @notice it is required this contract has correct permission set on BHC coin side.
 */
interface IPromoter {
  /**
   * @dev add revenue to promoter. Revenue is in form of eth.
   * @notice if contract is not allowed to add revenue, it will not be added.
   * @param promoter is address of promoter.
   * @param ethRevenue revenue collected in ETH thanks to promoter.
   */
  function addRevenue(address promoter, uint256 ethRevenue) external returns (uint256 reward);

  /**
   * @dev does the same as addRevenue but with code instead of address.
   * @notice if contract is not allowed to add revenue, it will not be added.
   * @param code is marketing code of promoter.
   * @param ethRevenue revenue collected in ETH thanks to promoter.
   */
  function addRevenueByCode(string memory code, uint256 ethRevenue) external returns (uint256 reward);
}
