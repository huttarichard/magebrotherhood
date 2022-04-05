// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

/**
 * Playables contract.
 */
interface IPlayables is IERC2981, IERC1155 {
  /**
   * @dev MintParams containing parameters for minting a token.
   */
  struct MintParams {
    uint256 tokenId;
    uint64 amount;
    string discount;
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() external;

  /**
   * @dev Will unpause the contract.
   */
  function unpause() external;

  /**
   * @dev mint function which is using discount
   */
  function mint(MintParams memory p) external payable;

  /**
   * @dev will perform analysis of tokenId and will return its price and mintability
   */
  function mintPrice(MintParams memory p) external view returns (uint256);

  /**
   * @dev only receive eth with mint function
   */
  receive() external payable;
}
