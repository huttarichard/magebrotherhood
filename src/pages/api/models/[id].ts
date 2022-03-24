import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = path.resolve("./public", "models");
  const file = path.join(dir, req.query["id"] as string);

  try {
    const info = fs.statSync(file);
    res.setHeader("Content-Type", "model/vnd.usdz+zip");
    res.setHeader("Content-Length", info.size);
    fs.createReadStream(file)
      .on("error", (error) => {
        console.log(error);
        res.end("Something went to wrong!");
      })
      .pipe(res);
    // .on("finish", () => {});
  } catch (e) {
    console.error(e);
    res.end("Something went wrong");
    return;
  }
}
