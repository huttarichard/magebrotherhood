import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import { useFormik } from "formik";
import { FullToken } from "hooks/useTokens";
import { formatBNToEtherFloatFixed } from "lib/bn";
import Image from "next/image";
import { useWindowSize } from "react-use";

interface MintFormProps {
  token: FullToken;
  onSubmit?: (amount: number) => void;
}

interface Values {
  amount: number;
}

const MintFormWrapper = styled.div`
  padding: 15px;
  h1 {
    margin-top: 0;
    margin-bottom: 0px;
  }
  .image {
    max-width: 80px;
    border-radius: 5px;
  }
`;

const Price = styled.div`
  text-transform: uppercase;
  font-size: 1.2rem;
  background: #000;
  height: 100%;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  padding: 5px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MintFrom(props: MintFormProps) {
  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    onSubmit: (values: Values, helpers) => {
      if (values.amount <= 0 || values.amount > 5) {
        helpers.setFieldError("code", "Invalid code");
        return;
      }
      props.onSubmit?.(values.amount);
    },
  });

  return (
    <MintFormWrapper>
      <h1>Mint {props.token.name}</h1>

      <Grid container justifyContent="center" alignItems="center" gap={2}>
        <Grid item xs="auto">
          <Image
            className="image"
            src={props.token.image}
            alt={props.token.name}
            priority
            width={80}
            height={80}
            objectFit="cover"
          />
        </Grid>
        <Grid item xs>
          <p>{props.token.description}</p>
        </Grid>
      </Grid>

      <form onSubmit={formik.handleSubmit}>
        <Grid container gap={2}>
          <Grid item xs>
            <TextField
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              helperText=""
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
            />
          </Grid>
          <Grid item xs={4} sx={{ height: "100%" }}>
            {formik.values.amount > 0 && (
              <Price>
                <b>Price: {formatBNToEtherFloatFixed(props.token.priceWei.mul(formik.values.amount))} ETH</b>
              </Price>
            )}
          </Grid>
        </Grid>
        <br />
        <br />

        <Button text="Go for Mint!" className="btn" type="submit" block distorted borders large />
      </form>
    </MintFormWrapper>
  );
}

interface MintModalProps {
  token: FullToken;
  open: boolean;
  onClose: () => void;
  onSubmit?: (amount: number) => void;
}

export default function MintModal({ token, open, onClose, onSubmit }: MintModalProps) {
  const { width } = useWindowSize();

  if (width <= 600) {
    return (
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        <MintFrom token={token} onSubmit={onSubmit} />
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={onClose} wsx={{ width: "calc(100% - 30px)", maxWidth: "600px" }}>
      <MintFrom token={token} onSubmit={onSubmit} />
    </Modal>
  );
}
