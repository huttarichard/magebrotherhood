/// <reference types="@nomiclabs/hardhat-waffle" />

import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "hardhat";

import {
  Affiliate,
  Affiliate__factory as AffiliateFactory,
  Coin,
  Coin__factory as CoinFactory,
  Playables,
  Playables__factory as PlayablesFactory,
  Staking,
  Staking__factory as StakingFactory,
} from "../src/artifacts/types";

describe("Playables contract", function () {
  let coin: Coin;
  let affiliate: Affiliate;
  let playables: Playables;
  let staking: Staking;

  this.beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(100);
    await coin.deployed();

    const value = ethers.utils.parseEther("100");
    await owner.sendTransaction({ to: coin.address, value });

    await coin.setLiqudityGuard(BigNumber.from(0), BigNumber.from(1));
    await coin.setTaxFee(BigNumber.from(0), BigNumber.from(1));

    const affiliateFactory = (await ethers.getContractFactory("Affiliate", owner)) as AffiliateFactory;
    affiliate = await affiliateFactory.deploy(coin.address);

    await affiliate.grantRole(await affiliate.REWARDER(), owner.address);
    await affiliate.allowRewarding(owner.address, 100);

    const Playables = (await ethers.getContractFactory("Playables", owner)) as PlayablesFactory;
    playables = await Playables.deploy(coin.address, affiliate.address, "");

    const Staking = (await ethers.getContractFactory("Staking", owner)) as StakingFactory;
    staking = await Staking.deploy(100, 100, coin.address);

    await staking.addContract(playables.address);
  });

  it("it should be no problem to stake", async function () {
    console.log(playables);
    // const [owner] = await ethers.getSigners();
    // await playables.mint({ amount: 1, discount: "", payWithCoin: false, tokenId: 0 });
    // const result = await affiliate.payoff(owner.address);
    // const result = await affiliate.payoff(owner.address);
    // console.log(result);
  });
});
