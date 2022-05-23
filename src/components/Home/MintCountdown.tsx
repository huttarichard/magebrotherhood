import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Countdown from "components/ui/CountDown";

const Wrapper = styled.div`
  padding: 10rem 1rem 14rem 1rem;
  text-align: center;
`;

const date = new Date(1654981886692);

export default function MintCountdown() {
  return (
    <Wrapper>
      <div>
        <Typography variant="h2">Airdrop + Mint Countdown</Typography>
        <Typography variant="body1">We would love to welcome comunity to next MINT and Airdrop.</Typography>

        <small>Please note only early members will be eligible to airdrop.</small>
      </div>
      <br />
      <br />
      <br />

      <Countdown countDownDate={date}></Countdown>
    </Wrapper>
  );
}
