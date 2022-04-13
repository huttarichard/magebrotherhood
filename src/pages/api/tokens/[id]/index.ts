import { createClientFromEnv, replaceIPFSUrisWithGateway } from "lib/server/ipfs";
import { fetchToken, fetchTokenMetadata, getTokenBalance, getTokenPrice, getTokenStakingInfo } from "lib/server/tokens";
import { parseFields } from "lib/server/url";
import { connectFromEnv, Contract, Playables, Staking } from "lib/web3/contracts";
import { getInfuraProviderFromEnv } from "lib/web3/providers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fields = parseFields(req.query);

  const ifps = await createClientFromEnv();
  const provider = getInfuraProviderFromEnv();
  const playables = (await connectFromEnv(provider, Contract.Playables)) as Playables;
  const token = await fetchToken(playables as Playables, req.query.id as string);

  const additions: any[] = [];

  if (fields.metadata) {
    const result = await fetchTokenMetadata(ifps, token.ipfsURI);
    additions.push(result);
  }

  if (fields.staking) {
    const staking = (await connectFromEnv(provider, Contract.Staking)) as Staking;
    const result = await getTokenStakingInfo(staking, playables.address, fields.address, token.id);
    additions.push(result);
  }

  if (fields.balance) {
    const result = await getTokenBalance(playables, fields.address, token.id);
    additions.push(result);
  }

  if (fields.pricing) {
    const result = await getTokenPrice(token);
    additions.push(result);
  }

  let newToken = { ...token };
  additions.forEach((e) => {
    newToken = { ...newToken, ...e };
  });

  const data = replaceIPFSUrisWithGateway(newToken);
  res.json(data);
}
