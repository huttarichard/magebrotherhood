// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./extensions/IERC721StakingSupport.sol";
import "./extensions/ERC721A.sol";

/**
 * ERC721Base is base contract for easy start with some basic commong
 * properties. Such as staking, access and minting.
 */
abstract contract ERC721 is ERC721A, Ownable, Stakable {

    function getStakingWeight(uint256 tokenId) public virtual view returns (uint64);
    
}