import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const ContainerGrid = styled(Grid)``;

const CubeGrid = styled(Grid)`
  min-height: 280px;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  top: 100px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: rotateX(-30deg) rotateY(-45deg);

  .holder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    transform: translate3d(0em, 3em, 1.5em);
  }
  .holder:last-of-type {
    transform: rotateY(-90deg) rotateX(90deg) translate3d(0, 3em, 1.5em);
  }
  .holder:first-of-type {
    transform: rotateZ(-90deg) rotateX(-90deg) translate3d(0, 3em, 1.5em);
  }
  /* main: "#ec12f9",
light: "#f241ff",
dark: "#b100bb", */
  .holder:nth-of-type(1) .box {
    background-color: #b100bbd9;
  }
  .holder:nth-of-type(1) .box:before {
    background-color: #f241ff66;
  }
  .holder:nth-of-type(1) .box:after {
    background-color: #b100bb;
  }
  .holder:nth-of-type(2) .box {
    background-color: #b100bbd9;
  }
  .holder:nth-of-type(2) .box:before {
    background-color: #f241ff66;
  }
  .holder:nth-of-type(2) .box:after {
    background-color: #b100bb;
  }
  .holder:nth-of-type(3) .box {
    background-color: #b100bbd9;
  }
  .holder:nth-of-type(3) .box:before {
    background-color: #f241ff66;
  }
  .holder:nth-of-type(3) .box:after {
    background-color: #b100bb;
  }

  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    animation: ani-box 6s infinite;
    width: 3em;
    height: 3em;
  }
  .box:before,
  .box:after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
  }
  .box:before {
    left: 100%;
    bottom: 0;
    transform: rotateY(90deg);
    transform-origin: 0 50%;
  }
  .box:after {
    left: 0;
    bottom: 100%;
    transform: rotateX(90deg);
    transform-origin: 0 100%;
  }

  @keyframes ani-box {
    8.33% {
      transform: translate3d(-50%, -50%, 0) scaleZ(2);
    }
    16.7% {
      transform: translate3d(-50%, -50%, -3em) scaleZ(1);
    }
    25% {
      transform: translate3d(-50%, -100%, -3em) scaleY(2);
    }
    33.3% {
      transform: translate3d(-50%, -150%, -3em) scaleY(1);
    }
    41.7% {
      transform: translate3d(-100%, -150%, -3em) scaleX(2);
    }
    50% {
      transform: translate3d(-150%, -150%, -3em) scaleX(1);
    }
    58.3% {
      transform: translate3d(-150%, -150%, 0) scaleZ(2);
    }
    66.7% {
      transform: translate3d(-150%, -150%, 0) scaleZ(1);
    }
    75% {
      transform: translate3d(-150%, -100%, 0) scaleY(2);
    }
    83.3% {
      transform: translate3d(-150%, -50%, 0) scaleY(1);
    }
    91.7% {
      transform: translate3d(-100%, -50%, 0) scaleX(2);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scaleX(1);
    }
  }
`;

export default function Blockchaining() {
  return (
    <ContainerGrid flexDirection="column" alignItems="center">
      <CubeGrid item>
        <Container>
          <div className="holder">
            <div className="box"></div>
          </div>
          <div className="holder">
            <div className="box"></div>
          </div>
          <div className="holder">
            <div className="box"></div>
          </div>
        </Container>
      </CubeGrid>
      <Grid item>
        <h2>Processing</h2>
      </Grid>
    </ContainerGrid>
  );
}
