import styled from "@emotion/styled";
import { Grid } from "@mui/material";
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

    > div {
      height: 100%;
    }

    .text {
      font-size: 1.5rem;
    }

    .icon {
      padding: 0 20px;
    }
  }

  svg {
    color: white;
    font-size: 3rem;
    width: 80px;
  }
`;

export default function Join() {
  return (
    <Wrapper>
      <div>
        <div>
          <Typography variant="h2">Join Brotherhood</Typography>
        </div>
        <br />
        <Paper className="card">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs="auto" className="icon">
              <Discord />
            </Grid>
            <Grid item xs className="text">
              Get your invite to discord
            </Grid>
          </Grid>
        </Paper>
        <Paper className="card">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs="auto" className="icon">
              <Twitter />
            </Grid>
            <Grid item xs className="text">
              Follow us on twitter
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Wrapper>
  );
}
