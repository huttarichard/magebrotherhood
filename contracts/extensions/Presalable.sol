// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

abstract contract Presalable {

    uint256 private presaleTimestamp;

    bytes32 private presaleRoot;

    function isPresaleEnabled() public view returns (bool) {
        return presaleTimestamp >= block.timestamp;
    }

    function _enablePresaleNow(bytes32 root) internal {
        _enablePresaleAt(block.timestamp, root);
    }

    function _enablePresaleAt(uint256 timestamp, bytes32 root) internal {
        presaleTimestamp = timestamp;
        presaleRoot = root;
    }

    function _disablePresale() internal {
        presaleTimestamp = 0;
    }

    function _verify(address account, bytes32[] memory proof) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return MerkleProof.verify(proof, presaleRoot, leaf);
    }

}
