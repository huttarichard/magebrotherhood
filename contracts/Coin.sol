// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// todo improt uniswap here



// import "@openzeppelin/contracts/utils/Context.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// import "./IUniswapV2Factory.sol";
// import "./ReentrancyGuard.sol";
// import "./Staking.sol";

// contract TokenContract is ERC20, Ownable {
//     using SafeMath for uint256;

//     IUniswapV2Router02 public uniswapV2Router;
//     address public uniswapV2Pair;

//     uint256 public curBuyFeeStaking;
//     uint256 public curBuyFeeMarketing;    
//     uint256 public curSellFeeBuyback;
//     uint256 public curSellFeeMarketing;
//     uint256 public curSellFeeStaking;

//     //Internal contract usage
//     uint256 private accumulatingMarketing;
//     uint256 private accumulatingBuyback;

//     // exlcude from fees and max transaction amount
//     mapping (address => bool) private _isExcludedFromFees;

//     uint256 private _totalSupply = 1000000000 * (10**18);
//     uint256 public numTokensSellToAddToLiquidity = _totalSupply / 10000;
//     bool public swapAndLiquifyEnabled = true;
//     bool private inSwapAndLiquify;
//     bool private swapping;

//     address public marketingWallet;
//     address public DEAD = 0x000000000000000000000000000000000000dEaD;
//     address public ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
//     //address public ROUTER = 0xD99D1c33F9fC3444f8101754aBC46c52416550D1; // testnet

//     Staking public staking;

//     // Buyback
//     uint256 public lastBuyBack;
//     bool public buyBackEnabled = true;

//     //  Launch
//     uint256 public launchTime;

//     event MinTokensBeforeSwapUpdated(uint256 minTokensBeforeSwap);
//     event SwapAndLiquifyEnabledUpdated(bool enabled);
//     event SwapAndLiquify(
//         uint256 tokensSwapped,
//         uint256 ethReceived,
//         uint256 tokensIntoLiqudity
//     );

//     modifier lockTheSwap {
//         inSwapAndLiquify = true;
//         _;
//         inSwapAndLiquify = false;
//     }

//     constructor () ERC20("Name", "Symbol") {

//         IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(ROUTER); //Pancake Mainnet

//         // Create a uniswap pair for this new token
//         address _uniswapV2Pair = IUniswapV2Factory(_uniswapV2Router.factory())
//             .createPair(address(this), _uniswapV2Router.WETH());

//         uniswapV2Router = _uniswapV2Router;
//         uniswapV2Pair = _uniswapV2Pair;

//         staking = new Staking();
//         staking.notifySendRewardFromToken(_totalSupply.mul(15).div(100));
//         staking.transferOwnership(owner());

//         _mint(owner(), _totalSupply.mul(85).div(100));
//         _mint(address(staking), _totalSupply.mul(15).div(100));
        
//         // exclude from paying fees or having max transaction amount
//         excludeFromFee(owner());
//         excludeFromFee(address(this));
//         excludeFromFee(address(staking));

//         curBuyFeeStaking = mcap20mBuyFeeStaking;
//         curBuyFeeMarketing = mcap20mBuyFeeMarketing;    
//         curSellFeeBuyback = mcap20mSellFeeBuyback;
//         curSellFeeMarketing = mcap20mSellFeeMarketing;
//         curSellFeeStaking = mcap20mSellFeeStaking;

//         marketingWallet = owner();
//     }

//     receive() external payable {}

//     function setMarketingWallet(address _marketingWallet) external onlyOwner() {
//         require(_marketingWallet != address(0), "Development wallet can't be the zero address");
//         marketingWallet = _marketingWallet;
//     }

//     function isExcludedFromFee(address account) public view returns(bool) {
//         return _isExcludedFromFees[account];
//     }
    
//     function excludeFromFee(address account) public onlyOwner {
//         _isExcludedFromFees[account] = true;
//     }
    
//     function includeInFee(address account) public onlyOwner {
//         _isExcludedFromFees[account] = false;
//     }

//     function maker() public view override returns (address) {
//        return address(MAKR);
//     }

//     function setBuyBackEnabled(bool enabled) public onlyOwner {
//        buyBackEnabled = enabled;
//     }

//     function setCurrentMcap(uint256 _mcap) public onlyOwner {
//         curMCap = _mcap;
//         if(curMCap < 20000000){
//             curBuyFeeStaking = mcap20mBuyFeeStaking;
//             curBuyFeeMarketing = mcap20mBuyFeeMarketing;    
//             curSellFeeBuyback = mcap20mSellFeeBuyback;
//             curSellFeeMarketing = mcap20mSellFeeMarketing;
//             curSellFeeStaking = mcap20mSellFeeStaking;
//         }else if( curMCap < 50000000){
//             curBuyFeeStaking = mcap50mBuyFeeStaking;
//             curBuyFeeMarketing = mcap50mBuyFeeMarketing;    
//             curSellFeeBuyback = mcap50mSellFeeBuyback;
//             curSellFeeMarketing = mcap50mSellFeeMarketing;
//             curSellFeeStaking = mcap50mSellFeeStaking;
//         }else {
//             curBuyFeeStaking = mcap100mBuyFeeStaking;
//             curBuyFeeMarketing = mcap100mBuyFeeMarketing;    
//             curSellFeeBuyback = mcap100mSellFeeBuyback;
//             curSellFeeMarketing = mcap100mSellFeeMarketing;
//             curSellFeeStaking = mcap100mSellFeeStaking;   
//         }
//     }

