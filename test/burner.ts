// import "@nomiclabs/hardhat-waffle";

// import { expect } from "chai";
// import { ethers } from "hardhat";

// import { Coin__factory as CoinFactory } from "../src/artifacts/types";
// import { calculateChangeInCoins, coin, currentPrice, initBurner } from "../src/server/burner";

// function generatePriceSeries(period: number, s0: number, mu: number, sigma: number) {
//   const prices: number[] = [s0];
//   let num = s0;
//   for (let i = 0; i < period; i++) {
//     num = geometricBrownianMotion(num, mu, sigma, period);
//     prices.push(num);
//   }
//   prices.pop();
//   return prices;
// }

// // Generates a price following a geometric brownian motion process based on the input of the arguments:
// //   - s0: Asset inital price.
// //   - mu: Interest rate expressed annual terms.
// //   - sigma: Volatility expressed annual terms
// function geometricBrownianMotion(s0: number, mu: number, sigma: number, period: number): number {
//   const dt = 1 / period;
//   const dW = Math.sqrt(dt) * Math.random();
//   const W = Math.sqrt(sigma * sigma * dt) * dW;
//   const s1 = s0 * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * W);
//   return s1;
// }

// async function addETH(amount: number) {
//   const [owner] = await ethers.getSigners();
//   const value = ethers.utils.parseEther(amount.toString());
//   await expect(() => owner.sendTransaction({ to: coin.address, value })).to.changeEtherBalance(coin, value);
// }

// async function printStats(label) {
//   const balanceETHWei = await ethers.provider.getBalance(coin.address);
//   const balanceETH = parseInt(ethers.utils.formatEther(balanceETHWei));

//   const balanceCoinWei = await coin.balanceOf(coin.address);
//   const balanceCoin = parseInt(ethers.utils.formatEther(balanceCoinWei));

//   const price = await currentPrice();

//   console.info(label, " | ETH: ", balanceETH, "Coin: ", balanceCoin, "Price: ", price);
// }

// describe("Coin Burner", function () {
//   this.beforeEach(async () => {
//     const Coin = (await ethers.getContractFactory("Coin")) as CoinFactory;
//     initBurner(await Coin.deploy(1_000));
//     // coin = await Coin.deploy(10);
//     await coin.deployed();
//     await addETH(1_000);
//   });

//   it("should return block number, coin and eth balance", async function () {
//     const [owner] = await ethers.getSigners();
//     coin.grantRole(await coin.BURNER(), owner.address);
//     coin.grantRole(await coin.MINTER(), owner.address);

//     const price = await currentPrice();
//     const priceArr = generatePriceSeries(48, price, 1, -2).reverse();
//     console.info(priceArr);

//     // adjust the coin amount to reflect the price series
//     const targetCoin = 1_000 / priceArr[0] - 1_000;
//     console.info(`Coins minted: ${targetCoin.toFixed(0)} to get to  ${priceArr[0]}`);
//     await coin.connect(owner).tokenMint(coin.address, ethers.utils.parseEther(targetCoin.toFixed(0)));
//     console.info("Confirm:", await currentPrice());

//     await printStats("Before");

//     const change = await calculateChangeInCoins(priceArr);
//     console.info("Change in coin amount: ", change);

//     if (change == 0) {
//       console.info("Do Nothing");
//     } else if (change > 0) {
//       console.info(`Mint ${change} coins`);
//       await coin.tokenMint(coin.address, ethers.utils.parseEther(change.toFixed(0)));
//     } else if (change < 0) {
//       console.info(`Burn ${Math.abs(change)} coins`);
//       await coin.tokenBurn(coin.address, ethers.utils.parseEther(Math.abs(change).toFixed(0)));
//     }

//     await printStats("After");

//     const newPrice = await currentPrice();
//     const pctChange = newPrice / priceArr[0] - 1;
//     console.info(`Change | Price: ${priceArr[0]} -> ${newPrice} (increase of: ${(pctChange * 100).toFixed(2)}%) `);
//   });
// });
