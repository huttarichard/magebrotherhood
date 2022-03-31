import "dotenv/config";

import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import express from "express";
import { open } from "lmdb";
import { resolve } from "path";

import CoinJSON from "../artifacts/contracts/Coin.sol/Coin.json";
import { Coin } from "../artifacts/types/Coin";
import { ChainId } from "../lib/web3/chains";
import { chains } from "../lib/web3/providers/infura";

const COIN_CONTRACT = process.env.COIN_CONTRACT as string;
const DAY = 1000 * 60 * 60 * 24;

const app = express();

const provider = new JsonRpcProvider({
  url: chains[ChainId.Rinkeby],
  timeout: 5000,
});

const coin = new Contract(COIN_CONTRACT, CoinJSON.abi, provider) as unknown as Coin;

const database = open({
  path: resolve(__dirname, "storage"),
  // any options go here, we can turn on compression like this:
  compression: true,
});

app.get("/", async (req, res) => {
  const data = await database.getRange({
    // start: Date.now() - DAY * 31,
    reverse: true,
    limit: DAY * 31,
  });
  res.json(data.asArray);
});

const loop = async () => {
  const ouputPrice = await coin.getEthToTokenOutputPrice(parseEther("1"));
  await database.put(Date.now(), ouputPrice);
};

setInterval(loop, 10 * 1000);
