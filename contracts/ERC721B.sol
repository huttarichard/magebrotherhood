// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./extensions/IERC721StakingSupport.sol";

/**
 * ERC721Base is base contract for easy start with some basic commong
 * properties. Such as staking, access and minting.
 */
abstract contract ERC721B is ERC721, Ownable, Stakable, Pausable {
  using Counters for Counters.Counter;
  using Address for address;

  error ContractIsFrozen();

  /**
   * @dev Weights maps the given tokenId to staking weight.
   */
  mapping(uint256 => uint64) private weights;

  /**
   * @dev base uri of ipfs:// or ar://
   */
  string private baseURI;

  /**
   * @dev liquidity receiver address.
   */
  address payable liquidityReceiver;

  /**
   * @dev Private counter, incrementing with every mint.
   */
  Counters.Counter private tokenIds;

  /**
   * @dev Contructor will accept ERC20 coin which will be used as reward taker.
   */
  constructor(address receiver) {
    liquidityReceiver = payable(receiver);
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
  function setBaseURI(string calldata _tokenBaseURI) external onlyOwner {
    baseURI = _tokenBaseURI;
  }

  /**
   * @dev set liquidity receiver.
   */
  function setLiquidityReceiver(address receiver) external onlyOwner {
    liquidityReceiver = payable(receiver);
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() external onlyOwner {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() external onlyOwner {
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
    for (uint64 i = 0; i < _amount; i++) {
      tokens[i] = _internalMint(_value / _amount);
    }
    return tokens;
  }

  function withdrawal() public onlyOwner {
    Address.sendValue(liquidityReceiver, address(this).balance);
  }
}
