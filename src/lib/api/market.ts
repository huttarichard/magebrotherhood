import { BigNumber } from "@ethersproject/bignumber";

export interface MarketQuote {
  quote: number;
}

export async function fetchMarketQuote(from: string, to: string): Promise<MarketQuote> {
  const px = new URLSearchParams();
  px.append("from", from);
  px.append("to", to);

  const data = await fetch(`/api/market/quote?${px}`);
  const json = await data.json();

  return json;
}

fetchMarketQuote.route = "/api/market/quote";

export interface BHCQuote {
  priceETH: number;
  priceUSD: number;
  bhcReserves: BigNumber;
  ethReserves: BigNumber;
}

export async function fetchBHCQuote(): Promise<BHCQuote> {
  const data = await fetch("/api/market/bhc");
  const json = await data.json();
  return {
    ...json,
    bhcReserves: BigNumber.from(json.bhcReserves),
    ethReserves: BigNumber.from(json.ethReserves),
  };
}

fetchBHCQuote.route = "/api/market/quote";
