import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";
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
  background: transparent url("/images/roadmapKnight.png") no-repeat;
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

const Timeline = styled.div`
  position: relative;
  width: 660px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 1em 0;
  list-style-type: none;
  z-index: 10;

  &:before {
    position: absolute;
    left: 50%;
    top: 0;
    content: " ";
    display: block;
    width: 6px;
    height: 100%;
    margin-left: -3px;
    background: rgb(80, 80, 80);
    background: -moz-linear-gradient(
      top,
      rgba(80, 80, 80, 0) 0%,
      rgb(80, 80, 80) 8%,
      rgb(80, 80, 80) 92%,
      rgba(80, 80, 80, 0) 100%
    );
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, rgba(30, 87, 153, 1)),
      color-stop(100%, rgba(125, 185, 232, 1))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(80, 80, 80, 0) 0%,
      rgb(80, 80, 80) 8%,
      rgb(80, 80, 80) 92%,
      rgba(80, 80, 80, 0) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(80, 80, 80, 0) 0%,
      rgb(80, 80, 80) 8%,
      rgb(80, 80, 80) 92%,
      rgba(80, 80, 80, 0) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(80, 80, 80, 0) 0%,
      rgb(80, 80, 80) 8%,
      rgb(80, 80, 80) 92%,
      rgba(80, 80, 80, 0) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(80, 80, 80, 0) 0%,
      rgb(80, 80, 80) 8%,
      rgb(80, 80, 80) 92%,
      rgba(80, 80, 80, 0) 100%
    );

    z-index: 5;
  }

  li {
    padding: 1em 0;
  }

  li:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .direction-l {
    position: relative;
    width: 300px;
    float: left;
    text-align: right;
  }

  .direction-r {
    position: relative;
    width: 300px;
    float: right;
  }

  .flag-wrapper {
    position: relative;
    display: inline-block;

    text-align: center;
  }

  .flag {
    position: relative;
    display: inline;
    background: rgb(248, 248, 248);
    padding: 6px 10px;
    border-radius: 5px;

    font-weight: 600;
    text-align: left;
  }

  .direction-l .flag {
    -webkit-box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);
    box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);
  }

  .direction-r .flag {
    -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);
  }

  .direction-l .flag:before,
  .direction-r .flag:before {
    position: absolute;
    top: 50%;
    right: -40px;
    content: " ";
    display: block;
    width: 18px;
    height: 18px;
    margin-top: -10px;
    background: #fff;
    border-radius: 10px;
    border: 4px solid rgb(255, 80, 80);
    z-index: 10;
  }

  .direction-r .flag:before {
    left: -40px;
  }

  .direction-l .flag:after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    height: 0;
    width: 0;
    margin-top: -8px;
    border: solid transparent;
    border-left-color: rgb(248, 248, 248);
    border-width: 8px;
    pointer-events: none;
  }

  .direction-r .flag:after {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    height: 0;
    width: 0;
    margin-top: -8px;
    border: solid transparent;
    border-right-color: rgb(248, 248, 248);
    border-width: 8px;
    pointer-events: none;
  }

  .time-wrapper {
    display: inline;

    line-height: 1em;
    font-size: 0.66666em;
    color: rgb(250, 80, 80);
    vertical-align: middle;
  }

  .direction-l .time-wrapper {
    float: left;
  }

  .direction-r .time-wrapper {
    float: right;
  }

  .time {
    display: inline-block;
    padding: 4px 6px;
    background: rgb(248, 248, 248);
  }

  .desc {
    margin: 1em 0.75em 0 0;

    ${(props) => props.theme.breakpoints.up("sm")} {
      color: white;
    }

    font-size: 0.77777em;
    font-style: italic;
    line-height: 1.5em;
  }

  .direction-r .desc {
    margin: 1em 0 0 0.75em;
  }

  @media screen and (max-width: 660px) {
    width: 100%;
    padding: 0em 0 1em 0;

    li {
      padding: 2em 0;
    }

    .direction-l,
    .direction-r {
      float: none;
      width: 100%;

      text-align: center;
    }

    .flag-wrapper {
      text-align: center;
    }

    .flag {
      background: rgb(255, 255, 255);
      z-index: 15;
    }

    .direction-l .flag:before,
    .direction-r .flag:before {
      position: absolute;
      top: -30px;
      left: 50%;
      content: " ";
      display: block;
      width: 18px;
      height: 18px;
      margin-left: -9px;
      background: #fff;
      border-radius: 10px;
      border: 4px solid ${({ theme }) => theme.primary1};
      z-index: 10;
    }

    .direction-l .flag:after,
    .direction-r .flag:after {
      content: "";
      position: absolute;
      left: 50%;
      top: -8px;
      height: 0;
      width: 0;
      margin-left: -8px;
      border: solid transparent;
      border-bottom-color: rgb(255, 255, 255);
      border-width: 8px;
      pointer-events: none;
    }

    .time-wrapper {
      display: block;
      position: relative;
      margin: 4px 0 0 0;
      z-index: 14;
    }

    .direction-l .time-wrapper {
      float: none;
    }

    .direction-r .time-wrapper {
      float: none;
    }

    .desc {
      position: relative;
      margin: 1em 0 0 0;
      padding: 1em;
      background: rgb(245, 245, 245);
      -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);

      z-index: 15;
    }

    .direction-l .desc,
    .direction-r .desc {
      position: relative;
      margin: 1em 1em 0 1em;
      padding: 1em;

      z-index: 15;
    }
  }

  @media screen and (min-width: 400px) or (max-width: 660px) {
    .direction-l .desc,
    .direction-r .desc {
      margin: 1em 4em 0 4em;
    }
  }
`;

