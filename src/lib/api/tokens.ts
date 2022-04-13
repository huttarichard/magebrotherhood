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

export async function fetchTokens(params?: CollectionParams) {
  const px = convertParams(params);
  const response = await fetch(`/api/tokens${px ? `?${px}` : ""}`);
  return response.json();
}

fetchTokens.route = "/api/tokens";

export async function fetchToken(id: string, params?: CollectionParams) {
  const px = convertParams(params);
  const response = await fetch(`/api/token/${id}, ${px ? `?${px}` : ""}`);
  return response.json();
}

fetchToken.route = "/api/token/{id}";
