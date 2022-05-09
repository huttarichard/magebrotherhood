// SPDX-License-Identifier: MIT
/* solhint-disable no-empty-blocks */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/governance/utils/IVotes.sol";

interface ICoin is IVotes, IERC20 {}
