import "swiper/css";
import "swiper/css/virtual";

import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTokens } from "hooks/useTokens";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useWindowSize } from "react-use";

const Wrapper = styled.div`
  position: relative;
  padding-top: 4rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0px 8px 0px 0px #ffffff1a;
  width: 100%;

  .overflow {
    max-width: 1400px;
    margin: 0 auto;
    overflow: hidden;
    width: inherit;
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 3rem;

  p {
    font-size: 1.5rem;
  }
`;

const StyledSlide = styled(Grid)`
  padding: 1rem;
  .img-wrapper {
    position: relative;
    height: 240px;
    margin-bottom: 1.5rem;
    background-color: #ffffff1c;
    border-radius: 8px;
    overflow: hidden;
    border: 3px solid #8d11db00;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-weight: 700;
    font-size: 2rem;
  }

  p {
    margin: 0;
    color: #fff;
    opacity: 0.7;
  }

  @media (min-width: 992px) {
    .img-wrapper {
      height: 240px;

      img {
        width: 100%;
      }
    }
  }
`;

export default function Collection() {
  const tokens = useTokens({ metadata: true });
  const [w, sw] = useState<number | null>(null);
  const { width } = useWindowSize();
  // const { width } = useScreen();

  useEffect(() => {
    sw(width);
  }, [width]);

  return (
    <Wrapper>
      <div className="overflow">
        <Header>
          <div className="text">
            <Typography variant="h3">First Collection</Typography>
            <p>Collection of dark knights ERC1155, our first ever made, well crafted characters.</p>
          </div>
        </Header>

        <Grid container>
          {tokens.data.map((token, index) => {
            return (
              <StyledSlide item xs={6} sm={3} md={4} key={index}>
                <div className="img-wrapper">
                  <Image
                    loading="lazy"
                    src={token.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="left bottom"
                    alt={token.name}
                  />
                </div>
                <h3>{token.name}</h3>
                <p>{token.description}</p>
              </StyledSlide>
            );
          })}
        </Grid>
      </div>
    </Wrapper>
  );
}
