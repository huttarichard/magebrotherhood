import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import useOnScreen from "hooks/useOnScreen";
import React, { createRef, useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

// import Sticky from "react-sticky-el";
import Ecosystem from "./Ecosystem";

const Wrapper = styled.div`
  height: auto;
  padding: 10rem 1rem;

  .wrapper {
    height: 400vh;
  }

  .card {
    padding: 0.2rem 0;
    /* border: 1px solid ${(props) => props.theme.primary1}; */
    border: 1px solid #32054d;
    margin-bottom: 1rem;
    padding: 0.6rem;
    border-radius: 6px;

    .title {
      font-size: 1.2rem;
    }

    .body {
      display: none;
    }

    &.active {
      border: 1px solid #a331bc;

      .title {
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

    svg {
      height: 100%;
      width: 100%;
      max-height: calc(100vh - 100px);
    }

    &.visible {
      opacity: 1;
      transition: opacity 1s;
    }
  }
`;

const Card = styled(Grid)`
  padding: 20px 0;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

interface Item {
  title: string;
  text: string | JSX.Element;
}

const items: Item[] = [
  {
    title: "Liquidity bootstraping",
    text: `Our NFT (ERC1155) semi-fungible tokens are tool to boostrap the liquidity to the ecosystem, giving
    players and investors oppurtunity to collect rewards and praticipate. As NFT sale goes along - all of
    the liquidity collected from sale will serve as liquidity backing in pool.`,
  },
  {
    title: "Staking",
    text: `By staking your NFT you will earn rewards in form of Brotherhood Coin (BHC). Staking allows for fair
    distribution of rewards, incentivizing long term investors.`,
  },
  {
    title: "Coin & DEX",
    text: `Coin together with the exchange provides monetary policy and imposes rules to punish short term
    speculators. Investors which will try to speculate on raising price will be introduced to 5% selling
    tax, which will bring even more rewards to existing investors.`,
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
  },
  {
    title: "DOA/Governance",
    text: `We are entering new era of web 3 and allowing for decentralization and full governanace will be
    essential part of our success. By obtaining BHC you will have right to vote, and these right will be
    evenly distributed thanks to staking.`,
  },
];

export default function Scheme() {
  const ref = createRef<HTMLDivElement>();
  const sticky = createRef<HTMLDivElement>();
  const visible = useOnScreen(ref);
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState<number>(0);

  const { y } = useWindowScroll();

  useEffect(() => {
    const h = items.length * window.innerHeight;
    setHeight(h);

    // const kh = ref.current?.clientHeight || 0;
    const sh = sticky.current?.clientHeight || 0;
    const sot = sticky.current?.offsetTop || 0;
    const rot = ref.current?.offsetTop || 0;
    const offset = sot - rot + sh;
    const u1 = height - sh;
    const u2 = offset - sh;
    const xy = Math.floor(u2 / (u1 / items.length));
    if (active == xy) return;
    setActive(xy);
  }, [y, ref, sticky, height, active]);

  return (
    <Wrapper>
      <Typography variant="h2" textAlign="center">
        Powerful Ecosystem
      </Typography>
      <Typography variant="body1" textAlign="center">
        Fair to investors, fair to players. Balance is the key.
      </Typography>
      <br />

      <div className="wrapper" ref={ref} style={{ height }}>
        <div ref={sticky} className={`scheme-wrapper ${visible ? "visible" : ""}`}>
          <Grid container>
            <Grid item flexGrow="1">
              <Ecosystem />
            </Grid>
            <Grid item container xs direction="column" justifyContent="center">
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
