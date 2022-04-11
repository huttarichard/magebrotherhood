import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, formatUnits } from "@ethersproject/units";

export { formatEther, formatUnits };

export function formatBNToEtherFloat(val: BigNumber | null | undefined): number {
  if (!val) {
    return 0;
  }
  return parseFloat(formatUnits(val, "ether"));
}

export function formatBNToEtherFloatFixed(val: BigNumber | null | undefined, max = 8): number {
  if (!val) {
    return 0;
  }
  return parseFloat(parseFloat(formatUnits(val, "ether")).toFixed(max));
}

export function formatFloatToEther(val: number | null | undefined): BigNumber {
  if (typeof val !== "number") {
    return BigNumber.from(0);
  }
  return BigNumber.from(val);
}

export function timeToBN(val: Date): BigNumber {
  return BigNumber.from(Math.ceil(val.getTime() / 1000));
}

export function timeNowInBN(): BigNumber {
  return BigNumber.from(Math.ceil(Date.now() / 1000));
}
