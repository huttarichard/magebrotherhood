/// <reference types="@nomiclabs/hardhat-waffle" />

import { formatEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import {
  Coin,
  Coin__factory as CoinFactory,
  Exchange,
  Exchange__factory as ExchangeFactory,
  Playables,
  Playables__factory as PlayablesFactory,
  Promoter,
  Promoter__factory as PromoterFactory,
} from "../src/artifacts/types";

const ONE_UNIT = ethers.utils.parseEther("1");

describe("Exchange contract", async function () {
  let coin: Coin;
  let promoter: Promoter;
  let playables: Playables;
  let exchange: Exchange;
  let wallet: SignerWithAddress;

  let deadlineFuture;
  let deadlinePast;

  const reserveETH = ethers.utils.parseEther("10");
  const reserveCoin = ethers.utils.parseEther((1_000_000).toString());

  this.beforeEach(async () => {
    const [owner, testWallet] = await ethers.getSigners();
    wallet = testWallet;

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(reserveCoin);
    await coin.deployed();

    const Exchange = (await ethers.getContractFactory("Exchange", owner)) as ExchangeFactory;
    exchange = await Exchange.deploy(coin.address);

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address, exchange.address);

    await promoter.grantRole(await promoter.MANAGER(), owner.address);

    // send eth to the exchange contract
    await expect(() => owner.sendTransaction({ to: exchange.address, value: reserveETH })).to.changeEtherBalance(
      exchange,
      reserveETH
    );

    const Playables = (await ethers.getContractFactory("Playables", owner)) as PlayablesFactory;
    playables = await Playables.deploy(exchange.address, promoter.address, "");

    // roles
    await promoter.grantRole(await promoter.MANAGER(), owner.address);
    await coin.grantRole(await coin.DISTRIBUTOR(), exchange.address);

    // deadlines
    deadlineFuture = (await ethers.provider.getBlock("latest")).timestamp + 10000;
    deadlinePast = (await ethers.provider.getBlock("latest")).timestamp - 10000;
  });

  it("should return reserves balance", async () => {
    const [bhc, eth] = await exchange.reserves();
    expect(bhc).to.be.eq(reserveCoin);
    expect(eth).to.be.eq(reserveETH);
  });

  it("should swap eth to token", async function () {
    await expect(
      exchange.connect(wallet).ethToTokenSwap({
        value: ONE_UNIT,
      })
    ).to.not.be.reverted;

    const newBalance = await coin.balanceOf(wallet.address);

    expect(newBalance).to.be.gt(ONE_UNIT.mul(90000));

    //1 ETH swapped to 90661.089388014913158134 BHC
    // console.log(`1 ETH swapped to ${formatEther(newBalance)} BHC`);
  });

  it("should swap eth to token - ethToTokenSwapInput", async function () {
    await expect(
      exchange.connect(wallet).ethToTokenSwapInput(1000, deadlineFuture, {
        value: ONE_UNIT,
      })
    ).to.not.be.reverted;

    const newBalance = await coin.balanceOf(wallet.address);

    expect(newBalance).to.be.gt(ONE_UNIT.mul(90000));
  });

  it("should not swap eth to token, min coin amount is too high - ethToTokenSwapInput", async function () {
    await expect(
      exchange.connect(wallet).ethToTokenSwapInput(ONE_UNIT.mul(1_000_000), deadlineFuture, {
        value: ONE_UNIT,
      })
    ).to.be.reverted;
  });

  it("should not swap eth to token, missed deadline - ethToTokenSwapInput", async function () {
    await expect(
      exchange.connect(wallet).ethToTokenSwapInput(ONE_UNIT, deadlinePast, {
        value: ONE_UNIT,
      })
    ).to.be.reverted;
  });

  it("should swap eth to token - ethToTokenSwapOutput", async function () {
    const [receiver] = await ethers.getSigners();

    const startingEthBalance = parseFloat(formatEther(await wallet.getBalance()));
    const tokensToBuy = ONE_UNIT.mul(90000);
    await expect(
      exchange.connect(wallet).ethToTokenSwapOutput(tokensToBuy, deadlineFuture, {
        value: ONE_UNIT,
      })
    ).to.not.be.reverted;

    expect(await coin.balanceOf(wallet.address)).to.be.eq(tokensToBuy);

    const endingEthBalance = parseFloat(formatEther(await wallet.getBalance()));
    expect(startingEthBalance).to.be.gt(endingEthBalance);
    expect(startingEthBalance - endingEthBalance).to.be.lte(1);
  });

  it("should swap eth for min amount of token and send to address - ethToTokenTransferInput", async function () {
    const [receiver] = await ethers.getSigners();

    const minTokens = ONE_UNIT.mul(90000);
    await expect(
      exchange.connect(wallet).ethToTokenTransferInput(minTokens, deadlineFuture, receiver.address, {
        value: ONE_UNIT,
      })
    ).to.not.be.reverted;

    expect(await coin.balanceOf(wallet.address)).to.be.eq(0);
    expect(await coin.balanceOf(receiver.address)).to.be.gte(minTokens);
  });

  it("should swap eth for min amount of token and send to address, incorrect address - ethToTokenTransferInput", async function () {
    const minTokens = ONE_UNIT.mul(90000);
    await expect(
      exchange.connect(wallet).ethToTokenTransferInput(minTokens, deadlineFuture, exchange.address, {
        value: ONE_UNIT,
      })
    ).to.be.reverted;
  });

  it("should not swap eth for min amount of token and send to address, deadline passed - ethToTokenTransferInput", async function () {
    const [receiver] = await ethers.getSigners();

    const minTokens = ONE_UNIT.mul(90000);
    await expect(
      exchange.connect(wallet).ethToTokenTransferInput(minTokens, deadlinePast, receiver.address, {
        value: ONE_UNIT,
      })
    ).to.be.reverted;

    expect(await coin.balanceOf(wallet.address)).to.be.eq(0);
    expect(await coin.balanceOf(receiver.address)).to.be.eq(0);
  });

  it("should swap eth for min amount of token and send to address - ethToTokenTransferOutput", async function () {
    const [receiver] = await ethers.getSigners();

    const tokensToBuy = ONE_UNIT.mul(90000);
    await expect(
      exchange.connect(wallet).ethToTokenTransferOutput(tokensToBuy, deadlineFuture, receiver.address, {
        value: ONE_UNIT,
      })
    ).to.not.be.reverted;

    expect(await coin.balanceOf(wallet.address)).to.be.eq(0);
    expect(await coin.balanceOf(receiver.address)).to.be.eq(tokensToBuy);
  });

  it("should convert tokens to eth", async function () {
    await exchange.connect(wallet).ethToTokenSwap({
      value: ONE_UNIT,
    });

    const balance = async () => coin.balanceOf(wallet.address);
    await expect(exchange.connect(wallet).tokenToEthSwap(await balance())).to.not.be.reverted;
    expect(await balance()).to.be.eq(0);
  });

  it("should convert tokens to eth - tokenToEthSwapInput", async function () {
    await exchange.connect(wallet).ethToTokenSwap({
      value: ONE_UNIT,
    });

    const balance = async () => coin.balanceOf(wallet.address);

    await expect(exchange.connect(wallet).tokenToEthSwapInput(await balance(), ONE_UNIT.div(10).mul(9), deadlineFuture))
      .to.not.be.reverted;
    expect(await balance()).to.be.eq(0);
  });

  it("should not convert tokens to eth, target eth amount too high - tokenToEthSwapInput", async function () {
    await exchange.connect(wallet).ethToTokenSwap({
      value: ONE_UNIT,
    });

    const balance = async () => coin.balanceOf(wallet.address);

    const startingBalance = await balance();
    expect(startingBalance).to.be.gt(0);
    await expect(exchange.connect(wallet).tokenToEthSwapInput(await balance(), ONE_UNIT, deadlineFuture)).to.be
      .reverted;
    expect(await balance()).to.be.eq(startingBalance);
  });

  it("should convert tokens to eth - tokenToEthSwapOutput", async function () {
    await exchange.connect(wallet).ethToTokenSwap({
      value: ONE_UNIT,
    });

    const balance = async () => coin.balanceOf(wallet.address);

    const startingWalletBalance = await wallet.getBalance();
    await expect(
      exchange.connect(wallet).tokenToEthSwapOutput(ONE_UNIT.div(10).mul(9), await balance(), deadlineFuture)
    ).to.not.be.reverted;
    expect(await balance()).to.be.gt(0);
    expect(await wallet.getBalance()).to.be.gt(startingWalletBalance);
  });

  it("should convert tokens to eth and send to address - tokenToEthTransferInput", async function () {
    const [receiver] = await ethers.getSigners();
    await exchange.connect(wallet).ethToTokenSwap({
      value: ONE_UNIT,
    });

    const balance = async () => coin.balanceOf(wallet.address);

    const startingWalletBalanceReceiver = await receiver.getBalance();
    await expect(
      exchange
        .connect(wallet)
        .tokenToEthTransferInput(await balance(), ONE_UNIT.div(10).mul(9), deadlineFuture, receiver.address)
    ).to.not.be.reverted;
    expect(await balance()).to.be.eq(0);
    expect(await receiver.getBalance()).to.be.gt(startingWalletBalanceReceiver);
    expect(await wallet.getBalance()).to.be.eq(await wallet.getBalance());
  });

  it("should convert tokens to eth and send to address - tokenToEthTransferOutput", async function () {
    const [receiver] = await ethers.getSigners();
    await exchange.connect(wallet).ethToTokenSwap({
      value: ONE_UNIT,
    });

    const balance = async () => coin.balanceOf(wallet.address);

    const startingWalletBalanceReceiver = await receiver.getBalance();
    await expect(
      exchange
        .connect(wallet)
        .tokenToEthTransferOutput(ONE_UNIT.div(10).mul(9), await balance(), deadlineFuture, receiver.address)
    ).to.not.be.reverted;
    expect(await balance()).to.be.gt(0);
    expect(await receiver.getBalance()).to.be.gt(startingWalletBalanceReceiver);
    expect(await wallet.getBalance()).to.be.eq(await wallet.getBalance());
  });

  it("should return eth to token price", async function () {
    const priceInput = await exchange.getEthToTokenInputPrice(ONE_UNIT);
    const priceOutput = await exchange.getEthToTokenOutputPrice(priceInput);
    expect(priceInput).to.be.gt(0);
    expect(priceOutput).to.be.eq(ONE_UNIT);
  });

  it("should return token to eth price", async function () {
    const priceInput = await exchange.getTokenToEthInputPrice(ONE_UNIT.mul(1000));
    const priceOutput = await exchange.getTokenToEthOutputPrice(priceInput);
    expect(priceInput).to.be.gt(0);
    expect(priceOutput).to.be.closeTo(ONE_UNIT.mul(1000), ONE_UNIT.div(1000)); //TODO: why is there small diff?
  });

  it("should return token to eth price with tax", async function () {
    const price = await exchange.getTokenToEthInputPrice(ONE_UNIT.mul(1000));
    const [priceWithoutTax, tax] = await exchange.getTokenToEthInputPriceWithTax(ONE_UNIT.mul(1000));
    expect(priceWithoutTax).to.be.lt(price);
  });

  it("should calculate tax correctly", async function () {
    const taxFee = 2;
    const taxDenominator = 100;
    await exchange.setTaxFee(taxFee, taxDenominator);
    const price = await exchange.getTokenToEthInputPrice(ONE_UNIT.mul(1000));
    const [priceWithoutTax, taxAmount] = await exchange.getTokenToEthInputPriceWithTax(ONE_UNIT.mul(1000));

    expect(priceWithoutTax.add(taxAmount)).to.be.eq(price);
    expect(taxAmount).to.be.eq(price.div(taxDenominator).mul(taxFee));
  });
});
