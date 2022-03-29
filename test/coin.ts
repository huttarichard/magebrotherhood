/// <reference types="@nomiclabs/hardhat-waffle" />

import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseEther } from "@ethersproject/units";
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

    const value = ethers.utils.parseEther("100");
    await owner.sendTransaction({ to: coin.address, value });

    await coin.setLiqudityGuard(BigNumber.from(0), BigNumber.from(1));
    await coin.setTaxFee(BigNumber.from(0), BigNumber.from(1));
  });

  it("should mint correct supply at deploy", async function () {
    expect(await coin.balanceOf(coin.address)).to.be.eq(ethers.utils.parseEther("100"));
    expect(await coin.provider.getBalance(coin.address)).to.be.eq(ethers.utils.parseEther("1"));
  });

  it("should be able to do simple swap coins", async function () {
    const [owner] = await ethers.getSigners();
    const tx2 = await coin.setLiqudityGuard(BigNumber.from(0), BigNumber.from(1));
    await tx2.wait();

    const tx = await coin.connect(owner).ethToTokenSwap({
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    const balance = await coin.balanceOf(owner.address);

    const b1 = formatUnits(balance, "ether");
    // as 100 being the initial supply, and 101 balance after transaction
    const b2 = formatUnits(parseEther("100").div(101), "ether");

    expect(b1).to.be.eq(b2);
  });

  it("should be able to do simple swap coins with liquidity guard being 10", async function () {
    const [owner] = await ethers.getSigners();
    const tx2 = await coin.setLiqudityGuard(BigNumber.from(10), BigNumber.from(100));
    await tx2.wait();

    const tx = await coin.connect(owner).ethToTokenSwap({
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    const balance = await coin.balanceOf(owner.address);

    const b1 = formatUnits(balance, "wei");
    const b2 = BigNumber.from("891972249752229930"); // 0.891972249752229930 BHC

    expect(b1).to.be.eq(b2);
  });

  it("should be able to transfer and sell tokens", async function () {
    const [owner, address1] = await ethers.getSigners();

    const original1 = await ethers.provider.getBalance(address1.address);

    await coin.grantRole(await coin.SPENDER(), owner.address);

    const amount = ethers.utils.parseEther("1");

    const tx = await coin.connect(owner).transferFrom(coin.address, address1.address, amount);
    await tx.wait();

    const balance = await coin.balanceOf(address1.address);
    expect(balance).to.be.eq(amount);

    const tx2 = await coin.connect(address1).tokenToEthSwap(amount);
    await tx2.wait();

    const original1_x = await ethers.provider.getBalance(address1.address);

    expect(original1_x.sub(original1)).to.be.closeTo(amount, ethers.utils.parseEther("0.01"));
  });
});
