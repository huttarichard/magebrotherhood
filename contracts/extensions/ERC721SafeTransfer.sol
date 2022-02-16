// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

import "./IERC721Transferrable.sol";

/**
 * @title ERC1155721SafeTransferFallback
 * Library used to fall back on ERC721 non-safe transfer(s)
 * in case of ERC1155 safe transfer failure. A failure can be
 * caused by a contract-based wallet not implementing the
 * ERC1155Receiver interface.
 */
library ERC721SafeTransfer {
    function safeBatchTransferFromWithFallback(
        IERC721Transferrable self,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) internal {
        try self.safeBatchTransferFrom(from, to, ids, values, data)  {} catch {
            uint256 length = ids.length;
            for (uint256 i = 0; i < length; ++i) {
                self.transferFrom(from, to, ids[i]);
            }
        }
    }

    function safeTransferFromWithFallback(
        IERC721Transferrable self,
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) internal {
        try self.safeTransferFrom(from, to, id, value, data)  {} catch {
            self.transferFrom(from, to, id);
        }
    }
}