// SPDX-License-Identifier: MIT

pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

abstract contract ERC1155TokenReceiver is IERC1155Receiver {
  bytes4 private constant _ERC165_INTERFACE_ID = type(IERC165).interfaceId;
  bytes4 private constant _ERC1155_TOKEN_RECEIVER_INTERFACE_ID = type(IERC1155Receiver).interfaceId;

  // bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))
  bytes4 internal constant _ERC1155_RECEIVED = 0xf23a6e61;

  // bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
  bytes4 internal constant _ERC1155_BATCH_RECEIVED = 0xbc197c81;

  bytes4 internal constant _ERC1155_REJECTED = 0xffffffff;

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == _ERC165_INTERFACE_ID || interfaceId == _ERC1155_TOKEN_RECEIVER_INTERFACE_ID;
  }
}
