import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { FullToken } from "hooks/useTokens";
import { default as NextImage, ImageProps } from "next/image";
import React from "react";

const Title = styled.div`
  padding: 10px;
  height: 100%;

  b {
    margin-bottom: 10px;
  }
  p {
    margin: 0;
    font-size: 15px;
  }
`;

export function Image({ item, imageProps }: { item?: FullToken; imageProps?: ImageProps }) {
  if (!item) return null;
  console.log(item, imageProps);
  return (
    <NextImage
      className="image"
      src={item.image}
      alt="Knight"
      priority
      width={80}
      height={80}
      objectFit="cover"
      {...imageProps}
    />
  );
}

export function Description({ item }: { item: FullToken }) {
  return (
    <Title>
      <b>{item.name}</b>
      <p>{item.description}</p>
    </Title>
  );
}

export interface ItemProps {
  item: FullToken;
  imageProps?: ImageProps;
}

export function ItemCompact({ item, imageProps, children }: React.PropsWithChildren<ItemProps>) {
  return (
    <Grid container item xs alignItems="center">
      <Grid item container xs="auto" justifyContent="center" alignItems="center">
        <Image alt={item.name} item={item} {...imageProps} />
      </Grid>
      <Grid item xs>
        <Description item={item} />
      </Grid>

      {children && (
        <Grid item xs="auto">
          {children}
        </Grid>
      )}
    </Grid>
  );
}
