import { BigNumber } from "@ethersproject/bignumber";
import type { FullToken } from "lib/server/tokens";

export interface CollectionParams {
  metadata?: boolean;
  staking?: boolean;
  balance?: boolean;
  pricing?: boolean;
  address?: string;
}

function convertParams(params?: CollectionParams) {
  const fields = [];
  if (params?.metadata) {
    fields.push("metadata");
  }
  if (params?.staking) {
    fields.push("staking");
  }
  if (params?.balance) {
    fields.push("balance");
  }
  if (params?.pricing) {
    fields.push("pricing");
  }

  const px = new URLSearchParams();
  px.append("fields", fields.join(","));

  if (params?.address) {
    px.append("address", params.address);
  }
  return px;
}

export async function fetchTokens(params?: CollectionParams): Promise<FullToken[]> {
  const px = convertParams(params);
  const response = await fetch(`/api/tokens${px ? `?${px}` : ""}`);
  const json = await response.json();
  return json.map((e: FullToken) => {
    return {
      ...e,
      createdAt: new Date(e.createdAt),
      launchedAt: new Date(e.launchedAt),
      priceWei: BigNumber.from(e.priceWei),
    };
  });
}

fetchTokens.route = "/api/tokens";

export async function fetchToken(id: string, params?: CollectionParams): Promise<FullToken> {
  if (!id || !parseInt(id)) {
    throw new Error("invalid token id");
  }
  const px = convertParams(params);
  const response = await fetch(`/api/tokens/${id}${px ? `?${px}` : ""}`);
  const json = await response.json();
  return {
    ...json,
    createdAt: new Date(json.createdAt),
    launchedAt: new Date(json.launchedAt),
    priceWei: BigNumber.from(json.priceWei),
  };
}

fetchToken.route = "/api/tokens/{id}";
