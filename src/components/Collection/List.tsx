import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { FullToken } from "hooks/useTokens";
import { default as NextImage } from "next/image";
import React from "react";

import Opensea from "./Opensea";

export interface ItemProps {
  item: FullToken;
}

const Image = styled(NextImage)`
  border-radius: 5px;
`;

const Content = styled(Grid)`
  padding: 10px;
  padding-left: 20px;
  height: 100%;
`;

const Description = styled(Grid)`
  b,
  p {
    margin: 0;
  }

  b {
    font-weight: 700;
    font-size: 2.2rem;
  }

  p {
    font-size: 1.5rem;
  }
`;

export function OpenseaBadge() {
  return (
    <Opensea />
    // <OpenseaBadgeWrapper>
    // </OpenseaBadgeWrapper>
  );
}

export function ItemExpanded({ item, children }: React.PropsWithChildren<ItemProps>) {
  return (
    <Grid container item xs>
      <Grid item container xs="auto" justifyContent="center" alignItems="center">
        <Image className="image" src={item.image} alt={item.name} priority width={200} height={200} objectFit="cover" />
      </Grid>
      <Content item xs container direction="column">
        <Description item xs>
          <b>{item.name}</b>
          <p>{item.description}</p>
        </Description>
        <Grid item xs>
          {children}
        </Grid>
      </Content>
    </Grid>
  );
}

export function ItemCompact({ item, children }: React.PropsWithChildren<ItemProps>) {
  return (
    <Grid container item xs alignItems="center">
      <Grid item container xs="auto" justifyContent="center" alignItems="center">
        <Image className="image" src={item.image} alt={item.name} priority width={80} height={80} objectFit="cover" />
      </Grid>

      <Description item xs>
        <b>{item.name}</b>
        <p>{item.description}</p>
      </Description>

      {children && (
        <Grid item xs="auto">
          {children}
        </Grid>
      )}
    </Grid>
  );
}