const phases = [
  {
    text: "launch of website (Q2)",
  },
  {
    text: "Presale start for collection Dark Knights (Q2)",
  },
  {
    text: "audit with certik (Q2)",
  },
  {
    text: "Liquidity bootstrapping and staking start (Q2)",
  },
  {
    text: "Launch of collection Dark Knights (Q2) ",
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

  // const { x: x2, y: y2 } = useScroll(scrollRef);

  // console.log("a", x, y);
  // console.log("b", x2, y2);

  return (
    <Wrapper ref={scrollRef}>
      <Typography sx={{ color: theme.text1 }} variant="h4" textAlign="center">
        Roadmap
      </Typography>

      <Background></Background>

      <Timeline>
        <li>
          <div className="direction-r">
            <div className="flag-wrapper">
              <span className="flag">Freelancer</span>
              <span className="time-wrapper">
                <span className="time">2013 - present</span>
              </span>
            </div>
            <div className="desc">My current employment. Way better than the position before!</div>
          </div>
        </li>

        <li>
          <div className="direction-l">
            <div className="flag-wrapper">
              <span className="flag">Apple Inc.</span>
              <span className="time-wrapper">
                <span className="time">2011 - 2013</span>
              </span>
            </div>
            <div className="desc">
              My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.
            </div>
          </div>
        </li>

        <li>
          <div className="direction-r">
            <div className="flag-wrapper">
              <span className="flag">Apple Inc.</span>
              <span className="time-wrapper">
                <span className="time">2011 - 2013</span>
              </span>
            </div>
            <div className="desc">
              My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.
            </div>
          </div>
        </li>

        <li>
          <div className="direction-l">
            <div className="flag-wrapper">
              <span className="flag">Apple Inc.</span>
              <span className="time-wrapper">
                <span className="time">2011 - 2013</span>
              </span>
            </div>
            <div className="desc">
              My first employer. All the stuff I&apos;ve learned and projects I&apos;ve been working on.
            </div>
          </div>
        </li>

        <li>
          <div className="direction-r">
            <div className="flag-wrapper">
              <span className="flag">Harvard University</span>
              <span className="time-wrapper">
                <span className="time">2008 - 2011</span>
              </span>
            </div>
            <div className="desc">A description of all the lectures and courses I have taken and my final degree?</div>
          </div>
        </li>
      </Timeline>

      <Knight container justifyContent="end" ref={knightRef} className={upcommingVisible ? "visible" : ""}>
        <Grid item container xs={6} sx={{ display: { xs: "none", sm: upcommingVisible ? "block" : "none" } }}>
          <Grid item container alignContent="center" sx={{ height: "100%" }}>
            <Typography sx={{ color: theme.text1 }} variant="h4">
              Upcomming Events
            </Typography>
          </Grid>
        </Grid>
      </Knight>
    </Wrapper>
  );
}
