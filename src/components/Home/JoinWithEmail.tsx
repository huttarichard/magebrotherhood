import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import background from "assets/images/background.png";
import Subscribe from "components/Marketing/Subscribe";
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

  .form {
    max-width: 500px;
  }

  .discord-link {
    height: auto;
    margin-top: 5px;
    text-align: left;
    padding: 15px;
    font-size: 15px;
  }
`;

export default function Join() {
  return (
    <Wrapper>
      <div>
        <div>
          <Typography variant="h2">Join Next Mint</Typography>
          <Typography variant="body1">
            Selected members of our community will be eligible to airdrop. Join now and get your reward.
          </Typography>
        </div>

        <br />
        <br />

        <Subscribe />

        <br />
        <br />

        <Paper className="card">
          <Discord>Get your invite to discord</Discord>
        </Paper>
        <Paper
          className="card discord-link"
          onClick={() => {
            navigator.clipboard.writeText("https://discord.gg/HgPQAHzp3Z");
            setTimeout(alert.bind(null, "Copied to clipboard!"), 100);
            // alert("Copied to clipboard!");
          }}
        >
          <code>https://discord.gg/HgPQAHzp3Z</code>
        </Paper>
        <Paper className="card">
          <Twitter>Follow us on twitter</Twitter>
        </Paper>
      </div>
    </Wrapper>
  );
}
