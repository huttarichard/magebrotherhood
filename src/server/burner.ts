import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { Coin } from "../artifacts/types/Coin";

export let coin: Coin;

const TARGET_PRICE_INCREASE = 0.01; // in %
const MINIMUM_PERIOD_LOCK = 24; // hours

export function initBurner(c: Coin) {
  coin = c;
}

export async function currentPrice() {
  const balanceETHWei: BigNumber = await ethers.provider.getBalance(coin.address);
  const balanceETH = parseInt(ethers.utils.formatEther(balanceETHWei));
  const balanceCoinWei: BigNumber = await coin.balanceOf(coin.address);
  const balanceCoin = parseInt(ethers.utils.formatEther(balanceCoinWei));
  return balanceETH / balanceCoin;
}

function movingAverage(prices: number[], period: number): number {
  const sum = prices.slice(0, period).reduce((acc, price) => acc + price, 0);
  return sum / period;
}

function locked(): boolean {
  // get last mint/burn from blockchain, if elapsed time is lesser than MINIMUM_PERIOD_LOCK, lock is true
  return false;
}

// prices - hourly price data
export async function calculateChangeInCoins(prices: number[]): Promise<number> {
  if (locked()) {
    return 0;
  }

  const balanceWei: BigNumber = await coin.balanceOf(coin.address);
  const balance = parseInt(ethers.utils.formatEther(balanceWei));

  const ma4 = movingAverage(prices, 4);
  const ma8 = movingAverage(prices, 8);
  const ma24 = movingAverage(prices, 24);
  console.log("MA4:", ma4, "MA8:", ma8, "MA24:", ma24);

  const latestPrice = prices[0];
  let change = 0;
  const noise = 1 + Math.random() * 0.1 - 0.05;

  if (latestPrice > ma24) {
    // going up
    // do nothing now
  }

  if (latestPrice < ma24) {
    // going down
    const targetPrice = ma24 * (1 + TARGET_PRICE_INCREASE);
    // difference in pct between targetPrice and ma24
    const diff = (targetPrice - ma24) / ma24;
    change = -1 * balance * diff * noise;
  }

  return Math.floor(change);
}
