import { formatUnits } from "@ethersproject/units";
import { ICoin } from "artifacts/types";
import { Contract } from "lib/web3/contracts";
import { useEffect, useState } from "react";

import useContract from "./useContract";

export default function useCoinContract() {
  return useContract<ICoin>(Contract.Coin);
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
