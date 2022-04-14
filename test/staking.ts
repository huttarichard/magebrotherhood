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
import { addToken } from "./playables";

const STAKING_CONFIG = {
  cycle: 60,
  cyclesPerPeriod: 2,
  startsAt: Math.ceil(Date.now() / 1000),
};

const increaseTimeBy = async (seconds: number) => {
  network.provider.send("evm_re");
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

  const rewardPerPeriods = (periods: number) => {
    return rewardPerCycle.mul(periods * STAKING_CONFIG.cyclesPerPeriod);
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

    await addToken(playables, 1);
    await addToken(playables, 2);
    await addToken(playables, 3);

    await playables.connect(wallet).mint(
      {
        amount: 1,
        promoCode: "",
        tokenId: 1,
      },
      {
        value: parseEther("0.1"),
      }
    );

    const startPeriod = await currentPeriod();
    rewardPerCycle = parseEther("0.0001");
    await staking.addRewardsForPeriods(startPeriod, startPeriod + 1_000, rewardPerCycle);
  });

  it("should be able to stake", async function () {
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 1, []);

    const tokenInfo = await staking.getTokenInfo(playables.address, wallet.address, 1);
    expect(tokenInfo.owner).to.equal(wallet.address);
    expect(tokenInfo.amount).to.equal(1);
    expect(tokenInfo.weight).to.equal(1);
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
    expect(rewards1.amount).to.be.eq(rewardPerPeriods(1 * periods));

    // 30 periods elapsed
    await increaseTimeBy(2 * periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    const rewards2 = await estimateRewards(periods * 3);
    expect(rewards2.periods).to.be.eq(periods * 3);
    expect(rewards2.amount).to.be.eq(rewardPerPeriods(3 * periods));

    // get rewards for last 20 periods
    const rewards3 = await estimateRewards(periods * 2);
    expect(rewards3.periods).to.be.eq(periods * 2);
    expect(rewards3.amount).to.be.eq(rewardPerPeriods(2 * periods));
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
    expect((await estimateRewards(2 * periods)).amount).to.be.eq(rewardPerPeriods(periods));
    //TODO: either bug or by design (not documented)
    // it was unstaked for the past 10 periods, estimating periods for last 10 periods should therefore be 0
    // see line 155-157 that it returns only rewards for specified periods, not total claimable
    // UNCOMMENT LINE BELOW TO SEE THE ISSUE
    // expect((await estimateRewards(periods)).amount).to.be.eq(0);

    const tokenInfo = await staking.getTokenInfo(playables.address, wallet.address, 1);
    expect(tokenInfo.owner).to.equal(ethers.constants.AddressZero);
    expect(tokenInfo.amount).to.equal(1);
    expect(tokenInfo.weight).to.equal(1);
    expect(tokenInfo.depositCycle).to.equal(depositCycle);
    expect(tokenInfo.withdrawCycle).to.equal(withdrawCycle);
  });

  it("should be able to claim rewards", async function () {
    await playables.connect(wallet).safeTransferFrom(wallet.address, staking.address, 1, 1, []);

    const periods = 10;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(0);

    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);

    await expect(staking.connect(wallet).claimRewards(periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(periods));

    // claiming again in same period should not change balance
    await expect(staking.connect(wallet).claimRewards(periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(periods));

    // claiming again in extended period should not change balance
    await expect(staking.connect(wallet).claimRewards(3 * periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(periods));

    // claim again after 10 periods
    await increaseTimeBy(periods * STAKING_CONFIG.cyclesPerPeriod * STAKING_CONFIG.cycle);
    await expect(staking.connect(wallet).claimRewards(periods)).to.not.be.reverted;
    expect(await coin.balanceOf(wallet.address)).to.be.eq(rewardPerPeriods(2 * periods));
  });
});
