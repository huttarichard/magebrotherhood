import { InputProps } from "@mui/material/Input";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

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
