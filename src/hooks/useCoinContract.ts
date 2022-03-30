import { formatUnits } from "@ethersproject/units";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { ICoin } from "artifacts/types";
import { Name } from "lib/web3/contracts";
import { useEffect, useState } from "react";

import useContract from "./useContract";
import { Web3 } from "./useWeb3";

export default function useCoinContract(ethers: Web3) {
  return useContract<ICoin>(Name.Coin, ethers);
}

export function useCoinETHPrice(coin: ICoin | null) {
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    if (!coin) return;
    Promise.all([coin.balanceOf(coin.address), coin.provider.getBalance(coin.address)]).then(([cv, eb]) => {
      const bhc = parseFloat(formatUnits(cv, "ether"));
      const eth = parseFloat(formatUnits(eb, "ether"));
      setPrice(eth / bhc);
    });
  }, [coin]);

  return price;
}

export function useCoinUSDPrice(coin: ICoin | null) {
  const price = useCoinETHPrice(coin);
  const etherPrice = useCoingeckoPrice("ethereum", "usd");
  const ethbn = parseFloat(etherPrice || "0");
  return ethbn * price;
}
