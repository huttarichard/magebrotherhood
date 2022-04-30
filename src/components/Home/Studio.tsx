import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import studio from "assets/images/studio.png";
import Button from "components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Wrapper = styled.div`
  height: auto;
  overflow: hidden;
  box-shadow: 0px 8px 0px 0px #ffffff1a;
  padding: 10rem 0px;

  > div {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

export default function Scheme() {
  const router = useRouter();
  return (
    <Wrapper>
      <div>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs sm={7}>
            <Image src={studio.src} layout="responsive" objectFit="contain" width={1600} height={1000} alt="ok" />
          </Grid>
          <Grid item sm={5} padding={4}>
            <Typography variant="h2">Studio</Typography>
            <Typography variant="body1">
              Explore our studio and see the characters in their raw 3D form. We&apos;ve built this 3D enviroment so you
              can explore characters further in depth when AR is not available.
            </Typography>
            <br />
            <Button text="Explore 3D" distorted borders onClick={(e) => router.push("/tokens/1")} />
            <br />
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
}
