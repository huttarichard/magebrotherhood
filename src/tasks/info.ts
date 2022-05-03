import "@nomiclabs/hardhat-ethers";

import Table from "cli-table";
import { task } from "hardhat/config";

import { Coin } from "../artifacts/types/Coin";
import { Exchange } from "../artifacts/types/Exchange";
import { formatBNToEtherFloatFixed } from "../lib/bn";

task("info", "Prints info about current state of the contracts, must have .env settup").setAction(
  async (taskargs, hre) => {
    const [owner] = await hre.ethers.getSigners();
    await hre.run("compile");
    console.info("\n");

    console.info("Network: ", hre.network.name);

    const table = new Table({
      head: ["Stats", "Value"],
    });

    // const STAKING_ADDRESS = process.env.STAKING_ADDRESS as string;
    // const PROMOTER_ADDRESS = process.env.PROMOTER_ADDRESS as string;
    // const PLAYABLES_ADDRESS = process.env.PLAYABLES_ADDRESS as string;

    const COIN_ADDRESS = process.env.COIN_ADDRESS as string;
    console.info("Coin address:", COIN_ADDRESS);

    const coinBytecode = await owner.provider?.getCode(COIN_ADDRESS);
    if (coinBytecode === "0x") {
      console.error("Coin contract not deployed, check --network parameter");
      process.exit(1);
    }

    const Coin = await hre.ethers.getContractFactory("Coin");
    const coin = Coin.attach(COIN_ADDRESS).connect(owner) as Coin;

    const EXCHANGE_ADDRESS = process.env.EXCHANGE_ADDRESS as string;
    console.info("Exchange address:", EXCHANGE_ADDRESS);

    const exchangeBytecode = await owner.provider?.getCode(EXCHANGE_ADDRESS);
    if (exchangeBytecode === "0x") {
      console.error("Exchange contract not deployed, check --network parameter");
      process.exit(1);
    }

    const Exchange = await hre.ethers.getContractFactory("Exchange");
    const exchange = Exchange.attach(EXCHANGE_ADDRESS).connect(owner) as Exchange;

    // BHC Liquidity
    const bhcLiquidity = await coin.balanceOf(coin.address);
    const bhcLiquidityNumber = formatBNToEtherFloatFixed(bhcLiquidity);
    table.push(["BHC Liquidity", bhcLiquidityNumber]);

    // ETH Liquidity
    const ethLiquidity = await owner.provider?.getBalance(exchange.address);
    const ethLiquidityNumber = formatBNToEtherFloatFixed(ethLiquidity);
    table.push(["ETH Exchange Liquidity", ethLiquidityNumber]);

    table.push(["Liquidity Ratio", (ethLiquidityNumber / bhcLiquidityNumber).toFixed(18)]);

    console.info(table.toString());
  }
);
