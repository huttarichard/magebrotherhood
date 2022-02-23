// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./extensions/IERC721StakingSupport.sol";

/**
 * ERC721Base is base contract for easy start with some basic commong
 * properties. Such as staking, access and minting.
 */
abstract contract ERC721B is ERC721, Ownable, Stakable, Pausable {
  using Counters for Counters.Counter;

  error ContractIsFrozen();

  /**
   * @dev Weights maps the given tokenId to staking weight.
   */
  mapping(uint256 => uint64) private weights;

  /**
   * @dev wether contract is frozen or not
   */
  bool public frozen;

  /**
   * @dev base uri of ipfs:// or ar://
   */
  string private baseURI;

  /**
   * @dev  Private counter, incrementing with every mint.
   */
  Counters.Counter private tokenIds;

  /**
   * @dev modifier to allow actions only when the contract IS paused
   */
  modifier notFrozen() {
    if (frozen) revert ContractIsFrozen();
    _;
  }

  /**
   * @dev  Will freeze the contract.
   */
  function freeze() external onlyOwner notFrozen {
    frozen = true;
  }

  /**
   * @dev  To comply with ERC721-Stakable. It returns weight of produced stake.
   */
  function getStakingWeight(uint256 tokenId) public view override returns (uint64) {
    return weights[tokenId];
  }

  /**
   * @dev Internal override of _baseURI to make the parent ERC721 openzeplin
   * version to work.
   */
  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  /**
   * @dev Will set the base URI.
   */
  function setBaseURI(string calldata _tokenBaseURI) external onlyOwner notFrozen {
    baseURI = _tokenBaseURI;
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() external onlyOwner notFrozen {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() external onlyOwner notFrozen {
    _unpause();
  }

  /**
   * @dev Will return multiplier.
   */
  function getStakingMultiplier(uint256 value) public view virtual returns (uint64);

  /**
   * @dev Will do internal token minting.
   */
  function _internalMint(uint256 _value) internal whenNotPaused returns (uint256) {
    tokenIds.increment();
    uint256 token = tokenIds.current();
    _safeMint(_msgSender(), token);
    weights[token] = getStakingMultiplier(_value);
    return token;
  }

  /**
   * @dev Will do internal token minting.
   */
  function _internalMint(uint64 _amount, uint256 _value) internal whenNotPaused returns (uint256[] memory) {
    uint256[] memory tokens = new uint256[](_amount);
    for (uint64 i = 1; i <= _amount; i++) {
      tokens[i - 1] = _internalMint(_value / _amount);
    }
    return tokens;
  }
}
