/// <reference types="@nomiclabs/hardhat-waffle" />

import { expect } from "chai";
import { ethers } from "hardhat";

import { Coin, Coin__factory as CoinFactory } from "../src/artifacts/types";

describe("Coin contract", function () {
  let coin: Coin;

  this.beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(100);
    await coin.deployed();

    // const value = ethers.utils.parseEther("101");
    // await owner.sendTransaction({ to: coin.address, value });
  });

  it("should mint correct supply at deploy", async function () {
    expect(await coin.balanceOf(coin.address)).to.be.eq(100);
    expect(await coin.provider.getBalance(coin.address)).to.be.eq(0);
  });

  it("should not accept ETH transfer to coin address", async function () {
    const [wallet] = await ethers.getSigners();
    const value = ethers.utils.parseEther("1");
    await expect(wallet.sendTransaction({ to: coin.address, value })).to.be.reverted;
  });

  it("should distribute tokens to specified address", async function () {
    const [wallet] = await ethers.getSigners();

    await coin.distribute(wallet.address, 1);
    expect(await coin.balanceOf(coin.address)).to.be.eq(99);
    expect(await coin.balanceOf(wallet.address)).to.be.eq(1);
  });

  it("should disable transfers when contract is paused", async function () {
    const [wallet] = await ethers.getSigners();

    await coin.pause();
    await expect(coin.distribute(wallet.address, 1)).to.be.reverted;
  });

  it("should enable transfers when contract is unpaused", async function () {
    const [wallet] = await ethers.getSigners();

    await coin.pause();
    await coin.unpause();
    await coin.distribute(wallet.address, 1);
    expect(await coin.balanceOf(coin.address)).to.be.eq(99);
    expect(await coin.balanceOf(wallet.address)).to.be.eq(1);
  });

  it("should burn tokens at specified address", async function () {
    const [wallet] = await ethers.getSigners();

    await coin.distribute(wallet.address, 1);
    expect(await coin.balanceOf(coin.address)).to.be.eq(99);
    expect(await coin.balanceOf(wallet.address)).to.be.eq(1);

    await coin.burn(wallet.address, 1);
    expect(await coin.balanceOf(coin.address)).to.be.eq(99);
    expect(await coin.balanceOf(wallet.address)).to.be.eq(0);
  });

  it("should burn tokens at contract's address", async function () {
    await coin.burn(coin.address, 1);
    expect(await coin.balanceOf(coin.address)).to.be.eq(99);
  });
});
