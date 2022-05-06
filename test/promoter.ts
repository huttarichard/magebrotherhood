/// <reference types="@nomiclabs/hardhat-waffle" />

import { parseUnits } from "@ethersproject/units";
import { expect } from "chai";
import { ethers } from "hardhat";

import {
  Coin,
  Coin__factory as CoinFactory,
  Exchange,
  Exchange__factory as ExchangeFactory,
  Promoter,
  Promoter__factory as PromoterFactory,
} from "../src/artifacts/types";

describe("Promoter contract", function () {
  let coin: Coin;
  let exchange: Exchange;
  let promoter: Promoter;
  let promoterWallet;

  const reserveETH = ethers.utils.parseEther("10");
  const reserveCoin = ethers.utils.parseEther((1_000_000).toString());

  this.beforeEach(async () => {
    const [owner, wallet] = await ethers.getSigners();
    promoterWallet = wallet;

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(reserveCoin);
    await coin.deployed();

    const exchangeFactory = (await ethers.getContractFactory("Exchange", owner)) as ExchangeFactory;
    exchange = await exchangeFactory.deploy(coin.address);

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address, exchange.address);

    await coin.grantRole(await coin.DISTRIBUTOR(), promoter.address);
    await promoter.grantRole(await promoter.MANAGER(), owner.address);
    await promoter.connect(promoterWallet).register("code", "John Doe");

    // send eth to the exchange contract
    await expect(() => owner.sendTransaction({ to: exchange.address, value: reserveETH })).to.changeEtherBalance(
      exchange,
      reserveETH
    );
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
    const [approvedContract] = await ethers.getSigners();
    await promoter.allowContract(approvedContract.address);

    expect((await promoter.promoters(promoterWallet.address)).revenue).to.be.eq(parseUnits("0", "ether"));
    await promoter.connect(approvedContract).addRevenue(promoterWallet.address, parseUnits("0.02", "ether"));
    expect((await promoter.promoters(promoterWallet.address)).revenue).to.be.eq(parseUnits("0.02", "ether"));

    expect(await coin.balanceOf(promoterWallet.address)).to.be.eq(0);

    // should revert - for release he needs to wait 2 blocks
    await expect(promoter.release(promoterWallet.address)).to.be.reverted;
    expect(await coin.balanceOf(promoterWallet.address)).to.be.eq(0);

    // mine 2 blocks
    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);

    const expectedReward = await exchange.getEthToTokenInputPrice(parseUnits("0.02", "ether").div(100).mul(5));

    await expect(promoter.release(promoterWallet.address)).to.not.be.reverted;
    expect(await coin.balanceOf(promoterWallet.address)).to.be.eq(expectedReward);
  });
});
