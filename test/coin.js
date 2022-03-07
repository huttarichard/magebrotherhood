const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

function coinAmount(amount) {
  return BigNumber.from("1000000000000000000").mul(amount);
}

describe("Coin contract", function () {
  let coin, deadline;

  this.beforeEach(async () => {
    const Coin = await ethers.getContractFactory("Coin");
    coin = await Coin.deploy(100);
    await coin.deployed();
    deadline = parseInt(Date.now() / 1000 + 60);
  });

  it("should mint correct supply at deploy", async function () {
    await expect(coin.balanceOf(coin.address)).to.be.eq(coinAmount(100));
    await expect(coin.totalSupply()).to.be.eq(coinAmount(100));
  });

  it("should swap correcty token for eth", async function () {
    const [owner] = await ethers.getSigners();
    const value = ethers.utils.parseEther("100");

    await expect(() => owner.sendTransaction({ to: coin.address, value })).to.changeEtherBalance(coin, value);

    let liqden = await coin.liqudityGuardDenominator();
    let liqgrd = await coin.liqudityGuard();

    let diff = liqden.sub(liqgrd);

    let price = await coin.getInputPrice(coinAmount(10), coinAmount(90), coinAmount(100));
    expect(price.div(BigNumber.from("10000000000000000")).toString()).to.be.eq(diff);

    // swap
    await coin.ethToTokenSwapInput(coinAmount(9), deadline, {
      value: ethers.utils.parseEther("10"),
    });

    // todo
  });
});
