/// <reference types="@nomiclabs/hardhat-waffle" />

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ContractTransaction } from "@ethersproject/contracts";
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

const secs = Math.floor(Date.now() / 1000);

export const defaultToken = {
  uri: "https://example.com/token.png",
  createdAt: secs,
  launchedAt: secs,
  supply: 1000,
  minted: 0,
  weight: 100,
  price: parseUnits("0.02", "ether"),
  revealed: true,
};

export const addToken = async (
  playables: Playables,
  uri: string = defaultToken.uri,
  supply: BigNumberish = defaultToken.supply,
  minted: BigNumberish = defaultToken.minted,
  weight: BigNumberish = defaultToken.weight,
  price: BigNumberish = defaultToken.price,
  launchedAt: BigNumberish = defaultToken.launchedAt
): Promise<ContractTransaction> => {
  const token: Playables.TokenStruct = {
    uri,
    createdAt: 0,
    launchedAt,
    supply,
    minted,
    weight,
    price,
    revealed: true,
  };
  return playables.addToken(token);
};

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

    await addToken(playables);
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
    const t = defaultToken;

    await addToken(playables, t.uri, t.supply, t.minted, t.weight, t.price);

    expect((await playables.tokens(tokenId)).uri).to.equal(t.uri);
    expect((await playables.tokens(tokenId)).createdAt).to.equal((await ethers.provider.getBlock("latest")).timestamp);
    expect((await playables.tokens(tokenId)).launchedAt).to.equal(t.launchedAt);
    expect((await playables.tokens(tokenId)).minted).to.equal(t.minted);
    expect((await playables.tokens(tokenId)).weight).to.equal(t.weight);
    expect((await playables.tokens(tokenId)).price).to.equal(t.price);
    // expect((await playables.tokens(tokenId)).royalty).to.equal(t.royalty);
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
    const tokenId = 2;
    const t = {
      ...defaultToken,
      launchedAt: (await ethers.provider.getBlock("latest")).timestamp + 10000,
    };

    await addToken(playables, t.uri, t.supply, t.minted, t.weight, t.price, t.launchedAt);

    const [wallet] = await ethers.getSigners();
    const params: Playables.MintParamsStruct = {
      tokenId: tokenId,
      amount: 1,
      promoCode: "",
    };
    await expect(
      playables.connect(wallet).mint(params, {
        from: wallet.address,
        value: t.price,
      })
    ).to.be.reverted;
    expect((await playables.tokens(tokenId)).minted).to.equal(0);
  });

  it("should be unable to mint token without remaining supply", async function () {
    let tokenId = 2;
    const t = {
      ...defaultToken,
      supply: 1000,
      minted: 1000,
    };

    await addToken(playables, t.uri, t.supply, t.minted, t.weight, t.price, t.launchedAt);

    const [wallet] = await ethers.getSigners();
    const params: Playables.MintParamsStruct = {
      tokenId: tokenId,
      amount: 1,
      promoCode: "",
    };
    await expect(
      playables.connect(wallet).mint(params, {
        from: wallet.address,
        value: t.price,
      })
    ).to.be.reverted;
    expect((await playables.tokens(tokenId)).minted).to.equal(1000);

    // ---

    tokenId = 3;
    await addToken(playables, t.uri, t.supply, 999, t.weight, t.price, t.launchedAt);

    params.amount = 2;
    params.tokenId = 3;

    await expect(
      playables.connect(wallet).mint(params, {
        from: wallet.address,
        value: BigNumber.from(t.price).mul(2),
      })
    ).to.be.reverted;
    expect((await playables.tokens(tokenId)).minted).to.equal(999);
  });

  it("should be able to add multiple tokens", async function () {
    const tokens = await playables.getTokens();
    expect(tokens.length).to.equal(1);

    let count = await playables.tokensCount();
    expect(count).to.equal(1);

    await playables.addTokens([
      {
        ...defaultToken,
        uri: "ipfs://../2.json",
        revealed: true,
      },
      {
        ...defaultToken,
        uri: "ipfs://../3.json",
        revealed: true,
      },
    ]);

    count = await playables.tokensCount();
    expect(count).to.equal(3);

    const tokens2 = await playables.getTokens();
    expect(tokens2.length).to.equal(3);

    console.log(tokens2);
  });

  it("should be unable to mint when paused", async function () {
    await playables.pause();
    const [wallet] = await ethers.getSigners();
    const params: Playables.MintParamsStruct = {
      tokenId: 1,
      amount: 1,
      promoCode: "",
    };
    await expect(
      playables.connect(wallet).mint(params, {
        from: wallet.address,
        value: defaultToken.price,
      })
    ).to.be.reverted;
    expect((await playables.tokens(params.tokenId)).minted).to.equal(0);
  });

  it("should receive royalty", async function () {
    this.skip();
  });
});
