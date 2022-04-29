import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Form from "components/Swap/Swap";
import React from "react";

const Wrapper = styled.div`
  height: auto;
  overflow: hidden;
  box-shadow: 0px 8px 0px 0px #ffffff1a;
  padding: 10rem 40px;

  > div {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export default function Swap() {
  return (
    <Wrapper>
      <div>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm="auto" sx={{ md: { paddingRight: 10 } }} order={2}>
            <Form />
          </Grid>
          <Grid item xs padding={2} order={1}>
            <Typography variant="h2">Broherhood Coin</Typography>
            <Typography variant="body1">
              Our ERC20 tokens called Brotherhood Coin (BHC) is in-game currency designed to be part of our ecosystem.
              Its main purpose is to enable L2 scaling solutions and to give us control over how to rewards players for
              their actions.
            </Typography>
            <br />
            <Typography variant="body1">You can read more about BHC in our LITEPAPER.</Typography>
            <br />
            <br />
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
}
