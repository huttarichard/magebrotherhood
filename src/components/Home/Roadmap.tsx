import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import roadmapKnight from "assets/images/roadmapKnight.png";
import Timeline from "components/ui/Timeline";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useWindowScroll } from "react-use";

const Wrapper = styled.div`
  position: relative;
  height: auto;
  background-color: ${({ theme }) => theme.primary2};
  color: ${({ theme }) => theme.text2};
  padding: 2rem 0 0 0;

  h2 {
    text-align: center;
  }
`;

const Background = styled.div`
  position: absolute;
`;

const Knight = styled(Grid)`
  background: transparent url(${roadmapKnight.src}) no-repeat;
  background-size: contain;
  background-position: left bottom;
  opacity: 0.7;
  position: sticky;
  height: 480px;
  width: 100%;
  bottom: 0;
  transition: opacity 0.3s ease-in-out;

  &.visible {
    opacity: 1;
  }
`;

// const phases = [
//   {
//     text: "launch of website (Q2)",
//   },
//   {
//     text: "Presale start for collection Dark Knights (Q2)",
//   },
//   {
//     text: "audit with certik (Q2)",
//   },
//   {
//     text: "Liquidity bootstrapping and staking start (Q2)",
//   },
//   {
//     text: "Launch of collection Dark Knights (Q2) ",
//   },
// ];

const items = [
  {
    title: "Freelancer",
    period: "2013 - present",
    desc: "My current employment. Way better than the position before!",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I've learned and projects I've been working on.",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I've learned and projects I've been working on.",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I've learned and projects I've been working on.",
  },
  {
    title: "Apple Inc.",
    period: "2011 - 2013",
    desc: "My first employer. All the stuff I've learned and projects I've been working on.",
  },
];

export default function Roadmap() {
  const knightRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [upcommingVisible, setUpcommingVisible] = useState<boolean>(false);

  const theme = useTheme();
  const down = useMediaQuery(theme.breakpoints.down("sm"));

  const { y } = useWindowScroll();
  useEffect(() => {
    if (down) {
      return;
    }
    const sh = scrollRef.current?.clientHeight || 0;
    const kh = knightRef.current?.clientHeight || 0;
    const ot = knightRef.current?.offsetTop || 0;
    setUpcommingVisible(sh - kh - 1 <= ot + 100);
  }, [y, down]);

  return (
    <Wrapper ref={scrollRef}>
      <Typography sx={{ color: theme.text1 }} variant="h4" textAlign="center">
        <FormattedMessage defaultMessage="Roadmap" id="home_roadmap_title" />
      </Typography>

      <Background />

      <Timeline items={items} />

      <Knight container justifyContent="end" ref={knightRef} className={upcommingVisible ? "visible" : ""}>
        <Grid item container xs={6} sx={{ display: { xs: "none", sm: upcommingVisible ? "block" : "none" } }}>
          <Grid item container alignContent="center" sx={{ height: "100%" }}>
            <Typography sx={{ color: theme.text1 }} variant="h4">
              <FormattedMessage defaultMessage="Upcoming Events" id="home_roadmap_upcoming_events" />
            </Typography>
          </Grid>
        </Grid>
      </Knight>
    </Wrapper>
  );
}
