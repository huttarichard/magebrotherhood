import "dotenv/config";

import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import express from "express";
import { open } from "lmdb";
import { resolve } from "path";

import ExchangeJSON from "../artifacts/contracts/Exchange.sol/Exchange.json";
import { Exchange } from "../artifacts/types/Exchange";

const EXCHANGE_CONTRACT = process.env.EXCHANGE_CONTRACT as string;
const DAY = 1000 * 60 * 60 * 24;

const app = express();

const provider = new JsonRpcProvider({
  url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_KEY,
  timeout: 5000,
});

const exchange = new Contract(EXCHANGE_CONTRACT, ExchangeJSON.abi, provider) as unknown as Exchange;

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
  const ouputPrice = await exchange.getEthToTokenOutputPrice(parseEther("1"));
  await database.put(Date.now(), ouputPrice);
};

setInterval(loop, 10 * 1000);
