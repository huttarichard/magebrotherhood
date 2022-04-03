const envconfig = {
  INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY || "",
  COIN_ADDRESS: process.env.NEXT_PUBLIC_COIN_ADDRESS || "",
  STAKING_ADDRESS: process.env.NEXT_PUBLIC_STAKING_ADDRESS || "",
  NETWORK: parseInt(process.env.NEXT_PUBLIC_NETWORK || "1") || 1,
  CMC_API_KEY: process.env.NEXT_PUBLIC_CMC_API_KEY || "",
};

export default envconfig;
