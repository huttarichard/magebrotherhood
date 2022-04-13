import { BigNumber } from "@ethersproject/bignumber";
import type { IPFSHTTPClient } from "ipfs-http-client";
import all from "it-all";
import { formatBNToEtherFloatFixed } from "lib/bn";
import { fetchMarketPricesWithCoinbase } from "lib/server/market";
import { concat } from "uint8arrays";

import { Playables, Staking as StakingContract } from "../web3/contracts";

export class NonExistingToken extends Error {}

export interface Token {
  id: string;
  createdAt: Date;
  launchedAt: Date;
  supply: number;
  minted: number;
  weight: number;
  price: number;
  royalty: string;
  ipfsURI: string;
}

export async function fetchToken(playables: Playables, id: string | number | BigNumber): Promise<Token> {
  const token = await playables.tokens(id);

  if (token.createdAt.eq(0)) {
    throw new NonExistingToken(`Token ${id} does not exist`);
  }

  return {
    id: BigNumber.from(id).toString(),
    createdAt: new Date(token.createdAt.toNumber() * 1000),
    launchedAt: new Date(token.launchedAt.toNumber() * 1000),
    supply: token.supply.toNumber(),
    minted: token.minted.toNumber(),
    weight: token.weight.toNumber(),
    price: formatBNToEtherFloatFixed(token.price),
    royalty: token.royalty,
    ipfsURI: token.uri,
  };
}

export interface Attribute {
  trait_type: string;
  value: number;
}

export interface Metadata {
  description: string;
  usdz: string;
  external_url: string;
  image: string;
  name: string;
  animation_url: string;
  attributes: Attribute[];
}

export async function fetchTokenMetadata(ipfs: IPFSHTTPClient, uri: string): Promise<Metadata> {
  const data = await all(ipfs.cat(uri.replace("ipfs://", "")));
  const buffer = Buffer.from(concat(data));
  const json = JSON.parse(buffer.toString());
  return json;
}

export async function fetchTokensMetadata(ipfs: IPFSHTTPClient, uris: string[]): Promise<Metadata[]> {
  return Promise.all(uris.map((e) => fetchTokenMetadata(ipfs, e)));
}

export async function fetchTokens(playables: Playables) {
  const tokens: Token[] = [];

  for (let i = 1; i <= 100; i++) {
    try {
      const json = await fetchToken(playables, i);
      tokens.push(json);
    } catch (e) {
      if (e instanceof NonExistingToken) {
        break;
      }
      throw e;
    }
  }
  return tokens;
}

export interface Staking {
  staking: number;
  stakingDepositCycle: number;
  stakingWithdrawCycle: number;
}

export async function getTokenStakingInfo(
  staking: StakingContract,
  contract: string,
  owner: string,
  id: string | number | BigNumber
) {
  const info = await staking.getTokenInfo(contract, owner, id);
  return {
    staking: info.amount.toNumber(),
    stakingWithdrawCycle: info.withdrawCycle,
    stakingDepositCycle: info.depositCycle,
  };
}

export async function getTokensStakingInfo(
  staking: StakingContract,
  contract: string,
  owner: string,
  ids: (string | number | BigNumber)[]
) {
  return Promise.all(
    ids.map(async (id) => {
      return getTokenStakingInfo(staking, contract, owner, id);
    })
  );
}

export interface Balance {
  balance: number;
}

export async function getTokenBalance(playables: Playables, owner: string, id: string | number | BigNumber) {
  const info = await playables.balanceOf(owner, id);
  return {
    balance: info.toNumber(),
  };
}

export async function getTokensBalance(playables: Playables, owner: string, ids: (string | number | BigNumber)[]) {
  return Promise.all(
    ids.map(async (id) => {
      return getTokenBalance(playables, owner, id);
    })
  );
}

export interface Pricing {
  priceUSD: number;
}

export async function getTokenPrice(t: Token, currency = "usd") {
  const price = await fetchMarketPricesWithCoinbase("eth", currency);
  return {
    priceUSD: t.price * price,
  };
}

export async function getTokensPrice(t: Token[], currency = "usd") {
  const price = await fetchMarketPricesWithCoinbase("eth", currency);
  return t.map((e) => ({ priceUSD: e.price * price }));
}

export type FullToken = Token & Partial<Staking> & Partial<Balance> & Partial<Metadata> & Partial<Pricing>;
