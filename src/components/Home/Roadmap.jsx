import styled from "@emotion/styled";
import Slider from "react-slick";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @media (min-width: 1200px) {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #9e18dd;
      clip-path: polygon(0 0, 44% 0, 20% 68%, 100% 100%, 0 100%);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 50%;
      bottom: 0;
      left: 0;
      z-index: 9;
      background: transparent url("/images/roadmapKnight.png") no-repeat;
      background-size: contain;
      background-position: left bottom;
    }
  }
`;

const Main = styled.div`
  position: relative;
  width: 100%;
  padding-left: 2rem;

  h2 {
    margin: 0 0 3rem;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    padding-left: 40%;

    h2 {
      font-size: 95px;
    }
  }
`;

const StyledSlide = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: flex-start;

  .content {
    height: 120px;
    margin-bottom: 1rem;

    h3 {
      margin: 0 0 1rem;
      font-family: "Bebas Neue", sans-serif;
      font-weight: 400;
      color: #8b5cf6;
      font-size: 32px;
    }

    p {
      margin: 0;
      font-size: 20px;
    }
  }

  .arrow {
    width: 100%;
    height: 10px;
    background-color: #9e18dd;
    clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 50%, calc(100% - 5px) 100%, 0 100%, 5px 50%);
  }

  .whitespace {
    height: 120px;
  }

  &.odd {
    flex-direction: column-reverse;

    .content {
      margin-bottom: 0;
    }

    .arrow {
      margin-bottom: 2rem;
    }

    .whitespace {
      margin-bottom: 1rem;
    }
  }
`;

const phases = [
  {
    text: "launch of website (Q2)",
  },
  {
    text: "Presale start for collection Dark Knights (Q2)",
  },
  {
    text: "audit with certik (Q2)",
  },
  {
    text: "Liquidity bootstrapping and staking start (Q2)",
  },
  {
    text: "Launch of collection Dark Knights (Q2) ",
  },
];

const sliderConfig = {
  dots: false,
  infinite: false,
  slidesToShow: 3.5,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3.5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2.5,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.5,
      },
    },
  ],
};

export default function Roadmap() {
  return (
    <Wrapper>
      <Background></Background>
      <Main>
        <h2>Roadmap</h2>
        <Slider {...sliderConfig}>
          {phases.map((phase, i) => {
            return (
              <StyledSlide className={i % 2 ? "odd" : ""} key={i}>
                <div className="content">
                  <h3>Phase {i + 1}</h3>
                  <p>{phase.text}</p>
                </div>
                <div className="arrow"></div>
                <div className="whitespace"></div>
              </StyledSlide>
            );
          })}
        </Slider>
      </Main>
    </Wrapper>
  );
}
