// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Coin is ERC20, ERC20Votes, AccessControl, Pausable {
  using SafeMath for uint256;

  string public constant NAME = "Brotherhood Coin";

  string public constant TICK = "BHC";

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant DISTRIBUTOR = keccak256("DISTRIBUTOR");

  constructor(uint256 liquidity) ERC20(NAME, TICK) ERC20Permit(NAME) {
    _setRoleAdmin(DISTRIBUTOR, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setupRole(DISTRIBUTOR, _msgSender());

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
  function mint(address recipient, uint256 amount) public onlyRole(DISTRIBUTOR) {
    _mint(recipient, amount);
  }

  /**
   * @dev will burn tokens.
   */
  function burn(address burnee, uint256 amount) public onlyRole(DISTRIBUTOR) {
    _burn(burnee, amount);
  }

  /**
   * @dev will burn tokens.
   */
  function distribute(address recipient, uint256 amount) public onlyRole(DISTRIBUTOR) {
    _transfer(address(this), recipient, amount);
  }

  /**
   * @notice fallback, send ether to dex
   */
  receive() external payable {
    revert("this contract cannot receive ETH");
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
   * @dev Snapshots the totalSupply after it has been increased.
   */
  function _mint(address to, uint256 amount) internal override(ERC20Votes, ERC20) {
    super._mint(to, amount);
  }

  /**
   * @dev Snapshots the totalSupply after it has been decreased.
   */
  function _burn(address account, uint256 amount) internal override(ERC20Votes, ERC20) {
    super._burn(account, amount);
  }
}
