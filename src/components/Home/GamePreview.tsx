import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "components/ui/Paper";
import React from "react";
import { FormattedMessage } from "react-intl";
import ReactPlayer from "react-player/lazy";

const Wrapper = styled.div`
  height: auto;
  padding: 10rem 1rem;
  overflow: hidden;
`;

const VideoGrid = styled(Grid)`
  width: 100%;
  height: 600px;
  padding-top: 5rem;
`;

export default function Scheme() {
  return (
    <Wrapper>
      <Typography variant="h2" textAlign="center">
        <FormattedMessage defaultMessage="In-Game Short Movie" id="home_game_preview_title" />
      </Typography>
      <Typography variant="body1" textAlign="center">
        <FormattedMessage
          defaultMessage="Or game department has been quite busy, watch short movie we put together for our fans!"
          id="home_game_preview_subtitle"
        />
      </Typography>
      <br />

      <Grid container justifyContent="center" alignItems="center">
        <VideoGrid item>
          <Paper
            magical
            sx={{ maxHeight: "600px", maxWidth: "1200px", margin: "0 auto", height: "100%", width: "100%" }}
          >
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              light
              width="100%"
              height="100%"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            />
          </Paper>
        </VideoGrid>
      </Grid>
    </Wrapper>
  );
}
