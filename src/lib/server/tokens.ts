import { BigNumber } from "@ethersproject/bignumber";
import type { IPFSHTTPClient } from "ipfs-http-client";
import all from "it-all";
import { formatBNToEtherFloat } from "lib/bn";
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
  priceETH: number;
  priceWei: BigNumber;
  ipfsUri: string;
  revealed: boolean;
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
    priceETH: formatBNToEtherFloat(token.price),
    priceWei: token.price,
    ipfsUri: token.uri,
    revealed: token.revealed,
  };
}

export interface OpenseaMetadataAttribute {
  trait_type: string;
  value: string;
}

export interface OpenseaMetadata {
  id: string;
  name: string;
  description: string;
  external_url: string;
  image: string;
  animation_url: string;
  models: {
    glb: string;
    usdz: string;
  };
  attributes: OpenseaMetadataAttribute;
}

export interface MetadataAttribute {
  traitType: string;
  value: number;
}

export interface Metadata {
  name: string;
  description: string;
  externalUrl: string;
  image: string;
  animationUrl: string;
  models: {
    glb: string;
    usdz: string;
  };
  attributes: MetadataAttribute[];
}

export async function fetchTokenMetadata(ipfs: IPFSHTTPClient, uri: string): Promise<Metadata> {
  const data = await all(ipfs.cat(uri.replace("ipfs://", "")));
  const buffer = Buffer.from(concat(data));
  const json = JSON.parse(buffer.toString());

  const attrs = json.attributes || [];
  const attrsMapped = attrs.map((p: OpenseaMetadataAttribute) => ({
    traitType: p.trait_type,
    value: p.value,
  }));

  return {
    name: json.name,
    description: json.description,
    externalUrl: json.external_url,
    image: json.image,
    animationUrl: json.animation_url,
    models: json.models,
    attributes: attrsMapped,
    // weight: json.
  };
}

export async function fetchTokensMetadata(ipfs: IPFSHTTPClient, uris: string[]): Promise<Metadata[]> {
  return Promise.all(uris.map((e) => fetchTokenMetadata(ipfs, e)));
}

export async function fetchTokens(playables: Playables): Promise<Token[]> {
  const tokens = await playables.getTokens();
  return tokens.map((token, i) => {
    return {
      id: BigNumber.from(i + 1).toString(),
      createdAt: new Date(token.createdAt.toNumber() * 1000),
      launchedAt: new Date(token.launchedAt.toNumber() * 1000),
      supply: token.supply.toNumber(),
      minted: token.minted.toNumber(),
      weight: token.weight.toNumber(),
      priceETH: formatBNToEtherFloat(token.price),
      priceWei: token.price,
      ipfsUri: token.uri,
      revealed: token.revealed,
    };
  });
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
    priceUSD: formatBNToEtherFloat(t.priceWei) * price,
  };
}

export async function getTokensPrice(t: Token[], currency = "usd") {
  const price = await fetchMarketPricesWithCoinbase("eth", currency);
  return t.map((e) => ({ priceUSD: formatBNToEtherFloat(e.priceWei) * price }));
}

export type FullToken = Token & Staking & Balance & Metadata & Pricing;
