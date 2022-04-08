import { id } from "@ethersproject/hash";
import type { BoughtEvent, DepositEvent, Exchange, ExchangeInterface, SoldEvent } from "artifacts/types/Exchange";
import { Exchange__factory } from "artifacts/types/factories/Exchange__factory";
import env from "lib/env";
import { formatBNToEtherFloatFixed as fmbn } from "lib/web3";

type EventKeys = keyof ExchangeInterface["events"];

type EventsMapping = {
  [key: string]: EventKeys;
};

const events: EventsMapping = {
  Deposit: "Deposit(address,uint256,uint256,uint256,uint256)",
  Bought: "Bought(address,address,uint256,uint256,uint256,uint256,uint256)",
  Sold: "Sold(address,address,uint256,uint256,uint256,uint256,uint256)",
};

export const FILTER_ALL = (exchange: Exchange) => {
  const topics = Object.keys(events).map((key) => id(events[key]));
  return {
    address: exchange.address,
    topics: [topics],
  };
};

interface PriceData {
  date: Date;
  timestamp: number;
  bhc: number;
  eth: number;
  volume: number;
  priceOfBHC: number;
}

export interface Candle {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

function compareTimestamp(a: PriceData, b: PriceData) {
  if (a.timestamp < b.timestamp) {
    return -1;
  }
  if (a.timestamp > b.timestamp) {
    return 1;
  }
  return 0;
}

export async function getCandlesWithInfura(): Promise<Candle[]> {
  const { InfuraProvider } = await import("@ethersproject/providers");

  const ethProvider = new InfuraProvider(env.NETWORK, env.INFURA_KEY);
  const exchange = Exchange__factory.connect(env.EXCHANGE_ADDRESS, ethProvider);

  const data = await getCandles(exchange);
  return data;
}

export async function getCandles(exchange: Exchange) {
  const data = await exchange.queryFilter<BoughtEvent | SoldEvent | DepositEvent>(FILTER_ALL(exchange));

  const groups: { [key: string]: PriceData[] } = {};

  data.forEach((e) => {
    const event = exchange.interface.parseLog({
      topics: e.topics,
      data: e.data,
    });

    const timestamp = event.args.timestamp.toNumber();
    const date = new Date(event.args.timestamp.toNumber() * 1000);
    const { tokenReserve, ethReserve, ethSold, ethBought, ethAdded } = event.args;

    const volume = fmbn(ethSold || 0) + fmbn(ethBought || 0) + fmbn(ethAdded || 0);

    // Follwing statement take Iso string and picks up first
    // 13 characters for hash map, allows to group by hour.
    // "2022-04-07T20:09:46.000Z".slice(0,13) => 2022-04-07T20
    const hourly = date.toISOString().slice(0, 13);

    if (!groups[hourly]) {
      groups[hourly] = [];
    }

    const bhc = fmbn(tokenReserve);
    const eth = fmbn(ethReserve);
    console.log(eth / bhc);
    let priceOfBHC = parseFloat((eth / bhc).toFixed(12));

    if (priceOfBHC === Infinity) {
      priceOfBHC = 0;
    }

    groups[hourly].push({
      date: date,
      timestamp: timestamp,
      bhc,
      eth,
      volume,
      priceOfBHC,
    });

    groups[hourly].sort(compareTimestamp);
  });

  return Object.keys(groups)
    .map((key) => {
      const group = groups[key];

      if (group.length === 0) {
        return null;
      }

      const prices = group.map((item) => item.priceOfBHC);
      const date = new Date(key + ":00:00.000Z");

      const values = {
        time: Math.ceil(date.getTime() / 1000),
        open: group[0].priceOfBHC,
        close: group[group.length - 1].priceOfBHC,
        high: Math.max(...prices),
        low: Math.min(...prices),
        volume: group.reduce((c, item) => c + item.volume, 0),
      };

      return values;
    })
    .filter((item) => item !== null) as Candle[];
}
