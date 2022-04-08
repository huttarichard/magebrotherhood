import { useEffect, useState } from "react";

import { useCoinETHPrice } from "./useContract";
import { Web3 } from "./useWeb3";

interface QueryParams {
  [key: string]: string | string[];
}

export function useMarketData<T = any>(query: string, params: QueryParams, pool = 10000): T | null {
  const [state, setState] = useState<T | null>(null);

  const update = async () => {
    const px = new URLSearchParams();
    Object.keys(params).forEach((key) => px.append(key, params[key] as string));
    px.append("query", query);

    const { data, success, error } = await fetch(`/api/market?${px}`).then((res) => res.json());

    if (!success) {
      console.error(error);
      return;
    }
    if (JSON.stringify(data) === JSON.stringify(state)) {
      return;
    }
    setState(data);
  };

  useEffect(() => {
    const interval = setInterval(update, pool);
    update();

    return () => clearInterval(interval);
  }, [query, params]);

  return state;
}

export function useCoinUSDPrice(coin: string): number | null {
  const response = useMarketData<any>("quote", {
    from: coin.toUpperCase(),
    to: "USD",
  });

  if (response === null) {
    return null;
  }

  return response.quote;
}

export function useBHCUSDPrice(web3: Web3) {
  const eth = useCoinUSDPrice("eth");
  const ctr = useCoinETHPrice(web3);
  const [state, setState] = useState<number | null>(null);

  useEffect(() => {
    if (!ctr || !eth) return;
    setState(ctr * eth);
  }, [ctr, eth]);

  return state;
}
