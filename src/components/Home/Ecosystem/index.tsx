import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useOnScreen from "hooks/useOnScreen";
import React, { createRef, useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

import InfoGraphics from "./InfoGraphics";

// import Sticky from "react-sticky-el";

const Wrapper = styled.div`
  height: auto;
  padding: 10rem 1rem;

  .scrolling-area {
    min-height: 100vh;
  }

  .heading {
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    h2 {
      padding-top: 10px;
    }

    .short {
      display: inline;
    }
    .long {
      display: none;
    }
    ${(props) => props.theme.breakpoints.up("lg")} {
      .short {
        display: none;
      }
      .long {
        display: inline;
      }
    }
  }
`;

const StickyContainer = styled(Grid)`
  position: sticky;
  /* background: yellow; */
  top: 60px;
  height: calc(100vh - 60px);

  ${(props) => props.theme.breakpoints.up("lg")} {
    top: 15px;
    height: calc(100vh - 30px);
  }
`;

const ContainerGrid = styled(Grid)`
  /* background: blue; */
  height: 100%;
`;

const SVGGridItem = styled(Grid)`
  overflow: hidden;
  max-height: 100vw;

  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    height: 100%;
    width: 100%;

    ${(props) => props.theme.breakpoints.up("lg")} {
      border-radius: 6px;
      /* border: 1px solid #1f1f1f; */
      max-height: 800px;
    }
  }
`;

const Card = styled(Grid)`
  margin-bottom: 1rem;
  min-height: 200px;
  display: none;

  ${(props) => props.theme.breakpoints.up("lg")} {
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #32054d;
    display: block;
    min-height: 0px;
    min-width: 400px;
  }

  .title {
    font-size: 1.6rem;
    padding-bottom: 1rem;
  }

  .body {
  }

  &.active {
    display: block;

    ${(props) => props.theme.breakpoints.up("lg")} {
      border: 1px solid #a331bc;
    }

    .title {
      font-size: 2rem;
      padding-top: 1rem;

      ${(props) => props.theme.breakpoints.up("lg")} {
        padding-top: 0;
      }
    }

    .body {
      display: block;
    }
  }
`;

const DescriptionGridItem = styled(Grid)`
  /* background: green; */
`;

interface Item {
  title: string;
  text: string | JSX.Element;
  focus: string;
  shortText: string;
}

const items: Item[] = [
  {
    title: "Liquidity bootstraping",
    text: `Our NFT (ERC1155) semi-fungible tokens are tool to boostrap the liquidity to the ecosystem, giving
    players and investors oppurtunity to collect rewards and praticipate. As NFT sale goes along - all of
    the liquidity collected from sale will serve as liquidity backing in pool.`,
    shortText: `Our NFT (ERC1155) semi-fungible tokens are tool to boostrap the liquidity to the ecosystem, giving
    players and investors oppurtunity to collect rewards and praticipate.`,
    focus: "nft",
  },
  {
    title: "Coin & DEX",
    text: `Coin (BHC) together with the exchange provides monetary policy and imposes rules to punish short term
    speculators. Investors which will try to speculate on raising price will be introduced to 5% selling
    tax, which will bring even more rewards to existing investors.`,
    shortText: `Coin (BHC) together with the exchange provides monetary policy and imposes rules to punish short term speculators.`,
    focus: "coin",
  },
  {
    title: "Staking",
    text: `By staking your NFT you will earn rewards in form of Brotherhood Coin (BHC). Staking allows for fair
    distribution of rewards, incentivizing long term investors.`,
    shortText: `By staking your NFT you will earn rewards in form of Brotherhood Coin (BHC). Staking allows for fair
    distribution of rewards, incentivizing long term investors.`,
    focus: "staking",
  },
  {
    title: "Game",
    text: `On its own game will be another major deflationary force of the ecosystem. Quests, in-game earnings,
    betting, but also risk of lossing your coins will be thrilling expirience.`,
    shortText: `On its own game will be another major deflationary force of the ecosystem. Quests, in-game earnings,
    betting, but also risk of lossing your coins will be thrilling expirience.`,
    focus: "game",
  },
  // {
  //   title: "Affiliate",
  //   text: (
  //     <span>
  //       We want as much organic marketing as possible, so we decided to build first <b>decentralized marketing</b>. You
  //       can register your code and receive BHC for every sell you make. Reward your community with discount and be
  //       rewarded for influencing.
  //     </span>
  //   ),
  //   shortText: `We want as much organic marketing as possible, so we decided to build first decentralized marketing. You
  //   can register your code and receive BHC for every sell you make.`,
  //   focus: "affiliate",
  // },
  // {
  //   title: "DOA/Governance",
  //   text: `We are entering new era of web 3 and allowing for decentralization and full governanace will be
  //   essential part of our success. By obtaining BHC you will have right to vote, and these right will be
  //   evenly distributed thanks to staking.`,
  //   shortText: `We are entering new era of web 3 and allowing for decentralization and full governanace will be
  //   essential part of our success.`,
  //   focus: "governance",
  // },
];

export default function Scheme() {
  const ref = createRef<HTMLDivElement>();
  const sticky = createRef<HTMLDivElement>();
  const infographics = createRef<HTMLDivElement>();
  const visible = useOnScreen(infographics);
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState<number>(0);

  const { y } = useWindowScroll();

  useEffect(() => {
    const h = items.length * window.innerHeight * 2;
    setHeight(h);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const sh = sticky.current?.clientHeight || 0;
    const sot = sticky.current?.offsetTop || 0;
    const rot = ref.current?.offsetTop || 0;
    const offset = sot - rot + sh;
    const u1 = height - sh;
    const u2 = offset - sh;
    if (u2 <= 180) {
      setActive(-1);
      return;
    }
    const xy = Math.floor(u2 / (u1 / items.length));
    if (items.length == xy) {
      setActive(-1);
      return;
    }
    setActive(xy);
  }, [y, ref, sticky, height, visible]);

  return (
    <Wrapper>
      <div className="scrolling-area" ref={ref} style={{ height }}>
        <div className="heading">
          <Typography variant="h2" textAlign="center">
            <span className="long">Powerful</span> Ecosystem
          </Typography>
          <Typography variant="body1" textAlign="center">
            Fair to investors, fair to players. <span className="long">Balance is the key.</span>
          </Typography>
        </div>

        <StickyContainer ref={sticky}>
          <ContainerGrid container direction={{ xs: "column", lg: "row" }}>
            <SVGGridItem item flexGrow="1" ref={infographics}>
              <InfoGraphics active={active === -1 ? "all" : items[active]?.focus} />
            </SVGGridItem>
            <DescriptionGridItem item container lg={3} direction="column" justifyContent="center">
              {items.map((e, i) => {
                return (
                  <Card item key={i} className={`card ${active == i ? "active" : ""}`}>
                    <Typography className="title" variant="h5">
                      {e.title}
                    </Typography>
                    <Typography className="body" variant="body2">
                      {active == i ? e.text : e.shortText}
                    </Typography>
                  </Card>
                );
              })}
            </DescriptionGridItem>
          </ContainerGrid>
        </StickyContainer>
      </div>
    </Wrapper>
  );
}
