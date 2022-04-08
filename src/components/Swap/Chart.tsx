import Spinner from "components/ui/Spinner";
import { useExchangeHourlyCandles } from "hooks/useExchangeContract";
import { useWeb3Remote } from "hooks/useWeb3";
import Chart from "kaktana-react-lightweight-charts";
import { Candle } from "lib/web3/exchange";

const state = {
  options: {
    layout: {
      backgroundColor: "#111",
      // background: { type: ColorType.Solid, color: "#FFFFFF" },
      // fontSize: 16,
      // textColor: "#D9D9D9",
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
  const web3 = useWeb3Remote();
  const { candles } = useExchangeHourlyCandles(web3);

  if (candles.length === 0) {
    return <Spinner />;
  }
  state.candlestickSeries[0].data = candles;
  return <Chart options={state.options} candlestickSeries={state.candlestickSeries} autoWidth autoHeight />;
}
