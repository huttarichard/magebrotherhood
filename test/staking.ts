/// <reference types="@nomiclabs/hardhat-waffle" />

import { ethers } from "hardhat";

import {
  Coin,
  Coin__factory as CoinFactory,
  Playables,
  Playables__factory as PlayablesFactory,
  Promoter,
  Promoter__factory as PromoterFactory,
  Staking,
  Staking__factory as StakingFactory,
} from "../src/artifacts/types";

describe("Playables contract", function () {
  let coin: Coin;
  let promoter: Promoter;
  let playables: Playables;
  let staking: Staking;

  this.beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(100);
    await coin.deployed();

    const value = ethers.utils.parseEther("100");
    await owner.sendTransaction({ to: coin.address, value });

    // await coin.setLiqudityGuard(BigNumber.from(0), BigNumber.from(1));
    // await coin.setTaxFee(BigNumber.from(0), BigNumber.from(1));

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address);

    await promoter.grantRole(await promoter.MANAGER(), owner.address);
    // await promoter.allowRewarding(owner.address, 100);

    const Playables = (await ethers.getContractFactory("Playables", owner)) as PlayablesFactory;
    playables = await Playables.deploy(coin.address, promoter.address, "");

    const Staking = (await ethers.getContractFactory("Staking", owner)) as StakingFactory;
    staking = await Staking.deploy(100, 100, coin.address);

    await staking.addContract(playables.address);
  });

  it("it should be no problem to stake", async function () {
    // const [owner] = await ethers.getSigners();
    // await playables.mint({ amount: 1, discount: "", payWithCoin: false, tokenId: 0 });
    // const result = await affiliate.payoff(owner.address);
    // const result = await affiliate.payoff(owner.address);
  });
});
