import useSWR from "swr";

export interface Attribute {
  trait_type: string;
  value: number;
}

export interface Item {
  id: string;
  createdAt: Date;
  launchedAt: Date;
  supply: number;
  minted: number;
  weight: number;
  price: number;
  balance: number;
  staked: number;
  description: string;
  external_url: string;
  image: string;
  name: string;
  animation_url: string;
  attributes: Attribute[];
}

interface CollectionParams {
  account?: string;
  filter?: string;
}

export function useCollectionsApi(params?: CollectionParams) {
  const data = useSWR<Item[], any>([`/api/collections`, params], async (url, params) => {
    const px = new URLSearchParams();
    Object.keys(params).forEach((key) => px.append(key, params[key]));

    const response = await fetch(`${url}${px ? `?${px}` : ""}`);
    return response.json();
  });
  return { ...data, data: data.data || [], loading: !data.data && !data.error };
}
