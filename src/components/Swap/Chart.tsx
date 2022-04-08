import Chart from "kaktana-react-lightweight-charts";
import { Candle } from "lib/web3/exchange";

const state = {
  options: {
    layout: {
      backgroundColor: "#111",
      lineColor: "#2B2B43",
      textColor: "#D9D9D9",
    },
    grid: {
      vertLines: {
        color: "#111",
      },
      horzLines: {
        color: "#111",
      },
    },
  },
  candlestickSeries: [
    {
      options: {
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

export default function Price({ data }: { data: Candle[] }) {
  state.candlestickSeries[0].data = data;
  return <Chart options={state.options} candlestickSeries={state.candlestickSeries} autoWidth autoHeight />;
}
