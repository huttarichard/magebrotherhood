import Affiliate from "artifacts/contracts/Affiliate.sol/Affiliate.json";
import Coin from "artifacts/contracts/Coin.sol/Coin.json";
import Playables from "artifacts/contracts/Playables.sol/Playables.json";
import Vault from "artifacts/contracts/Vault.sol/Vault.json";
import { NextApiRequest, NextApiResponse } from "next";

const ABIs: { [name: string]: any } = {
  coin: {
    abi: Coin.abi,
    address: process.env.COIN_CONTRACT,
  },
  affiliate: {
    abi: Affiliate.abi,
    address: process.env.AFFILIATE_CONTRACT,
  },
  vault: {
    abi: Vault.abi,
    address: process.env.VAULT_CONTRACT,
  },
  playables: {
    abi: Playables.abi,
    address: process.env.PLAYABLES_CONTRACT,
  },
  none: false,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const contract = ABIs[req.query.id as string];
  if (!contract) {
    res.status(404).json({
      error: "nonexisting abi",
    });
    return;
  }
  res.status(200).json(contract);
}
