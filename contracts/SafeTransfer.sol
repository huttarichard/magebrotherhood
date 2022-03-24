// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "./interfaces/IStakable.sol";

/**
 * @title ERC1155721SafeTransferFallback
 * Library used to fall back on ERC721 non-safe transfer(s)
 * in case of ERC1155 safe transfer failure. A failure can be
 * caused by a contract-based wallet not implementing the
 * ERC1155Receiver interface.
 */
library StakableSafeTransfer {
  function safeBatchTransferFromWithFallback(
    IStakable self,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory values,
    bytes memory data
  ) internal {
    try self.safeBatchTransferFrom(from, to, ids, values, data) {
      return;
    } catch {
      uint256 length = ids.length;
      for (uint256 i = 0; i < length; ++i) {
        self.transferFrom(from, to, ids[i]);
      }
    }
  }

  function safeTransferFromWithFallback(
    IStakable self,
    address from,
    address to,
    uint256 id,
    uint256 value,
    bytes memory data
  ) internal {
    try self.safeTransferFrom(from, to, id, value, data) {
      return;
    } catch {
      self.transferFrom(from, to, id);
    }
  }
}
