import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import { InputProps } from "@mui/material/Input";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import React, { useState } from "react";
import NumberFormat, { NumberFormatProps, NumberFormatValues } from "react-number-format";
import { useDebouncedCallback } from "use-debounce";

export interface Props extends NumberFormatProps<TextFieldProps> {
  textfield?: Partial<InputProps>;
  value: string;
}

const CurrencyFieldText = ({ value, ...props }: Props) => {
  return (
    <NumberFormat
      customInput={TextField}
      decimalSeparator="."
      displayType="input"
      type="text"
      thousandSeparator={true}
      variant="outlined"
      fullWidth
      value={value}
      decimalScale={8}
      {...props}
    />
  );
};

export default CurrencyFieldText;

interface CurrencyFieldProps extends Omit<Props, "value"> {
  disabled?: boolean;
  value: BigNumber | null;
  name?: string;
  onBNChangeStart?: (val: BigNumber | null) => void | Promise<void>;
  onBNChange?: (val: BigNumber | null) => void | Promise<void>;
  debounce?: number;
  decimalScale?: number;
}

export type CurrencyFieldRef = {
  textfield?: HTMLInputElement;
  setValueSilently: (x: BigNumber) => void;
};

export const CurrencyField = forwardRef<CurrencyFieldRef, CurrencyFieldProps>((props: CurrencyFieldProps, ref) => {
  const { value, disabled, name, onBNChange, onBNChangeStart, debounce, textfield, ...rest } = props;
  const [bn, setBN] = useState<BigNumber | null>(value);
  const [changing, setChanging] = useState<boolean>(false);
  const iref = useRef<HTMLInputElement>();

  useImperativeHandle(
    ref,
    () => ({
      textfield: iref.current,
      setValueSilently: (x: BigNumber) => {
        if (!iref.current) return;
        setBN(x);
      },
    }),
    [iref, props]
  );

  const onChange = async (bn: BigNumber | null) => {
    if (onBNChange) {
      return await Promise.resolve(onBNChange(bn));
    }
    return;
  };

  const callback = useDebouncedCallback(
    (x: BigNumber | null) => {
      onChange(x).then(() => setChanging(false));
    },
    debounce ?? 400,
    {
      leading: false,
      maxWait: 1000000,
      trailing: true,
    }
  );

  useEffect(() => {
    if (value === bn) return;

    if (value === null) {
      setChanging(true);
      setBN(null);
      callback.cancel();

      setTimeout(() => {
        callback(null);
        callback.flush();
      }, 0);
    }

    if (bn && value && bn.eq(value)) {
      return;
    }

    setBN(value);
  }, [value]);

  useEffect(() => {
    changing && onBNChangeStart && onBNChangeStart(bn);
  }, [changing]);

  const onInputChange = (values: NumberFormatValues) => {
    if (disabled) {
      return;
    }

    const inUndefined = values.value === undefined || values.value === "";
    if (inUndefined) {
      setChanging(true);
      setBN(null);
      callback.cancel();

      setTimeout(() => {
        callback(null);
        callback.flush();
      }, 0);
      return;
    }

    const x = BigNumber.from(parseEther(values.value));
    if (bn && x && bn.eq(x)) {
      return;
    }

    setChanging(true);
    setBN(x);
    callback.cancel();
    callback(x);
  };

  return (
    <CurrencyFieldText
      InputProps={{ name, disabled: disabled ?? false, ...(textfield || {}), inputRef: iref }}
      name={name}
      value={BigNumber.isBigNumber(bn) ? formatEther(bn) : ""}
      allowNegative={false}
      autoComplete="off"
      decimalScale={props.decimalScale ?? 8}
      onValueChange={onInputChange}
      {...rest}
    />
  );
});

CurrencyField.displayName = "CurrenctField";
