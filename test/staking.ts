/// <reference types="@nomiclabs/hardhat-waffle" />

import { BigNumber } from "@ethersproject/bignumber";
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

describe("Staking contract", function () {
  let coin: Coin;
  let promoter: Promoter;
  let playables: Playables;
  let staking: Staking;

  this.beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(BigNumber.from("1000").pow(18));
    await coin.deployed();

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address);

    const Playables = (await ethers.getContractFactory("Playables", owner)) as PlayablesFactory;
    playables = await Playables.deploy(coin.address, promoter.address, "");

    const Staking = (await ethers.getContractFactory("Staking", owner)) as StakingFactory;
    const now = Math.ceil(Date.now() / 1000);
    staking = await Staking.deploy(60, 2, now, coin.address);

    await staking.addContract(playables.address);
  });
});
