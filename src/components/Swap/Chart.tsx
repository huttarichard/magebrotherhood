import { SpinnerBlock } from "components/ui/Spinner";
import { Candle } from "hooks/useExchangeContract";
import Chart from "kaktana-react-lightweight-charts";
import { ColorType } from "lightweight-charts";
import useSWR from "swr";

type dummyCandle = {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  trades: number;
  takerBaseAssetVolume: string;
  takerQuoteAssetVolume: string;
  ignored: string;
};

const state = {
  options: {
    layout: {
      backgroundColor: "#111",
      background: { type: ColorType.Solid, color: "#FFFFFF" },
      fontSize: 16,
      textColor: "#D9D9D9",
    },
    grid: {
      horzLines: {
        visible: false,
      },
      vertLines: {
        visible: false,
      },
    },
  },
  candlestickSeries: [
    {
      options: {
        priceFormat: {
          type: "price",
          precision: 6,
          minMove: 0.000001,
        },

        downColor: "#8d11db",
        upColor: "#ec12f9",
        borderVisible: true,
        wickVisible: true,
        borderUpColor: "#",
        borderDownColor: "#8d11db",
        wickUpColor: "#ec12f9",
        wickDownColor: "#8d11db",
      },
      data: [] as Candle[],
    },
  ],
};

export default function Price() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<dummyCandle[], Error>("/api/chartdata", fetcher);
  const dummyCandles: Candle[] = [];

  if (error) {
    return <SpinnerBlock />;
  }

  if (data != undefined) {
    for (let i = 0; i < data.length; i++) {
      dummyCandles.push({
        time: Math.ceil(
          new Date(new Date(data[i].openTime).toISOString().slice(0, 19).replace("T", " ")).getTime() / 1000
        ),
        open: Number(parseFloat(data[i].open)),
        high: Number(parseFloat(data[i].high)),
        low: Number(parseFloat(data[i].low)),
        close: Number(parseFloat(data[i].close)),
      });
    }
  }
  if (dummyCandles.length > 0) {
    state.candlestickSeries[0].data = dummyCandles;
    return <Chart options={state.options} candlestickSeries={state.candlestickSeries} autoWidth autoHeight />;
  } else {
    return <SpinnerBlock />;
  }
}
