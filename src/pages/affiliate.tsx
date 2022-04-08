import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import Card from "components/ui/Paper";
import { useWeb3TransactionPresenter } from "components/ui/TransactionPresenter";
import { useFormik } from "formik";
import { Contract } from "lib/contracts";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";

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

export default function Swap() {
  const intl = useIntl();
  const { makeTransaction } = useWeb3TransactionPresenter();

  // i18n
  const formLabel = intl.formatMessage({
    defaultMessage: "CODE",
    id: "affiliate_page_form_label",
  });

  const formHelperText = intl.formatMessage({
    defaultMessage: "For example ADAM123",
    id: "affiliate_page_form_helper_text",
  });

  const formSubmitButtonText = intl.formatMessage({
    defaultMessage: "Register Code",
    id: "affiliate_page_form_submit_button_text",
  });

  interface Values {
    code: string;
  }

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values: Values) => {
      makeTransaction<Contract.Promoter, "register">({
        contract: Contract.Promoter,
        fn: "register",
        description: {
          action: "Transfer",
          description: "Transfer your bortherhood coins to another address",
          value: BigNumber.from(0),
        },
        args: ["", ""],
      });
    },
  });

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">
              <FormattedMessage defaultMessage="Affiliate" id="affiliate_page_title" />
            </Typography>
            <br />
            <Typography variant="body1">
              <FormattedMessage
                defaultMessage="Looking to make same extra cash? Hey, we might have something for you. Our first decentralized marketing allows to reward you for influencing and your community by discounting our services."
                id="affiliate_page_description_p1"
              />
            </Typography>
            <br />
            <Typography variant="body1">
              <FormattedMessage
                defaultMessage="Everytime someone mints with your code, you will be rewarded with brotherhood coin! Amount of reward varies depending on price of ethereums gas, but you can expect some nice gains! Register code below and start earning."
                id="affiliate_page_description_p2"
              />
            </Typography>
          </div>

          <br />

          <CardWrapper>
            <CardHeader>
              <Typography variant="h5">
                <FormattedMessage defaultMessage="Register" id="affiliate_page_form_title" />
              </Typography>
            </CardHeader>

            <br />

            <form onSubmit={formik.handleSubmit}>
              <TextField fullWidth name="code" label={formLabel} helperText={formHelperText} />
              <Button text={formSubmitButtonText} className="btn" distorted borders large />
            </form>
          </CardWrapper>
        </Main>
      </Layout>
    </>
  );
}
