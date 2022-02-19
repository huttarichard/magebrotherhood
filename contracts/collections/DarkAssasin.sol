// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "../PlayableRights.sol";

contract DarkAssasin is PlayableRights {

    uint64 public override immutable MAXIMUM_SUPPLY = 10_000;

    constructor() ERC721("MBH Dark Assasin", "MBHDA") {
        MAXIMUM_SUPPLY = 10_000;
    }

}

