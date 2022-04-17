// import { createClientFromEnv } from "lib/server/ipfs";
// import { fetchToken, fetchTokenMetadata } from "lib/server/tokens";
// import { connectFromEnv, Contract, Playables } from "lib/web3/contracts";
// import { getInfuraProviderFromEnv } from "lib/web3/providers";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const provider = getInfuraProviderFromEnv();
//   const playables = (await connectFromEnv(provider, Contract.Playables)) as Playables;
//   const ipfs = await createClientFromEnv();

//   const json = await fetchToken(playables, req.query.id as string);
//   const metadata = await fetchTokenMetadata(ipfs, json.ipfsUri);

//   if (!metadata.models.usdz) {
//     return res.status(404).json({
//       error: "No USDZ file found",
//     });
//   }

//   res.setHeader("Content-Type", "model/vnd.usdz+zip");
//   res.flushHeaders();

//   console.log("start", metadata.models.usdz);
//   const path = metadata.models.usdz.replace("ipfs://", "");
//   let size = 0;

//   for await (const x of ipfs.cat(path)) {
//     size += x.length;
//     res.write(x);
//   }

//   res.addTrailers({ "Content-Length": size });
//   res.end();
//   console.log("done");
// }

import all from "it-all";
import { createClientFromEnv } from "lib/server/ipfs";
import { fetchToken, fetchTokenMetadata } from "lib/server/tokens";
import { connectFromEnv, Contract, Playables } from "lib/web3/contracts";
import { getInfuraProviderFromEnv } from "lib/web3/providers";
import { NextApiRequest, NextApiResponse } from "next";
import { concat } from "uint8arrays";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const provider = getInfuraProviderFromEnv();
  const playables = (await connectFromEnv(provider, Contract.Playables)) as Playables;
  const ipfs = await createClientFromEnv();

  const json = await fetchToken(playables, req.query.id as string);
  const metadata = await fetchTokenMetadata(ipfs, json.ipfsUri);

  if (!metadata.models.usdz) {
    return res.status(404).json({
      error: "No USDZ file found",
    });
  }

  const path = metadata.models.usdz.replace("ipfs://", "");
  const usdz = await all(ipfs.cat(path));
  const usdzBuffer = Buffer.from(concat(usdz));

  res.setHeader("Content-Type", "model/vnd.usdz+zip");
  res.setHeader("Content-Length", usdzBuffer.byteLength);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(usdzBuffer);
}
