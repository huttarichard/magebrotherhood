import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { FullToken } from "hooks/useTokens";
import React from "react";

import { Content, Description, Image, PaperCard } from "./Card";

const ImageContainer = styled.div<{ size: number }>`
  display: inherit;
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export interface CardSmallProps {
  token: FullToken;
  padding?: number;
  description?: boolean;
  size?: number;
}

export function CardSmall(props: React.PropsWithChildren<CardSmallProps>) {
  const { token, description, children, padding, size } = props;
  return (
    <PaperCard>
      <Grid container>
        <Grid item container sm="auto" alignItems="center">
          <ImageContainer size={size ?? 80}>
            <Image className="image" src={token.image} alt={token.name} priority layout="fill" />
          </ImageContainer>
        </Grid>

        <Content
          item
          sm
          container
          direction="column"
          justifyContent="center"
          padding={{ sm: padding ?? 0 }}
          paddingLeft={{ sm: padding ? padding + 1 : 0 }}
          paddingTop={{ xs: padding }}
          paddingBottom={{ xs: padding }}
        >
          {description && (
            <Description item>
              <b>{token.name}</b>
              <p>{token.description}</p>
              <br />
            </Description>
          )}
          {children && (
            <Grid item xs>
              {children}
            </Grid>
          )}
        </Content>
      </Grid>
    </PaperCard>
  );
}
