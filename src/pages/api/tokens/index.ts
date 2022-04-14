import { createClientFromEnv, replaceIPFSUrisWithGateway } from "lib/server/ipfs";
import {
  fetchTokens,
  fetchTokensMetadata,
  getTokensBalance,
  getTokensPrice,
  getTokensStakingInfo,
} from "lib/server/tokens";
import { parseFields } from "lib/server/url";
import { connectFromEnv, Contract, Playables, Staking } from "lib/web3/contracts";
import { getInfuraProviderFromEnv } from "lib/web3/providers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fields = parseFields(req.query);

  const ifps = await createClientFromEnv();
  const provider = getInfuraProviderFromEnv();
  const playables = (await connectFromEnv(provider, Contract.Playables)) as Playables;
  const tokens = await fetchTokens(playables as Playables);

  const ids = tokens.map((token) => token.id);
  const additions: any[] = [];

  if (fields.metadata) {
    const uris = tokens.map((token) => token.ipfsUri);
    const result = await fetchTokensMetadata(ifps, uris);
    additions.push(result);
  }

  if (fields.staking) {
    const staking = (await connectFromEnv(provider, Contract.Staking)) as Staking;
    const result = await getTokensStakingInfo(staking, playables.address, fields.address, ids);
    additions.push(result);
  }

  if (fields.balance) {
    const result = await getTokensBalance(playables, fields.address, ids);
    additions.push(result);
  }

  if (fields.pricing) {
    const result = await getTokensPrice(tokens);
    additions.push(result);
  }

  const merged = tokens.map((t, i) => {
    let newToken = { ...t };
    additions.forEach((e) => {
      newToken = { ...newToken, ...e[i] };
    });
    return replaceIPFSUrisWithGateway(newToken);
  });

  res.json(merged);
}
