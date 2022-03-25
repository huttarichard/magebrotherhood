import { expect } from "chai";
import { ethers } from "hardhat";

import { Coin, Coin__factory as CoinFactory } from "../src/artifacts/types";

describe("Coin contract", function () {
  let coin: Coin;

  this.beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(1);
    await coin.deployed();
  });

  it("should mint correct supply at deploy", async function () {
    expect(await coin.balanceOf(coin.address)).to.be.eq(ethers.utils.parseEther("1"));
    expect(await coin.balanceOf(coin.address)).to.be.eq(ethers.utils.parseEther("1"));
  });

  it("should be able to receive eth", async function () {
    const [owner] = await ethers.getSigners();
    const value = ethers.utils.parseEther("1");

    await expect(() => owner.sendTransaction({ to: coin.address, value })).to.changeEtherBalance(coin, value);
  });
});
