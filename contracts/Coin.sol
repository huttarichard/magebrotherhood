// SPDX-License-Identifier: MIT

pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Coin is ERC20, ERC20Votes, Ownable {
  using SafeMath for uint256;

  event TokenPurchase(address indexed buyer, uint256 indexed ethSold, uint256 indexed tokensBought);

  event EthPurchase(address indexed buyer, uint256 indexed tokensSold, uint256 indexed ethBought);

  mapping(address => bool) private isExcludedFromFees;

  uint256 public taxFee = 5;

  string constant NAME = "Brotherhood Coin";

  string constant TICK = "BHC";

  address public vaultAddress;

  constructor() ERC20(NAME, TICK) ERC20Permit(NAME) {
    excludeFromFee(owner());
    excludeFromFee(address(this));

    _mint(address(this), 10**18);
  }

  /**
   * @notice Set Vault Address.
   */
  function setVaultAddress(address _vaultAddress) public onlyOwner {
    require(vaultAddress == address(0), "You already set Vault address");
    vaultAddress = _vaultAddress;
  }

  /**
   * @notice only Vault can mint.
   */
  function mint(address to, uint256 amount) public {
    require(msg.sender == address(vaultAddress));
    _mint(to, amount);
  }

  /**
   * @notice only Vault can burn.
   */
  function burn(address account, uint256 amount) public {
    require(msg.sender == address(vaultAddress));
    _burn(account, amount);
  }

  /**
   * @notice Deposit ETH to pool.
   */
  function addEthToPool() public payable {}

  /**
   * @notice Customized _transfer function.
   */
  function _transfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes, ERC20) {
    require(from != address(0), "ERC20: transfer from the zero address");
    require(to != address(0), "ERC20: transfer to the zero address");
    require(amount > 0, "Transfer amount must be greater than zero");

    bool takeFee = true;
    if(isExcludedFromFees[from] || isExcludedFromFees[to]) {
        takeFee = false;
    }

    uint256 transferAmount = amount;
    if(takeFee){
      uint256 fees = amount.mul(taxFee).div(100);
      super._transfer(from, address(this), fees);
      transferAmount = amount.sub(fees);
    }

    super._transfer(from, to, transferAmount);
  }

  /**
   * @notice Set tax fee.
   */
  function setTaxFee(uint256 _feePercent) public onlyOwner {
    require(_feePercent < 15);
    taxFee = _feePercent;
  }


  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value).
   * @dev User cannot specify minimum output or deadline.
   */
  function excludeFromFee(address account) public onlyOwner {
    isExcludedFromFees[account] = true;
  }

  /**
   * @notice Allow unlimited spend for account.
   */
  function allowSpend(address account) public onlyOwner {
    _approve(address(this), account, type(uint256).max);
  }

  /**
   * @notice Allow limited spend for account.
   */
  function allowSpendAmount(address account, uint256 amount) public onlyOwner {
    _approve(address(this), account, amount);
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value).
   * @dev User cannot specify minimum output or deadline.
   */
  receive() external payable {
    ethToTokenInput(msg.value, 1, block.timestamp, msg.sender, msg.sender);
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
    require(inputReserve > 0 && outputReserve > 0);
    uint256 numerator = inputReserve.mul(outputAmount).mul(1000);
    uint256 denominator = (outputReserve.sub(outputAmount)).mul(997);
    return (numerator / denominator).add(1);
  }

  function ethToTokenInput(
    uint256 ethSold,
    uint256 minTokens,
    uint256 deadline,
    address buyer,
    address recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && ethSold > 0 && minTokens > 0);
    uint256 tokenReserve = balanceOf(address(this));
    uint256 tokensBought = getInputPrice(ethSold, address(this).balance.sub(ethSold), tokenReserve);
    require(tokensBought >= minTokens);
    require(transfer(recipient, tokensBought));
    emit TokenPurchase(buyer, ethSold, tokensBought);
    return tokensBought;
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies exact input (msg.value) && minimum output.
   * @param minTokens Minimum Tokens bought.
   * @param deadline Time after which this transaction can no longer be executed.
   * @return Amount of Tokens bought.
   */
  function ethToTokenSwapInput(uint256 minTokens, uint256 deadline) public payable returns (uint256) {
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
  ) public payable returns (uint256) {
    require(recipient != address(this) && recipient != address(0));
    return ethToTokenInput(msg.value, minTokens, deadline, msg.sender, recipient);
  }

  function ethToTokenOutput(
    uint256 tokensBought,
    uint256 maxEth,
    uint256 deadline,
    address payable buyer,
    address recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && tokensBought > 0 && maxEth > 0);
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethSold = getOutputPrice(tokensBought, address(this).balance.sub(maxEth), tokenReserve);
    // Throws if ethSold > maxEth
    uint256 eth_refund = maxEth.sub(ethSold);
    if (eth_refund > 0) {
      buyer.transfer(eth_refund);
    }
    require(transfer(recipient, tokensBought));
    emit TokenPurchase(buyer, ethSold, tokensBought);
    return ethSold;
  }

  /**
   * @notice Convert ETH to Tokens.
   * @dev User specifies maximum input (msg.value) && exact output.
   * @param tokensBought Amount of tokens bought.
   * @param deadline Time after which this transaction can no longer be executed.
   * @return Amount of ETH sold.
   */
  function ethToTokenSwapOutput(uint256 tokensBought, uint256 deadline) public payable returns (uint256) {
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
  ) public payable returns (uint256) {
    require(recipient != address(this) && recipient != address(0));
    return ethToTokenOutput(tokensBought, msg.value, deadline, payable(msg.sender), recipient);
  }

  function tokenToEthInput(
    uint256 tokensSold,
    uint256 minEth,
    uint256 deadline,
    address buyer,
    address payable recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && tokensSold > 0 && minEth > 0);
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
    uint256 weiBought = ethBought;
    require(weiBought >= minEth);
    recipient.transfer(weiBought);
    require(transferFrom(buyer, address(this), tokensSold));
    emit EthPurchase(buyer, tokensSold, weiBought);
    return weiBought;
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
  ) public returns (uint256) {
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
  ) public returns (uint256) {
    require(recipient != address(this) && recipient != address(0));
    return tokenToEthInput(tokensSold, minEth, deadline, msg.sender, recipient);
  }

  function tokenToEthOutput(
    uint256 ethBought,
    uint256 maxTokens,
    uint256 deadline,
    address buyer,
    address payable recipient
  ) private returns (uint256) {
    require(deadline >= block.timestamp && ethBought > 0);
    uint256 tokenReserve = balanceOf(address(this));
    uint256 tokensSold = getOutputPrice(ethBought, tokenReserve, address(this).balance);
    // tokens sold is always > 0
    require(maxTokens >= tokensSold);
    recipient.transfer(ethBought);
    require(transferFrom(buyer, address(this), tokensSold));
    emit EthPurchase(buyer, tokensSold, ethBought);
    return tokensSold;
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
  ) public returns (uint256) {
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
  ) public returns (uint256) {
    require(recipient != address(this) && recipient != address(0));
    return tokenToEthOutput(ethBought, maxTokens, deadline, msg.sender, recipient);
  }

  /**
   * @notice Public price function for ETH to Token trades with an exact input.
   * @param ethSold Amount of ETH sold.
   * @return Amount of Tokens that can be bought with input ETH.
   */
  function getEthToTokenInputPrice(uint256 ethSold) public view returns (uint256) {
    require(ethSold > 0);
    uint256 tokenReserve = balanceOf(address(this));
    return getInputPrice(ethSold, address(this).balance, tokenReserve);
  }

  /**
   * @notice Public price function for ETH to Token trades with an exact output.
   * @param tokensBought Amount of Tokens bought.
   * @return Amount of ETH needed to buy output Tokens.
   */
  function getEthToTokenOutputPrice(uint256 tokensBought) public view returns (uint256) {
    require(tokensBought > 0);
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethSold = getOutputPrice(tokensBought, address(this).balance, tokenReserve);
    return ethSold;
  }

  /**
   * @notice Public price function for Token to ETH trades with an exact input.
   * @param tokensSold Amount of Tokens sold.
   * @return Amount of ETH that can be bought with input Tokens.
   */
  function getTokenToEthInputPrice(uint256 tokensSold) public view returns (uint256) {
    require(tokensSold > 0);
    uint256 tokenReserve = balanceOf(address(this));
    uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
    return ethBought;
  }

  /**
   * @notice Public price function for Token to ETH trades with an exact output.
   * @param ethBought Amount of output ETH.
   * @return Amount of Tokens needed to buy output ETH.
   */
  function getTokenToEthOutputPrice(uint256 ethBought) public view returns (uint256) {
    require(ethBought > 0);
    uint256 tokenReserve = balanceOf(address(this));
    return getOutputPrice(ethBought, tokenReserve, address(this).balance);
  }
}
