import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { PageLayout } from "components/Layout/Layout";
import Button from "components/ui/Button";
import Card from "components/ui/Paper";
import { useFormik } from "formik";
import { usePromoterContract } from "hooks/useContract";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { formatBNToEtherFloatFixed } from "lib/bn";
import { Contract } from "lib/web3/contracts";
import { useEffect, useState } from "react";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  padding-top: 30px;
  max-width: 800px;
  margin: 0 auto;

  .head {
    padding: 20px;
  }

  .download {
    font-size: 30px;
    background: #d2d2d2;
    display: inline-flex;
    width: auto;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    color: gray;
    text-decoration: none;
    font-weight: 600;

    span {
      padding-right: 10px;
      font-size: 22px;
    }
  }

  .body {
    padding: 20px;
  }
`;

const CardWrapper = styled(Card)`
  padding: 17px;
  max-width: 100%;
  margin: 0 22px;

  ${(props) => props.theme.breakpoints.down("md")} {
    margin: 0;
    padding: 20px;
    background: transparent;
    border: 0;
    box-shadow: none;
    border-top: 2px solid #ec12f9;
    border-bottom: 2px solid #ec12f9;
    border-radius: 0;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    border: 2px solid #ec12f9;
  }

  .btn {
    margin-top: 30px;
  }
`;

const CardHeader = styled.div`
  h1 {
    margin: 0 0 2rem;
    font-size: 3rem;
    text-transform: uppercase;
  }

  p {
    margin: 0;
  }
`;

function CumputedRewards() {
  const web3 = useWeb3Wallet();
  const { contract, error, connected } = usePromoterContract(web3);
  const { makeTransaction } = useWeb3TransactionPresenter();

  const account = web3.accounts?.[0];

  interface Rewards {
    enabled: boolean;
    name: string;
    code: string;
    revenue: number;
    reward: number;
  }
  const [rewards, setRewards] = useState<Rewards>();

  useEffect(() => {
    if (!contract || !account) return;
    contract.promoters(account).then((result) => {
      setRewards({
        enabled: result.enabled,
        name: result.name,
        code: result.code,
        revenue: formatBNToEtherFloatFixed(result.revenue),
        reward: formatBNToEtherFloatFixed(result.reward),
      });
    });
  }, [contract, account]);

  const handleClaim = () => {
    if (!account) return;

    makeTransaction({
      contract: Contract.Promoter,
      description: {
        action: "Claim rewards",
        description: `You can claim your rewards`,
        value: BigNumber.from("0"),
      },
      fn: "release",
      args: [account],
    });
  };

  if (error) {
    return (
      <CardWrapper>
        <>{error.message}</>
      </CardWrapper>
    );
  }

  if (!connected) {
    <CardWrapper>
      <CardHeader>
        <Typography variant="h5">Your account</Typography>
      </CardHeader>

      <p>Connect your wallet!</p>
    </CardWrapper>;
  }

  if (!rewards || !rewards.enabled) {
    return null;
  }

  return (
    <CardWrapper>
      <CardHeader>
        <Typography variant="h5">Your account</Typography>
      </CardHeader>

      <Grid container>
        <Grid item xs>
          <b>
            Rewards to claim: {rewards.reward} ETH <small>({rewards.revenue} revenue)</small>
          </b>
        </Grid>
        <Grid item xs="auto">
          <Button disabled={rewards.reward == 0} important small text="Claim rewards" onClick={handleClaim} />
        </Grid>
      </Grid>
    </CardWrapper>
  );
}

export default function AffiliatePage() {
  const { makeTransaction } = useWeb3TransactionPresenter();

  interface Values {
    code: string;
    nickname: string;
  }

  const formik = useFormik({
    initialValues: {
      code: "",
      nickname: "",
    },
    onSubmit: (values: Values, helpers) => {
      if (values.code.length === 0 || values.code.length > 50) {
        helpers.setFieldError("code", "Invalid code");
        return;
      }
      if (values.nickname.length === 0 || values.nickname.length > 30) {
        helpers.setFieldError("nickname", "Invalid nickname");
        return;
      }
      console.log(values);
      makeTransaction<Contract.Promoter, "register">({
        contract: Contract.Promoter,
        fn: "register",
        description: {
          action: "Register Code",
          description: "Register promotion code",
          value: BigNumber.from(0),
        },
        args: [values.code, values.nickname],
      });
    },
  });

  return (
    <PageLayout
      title="MageBrotherhood - Affiliate"
      description="Ready to earn some Brotherhood Coin? Register for affiliate today."
    >
      <Main>
        <div className="head">
          <Typography variant="h3">Affiliate</Typography>
          <br />
          <Typography variant="body1">
            Looking to make same extra cash? Hey, we might have something for you. Our first decentralized marketing
            allows to reward you for influencing and your community by discounting our services.
          </Typography>
          <br />
          <Typography variant="body1">
            Everytime someone mints with your code, you will be rewarded with brotherhood coin! Get stared by filling
            the form below.
          </Typography>
        </div>

        <br />
        <CumputedRewards />

        <br />
        <CardWrapper>
          <CardHeader>
            <Typography variant="h5">Register</Typography>
          </CardHeader>

          <br />

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="code"
              label="CODE"
              helperText="For example ADAM123"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
            />
            <br />
            <br />
            <TextField
              fullWidth
              name="nickname"
              label="@nickname"
              helperText="twitter:@magebrotherhood"
              value={formik.values.nickname}
              onChange={formik.handleChange}
              error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            />

            <Button text="Register Code" type="submit" important className="btn" distorted borders large />
          </form>
        </CardWrapper>
      </Main>
    </PageLayout>
  );
}
