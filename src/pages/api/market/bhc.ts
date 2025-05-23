import { formatBNToEtherFloatFixed } from "lib/bn";
import env from "lib/env";
import { fetchMarketPricesWithCoinbase } from "lib/server/market";
import { Coin, connectFromEnv, Contract } from "lib/web3/contracts";
import { getInfuraProviderFromEnv } from "lib/web3/providers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const price = await fetchMarketPricesWithCoinbase("eth", "usd");

  const provider = getInfuraProviderFromEnv();
  const coin = (await connectFromEnv(provider, Contract.Coin)) as Coin;

  const [b, e] = await Promise.all([coin.balanceOf(env.EXCHANGE_ADDRESS), provider.getBalance(env.EXCHANGE_ADDRESS)]);

  const bhc = formatBNToEtherFloatFixed(b);
  const eth = formatBNToEtherFloatFixed(e);

  const priceInETH = eth / bhc;

  return res.json({
    priceETH: priceInETH,
    priceUSD: priceInETH * price,
    bhcReserves: b,
    ethReserves: e,
  });
}
