const contracts = JSON.parse(process.env.CONTRACTS || "{}");

export interface DeployedContract {
  address: string;
  args: any[];
}

export interface DeployArguments {
  Coin?: DeployedContract;
  Exchange?: DeployedContract;
  Promoter?: DeployedContract;
  Playables?: DeployedContract;
  Staking?: DeployedContract;
}

const envconfig = {
  // Network
  NETWORK: parseInt(process.env.NETWORK || "1") || 1,

  // Infura
  INFURA_KEY: process.env.INFURA_KEY || "",
  INFURA_IPFS_NODE: process.env.INFURA_IPFS_NODE || "",
  INFURA_IPFS_GATEWAY: process.env.INFURA_IPFS_GATEWAY || "",
  INFURA_IPFS_PUBLIC_KEY: process.env.INFURA_IPFS_PUBLIC_KEY || "",
  INFURA_IPFS_SECRET_KEY: process.env.INFURA_IPFS_SECRET_KEY || "",

  // Contracts
  COIN_ADDRESS: contracts.COIN || "",
  STAKING_ADDRESS: contracts.STAKING || "",
  PLAYABLES_ADDRESS: contracts.PLAYABLES || "",
  PROMOTER_ADDRESS: contracts.PROMOTER || "",
  EXCHANGE_ADDRESS: contracts.EXCHANGE || "",

  DEPLOY_ARGS: JSON.parse(Buffer.from(process.env.DEPLOY_ARGS || "", "base64").toString() || "{}") as DeployArguments,

  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY || "",
  MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER || "",
  MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID || "",
};

export default envconfig;
