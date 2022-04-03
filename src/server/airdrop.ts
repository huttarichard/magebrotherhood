// 299295971
import dotenv from "dotenv";
dotenv.config();

import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi(process.env.TWITTER_API_BEARER_TOKEN as string);
const roClient = twitterClient.readOnly;

// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet
async function main() {
  // Search for a user
  //   const user = await roClient.v2.tweets();
}

main().catch((e) => console.error(e));
