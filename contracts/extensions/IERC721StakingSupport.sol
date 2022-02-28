// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "./IERC721Transferrable.sol";

/**
 * Stakable provides method to get weight for staking IERC 1155/721.
 */
interface Stakable {
  /**
   * @dev returns staking weight for given NFT.
   */
  function getStakingWeight(uint256 tokenId) external view returns (uint64);
}

/**
 * IERC1155721WithStakingSupport give support for staking by adding Stakable to
 * IERC1155721Transferrable.
 */
interface IERC721StakingSupport is IERC721Transferrable, Stakable {

}
