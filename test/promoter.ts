/// <reference types="@nomiclabs/hardhat-waffle" />

import { parseUnits } from "@ethersproject/units";
import { expect } from "chai";
import { ethers } from "hardhat";

import {
  Coin,
  Coin__factory as CoinFactory,
  Promoter,
  Promoter__factory as PromoterFactory,
} from "../src/artifacts/types";

describe("Promoter contract", function () {
  let coin: Coin;
  let promoter: Promoter;
  let promoterWallet;

  this.beforeEach(async () => {
    const [owner, wallet] = await ethers.getSigners();
    promoterWallet = wallet;

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(100);
    await coin.deployed();

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address);

    await promoter.grantRole(await promoter.MANAGER(), owner.address);
    await promoter.connect(promoterWallet).register("code", "John Doe");
  });

  it("coin contract should be correctly set", async function () {
    expect(await promoter.coin()).to.be.eq(coin.address);
  });

  it("should register new account", async function () {
    const [wallet] = await ethers.getSigners();

    await promoter.connect(wallet).register("newcode", "name");
    expect((await promoter.promoters(wallet.address))[0]).to.be.true;
    expect((await promoter.getAccountByCode("newcode"))[0]).to.be.true;
  });

  it("should add revenue to promoter", async function () {
    const [approvedContract] = await ethers.getSigners();
    await promoter.allowContract(approvedContract.address);

    expect((await promoter.promoters(promoterWallet.address)).revenue).to.be.eq(parseUnits("0", "ether"));
    await promoter.connect(approvedContract).addRevenue(promoterWallet.address, parseUnits("0.02", "ether"));
    expect((await promoter.promoters(promoterWallet.address)).revenue).to.be.eq(parseUnits("0.02", "ether"));
  });

  it("should add revenue to promoter by code", async function () {
    const [approvedContract] = await ethers.getSigners();
    await promoter.allowContract(approvedContract.address);

    expect((await promoter.promoters(promoterWallet.address)).revenue).to.be.eq(parseUnits("0", "ether"));
    await promoter.connect(approvedContract).addRevenueByCode("code", parseUnits("0.02", "ether"));
    expect((await promoter.promoters(promoterWallet.address)).revenue).to.be.eq(parseUnits("0.02", "ether"));
  });

  it("should release funds", async function () {
    this.skip();
  });
});
