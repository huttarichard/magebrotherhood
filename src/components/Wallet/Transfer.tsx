import { BigNumber } from "@ethersproject/bignumber";
import TextField from "@mui/material/TextField";
import Button from "components/ui/Button";
import CurrencyField from "components/ui/CurrencyField";
import { useFormik } from "formik";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { Contract } from "lib/web3/contracts";

export function Transfer() {
  const { connected } = useWeb3Wallet();
  const { makeTransaction } = useWeb3TransactionPresenter();

  interface Values {
    amount: BigNumber;
    address: string;
  }

  const formik = useFormik({
    initialValues: {
      amount: BigNumber.from(0),
      address: "",
    },
    onSubmit: (values: Values) => {
      makeTransaction<Contract.Coin, "transfer">({
        contract: Contract.Coin,
        fn: "transfer",
        description: {
          action: "Transfer",
          description: "Transfer your bortherhood coins to another address",
          value: BigNumber.from(0),
        },
        args: ["", BigNumber.from(0)],
      });
    },
  });

  if (!connected) {
    return <>Not Connected to Wallet</>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CurrencyField
        InputProps={{
          name: "eth",
          disabled: false,
        }}
        name="eth"
        label="Amount BHC"
        placeholder="0 BHC"
        autoComplete="off"
        key="eth"
        value={formik.values.amount}
        onValueChange={(value) => {
          formik.setFieldValue("amount", value);
        }}
      />

      <br />
      <br />

      <TextField
        placeholder="0x00000000......"
        value={formik.values.address}
        label="Address"
        fullWidth
        name="address"
        onChange={formik.handleChange}
      />

      <br />
      <br />

      <Button text="Make transaction" distorted borders type="submit" large />
    </form>
  );
}
