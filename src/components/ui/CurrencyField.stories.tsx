import { BigNumber } from "@ethersproject/bignumber";
import { ComponentMeta } from "@storybook/react";

import CurrencyField from "./CurrencyField";

export default {
  title: "components/ui/CurrencyField",
  component: CurrencyField,
} as ComponentMeta<typeof CurrencyField>;

export function Default() {
  return <CurrencyField value={BigNumber.from("1")} />;
}

export function Null() {
  return <CurrencyField value={null} />;
}
