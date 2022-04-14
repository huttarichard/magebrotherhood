import { InfuraProvider } from "@ethersproject/providers";
import env from "lib/env";

const INFURA_KEY = env.INFURA_KEY;
const NETWORK = env.NETWORK;

export function getInfuraProviderFromEnv() {
  const ethProvider = new InfuraProvider(NETWORK, INFURA_KEY);
  return ethProvider;
}
