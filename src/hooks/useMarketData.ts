import { BHCQuote, fetchBHCQuote, fetchMarketQuote, MarketQuote } from "lib/api/market";
import useSWR from "swr";

export function useMarketQuote(from: string, to: string) {
  const data = useSWR<MarketQuote, any>([fetchMarketQuote.route, from, to], async (url, from, to) => {
    return fetchMarketQuote(from, to);
  });

  return data;
}

export function useCoinUSDPrice(coin: string): number | null {
  const response = useMarketQuote(coin, "usd");
  return response.data?.quote || 0;
}

export function useBHCQuote() {
  const data = useSWR<BHCQuote, any>([fetchBHCQuote.route], async () => {
    return fetchBHCQuote();
  });

  return data;
}

export function useBHCUSDPrice() {
  const response = useBHCQuote();
  return response.data?.priceUSD || 0;
}
