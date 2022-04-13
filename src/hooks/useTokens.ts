import { CollectionParams, fetchTokens } from "lib/api/tokens";
import type { FullToken } from "lib/server/tokens";
import useSWR from "swr";

export function useCollectionsApi(params?: CollectionParams) {
  const data = useSWR<FullToken[], any>([fetchTokens.route, params], async (url, params) => {
    return fetchTokens(params);
  });
  return { ...data, data: data.data || [], loading: !data.data && !data.error };
}
