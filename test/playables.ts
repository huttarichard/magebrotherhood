/// <reference types="@nomiclabs/hardhat-waffle" />

import { parseUnits } from "@ethersproject/units";
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

describe("Playables contract", function () {
  let coin: Coin;
  let promoter: Promoter;
  let playables: Playables;
  let exchange: Exchange;

  this.beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const coinFactory = (await ethers.getContractFactory("Coin", owner)) as CoinFactory;
    coin = await coinFactory.deploy(100);
    await coin.deployed();

    const promoterFactory = (await ethers.getContractFactory("Promoter", owner)) as PromoterFactory;
    promoter = await promoterFactory.deploy(coin.address);

    await promoter.grantRole(await promoter.MANAGER(), owner.address);
    // await promoter.allowRewarding(owner.address, 100);

    const Exchange = (await ethers.getContractFactory("Exchange", owner)) as ExchangeFactory;
    exchange = await Exchange.deploy(coin.address);

    const Playables = (await ethers.getContractFactory("Playables", owner)) as PlayablesFactory;
    playables = await Playables.deploy(exchange.address, promoter.address, "");

    const token: Playables.TokenStruct = {
      uri: "https://example.com/token.png",
      createdAt: 0,
      launchedAt: 0,
      supply: 100,
      minted: 0,
      weight: 0,
      price: parseUnits("0.02", "ether"),
      royalty: owner.address,
    };
    await playables.setToken(1, token);
  });

  it("should start with 1 token at index 1", async function () {
    expect((await playables.tokens(0)).uri).to.be.empty;
    expect((await playables.tokens(1)).uri).to.not.be.empty;
    expect((await playables.tokens(2)).uri).to.be.empty;
  });

  it("should initiate promoters and coin addresses", async function () {
    expect(await playables.liqudityReceiver()).to.equal(exchange.address);
    expect(await playables.promoters()).to.equal(promoter.address);
  });

  it("should not allow receiving eth", async function () {
    const [owner] = await ethers.getSigners();
    const value = ethers.utils.parseEther("100");
    await expect(owner.sendTransaction({ to: playables.address, value })).to.be.reverted;
  });

  it("should add token correctly", async function () {
    const tokenId = 2;
    const token: Playables.TokenStruct = {
      uri: "https://example.com/token.png",
      createdAt: 0,
      launchedAt: 0,
      supply: 100,
      minted: 0,
      weight: 0,
      price: parseUnits("0.01", "ether"),
      royalty: ethers.Wallet.createRandom().address,
    };
    await playables.setToken(tokenId, token);
    expect((await playables.tokens(tokenId)).uri).to.equal(token.uri);
    expect((await playables.tokens(tokenId)).createdAt).to.equal((await ethers.provider.getBlock("latest")).timestamp);
    expect((await playables.tokens(tokenId)).launchedAt).to.equal(token.launchedAt);
    expect((await playables.tokens(tokenId)).minted).to.equal(token.minted);
    expect((await playables.tokens(tokenId)).weight).to.equal(token.weight);
    expect((await playables.tokens(tokenId)).price).to.equal(token.price);
    expect((await playables.tokens(tokenId)).royalty).to.equal(token.royalty);
  });

  it("should mint token", async function () {
    const [wallet] = await ethers.getSigners();
    const tokenId = 1;
    const price = ethers.utils.parseEther("0.02");
    const amount = 2;
    const params: Playables.MintParamsStruct = {
      tokenId: tokenId,
      amount: amount,
      promoCode: "",
    };
    await playables.connect(wallet).mint(params, {
      from: wallet.address,
      value: price.mul(amount),
    });
    expect((await playables.tokens(tokenId)).minted).to.equal(amount);
    //TODO:  wallet should have received the nft tokens
  });

  it("should be unable to mint unlaunched token", async function () {
    this.skip();
  });
  it("should be unable to mint token without remaining supply", async function () {
    this.skip();
  });
  it("should receive royalty", async function () {
    this.skip();
  });
  it("should be unable to mint when paused", async function () {
    this.skip();
  });
});
