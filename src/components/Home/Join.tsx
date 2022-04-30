import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import background from "assets/images/background.png";
import Discord from "components/Socials/Discord";
import Twitter from "components/Socials/Twitter";
import Paper from "components/ui/Paper";

const Wrapper = styled.div`
  padding: 10rem 1rem 14rem 1rem;
  background-image: url(${background.src});
  background-size: cover;
  min-height: 750px;

  > div {
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    max-width: 500px;
    height: 80px;
    margin-top: 1rem;
    color: white;

    .discord,
    .twitter {
      line-height: 5rem;
      font-size: 1.4rem;
      text-decoration: none;
      font-weight: 400;
      color: white;
    }
  }

  svg {
    color: white;
    font-size: 3rem;
    width: 80px;
    position: relative;
    top: 10px;
  }
`;

export default function Join() {
  return (
    <Wrapper>
      <div>
        <div>
          <Typography variant="h2">Join Brotherhood</Typography>
          <Typography variant="body1">We will be happy o have you onboard!</Typography>
        </div>
        <br />
        <Paper className="card">
          <Discord>Get your invite to discord</Discord>
        </Paper>
        <Paper className="card">
          <Twitter>Follow us on twitter</Twitter>
        </Paper>
      </div>
    </Wrapper>
  );
}
