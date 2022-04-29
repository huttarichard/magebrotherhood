import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Discord from "components/Socials/Discord";
import Twitter from "components/Socials/Twitter";
import Link from "next/link";

const FooterWrapper = styled(Grid)`
  width: 100%;
  height: 70px;
  background-color: #fff;
  padding: 1rem;
  color: black;

  a {
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
  }

  svg {
    font-size: 1.4rem;
  }

  svg,
  a {
    color: black;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper container justifyContent="space-between">
      <Grid container item xs="auto" gap={1.2} alignItems="center">
        <Grid item>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/paper#disclaimer">
            <a>Disclaimer</a>
          </Link>
        </Grid>
      </Grid>

      <Grid container item xs="auto" gap={2} alignItems="center">
        <Grid item>Made with ❤️   in Prague.</Grid>
        <Grid item>
          <Twitter />
        </Grid>
        <Grid item>
          <Discord />
        </Grid>
      </Grid>
    </FooterWrapper>
  );
}