//     function setSwapAndLiquifyEnabled(bool _enabled) public onlyOwner {
//         swapAndLiquifyEnabled = _enabled;
//         emit SwapAndLiquifyEnabledUpdated(_enabled);
//     }

//     function getPriceTokenPer1BNB() public view returns (uint256) {
//         uint256 amountTokenInPool = balanceOf(address(uniswapV2Pair));
//         address WBNB = uniswapV2Router.WETH();
//         uint256 amountBNBInPool = IERC20(WBNB).balanceOf(address(uniswapV2Pair));

//         if(amountBNBInPool > 0){
//             uint256 tokenPerBNB = (amountTokenInPool.div(amountBNBInPool)).mul(10**18);
//             return tokenPerBNB;
//         }else 
//             return 0;
//     }

//     function _transfer(
//         address from,
//         address to,
//         uint256 amount
//     ) internal override {

//         require(from != address(0), "ERC20: transfer from the zero address");
//         require(to != address(0), "ERC20: transfer to the zero address");
//         require(amount > 0, "Transfer amount must be greater than zero");

//         // Set launch time when Pinksale add liquidity
//         if(launchTime == 0 && to == uniswapV2Pair){
//             launchTime = block.timestamp;
//         }

//         bool overMinTokenBalance = balanceOf(address(this)) >= numTokensSellToAddToLiquidity;
//         if (
//             overMinTokenBalance &&
//             !inSwapAndLiquify &&
//             from != uniswapV2Pair &&
//             swapAndLiquifyEnabled
//         ) {
//             //add liquidity
//             swapAndSendFee();
//         }else {
//             if (buyBackEnabled && address(this).balance > 0.2 ether && block.timestamp.sub(lastBuyBack) > (5 minutes)) {
//                 buyBackAndBurn(address(this).balance);
//                 lastBuyBack = block.timestamp;    
//             }
//         }

//         uint256 feeStaking = 0;
//         uint256 feeMarketing = 0;
//         uint256 feeBuyback = 0;
//         if(to == uniswapV2Pair){ // Sell
//             feeStaking = amount.mul(curSellFeeStaking).div(100);
//             feeMarketing = amount.mul(curSellFeeMarketing).div(100);
//             feeBuyback = amount.mul(curSellFeeBuyback).div(100);
//         }else if (from == uniswapV2Pair){ // Buy
//             feeStaking = amount.mul(curBuyFeeStaking).div(100);
//             feeMarketing = amount.mul(curBuyFeeMarketing).div(100);
//             feeBuyback = 0;
//         }
//         accumulatingBuyback = accumulatingBuyback.add(feeBuyback);
//         accumulatingMarketing = accumulatingMarketing.add(feeMarketing);

//         if(feeBuyback.add(feeMarketing) > 0)
//             super._transfer(from, address(this), feeBuyback.add(feeMarketing));

//         if(feeStaking > 0){
//             super._transfer(from, address(staking), feeStaking);
//             staking.notifySendRewardFromToken(feeStaking);
//         }

//         amount = amount.sub(feeBuyback.add(feeMarketing).add(feeStaking));
//         super._transfer(from, to, amount);
//     }

//     function swapAndSendFee() public lockTheSwap {
//         uint256 contractTokenBalance = balanceOf(address(this));
//         uint256 beforeSwapBalance = address(this).balance;
//         swapTokensForEth(contractTokenBalance);
//         uint256 delta = address(this).balance.sub(beforeSwapBalance);
//         uint256 marketingAmount = delta.mul(accumulatingMarketing).div(accumulatingMarketing.add(accumulatingBuyback));
//         payable(marketingWallet).transfer(marketingAmount);

//         // Reset
//         accumulatingMarketing = 0;
//         accumulatingBuyback = 0;
//     }

//     function swapTokensForEth(uint256 tokenAmount) private {
//         // generate the uniswap pair path of token -> weth
//         address[] memory path = new address[](2);
//         path[0] = address(this);
//         path[1] = uniswapV2Router.WETH();

//         _approve(address(this), address(uniswapV2Router), tokenAmount);

//         // make the swap
//         uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
//             tokenAmount,
//             0, // accept any amount of ETH
//             path,
//             address(this),
//             block.timestamp.add(300)
//         );
//     }

//     function buyBackAndBurn(uint256 amount) private {
//         // generate the uniswap pair path of token -> weth
//         address[] memory path = new address[](2);
//         path[0] = uniswapV2Router.WETH();
//         path[1] = address(this);

//         // make the swap
//         uniswapV2Router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: amount}(
//             0, // accept any amount of Tokens
//             path,
//             DEAD, // Burn address
//             block.timestamp.add(300)
//         );
//     }
// }