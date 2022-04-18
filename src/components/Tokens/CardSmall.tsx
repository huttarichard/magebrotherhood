import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { FullToken } from "hooks/useTokens";
import React from "react";

import { ContentGrid, Description, Image, PaperCard } from "./Card";

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
}

export function CardSmall(props: React.PropsWithChildren<CardSmallProps>) {
  const { token, description, children, padding } = props;
  return (
    <PaperCard>
      <Grid container>
        <Grid item container xs="auto" alignItems="center">
          <ImageContainer size={80}>
            <Image className="image" src={token.image} alt={token.name} priority layout="fill" />
          </ImageContainer>
        </Grid>

        <ContentGrid padding={padding}>
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
        </ContentGrid>
      </Grid>
    </PaperCard>
  );
}
