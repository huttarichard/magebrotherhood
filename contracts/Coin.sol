// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "hardhat/console.sol";

contract Coin is ERC20, ERC20Votes, AccessControl {
  using SafeMath for uint256;

  event Bought(address indexed buyer, uint256 indexed bought);

  event Deposit(address indexed depositer, uint256 indexed added);

  event Sold(address indexed buyer, uint256 indexed sold);

  uint256 public taxFee = 5;

  uint256 public liqudityGuard = 3;

  uint256 public liqudityGuardDenominator = 1000;

  uint256 public constant DECIMALS = 10**18;

  string public constant NAME = "Brotherhood Coin";

  string public constant TICK = "BHC";

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant BURNER = keccak256("BURNER");

  bytes32 public constant MINTER = keccak256("MINTER");

  bytes32 public constant SPENDER = keccak256("SPENDER");

  bytes32 public constant FREELOADER = keccak256("FREELOADER");

  constructor(uint256 liquidity) ERC20(NAME, TICK) ERC20Permit(NAME) {
    // make sure admin controls it all
    _setRoleAdmin(BURNER, ADMIN);
    _setRoleAdmin(MINTER, ADMIN);
    _setRoleAdmin(SPENDER, ADMIN);
    _setRoleAdmin(FREELOADER, ADMIN);
    _setupRole(ADMIN, _msgSender());

    _mint(address(this), liquidity * DECIMALS);
    _delegate(address(this), _msgSender());
  }

  /**
   * @notice Set tax fee.
   */
  function setTaxFee(uint256 _feePercent) public onlyRole(ADMIN) {
    require(_feePercent < 15, "maximum tax fee is 15%");
    taxFee = _feePercent;
  }

  /**
   * @notice set guard for constant product market maker.
   * @dev this is the percantage making the slippage possible.
   */
  function setLiqudityGuard(uint256 _guard, uint256 _denominator) public onlyRole(ADMIN) {
    liqudityGuard = _guard;
    liqudityGuardDenominator = _denominator;
  }

  /**
   * @dev will mint tokens to given address
   */
  function tokenMint(address recipient, uint256 amount) external onlyRole(MINTER) {
    _mint(recipient, amount);
  }

  /**
   * @dev will burn tokens.
   */
  function tokenBurn(address burnee, uint256 tokensToBeBurned) external onlyRole(BURNER) {
    _burn(burnee, tokensToBeBurned);
  }

  /**
   * @dev will burn tokens in amount of eth
   */
  function tokenEthBurn(address burnee, uint256 ethToBeBurned) external onlyRole(BURNER) {
    uint256 tokenReserve = balanceOf(address(this));
    uint256 coins = getOutputPrice(ethToBeBurned, tokenReserve, address(this).balance);
    _burn(burnee, coins);
  }

  /**
   * @dev Pricing function for converting between ETH && Tokens.
   * @param inputAmount Amount of ETH or Tokens being sold.
   * @param inputReserve Amount of ETH or Tokens (input type) in exchange reserves.
   * @param outputReserve Amount of ETH or Tokens (output type) in exchange reserves.
   * @return Amount of ETH or Tokens bought.
   */
  function getInputPrice(
    uint256 inputAmount, // eth sold
    uint256 inputReserve, // balance - eth sold
    uint256 outputReserve // token balance of this
  ) public view returns (uint256) {
    require(inputReserve > 0 && outputReserve > 0, "INVALID_VALUE");
    uint256 inputAmountWithFee = inputAmount.mul(liqudityGuardDenominator - liqudityGuard);
    uint256 numerator = inputAmountWithFee.mul(outputReserve);
    uint256 denominator = inputReserve.mul(liqudityGuardDenominator).add(inputAmountWithFee);
    return numerator / denominator;
  }

  /**
   * @dev Pricing function for converting between ETH && Tokens.
   * @param outputAmount Amount of ETH or Tokens being bought.
   * @param inputReserve Amount of ETH or Tokens (input type) in exchange reserves.
   * @param outputReserve Amount of ETH or Tokens (output type) in exchange reserves.
   * @return Amount of ETH or Tokens sold.
   */
  function getOutputPrice(
    uint256 outputAmount,
    uint256 inputReserve,
    uint256 outputReserve
  ) public view returns (uint256) {
    require(inputReserve > 0 && outputReserve > 0, "invalid input");
    uint256 numerator = inputReserve.mul(outputAmount).mul(liqudityGuardDenominator);
    uint256 denominator = (outputReserve.sub(outputAmount)).mul(liqudityGuardDenominator - liqudityGuard);
    return (numerator / denominator).add(1);
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value) && minimum output.
   * @param minTokens Minimum Tokens bought.
   * @param deadline Time after which this transaction can no longer be executed.
   * @return Amount of Tokens bought.
   */
  function ethToTokenSwapInput(uint256 minTokens, uint256 deadline) external payable returns (uint256) {
    return ethToTokenInput(msg.value, minTokens, deadline, msg.sender, msg.sender);
  }

  /**
   * @notice Convert ETH to Tokens && transfers Tokens to recipient.
   * @dev User specifies exact input (msg.value) && minimum output
   * @param minTokens Minimum Tokens bought.
   * @param deadline Time after which this transaction can no longer be executed.
   * @param recipient The address that receives output Tokens.
   * @return  Amount of Tokens bought.
   */
  function ethToTokenTransferInput(
    uint256 minTokens,
    uint256 deadline,
    address recipient
  ) external payable returns (uint256) {
    require(recipient != address(this) && recipient != address(0), "invalid recipient");
    return ethToTokenInput(msg.value, minTokens, deadline, msg.sender, recipient);
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies maximum input (msg.value) && exact output.
   * @param tokensBought Amount of tokens bought.
   * @param deadline Time after which this transaction can no longer be executed.
   * @return Amount of ETH sold.
   */
  function ethToTokenSwapOutput(uint256 tokensBought, uint256 deadline) external payable returns (uint256) {
    return ethToTokenOutput(tokensBought, msg.value, deadline, payable(msg.sender), msg.sender);
  }

  /**
   * @notice Convert ETH to Tokens && transfers Tokens to recipient.
   * @dev User specifies maximum input (msg.value) && exact output.
   * @param tokensBought Amount of tokens bought.
   * @param deadline Time after which this transaction can no longer be executed.
   * @param recipient The address that receives output Tokens.
   * @return Amount of ETH sold.
   */
  function ethToTokenTransferOutput(
    uint256 tokensBought,
    uint256 deadline,
    address recipient
  ) external payable returns (uint256) {
    require(recipient != address(this) && recipient != address(0), "invalid recipient");
    return ethToTokenOutput(tokensBought, msg.value, deadline, payable(msg.sender), recipient);
  }

  /**
   * @notice Convert Tokens to ETH.
   * @dev User specifies exact input && minimum output.
   * @param tokensSold Amount of Tokens sold.
   * @param minEth Minimum ETH purchased.
   * @param deadline Time after which this transaction can no longer be executed.
   * @return Amount of ETH bought.
   */
  function tokenToEthSwapInput(
    uint256 tokensSold,
    uint256 minEth,
    uint256 deadline
  ) external returns (uint256) {
    return tokenToEthInput(tokensSold, minEth, deadline, msg.sender, payable(msg.sender));
  }

  /**
   * @notice Convert Tokens to ETH && transfers ETH to recipient.
   * @dev User specifies exact input && minimum output.
   * @param tokensSold Amount of Tokens sold.
   * @param minEth Minimum ETH purchased.
   * @param deadline Time after which this transaction can no longer be executed.
   * @param recipient The address that receives output ETH.
   * @return  Amount of ETH bought.
   */
  function tokenToEthTransferInput(
    uint256 tokensSold,
    uint256 minEth,
    uint256 deadline,
    address payable recipient
  ) external returns (uint256) {
    require(recipient != address(this) && recipient != address(0), "invalid recipient");
    return tokenToEthInput(tokensSold, minEth, deadline, msg.sender, recipient);
  }

  /**
   * @notice Convert Tokens to ETH.
   * @dev User specifies maximum input && exact output.
   * @param ethBought Amount of ETH purchased.
   * @param maxTokens Maximum Tokens sold.
   * @param deadline Time after which this transaction can no longer be executed.
   * @return Amount of Tokens sold.
   */
  function tokenToEthSwapOutput(
    uint256 ethBought,
    uint256 maxTokens,
    uint256 deadline
  ) external returns (uint256) {
    return tokenToEthOutput(ethBought, maxTokens, deadline, msg.sender, payable(msg.sender));
  }

  /**
   * @notice Convert Tokens to ETH && transfers ETH to recipient.
   * @dev User specifies maximum input && exact output.
   * @param ethBought Amount of ETH purchased.
   * @param maxTokens Maximum Tokens sold.
   * @param deadline Time after which this transaction can no longer be executed.
   * @param recipient The address that receives output ETH.
   * @return Amount of Tokens sold.
   */
  function tokenToEthTransferOutput(
    uint256 ethBought,
    uint256 maxTokens,
    uint256 deadline,
    address payable recipient
  ) external returns (uint256) {
    require(recipient != address(this) && recipient != address(0), "invalid recipient");
    return tokenToEthOutput(ethBought, maxTokens, deadline, msg.sender, recipient);
  }

  /**
   * @notice Public price function for ETH to Token trades with an exact input.
   * @param ethSold Amount of ETH sold.
   * @return Amount of Tokens that can be bought with input ETH.
   */
  function getEthToTokenInputPrice(uint256 ethSold) external view returns (uint256) {
    require(ethSold > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    return getInputPrice(ethSold, address(this).balance, tokenReserve);
  }

  /**
   * @notice Public price function for ETH to Token trades with an exact output.
   * @param tokensBought Amount of Tokens bought.
   * @return Amount of ETH needed to buy output Tokens.
   */
  function getEthToTokenOutputPrice(uint256 tokensBought) external view returns (uint256) {
    require(tokensBought > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethSold = getOutputPrice(tokensBought, address(this).balance, tokenReserve);
    return ethSold;
  }

  /**
   * @notice Public price function for Token to ETH trades with an exact input.
   * @param tokensSold Amount of Tokens sold.
   * @return Amount of ETH that can be bought with input Tokens.
   */
  function getTokenToEthInputPrice(uint256 tokensSold) external view returns (uint256) {
    require(tokensSold > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
    return ethBought;
  }

  /**
   * @notice Public price function for Token to ETH trades with an exact output.
   * @param ethBought Amount of output ETH.
   * @return Amount of Tokens needed to buy output ETH.
   */
  function getTokenToEthOutputPrice(uint256 ethBought) external view returns (uint256) {
    require(ethBought > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    return getOutputPrice(ethBought, tokenReserve, address(this).balance);
  }

  function ethToTokenInput(
    uint256 ethSold,
    uint256 minTokens,
    uint256 deadline,
    address buyer,
    address recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && ethSold > 0 && minTokens > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 tokensBought = getInputPrice(ethSold, address(this).balance.sub(ethSold), tokenReserve);
    require(tokensBought >= minTokens, "buy amount not satisfied");
    _deposit(buyer, recipient, tokensBought);
    return tokensBought;
  }

  function ethToTokenOutput(
    uint256 tokensBought,
    uint256 maxEth,
    uint256 deadline,
    address buyer,
    address recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && tokensBought > 0 && maxEth > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethSold = getOutputPrice(tokensBought, address(this).balance.sub(maxEth), tokenReserve);
    // Throws if ethSold > maxEth
    uint256 ethRefund = maxEth.sub(ethSold);
    if (ethRefund > 0) {
      Address.sendValue(payable(buyer), ethRefund);
    }
    _deposit(buyer, recipient, tokensBought);
    return ethSold;
  }

  function tokenToEthInput(
    uint256 tokensSold,
    uint256 minEth,
    uint256 deadline,
    address buyer,
    address payable recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && tokensSold > 0 && minEth > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
    require(ethBought >= minEth, "invalid input");
    _withdraw(buyer, recipient, tokensSold, ethBought);
    return ethBought;
  }

  function tokenToEthOutput(
    uint256 ethBought,
    uint256 maxTokens,
    uint256 deadline,
    address buyer,
    address payable recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && ethBought > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 tokensSold = getOutputPrice(ethBought, tokenReserve, address(this).balance);
    // tokens sold is always > 0
    require(maxTokens >= tokensSold, "invalid input");
    _withdraw(buyer, recipient, tokensSold, ethBought);
    return tokensSold;
  }

  /**
   * @dev Spend `amount` form the allowance of `owner` toward `spender`.
   * @notice it does not check the allowence if you are admin or a minter, giving
   * you raw power to transfer assets.
   */
  function _spendAllowance(
    address owner,
    address spender,
    uint256 amount
  ) internal virtual override {
    if (hasRole(ADMIN, spender)) {
      return;
    }
    if (hasRole(SPENDER, spender)) {
      return;
    }
    super._spendAllowance(owner, spender, amount);
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
   * @dev Deposit function used to deposit from current balance to recipient.
   */
  function _deposit(
    address buyer,
    address recipient,
    uint256 tokensBought
  ) internal {
    _transfer(address(this), recipient, tokensBought);
    emit Bought(buyer, tokensBought);
  }

  /**
   * @dev Only function allowing to withdraw the eth out of contract.
   */
  function _withdraw(
    address buyer,
    address payable recipient,
    uint256 tokensSold,
    uint256 ethBought
  ) internal {
    if (!hasRole(FREELOADER, buyer)) {
      // We subtract taxFee. Intention is here to balance
      // out the inflation given to MINTER role.
      ethBought = ethBought.sub(ethBought.div(100).mul(taxFee));
    }
    Address.sendValue(recipient, ethBought);
    _transfer(buyer, address(this), tokensSold);
    emit Sold(buyer, tokensSold);
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

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value).
   * @dev User cannot specify minimum output or deadline.
   */
  receive() external payable {
    emit Deposit(_msgSender(), msg.value);
  }
}
