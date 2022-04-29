import styled from "@emotion/styled";
import { NoSsr } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import preview from "assets/images/preview.png";
import Paper from "components/ui/Paper";
import React from "react";
import ReactPlayer from "react-player/lazy";

const Wrapper = styled.div`
  height: auto;
  padding: 10rem 1rem 14rem 1rem;
  overflow: hidden;
  box-shadow: 0px 8px 0px 0px #ffffff1a;
`;

const VideoGrid = styled(Grid)`
  width: 100%;
  height: 30vh;
  padding-top: 5rem;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 600px;
  }
`;

export default function Scheme() {
  return (
    <Wrapper>
      <Typography variant="h2" textAlign="center">
        In-Game Short Movie
      </Typography>
      <Typography variant="body1" textAlign="center">
        Or game department has been quite busy, watch short movie we put together for our fans!
      </Typography>
      <br />

      <Grid container justifyContent="center" alignItems="center">
        <VideoGrid item>
          <Paper
            magical
            sx={{ maxHeight: "80vw", maxWidth: "1000px", margin: "0 auto", height: "100%", width: "100%" }}
          >
            <NoSsr>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=p9PH3fZpqqQ"
                light={preview.src}
                width="100%"
                height="100%"
                style={{ borderRadius: "4px", overflow: "hidden" }}
              />
            </NoSsr>
          </Paper>
        </VideoGrid>
      </Grid>
    </Wrapper>
  );
}
