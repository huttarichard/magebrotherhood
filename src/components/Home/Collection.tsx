import styled from "@emotion/styled";
import Button from "components/ui/Button";
import Image from "next/image";
import Slider from "react-slick";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding-top: 6rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #111;
`;

const Header = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 3rem;

  .text {
    h2 {
      color: #fff;
      font-family: "Bebas Neue", sans-serif;
      font-weight: 400;
      font-size: 3rem;
    }

    p {
      margin: 0;
      color: #fff;
    }
  }

  .actions {
    display: none;
  }

  @media (min-width: 992px) {
    padding: 0;
    display: flex;
    align-items: center;

    .text {
      flex: 1;
      margin-right: 4rem;

      p {
        max-width: 1000px;
      }
    }

    .actions {
      display: block;
      padding-right: 2rem;
    }
  }

  @media (min-width: 1200px) {
    .text {
      h2 {
        font-size: 95px;
      }

      p {
        font-size: 20px;
      }
    }
  }
`;

const StyledSlider = styled.div`
  width: 100%;
  margin-bottom: 6rem;
`;

const StyledSlide = styled.div`
  padding-right: 2rem;

  .img-wrapper {
    position: relative;
    height: 240px;
    margin-bottom: 1rem;
    background-color: #fff;
  }

  h3 {
    color: #8b5cf6;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 2rem;
  }

  p {
    color: #fff;
    opacity: 0.7;
  }

  @media (min-width: 992px) {
    .img-wrapper {
      height: 20vw;
    }
  }
`;

const slides = [
  {
    title: "Bendy2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu, sed habitant in cursus proin.",
    img: "/images/knight.png",
  },
  {
    title: "Dark knight",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu.",
    img: "/images/knight.png",
  },
  {
    title: "Ninja",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu, sed habitant.",
    img: "/images/knight.png",
  },
  {
    title: "Bendy",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu.",
    img: "/images/knight.png",
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

export default function Collection() {
  return (
    <Wrapper>
      <Header>
        <div className="text">
          <h2>Dark Knights</h2>
          <p>Regularly updated collections</p>
        </div>
        <div className="actions">
          <Button>Go to marketplace</Button>
        </div>
      </Header>
      <StyledSlider>
        <Slider {...sliderConfig}>
          {slides.map((slide) => {
            return (
              <StyledSlide key={slide.title}>
                <div className="img-wrapper">
                  <Image src={slide.img} layout="fill" objectFit="cover" alt={slide.title} />
                </div>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </StyledSlide>
            );
          })}
        </Slider>
      </StyledSlider>
      <Header>
        <div className="text">
          <h2>Land</h2>
          <p>Regularly updated collections</p>
        </div>
        <div className="actions">
          <Button>Go to marketplace</Button>
        </div>
      </Header>
      <StyledSlider>
        <Slider {...sliderConfig}>
          {slides.map((slide) => {
            return (
              <StyledSlide key={slide.title}>
                <div className="img-wrapper">
                  <Image src={slide.img} layout="fill" objectFit="cover" alt={slide.title} />
                </div>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </StyledSlide>
            );
          })}
        </Slider>
      </StyledSlider>
    </Wrapper>
  );
}
