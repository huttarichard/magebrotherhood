import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import { InputProps } from "@mui/material/Input";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import NumberFormat, { NumberFormatProps, NumberFormatValues } from "react-number-format";
import { useDebouncedCallback } from "use-debounce";

interface Props extends NumberFormatProps<TextFieldProps> {
  textfield?: Partial<InputProps>;
  value: string;
}

export interface CurrencyFieldProps extends Omit<Props, "value" | "onValueChange"> {
  disabled?: boolean;
  value: BigNumber | null;
  onValueChange?: (val: BigNumber | null) => void | Promise<void>;
  decimalScale?: number;
}

export default function CurrencyField(props: CurrencyFieldProps) {
  const { value, disabled, name, onValueChange, textfield, ...rest } = props;

  const _onValueChange = async (bn: BigNumber | null) => Promise.resolve(onValueChange ? onValueChange(bn) : undefined);

  const onInputChange = (values: NumberFormatValues) => {
    if (disabled) {
      return;
    }

    const inUndefined = values.value === undefined || values.value === "";
    if (inUndefined) {
      _onValueChange(null);
      return;
    }

    const val = BigNumber.from(parseEther(values.value));
    _onValueChange(val);
  };

  return (
    <NumberFormat
      customInput={TextField}
      decimalSeparator="."
      displayType="input"
      type="text"
      thousandSeparator={true}
      variant="outlined"
      fullWidth
      value={BigNumber.isBigNumber(value) ? formatEther(value) : ""}
      InputProps={{ name, disabled: disabled ?? false, ...(textfield || {}) }}
      allowNegative={false}
      autoComplete="off"
      decimalScale={props.decimalScale ?? 12}
      onValueChange={onInputChange}
      {...rest}
    />
  );
}

export interface CurrencyFieldDebouncedProps extends Omit<CurrencyFieldProps, "onValueChange"> {
  onValueChangeStart?: () => void | Promise<void>;
  onValueChange?: (val: BigNumber | null) => void | Promise<void>;
  debounce?: number;
}

export function CurrencyFieldDebounced(props: CurrencyFieldDebouncedProps) {
  const { value, debounce, onValueChange, onValueChangeStart, ...rest } = props;
  const [changing, setChanging] = useState<boolean>(false);
  const [bn, setBN] = useState<BigNumber | null>(value);

  useEffect(() => {
    if (changing) return;
    setBN(value);
  }, [value]);

  const callback = useDebouncedCallback(
    () => {
      const promise = Promise.resolve(onValueChange ? onValueChange(bn) : undefined);
      promise.then(() => setChanging(false));
    },
    debounce ?? 400,
    {
      leading: false,
      maxWait: 1000000,
      trailing: true,
    }
  );

  const onInputChange = () => {
    if (!changing) {
      onValueChangeStart && onValueChangeStart();
      setChanging(true);
    }
    callback();
  };

  return <CurrencyField value={bn} onKeyDown={onInputChange} onValueChange={(e) => setBN(e)} {...rest} />;
}
