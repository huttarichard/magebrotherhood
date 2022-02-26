// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

import "./ERC721B.sol";
import "./Affiliate.sol";

abstract contract Playables is ERC721B {
  using Counters for Counters.Counter;
  using Strings for uint256;

  error NotLaunched();

  uint256 public launchAt;

  Rewarder public rewarder;

  modifier whenLaunched() {
    if (block.timestamp >= launchAt) revert NotLaunched();
    _;
  }

  constructor(address rewarder_) {
    require(rewarder_ != address(0), "empty rewarder");
    rewarder = Rewarder(rewarder_);
  }

  /**
   * Will enable minting at specific time.
   */
  function launch(uint256 at) public onlyOwner {
    launchAt = at;
  }

  /**
   * Will enable minting at current time.
   */
  function launch() public onlyOwner {
    launchAt = block.timestamp;
  }
}

// Playables(rewarder)
contract DarkAssasin is Playables {
  /**
   * @notice maximum supply of 10000
   */
  uint64 public immutable MAX_SUPPLY = 10_000;

  /**
   * @notice price per one token
   */
  uint64 public immutable PRICE = 0.2 ether;

  /**
   * Constructor for dark assasin.
   */
  constructor(address rewarder, address receiver)
    ERC721("MBH Dark Assasin", "MBHDA")
    ERC721B(receiver)
    Playables(rewarder)
  {}

  function getStakingMultiplier(uint256) public pure override returns (uint64) {
    return 1;
  }

  /**
   * @dev Public mint function mints token and return its URI.
   */
  function mint(uint64 amount) public payable whenNotPaused whenLaunched returns (uint256[] memory) {
    require(msg.value >= PRICE * amount, "not enough eth given");
    require(totalSupply() + amount > MAX_SUPPLY, "supply exceeded");

    return _internalMint(amount, msg.value);
  }

  /**
   * @dev Public mint function mints token and return its URI.
   */
  function mint(uint64 amount, string memory discount)
    public
    payable
    whenNotPaused
    whenLaunched
    returns (uint256[] memory)
  {
    require(msg.value >= (PRICE) * amount, "not enough eth given");
    require(totalSupply() + amount > MAX_SUPPLY, "supply exceeded");

    rewarder.reward(discount);
    return _internalMint(amount, msg.value);
  }

  receive() external payable {
    revert();
  }
}
