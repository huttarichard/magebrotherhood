const COINBASE_URL = "https://api.coinbase.com/v2/exchange-rates";

export async function fetchMarketPricesWithCoinbase(from: string, to: string) {
  if (!from || !to) {
    console.error("invalid values given to fetchMarketPricesWithCoinbase", from, to);
    return 0;
  }
  const q = new URLSearchParams({ currency: from.toUpperCase() }).toString();
  const resp = await fetch(COINBASE_URL + "?" + q).then((e) => e.json());
  return parseFloat(resp.data.rates[to.toUpperCase()]);
}
