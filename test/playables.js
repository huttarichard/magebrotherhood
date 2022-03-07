// const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Playables", function () {
  it("should return correct balance", async function () {
    const Coin = await ethers.getContractFactory("Coin");
    const coin = await Coin.deploy();
    await coin.deployed();
  });
});
