interface QueryParams {
  [key: string]: string;
}

async function fetchData<T = any>(path: string, params: QueryParams): Promise<T> {
  const px = new URLSearchParams();
  Object.keys(params).forEach((key) => px.append(key, params[key]));
  px.append("path", path);

  const data = await fetch(`/api/cmc?${px}`).then((res) => res.json());

  if (!data.success) {
    throw new Error(data.error);
  }

  return data;
}

export async function getCoinUSDPrice(coin: string): Promise<number> {
  const response = await fetchData("cryptocurrency/quotes/latest", {
    symbol: coin.toUpperCase(),
    convert: "USD",
  });
  const quote = response?.data?.[coin.toUpperCase()]?.[0]?.quote;
  return quote.USD.price;
}
