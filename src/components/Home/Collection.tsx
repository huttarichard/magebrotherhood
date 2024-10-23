import "swiper/css";
import "swiper/css/virtual";

import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { useTokens } from "hooks/useTokens";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { useWindowSize } from "react-use";

const Wrapper = styled.div`
  padding: 40px;
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
  text-align: center;

  p {
    font-size: 1.5rem;
  }
`;

const List = styled.ul`
  list-style: none;
  display: table;
  margin: 0 auto;
  padding: 0;
`;

const Item = styled.li`
  width: 250px;
  height: 330px;
  background-color: black;
  float: left;
  border-radius: 5px;
  overflow: hidden;
  margin: 3px;
  overflow: hidden;
  cursor: pointer;

  h3 {
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    font-size: 18px;
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100%);
    overflow: hidden;
    margin: 0;
    font-size: 16px;
    padding: 10px;
    padding-top: 4px;
  }

  .img-wrapper {
    width: 100%;
  }
`;

export default function Collection() {
  const tokens = useTokens({ metadata: true });
  const [, sw] = useState<number | null>(null);
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

        <List>
          {tokens.data.map((token, index) => {
            const item = (
              <Item>
                <div className="img-wrapper">
                  <Image
                    className="img"
                    loading="lazy"
                    src={token.image}
                    width={250}
                    height={250}
                    layout="responsive"
                    objectFit="contain"
                    alt={token.name}
                  />
                </div>
                <h3>{token.name}</h3>
                <p>{token.revealed ? token.description : "Comming soon."}</p>
              </Item>
            );
            if (!token.revealed) {
              return item;
            }
            return (
              <Link href={"/tokens/" + token.id} passHref key={index}>
                {item}
              </Link>
            );
          })}
        </List>
      </div>
    </Wrapper>
  );
}
