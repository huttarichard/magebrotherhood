/// <reference types="@nomiclabs/hardhat-waffle" />

import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network } from "hardhat";

import {
  Coin,
  Coin__factory as CoinFactory,
  Exchange,
  Exchange__factory as ExchangeFactory,
  Playables,
  Playables__factory as PlayablesFactory,
  Promoter,
  Promoter__factory as PromoterFactory,
  Staking,
  Staking__factory as StakingFactory,
} from "../src/artifacts/types";
import { addToken, defaultToken } from "./playables";

const STAKING_CONFIG = {
  cycle: 60,
  cyclesPerPeriod: 2,
  startsAt: Math.ceil(Date.now() / 1000),
};

const increaseTimeBy = async (seconds: number) => {
  await network.provider.send("evm_increaseTime", [Number(seconds)]);
  await network.provider.send("evm_mine");
};

describe("Staking contract", function () {
  let coin: Coin;
  let promoter: Promoter;
  let playables: Playables;
  let exchange: Exchange;
  let staking: Staking;
  let wallet: SignerWithAddress;

  let rewardPerCycle: BigNumber;

  const currentPeriod = async () => {
    return await staking.getCurrentPeriod();
  };

  const currentCycle = async () => {
    return await staking.getCurrentCycle();
  };

  const estimateRewards = async (maxPeriods = 100, targetWallet = wallet) => {
    return await staking.connect(targetWallet).estimateRewards(maxPeriods);
  };

  // const rewardPerPeriods = (periods: number) => {
  //   return rewardPerCycle.mul(periods * STAKING_CONFIG.cyclesPerPeriod);
  // };

  const rewardPerPeriods = (periods: number, totalStaked: number, walletStaked: number) => {
    let totalReward = BigNumber.from("0");
    for (let i = 0; i < periods; i++) {
      const snapshotReward = rewardPerCycle.mul(STAKING_CONFIG.cyclesPerPeriod).div(totalStaked).mul(walletStaked);
      totalReward = totalReward.add(snapshotReward);
    }
    return totalReward;
  };

  this.beforeEach(async () => {
    // we need to reset evm to make it deterministic
    await network.provider.send("hardhat_reset");

    const [owner, randomWallet] = await ethers.getSigners();
    wallet = randomWallet;

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(BigNumber.from("1000").pow(18));
    await coin.deployed();

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address);

    const Exchange = (await ethers.getContractFactory("Exchange", owner)) as ExchangeFactory;
    exchange = await Exchange.deploy(coin.address);

    const Playables = (await ethers.getContractFactory("Playables", owner)) as PlayablesFactory;
    playables = await Playables.deploy(exchange.address, promoter.address, "");

    const Staking = (await ethers.getContractFactory("Staking", owner)) as StakingFactory;
    staking = await Staking.deploy(
      STAKING_CONFIG.cycle,
      STAKING_CONFIG.cyclesPerPeriod,
      STAKING_CONFIG.startsAt,
      coin.address
    );

    await staking.addContract(playables.address);
    await coin.grantRole(await coin.DISTRIBUTOR(), staking.address);

    await addToken(playables);
    await addToken(playables);
    await addToken(playables, defaultToken.uri, defaultToken.supply, defaultToken.minted, 110);

    await playables.connect(wallet).mint(
      {
        amount: 10,
        promoCode: "",
        tokenId: 1,
      },
      {
        value: parseEther("1"),
      }
    );

    const startPeriod = await currentPeriod();
    rewardPerCycle = parseEther("1");
    await staking.addRewardsForPeriods(startPeriod, startPeriod + 1_000, rewardPerCycle);
  });

  it("should be able to stake", async function () {
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 1, []);

    const tokenInfo = await staking.getTokenInfo(playables.address, wallet.address, 1);
    expect(tokenInfo.owner).to.equal(wallet.address);
    expect(tokenInfo.amount).to.equal(1);
    expect(tokenInfo.weight).to.equal(defaultToken.weight);
    expect(tokenInfo.depositCycle).to.equal(await currentCycle());
    expect(tokenInfo.withdrawCycle).to.equal(0);

    const startPeriod = await currentPeriod();
    const periods = 10;

    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    await expect(estimateRewards()).to.not.be.reverted;

    const rewards1 = await estimateRewards();
    expect(rewards1.startPeriod).to.be.eq(startPeriod);
    expect(rewards1.periods).to.be.eq(10);

    await increaseTimeBy(2 * periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    const rewards2 = await estimateRewards();
    expect(rewards2.startPeriod).to.be.eq(startPeriod);
    expect(rewards2.periods).to.be.eq(periods * 3);
  });

  it("should be able to stake and see rewards", async function () {
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 1, []);

    const periods = 10;
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    await expect(estimateRewards()).to.not.be.reverted;

    // 10 periods elapsed
    const rewards1 = await estimateRewards(periods);
    expect(rewards1.periods).to.be.eq(10);
    expect(rewards1.amount).to.be.eq(rewardPerPeriods(1 * periods, 1, 1));

    // 30 periods elapsed
    await increaseTimeBy(2 * periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    const rewards2 = await estimateRewards(periods * 3);
    expect(rewards2.periods).to.be.eq(periods * 3);
    expect(rewards2.amount).to.be.eq(rewardPerPeriods(3 * periods, 1, 1));

    // get rewards for last 20 periods
    const rewards3 = await estimateRewards(periods * 2);
    expect(rewards3.periods).to.be.eq(periods * 2);
    expect(rewards3.amount).to.be.eq(rewardPerPeriods(2 * periods, 1, 1));
  });

  it("should be able to unstake", async function () {
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 1, []);

    const periods = 10;
    const depositCycle = await currentCycle();
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    await expect(staking.connect(wallet).unstake(playables.address, 1)).to.not.be.reverted;
    const withdrawCycle = await currentCycle();
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    // console.log(await estimateRewards(2 * periods));
    // console.log(await estimateRewards(periods));

    // 10 periods staked, 10 periods unstaked
    expect((await estimateRewards(2 * periods)).amount).to.be.eq(rewardPerPeriods(periods, 1, 1));
    //TODO: either bug or by design (not documented)
    // it was unstaked for the past 10 periods, estimating periods for last 10 periods should therefore be 0
    // see line 159-161 that it returns only rewards for specified periods, not total claimable
    // UNCOMMENT LINE BELOW TO SEE THE ISSUE
    // expect((await estimateRewards(periods)).amount).to.be.eq(0);

    const tokenInfo = await staking.getTokenInfo(playables.address, wallet.address, 1);
    expect(tokenInfo.owner).to.equal(ethers.constants.AddressZero);
    expect(tokenInfo.amount).to.equal(1);
    expect(tokenInfo.weight).to.equal(defaultToken.weight);
    expect(tokenInfo.depositCycle).to.equal(depositCycle);
    expect(tokenInfo.withdrawCycle).to.equal(withdrawCycle);
  });

  it("should be able to claim rewards", async function () {
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 1, []);

    const periods = 10;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(0);

    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    await expect(staking.connect(wallet).claimRewards(periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(periods, 1, 1));

    // claiming again in same period should not change balance
    await expect(staking.connect(wallet).claimRewards(periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(periods, 1, 1));

    // claiming again in extended period should not change balance
    await expect(staking.connect(wallet).claimRewards(3 * periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(periods, 1, 1));

    // claim again after 10 periods
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    await expect(staking.connect(wallet).claimRewards(periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(2 * periods, 1, 1));
  });

  it("should be able to stake multiple tokens", async function () {
    const [randomWallet] = await ethers.getSigners();
    await playables.connect(randomWallet).mint(
      {
        amount: 100,
        promoCode: "",
        tokenId: 1,
      },
      {
        value: parseEther("10"),
      }
    );

    const amount = 10;
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, amount, []);
    await playables.connect(randomWallet).safeTransferFrom(randomWallet.address, staking.address, 1, 100, []);

    const totalStaked = (100 + amount) * defaultToken.weight;
    const amountStaked = amount * defaultToken.weight;

    const tokenInfo = await staking.getTokenInfo(playables.address, wallet.address, 1);
    expect(tokenInfo.owner).to.equal(wallet.address);
    expect(tokenInfo.amount).to.equal(10);
    expect(tokenInfo.weight).to.equal(defaultToken.weight * 10);
    expect(tokenInfo.depositCycle).to.equal(await currentCycle());
    expect(tokenInfo.withdrawCycle).to.equal(0);

    const periods = 10;
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    await expect(estimateRewards()).to.not.be.reverted;

    // wallet with 10 staked tokens
    const rewards1 = await estimateRewards(periods);
    expect(rewards1.periods).to.be.eq(10);
    expect(rewards1.amount).to.be.eq(rewardPerPeriods(1 * periods, totalStaked, amountStaked));

    // randomWallet with 100 staked tokens
    const rewards11 = await estimateRewards(periods, randomWallet);
    expect(rewards11.periods).to.be.eq(10);
    expect(rewards11.amount).to.be.eq(rewardPerPeriods(periods, totalStaked, 100 * defaultToken.weight));

    // 30 periods elapsed
    await increaseTimeBy(2 * periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    const rewards2 = await estimateRewards(periods * 3);
    expect(rewards2.periods).to.be.eq(periods * 3);
    expect(rewards2.amount).to.be.eq(rewardPerPeriods(3 * periods, totalStaked, amountStaked));

    // get rewards for last 20 periods
    const rewards3 = await estimateRewards(periods * 2);
    expect(rewards3.periods).to.be.eq(periods * 2);
    expect(rewards3.amount).to.be.eq(rewardPerPeriods(2 * periods, totalStaked, amountStaked));
  });

  it("should be able to stake multiple tokens with different weights", async function () {
    const [randomWallet] = await ethers.getSigners();

    // token 1 - weight: 100
    // token 3 - weight: 110

    await playables.connect(randomWallet).mint(
      {
        amount: 100,
        promoCode: "",
        tokenId: 1,
      },
      {
        value: parseEther("10"),
      }
    );

    await playables.connect(wallet).mint(
      {
        amount: 88,
        promoCode: "",
        tokenId: 3,
      },
      {
        value: parseEther("10"),
      }
    );

    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 10, []);
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 3, 88, []);

    await playables.connect(randomWallet).safeTransferFrom(randomWallet.address, staking.address, 1, 100, []);

    const token3Weight = 110;
    const totalStaked = (100 + 10) * defaultToken.weight + 88 * token3Weight;
    const walletStaked = 10 * defaultToken.weight + 88 * token3Weight;

    const tokenInfo = await staking.getTokenInfo(playables.address, wallet.address, 3);
    expect(tokenInfo.owner).to.equal(wallet.address);
    expect(tokenInfo.amount).to.equal(88);
    expect(tokenInfo.weight).to.equal(110 * 88);
    expect(tokenInfo.depositCycle).to.equal(await currentCycle());
    expect(tokenInfo.withdrawCycle).to.equal(0);

    const periods = 10;
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    await expect(estimateRewards()).to.not.be.reverted;

    // wallet with 10 staked tokens
    const rewards1 = await estimateRewards(periods);
    expect(rewards1.periods).to.be.eq(10);
    expect(rewards1.amount).to.be.eq(rewardPerPeriods(1 * periods, totalStaked, walletStaked));

    // randomWallet with 100 staked tokens
    const rewards11 = await estimateRewards(periods, randomWallet);
    expect(rewards11.periods).to.be.eq(10);
    expect(rewards11.amount).to.be.eq(rewardPerPeriods(periods, totalStaked, 100 * defaultToken.weight));

    staking.connect(wallet).unstake;

    // 30 periods elapsed
    await increaseTimeBy(2 * periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    const rewards2 = await estimateRewards(periods * 3);
    expect(rewards2.periods).to.be.eq(periods * 3);
    expect(rewards2.amount).to.be.eq(rewardPerPeriods(3 * periods, totalStaked, walletStaked));

    // get rewards for last 20 periods
    const rewards3 = await estimateRewards(periods * 2);
    expect(rewards3.periods).to.be.eq(periods * 2);
    expect(rewards3.amount).to.be.eq(rewardPerPeriods(2 * periods, totalStaked, walletStaked));
  });

  it("should be able to unstake multiple", async function () {
    const [randomWallet] = await ethers.getSigners();

    // token 1 - weight: 100
    // token 3 - weight: 110

    await playables.connect(randomWallet).mint(
      {
        amount: 100,
        promoCode: "",
        tokenId: 1,
      },
      {
        value: parseEther("10"),
      }
    );

    await playables.connect(wallet).mint(
      {
        amount: 88,
        promoCode: "",
        tokenId: 3,
      },
      {
        value: parseEther("10"),
      }
    );

    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 10, []);
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 3, 88, []);
    await playables.connect(randomWallet).safeTransferFrom(randomWallet.address, staking.address, 1, 100, []);

    const token3Weight = 110;
    const totalStaked = (100 + 10) * defaultToken.weight + 88 * token3Weight;
    const walletStaked = 10 * defaultToken.weight + 88 * token3Weight;

    // should fail: we require at least 2 cycles after stake in order to unstake
    await expect(staking.connect(wallet).unstake(playables.address, 1)).to.be.reverted;
    await expect(staking.connect(wallet).unstake(playables.address, 3)).to.be.reverted;
    await expect(staking.connect(randomWallet).unstake(playables.address, 1)).to.be.reverted;

    await increaseTimeBy(2 * STAKING_CONFIG.cycle);

    // should pass
    await expect(staking.connect(wallet).unstake(playables.address, 1)).to.not.be.reverted;
    await expect(staking.connect(wallet).unstake(playables.address, 3)).to.not.be.reverted;
    await expect(staking.connect(randomWallet).unstake(playables.address, 1)).to.not.be.reverted;
  });
});
