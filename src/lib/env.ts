const contracts = JSON.parse(process.env.NEXT_PUBLIC_CONTRACTS || "{}");

const envconfig = {
  // Network
  NETWORK: parseInt(process.env.NEXT_PUBLIC_NETWORK || "1") || 1,

  // Infura
  INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY || "",

  // Contracts
  COIN_ADDRESS: contracts.COIN || "",
  STAKING_ADDRESS: contracts.STAKING || "",
  PLAYABLES_ADDRESS: contracts.PLAYABLES || "",
  PROMOTER_ADDRESS: contracts.PROMOTER || "",
  EXCHANGE_ADDRESS: contracts.EXCHANGE || "",
};

if (typeof window !== "undefined") {
  (<any>window).envvars = envconfig;
}

export default envconfig;
