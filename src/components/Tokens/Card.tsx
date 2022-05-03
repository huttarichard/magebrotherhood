import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Button from "components/ui/Button";
import Countdown from "components/ui/CountDown";
import Paper from "components/ui/Paper";
import { FullToken } from "hooks/useTokens";
import { default as NextImage } from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { ARButton, MintButton, OpenseaButton } from "./Buttons";

export const Description = styled(Grid)`
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

export const Image = styled(NextImage)`
  border-radius: 5px;
  margin: 20px;
`;

export const PaperCard = styled(Paper)`
  margin-bottom: 50px;
`;

export const Content = styled(Grid)`
  height: 100%;

  b.weight {
    font-size: 15px;
  }
`;

interface ContentGridProps {
  padding?: number;
}

export function ContentGrid({ children, padding }: React.PropsWithChildren<ContentGridProps>) {
  return (
    <Content
      item
      xs
      container
      direction="column"
      justifyContent="center"
      padding={padding ?? 0}
      paddingLeft={padding ? padding + 1 : 0}
    >
      {children}
    </Content>
  );
}

const ImageActionsTopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;

  .button {
    margin-bottom: 5px;
  }
`;

const ImageActionsBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;

  .button {
    box-shadow: 0px 0 10px 3px #0000001c;
    height: 100%;
    background: #ffffff8f;
    letter-spacing: 1.1px;
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

const Labels = styled(Box)`
  padding-top: 15px;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 5px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

const Label = styled.div`
  background: #b000ba;
  color: white;
  font-size: 15px;
  font-weight: 700;
  padding: 0px 10px;
  border-radius: 5px;
  opacity: 0.6;
`;

export const ImageContainer = styled.div<{ size: number }>`
  display: inherit;
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export interface CardProps {
  token: FullToken;
  padding?: number;
  mint?: boolean;
  studio?: boolean;
  description?: boolean;
  ar?: boolean;
  labels?: boolean;
}

export function Card(props: React.PropsWithChildren<CardProps>) {
  const { token, mint, studio, description, ar, labels, children, padding } = props;
  const router = useRouter();
  const date = new Date();
  const launched = token.launchedAt <= date;

  return (
    <PaperCard>
      <Grid container>
        <Grid item container sm="auto" alignItems="center" padding={(padding || 0) + 1}>
          <ImageContainer size={260}>
            <Image
              className="image"
              src={token.image}
              alt={token.name}
              priority
              width={260}
              height={260}
              layout="fill"
            />

            {ar && token.ipfsUri && (
              <ImageActionsTopLeft>
                <ARButton
                  small
                  className="button"
                  folded
                  ar={{
                    glb: `/models/tokens/${token.id}/model.glb`,
                    usdz: `/models/tokens/${token.id}/model.usdz`,
                    link: "https://magebrotherhood.com",
                    resizable: true,
                  }}
                />
              </ImageActionsTopLeft>
            )}

            {studio && token.ipfsUri && (
              <ImageActionsBottom>
                <Button
                  className="button"
                  block
                  text="3D Studio"
                  onClick={() => {
                    router.push("/tokens/" + token.id);
                  }}
                />
              </ImageActionsBottom>
            )}
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

          {(mint || labels) && (
            <Grid item xs>
              {mint && launched && (
                <MainActions>
                  <MintButton className="button" small token={token} />
                  <OpenseaButton className="button" small token={token} />
                </MainActions>
              )}

              {mint && !launched && (
                <MainActions>
                  <OpenseaButton className="button" small token={token} />
                </MainActions>
              )}

              {labels && (
                <Labels>
                  {token.attributes.map((attribute) => {
                    return (
                      <Label key={attribute.traitType}>
                        {attribute.traitType}: {attribute.value}
                      </Label>
                    );
                  })}
                </Labels>
              )}
            </Grid>
          )}

          {!launched && (
            <Grid item container justifyContent={"start"}>
              <Countdown countDownDate={token.launchedAt} />
            </Grid>
          )}
        </ContentGrid>
      </Grid>
    </PaperCard>
  );
}
