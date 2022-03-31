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
} from "../src/artifacts/types";

describe("Playables contract", function () {
  let coin: Coin;
  let affiliate: Affiliate;
  let playables: Playables;

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
  });

  it("it should be no problem to mint playable", async function () {
    console.log(playables);
    // const [owner] = await ethers.getSigners();
    // await playables.mint({ amount: 1, discount: "", payWithCoin: false, tokenId: 0 });
    // const result = await affiliate.payoff(owner.address);
    // const result = await affiliate.payoff(owner.address);
    // console.log(result);
  });
});
