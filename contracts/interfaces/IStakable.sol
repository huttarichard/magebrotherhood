// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

/**
 * Stakable provides method to get weight for staking IERC 1155/721.
 */
interface IStakable {
  /**
   * @notice Transfers `values` amount(s) of `ids` from the `from` address to the `to` address specified (with safety call).
   * @dev Caller must be approved to manage the tokens being transferred out of the `from` account (see "Approval" section of the standard).
   * MUST revert if `to` is the zero address.
   * MUST revert if length of `ids` is not the same as length of `values`.
   * MUST revert if any of the balance(s) of the holder(s) for token(s) in `ids` is lower than the respective amount(s) in `values` sent to the recipient.
   * MUST revert on any other error.
   * MUST emit `TransferSingle` or `TransferBatch` event(s) such that all the balance changes are reflected (see "Safe Transfer Rules" section of the standard).
   * Balance changes and events MUST follow the ordering of the arrays (_ids[0]/_values[0] before _ids[1]/_values[1], etc).
   * After the above conditions for the transfer(s) in the batch are met, this function MUST check if `to` is a smart contract (e.g. code size > 0). If so, it MUST call the relevant `ERC1155TokenReceiver` hook(s) on `to` and act appropriately (see "Safe Transfer Rules" section of the standard).
   * @param from Source address
   * @param to Target address
   * @param ids IDs of each token type (order and length must match _values array)
   * @param values Transfer amounts per token type (order and length must match _ids array)
   * @param data Additional data with no specified format, MUST be sent unaltered in call to the `ERC1155TokenReceiver` hook(s) on `to`
   */
  function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] calldata ids,
    uint256[] calldata values,
    bytes calldata data
  ) external;

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
   * @notice ERC721: Transfers the ownership of a given token ID to another address.
   * Usage of this method is discouraged, use `safeTransferFrom` whenever possible.
   * Requires the msg sender to be the owner, approved, or operator.
   * @param from current owner of the token.
   * @param to address to receive the ownership of the given token ID.
   * @param tokenId uint256 ID of the token to be transferred.
   */
  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) external;

  /**
   * @dev returns staking weight for given NFT.
   */
  function getStakingWeight(uint256 tokenId) external view returns (uint128);
}
