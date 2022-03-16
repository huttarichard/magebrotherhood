import styled from "@emotion/styled";
import { Input, Label } from "@rebass/forms";
import Card from "components/ui/Card";
import { Formik } from "formik";

import Layout from "../components/Layout/Layout";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardWrapper = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardHeader = styled.div`
  h1 {
    margin: 0 0 2rem;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 3rem;
    text-transform: uppercase;
  }

  p {
    margin: 0;
  }
`;

const Balances = styled.div`
  display: flex;
  margin-bottom: 2rem;

  div {
    flex: 1;

    &:first-child {
      margin-right: 2rem;
    }
  }
`;

export default function Staking() {
  const initialValues = { bhc: 0 };

  return (
    <Layout>
      <Wrapper>
        <CardWrapper>
          <CardHeader>
            <h1>Staking</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, atque. Alias deleniti neque aperiam
              autem rerum, dolorem libero ducimus sapiente!
            </p>
          </CardHeader>
          <Balances>
            <div>
              <h2>Available</h2>
              <span>0 BHC</span>
            </div>
            <div>
              <h2>Staked</h2>
              <span>0 BHC</span>
            </div>
          </Balances>
          <Formik
            initialValues={initialValues}
            validate={async (values) => {
              const errors: { bhc?: string } = {};

              if (isNaN(values.bhc)) {
                errors.bhc = "Invalid value";
              } else if (values.bhc === 0) {
                errors.bhc = "Amount must be greater than 0";
              }

              if (errors.bhc) {
                return errors;
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 100);
            }}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting, isValidating }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="bhc">Enter amount of BHC You want to stake</Label>
                  <Input name="bhc" type="number" step={1} value={values.bhc} onChange={handleChange} />
                  {errors.bhc && <span>{errors.bhc}</span>}
                </div>

                <br />

                <div>
                  <button type="submit" disabled={isSubmitting || isValidating}>
                    Stake
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </CardWrapper>
      </Wrapper>
    </Layout>
  );
}
