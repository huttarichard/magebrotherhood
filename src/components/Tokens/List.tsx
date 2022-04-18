import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { FullToken } from "hooks/useTokens";
import { default as NextImage } from "next/image";
import React from "react";

import { ARButton, MetadataButton, MintButton, OpenseaButton } from "./Buttons";

export interface ItemProps {
  token: FullToken;
}

const Image = styled(NextImage)`
  border-radius: 5px;
`;

const Content = styled(Grid)`
  padding: 10px;
  padding-left: 20px;
  height: 100%;

  b.weight {
    font-size: 15px;
  }
`;

const Description = styled(Grid)`
  b,
  p {
    margin: 0;
  }

  b {
    font-weight: 700;
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

const ImageActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;

  .button {
    margin-bottom: 5px;
  }
`;

const MainActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;

  .button {
    margin-right: 5px;
  }
`;

const Labels = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const Label = styled.div`
  background: #b000ba;
  color: white;
  font-size: 15px;
  font-weight: 700;
  padding: 0px 10px;
  border-radius: 5px;
  margin-right: 5px;
  opacity: 0.6;
`;

const ImageContainer = styled.div`
  display: inherit;
  height: 100%;
  width: 240px;
`;

export function ItemExpanded({ token, children }: React.PropsWithChildren<ItemProps>) {
  return (
    <Grid container item sm>
      <Grid item container xs="auto" justifyContent="center" alignItems="center">
        <ImageContainer>
          <Image
            className="image"
            src={token.image}
            alt={token.name}
            priority
            width={240}
            height="100%"
            objectFit="cover"
          />
          <ImageActions>
            <ARButton small className="button" folded token={token} />
          </ImageActions>
        </ImageContainer>
      </Grid>

      <Content item sm container direction="column">
        <Description item xs>
          <b>{token.name}</b>
          <p>{token.description}</p>
          <br />
        </Description>
        <Grid item xs>
          <MainActions>
            <MintButton className="button" small token={token} />
            <OpenseaButton className="button" small token={token} />
          </MainActions>
          <Labels>
            {token.attributes.map((attribute) => {
              return (
                <Label key={attribute.traitType}>
                  {attribute.traitType}: {attribute.value}
                </Label>
              );
            })}
          </Labels>

          <br />
        </Grid>
      </Content>
    </Grid>
  );
}

export function ItemCompact({ token, children }: React.PropsWithChildren<ItemProps>) {
  return (
    <Grid container item xs alignItems="center">
      <Grid item container xs="auto" justifyContent="center" alignItems="center">
        <Image className="image" src={token.image} alt={token.name} priority width={80} height={80} objectFit="cover" />
      </Grid>

      <Description item xs>
        <b>{token.name}</b>
        <p>{token.description}</p>
      </Description>

      <Grid item xs="auto">
        <ARButton className="button" folded inverse token={token} />
        <MetadataButton className="button" folded inverse token={token} />
        <MintButton className="button" folded inverse token={token} />
        <OpenseaButton className="button" folded inverse token={token} />
        {children}
      </Grid>
    </Grid>
  );
}
