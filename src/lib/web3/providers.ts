import { InfuraProvider } from "@ethersproject/providers";
import env from "lib/env";

if (!env.NETWORK) {
  throw new Error("process.env.NETWORK is not defined");
}

export function infura() {
  if (!env.INFURA_KEY) {
    throw new Error("process.env.INFURA_KEY is not defined");
  }
  return new InfuraProvider(env.NETWORK, env.INFURA_KEY);
}
