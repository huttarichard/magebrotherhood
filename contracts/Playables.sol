// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

import "./ERC721B.sol";

abstract contract Playables is ERC721B {
  using Counters for Counters.Counter;
  using Strings for uint256;

  error SaleNotEnabled();

  enum Sale {
    NoSale,
    Presale,
    PublicSale
  }

  struct SaleLaunch {
    Sale Sale;
    uint256 timestamp;
  }

  SaleLaunch public state;

  /**
   * Presale root to chekc merkle proof againts.
   */
  bytes32 private presaleRoot;

  /**
   * Will freeze the contract.
   */
  function setPresaleRoot(bytes32 root) external onlyOwner notFrozen {
    presaleRoot = root;
  }

  /**
   * Will enable presale at specific time.
   */
  function enablePresaleMintAt(uint256 at) public onlyOwner notFrozen {
    state = SaleLaunch(Sale.Presale, at);
  }

  /**
   * Will enable minting at specific time.
   */
  function enablePublicMintAt(uint256 at) public onlyOwner notFrozen {
    state = SaleLaunch(Sale.PublicSale, at);
  }

  /**
   * Disables the minting.
   */
  function disable() public onlyOwner notFrozen {
    state = SaleLaunch(Sale.NoSale, 0);
  }

  /**
   * @dev Public mint function mints token and return its URI.
   */
  function mint(uint64 amount) external payable virtual returns (uint256[] memory) {
    if (state.Sale != Sale.PublicSale || block.timestamp < state.timestamp) revert SaleNotEnabled();

    return _internalMint(amount, msg.value);
  }

  /**
   * @dev Public mint function mints token and return its URI.
   */
  function mint(uint64 amount, bytes32[] memory proof) external payable virtual returns (uint256[] memory) {
    require(state.Sale == Sale.Presale, "mint disabled");
    require(block.timestamp >= state.timestamp, "mint disabled");
    require(balanceOf(_msgSender()) == 0, "already claimed");
    require(_verify(msg.sender, proof), "not in presale");

    return _internalMint(amount, msg.value);
  }

  /**
   * Internal function which verifies the proof by hashing and comparing with root.
   */
  function _verify(address account, bytes32[] memory proof) internal view returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(account));
    return MerkleProof.verify(proof, presaleRoot, leaf);
  }
}

// contract DarkAssasin is PlayableRights {
//   constructor() ERC721("MBH Dark Assasin", "MBHDA") {}

//   function getStakingMultiplier(uint256) public pure override returns (uint64) {
//     return 1;
//   }

//   //     /**
//   //  * Public mint function mints token and return its URI.
//   //  */
//   // function mint() external payable returns (string memory) {
//   //     return _mint();
//   // }

//   // /**
//   //  * Presale mint function mints token and return its URI. In order to mint
//   //  * user needs to provide merkle proof.
//   //  */
//   // function mint(bytes32[] memory proof) external payable returns (string memory) {
//   //     return _mint(proof);
//   // }
// }
