import styled from "@emotion/styled";
import Button from "components/ui/Button";
import Image from "next/image";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

const Wrapper = styled.div`
  position: relative;
  padding-top: 4rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 100vw;
`;

const Header = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 3rem;

  .text {
    h2 {
      margin: 0 0 2rem;
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
        font-size: 5rem;
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

  .swiper-slide {
    max-width: 240px;
  }
`;

const StyledSlide = styled.div`
  .img-wrapper {
    position: relative;
    height: 240px;
    margin-bottom: 1.5rem;
    background-color: #fff;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.primary1};
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 2rem;
  }

  p {
    margin: 0;
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

const sliderConfig: SwiperProps = {
  slidesPerView: 1.5,
  spaceBetween: 50,
  breakpoints: {
    500: {
      slidesPerView: 1.5,
    },
    992: {
      slidesPerView: 2.5,
    },
    1200: {
      slidesPerView: 3.5,
    },
  },
};

export default function Collection() {
  return (
    <Wrapper>
      <Header>
        <div className="text">
          <h2>Upcomming collection</h2>
          <p>Collection of dark night ERC1155 comming later this month.</p>
        </div>
        <div className="actions">
          <Button text="Go to marketplace" />
        </div>
      </Header>
      <StyledSlider>
        <Swiper {...sliderConfig}>
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.title}>
                <StyledSlide>
                  <div className="img-wrapper">
                    <Image
                      src={slide.img}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="left bottom"
                      alt={slide.title}
                    />
                  </div>
                  <h3>{slide.title}</h3>
                  <p>{slide.text}</p>
                </StyledSlide>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </StyledSlider>
    </Wrapper>
  );
}
