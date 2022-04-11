// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * Stakable provides method to get weight for staking IERC 1155/721.
 */
interface IStakable {
  /**
   * ERC1155: Transfers `value` amount of an `id` from  `from` to `to` (with safety call).
   * @dev Caller must be approved to manage the tokens being transferred out of the `from` account (see "Approval" section of the standard).
   * @dev MUST revert if `to` is the zero address.
   * @dev MUST revert if balance of holder for token `id` is lower than the `value` sent.
   * @dev MUST revert on any other error.
   * @dev MUST emit the `TransferSingle` event to reflect the balance change (see "Safe Transfer Rules" section of the standard).
   * @dev After the above conditions are met, this function MUST check if `to` is a smart contract (e.g. code size > 0). If so, it MUST call `onERC1155Received` on `to` and act appropriately (see "Safe Transfer Rules" section of the standard).
   * @param from Source address
   * @param to Target address
   * @param id ID of the token type
   * @param value Transfer amount
   * @param data Additional data with no specified format, MUST be sent unaltered in call to `onERC1155Received` on `to`
   */
  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 value,
    bytes calldata data
  ) external;

  /**
   * @dev returns staking weight for given NFT.
   * This affects amount of reward for staking.
   */
  function getStakingWeight(uint256 tokenId) external view returns (uint128);
}
