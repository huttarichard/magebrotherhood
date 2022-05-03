import "@nomiclabs/hardhat-ethers";

import { task, types } from "hardhat/config";

interface DeployedContract {
  address: string;
  args: any[];
}
interface DeployArguments {
  Coin?: DeployedContract;
  Exchange?: DeployedContract;
  Promoter?: DeployedContract;
  Playables?: DeployedContract;
  Staking?: DeployedContract;
}

task("etherscan", "Verifies all contract with ethersca, keep in mind you have to have .env settup")
  .setAction(async (taskargs, hre) => {
    const DEPLOY_ARGS = process.env.DEPLOY_ARGS as string;
    const args: DeployArguments = JSON.parse(Buffer.from(DEPLOY_ARGS, "base64").toString());

    interface Contract extends DeployedContract {
      name: string;
    }

    const contracts: Contract[] =
      taskargs.contracts === "all"
        ? Object.keys(args).map((e) => {
            // @ts-ignore
            return { name: e, ...args[e] };
          })
        : taskargs.contracts.split(",").map((c: string) => {
            // @ts-ignore
            const contract = args[c];
            if (!contract) {
              throw new Error(`Contract ${c} not found`);
            }
            return { name: c, ...contract };
          });

    for (const key in contracts) {
      try {
        console.info("\n Contract verification: ", contracts[key].name);

        await hre.run("verify", {
          constructorArgsParams: contracts[key].args.map((e) => e.toString()),
          address: contracts[key].address,
          contractName: contracts[key].name,
        });
      } catch (e) {
        if ((e as Error).message.includes("403 - Forbidden")) {
          // Or rather 403 because etherscan is peice of....
          console.error(
            `${contracts[key].name}:`,
            "403 error, trying again later, this might be due etherscan rate limiting"
          );
          continue;
        }
        console.error(e);
      }
    }
  })
  .addOptionalParam("contracts", "contract you want to verify", "all", types.string);
