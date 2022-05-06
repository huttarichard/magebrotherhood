// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Coin is ERC20, ERC20Votes, AccessControl, Pausable {
  uint256 public constant MAX_SUPPLY = 1_000_000_000;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant MANIPULATOR = keccak256("MANIPULATOR");

  constructor(uint256 liquidity) ERC20("Brotherhood Coin", "BHC") ERC20Permit("Brotherhood") {
    _setRoleAdmin(MANIPULATOR, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setupRole(MANIPULATOR, _msgSender());

    _mint(address(this), liquidity);
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() public onlyRole(ADMIN) {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() public onlyRole(ADMIN) {
    _unpause();
  }

  /**
   * @dev will mint tokens to given address
   */
  function mint(address recipient, uint256 amount) public onlyRole(MANIPULATOR) {
    _mint(recipient, amount);
  }

  /**
   * @dev will burn tokens from given address
   */
  function burn(address recipient, uint256 amount) public onlyRole(MANIPULATOR) {
    _burn(recipient, amount);
  }

  /**
   * @dev See {IERC20-allowance}.
   */
  function allowance(address owner, address spender) public view override returns (uint256) {
    if (hasRole(MANIPULATOR, spender)) {
      return type(uint256).max;
    }
    return super.allowance(owner, spender);
  }

  /**
   * @dev Move voting power when tokens are transferred.
   * Emits a {DelegateVotesChanged} event.
   */
  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes, ERC20) {
    super._afterTokenTransfer(from, to, amount);
  }

  /**
   * @dev Move voting power when tokens are transferred.
   * Emits a {DelegateVotesChanged} event.
   */
  function _transfer(
    address from,
    address to,
    uint256 amount
  ) internal override {
    require(!paused(), "contract is paused");
    super._transfer(from, to, amount);
  }

  /**
   * @dev internal mint function.
   */
  function _mint(address to, uint256 amount) internal override(ERC20Votes, ERC20) {
    require(totalSupply() + amount <= MAX_SUPPLY, "max supply exceeded");
    super._mint(to, amount);
  }

  /**
   * @dev internal burn function.
   */
  function _burn(address to, uint256 amount) internal override(ERC20Votes, ERC20) {
    require(totalSupply() - amount >= 0, "minimum supply is 0");
    super._burn(to, amount);
  }

  /**
   * @notice fallback, send ether to dex
   */
  receive() external payable {
    revert("this contract cannot receive ETH");
  }
}
