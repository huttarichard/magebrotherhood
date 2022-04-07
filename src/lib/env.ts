const envconfig = {
  // Network
  NETWORK: parseInt(process.env.NEXT_PUBLIC_NETWORK || "1") || 1,

  // Infura
  INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY || "",

  // Contracts
  COIN_ADDRESS: process.env.NEXT_PUBLIC_COIN_ADDRESS || "",
  STAKING_ADDRESS: process.env.NEXT_PUBLIC_STAKING_ADDRESS || "",
  PLAYABLES_ADDRESS: process.env.NEXT_PUBLIC_PLAYABLES_ADDRESS || "",
  PROMOTER_ADDRESS: process.env.NEXT_PUBLIC_PROMOTER_ADDRESS || "",
  EXCHANGE_ADDRESS: process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS || "",

  // Coin market cap
  CMC_API_KEY: process.env.NEXT_PUBLIC_CMC_API_KEY || "",
};

if (typeof window !== "undefined") {
  (<any>window).envvars = envconfig;
}

export default envconfig;
