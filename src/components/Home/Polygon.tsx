import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import edge from "assets/images/edge.png";
import Image from "next/image";

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text2};
  height: 40vh;
  min-height: 540px;

  ${(props) => props.theme.breakpoints.up("lg")} {
    height: 50vh;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100%;

  p {
    max-width: 690px;
    text-align: center;
    padding-bottom: 30px;
  }

  h5 {
    color: #00000042;
    font-style: italic;
    font-size: 1.4rem;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #ededed;
  z-index: -1;

  .imgtag {
    filter: blur(10px);
    top: -250px !important;
  }
`;

export default function Polygon() {
  return (
    <Wrapper>
      <Background>
        <Image src={edge.src} alt="ok" className="imgtag" layout="fill" objectFit="cover" />
      </Background>
      <Main>
        <Typography variant="h5" textAlign="center">
          COMMING SOON
        </Typography>
        <Typography variant="h3" textAlign="center">
          <span className="gradient">POLYGON POS L2 SCALING</span>
        </Typography>
        <p>
          With Polygon Edge custom blockchain, in-game microtransactions will fly with incredible speed and will cost
          just a fraction of network fees.
        </p>
      </Main>
    </Wrapper>
  );
}
