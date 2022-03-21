import styled from "@emotion/styled";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import useOnScreen from "hooks/useOnScreen";
import React, { createRef, useEffect, useState } from "react";
import { useThrottleFn, useWindowScroll } from "react-use";

// import Sticky from "react-sticky-el";
import Ecosystem from "./Ecosystem";

const Wrapper = styled.div`
  height: auto;
  padding: 10rem 1rem;

  .wrapper {
    height: 400vh;
  }

  .cards {
    ${(props) => props.theme.breakpoints.up("lg")} {
      padding: 1rem;
    }
  }

  .container {
    height: 100%;
  }

  .card {
    padding: 0.2rem 0;
    margin-bottom: 1rem;
    padding: 0.6rem;
    border-radius: 6px;
    display: none;

    ${(props) => props.theme.breakpoints.up("lg")} {
      background: black;
      display: block;
      border: 1px solid #32054d;
    }

    .title {
      display: none;
      ${(props) => props.theme.breakpoints.up("lg")} {
        display: block;
      }
      font-size: 1.2rem;
    }

    .body {
      display: none;
    }

    &.active {
      display: block;

      ${(props) => props.theme.breakpoints.up("lg")} {
        border: 1px solid #a331bc;
      }

      .title {
        display: block;
        font-size: 2rem;
      }

      .body {
        display: block;
        /* padding-bottom: 2rem; */
      }
    }
  }

  .scheme-wrapper {
    flex: 1;
    opacity: 0;
    transition: opacity 0.3s;
    position: sticky;
    top: 100px;
    height: calc(100vh - 200px);

    svg {
      height: 100%;
      width: 100%;
      max-height: calc(100vh - 100px);
    }

    &.visible {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
`;

const Card = styled(Grid)`
  padding: 20px 0;
`;

interface Item {
  title: string;
  text: string | JSX.Element;
  focus: string;
}

const items: Item[] = [
  {
    title: "Liquidity bootstraping",
    text: `Our NFT (ERC1155) semi-fungible tokens are tool to boostrap the liquidity to the ecosystem, giving
    players and investors oppurtunity to collect rewards and praticipate. As NFT sale goes along - all of
    the liquidity collected from sale will serve as liquidity backing in pool.`,
    focus: "nft",
  },
  {
    title: "Coin & DEX",
    text: `Coin (BHC) together with the exchange provides monetary policy and imposes rules to punish short term
    speculators. Investors which will try to speculate on raising price will be introduced to 5% selling
    tax, which will bring even more rewards to existing investors.`,
    focus: "coin",
  },
  {
    title: "Staking",
    text: `By staking your NFT you will earn rewards in form of Brotherhood Coin (BHC). Staking allows for fair
    distribution of rewards, incentivizing long term investors.`,
    focus: "staking",
  },
  // {
  //   title: "Marketplace",
  //   text: `Unique oppurtunity of NFTs is to have our own marketplace. We want to offer participatns more than
  //   opensea could thanks to tight integration. Swaps, auctions, and many more comming!`,
  // },
  {
    title: "Game",
    text: `On its own game will be another major deflationary force of the ecosystem. Quests, in-game earnings,
    betting, but also risk of lossing your coins will be thrilling expirience.`,
    focus: "game",
  },
  {
    title: "Affiliate",
    text: (
      <span>
        We want as much organic marketing as possible, so we decided to build first <b>decentralized marketing</b>. You
        can register your code and receive BHC for every sell you make. Reward your community with discount and be
        rewarded for influencing.
      </span>
    ),
    focus: "affiliate",
  },
  {
    title: "DOA/Governance",
    text: `We are entering new era of web 3 and allowing for decentralization and full governanace will be
    essential part of our success. By obtaining BHC you will have right to vote, and these right will be
    evenly distributed thanks to staking.`,
    focus: "governance",
  },
];

export default function Scheme() {
  const ref = createRef<HTMLDivElement>();
  const sticky = createRef<HTMLDivElement>();
  const visible = useOnScreen(ref);
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState<number>(0);
  const landscape = useMediaQuery("(orientation: landscape) and (min-width: 1500px)");

  const { y } = useWindowScroll();

  useEffect(() => {
    const h = items.length * window.innerHeight * 2;
    setHeight(h);
  }, []);

  useThrottleFn<void, any>(
    (y, ref, sticky, height) => {
      // const kh = ref.current?.clientHeight || 0;
      const sh = sticky.current?.clientHeight || 0;
      const sot = sticky.current?.offsetTop || 0;
      const rot = ref.current?.offsetTop || 0;
      const offset = sot - rot + sh;
      const u1 = height - sh;
      const u2 = offset - sh;
      const xy = Math.floor(u2 / (u1 / items.length));
      if (items.length == xy) return;
      console.log(xy);
      setActive(xy);
    },
    100,
    [y, ref, sticky, height]
  );

  return (
    <Wrapper>
      <div style={{ display: landscape ? "none" : "block" }}>
        <Typography variant="h2" textAlign="center">
          Powerful Ecosystem
        </Typography>
        <Typography variant="body1" textAlign="center">
          Fair to investors, fair to players. Balance is the key.
        </Typography>
      </div>
      <br />

      <div className="wrapper" ref={ref} style={{ height }}>
        <div ref={sticky} className={`scheme-wrapper ${visible ? "visible" : ""}`}>
          <Grid container className="container">
            <Grid item flexGrow="1">
              <Ecosystem active={items[active]?.focus} />
            </Grid>
            <Grid className="cards" item container md direction="column" justifyContent="center">
              <div style={{ display: landscape ? "block" : "none" }}>
                <Typography variant="h2" textAlign="center">
                  Powerful Ecosystem
                </Typography>
                <Typography variant="body1" textAlign="center">
                  Fair to investors, fair to players. Balance is the key.
                </Typography>
                <br />
                <br />
              </div>
              {items.map((e, i) => {
                return (
                  <Card item key={i} className={`card ${active == i ? "active" : ""}`}>
                    <Typography className="title" variant="h5">
                      {e.title}
                    </Typography>
                    <Typography className="body" variant="body2">
                      {e.text}
                    </Typography>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </div>
    </Wrapper>
  );
}
