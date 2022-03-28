import Chart from "kaktana-react-lightweight-charts";

import data from "./data.json";

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
      data: data.slice(0, 2000),
    },
  ],
};

export default function Price() {
  return <Chart options={state.options} candlestickSeries={state.candlestickSeries} autoWidth autoHeight />;
}
