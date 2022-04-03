/// <reference types="@nomiclabs/hardhat-waffle" />

import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "hardhat";

import {
  Affiliate,
  Affiliate__factory as AffiliateFactory,
  Coin,
  Coin__factory as CoinFactory,
} from "../src/artifacts/types";

describe("Affiliate contract", function () {
  let coin: Coin;
  let affiliate: Affiliate;

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
  });

  it("it should be no problem to get affiliate reward", async function () {
    const [owner] = await ethers.getSigners();
    await affiliate.payoff(owner.address);

    // const result = await affiliate.payoff(owner.address);
    // const result = await affiliate.payoff(owner.address);
  });
});
