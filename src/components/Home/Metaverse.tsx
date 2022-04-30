import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import coins from "assets/images/coins.png";
import contracts from "assets/images/contracts.png";
import exchange from "assets/images/exchange.png";
import Paper from "components/ui/Paper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// import Sticky from "react-sticky-el";

const Wrapper = styled.div`
  height: auto;
  min-height: 772px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10rem 40px 14rem 40px;

  .heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    h2 {
      padding-top: 10px;
    }
  }
`;

const Card = styled(Paper)`
  min-height: auto;
  padding: 20px;
  /* border: 3px solid #c431da; */

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

export default function Metaverse() {
  return (
    <Wrapper>
      <div className="scrolling-area">
        <div className="heading">
          <Typography variant="h2" textAlign="center">
            <span className="long">Metaverse</span> Ecosystem
          </Typography>
          <Typography variant="body1" textAlign="center">
            Our metaverse-ready ecosystem is fair to investors and fair to players.
          </Typography>
        </div>

        <br />
        <br />

        <Grid container gap={2}>
          <Grid item xs={12} md>
            <Card magical>
              <Grid container>
                <Grid item xs={12} sm={12} className="img">
                  <Image src={contracts.src} width={180} height={250} objectFit="fill" alt="Contracts" />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">Buy NFT</Typography>
                  <Typography variant="body2">
                    You can buy one of our semi funguble ERC1155 tokens.{" "}
                    <b>You get ticket to play, asset to sell, and something to stake!</b> Checkout our tokens{" "}
                    <Link href="/tokens">here.</Link> Every WEI given to us will be delegated towards BHC pool.
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md>
            <Card magical>
              <Grid container>
                <Grid item xs={12} sm={12} className="img">
                  <Image src={coins.src} width={180} height={250} objectFit="fill" alt="Contracts" />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">Stake Tokens</Typography>
                  <Typography variant="body2">
                    We are rewarding investors with BHC for holding the tokens. We collectlively have an incentive not
                    to sell, making floor price to go up.
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md>
            <Card magical>
              <Grid container>
                <Grid item xs={12} sm={12} className="img">
                  <Image src={exchange.src} width={180} height={250} objectFit="fill" alt="Contracts" />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">Exchange BHC</Typography>
                  <Typography variant="body2">
                    If you feel you want some of the ETH you invested back, you can exchange BHC for ETH. Checkout the
                    swap <Link href="/swap">here.</Link>.{" "}
                    <i>Note: to prevent centralization and to reward long term investors, sell fee 2-5% is applied.</i>
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
}
