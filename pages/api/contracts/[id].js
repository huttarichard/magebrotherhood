import Coin from "artifacts/contracts/Coin.sol/Coin.json";
import Affiliate from "artifacts/contracts/Affiliate.sol/Affiliate.json";
import Playables from "artifacts/contracts/Playables.sol/Playables.json";
import Vault from "artifacts/contracts/Vault.sol/Vault.json";

let ABIs = {
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
};

export default function handler(req, res) {
  let contract = ABIs[req.query.id];
  if (!contract) {
    res.status(404).json({
      error: "nonexisting abi",
    });
    return;
  }
  res.status(200).json(contract);
}
