import styled from "@emotion/styled";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #111;
`;

const Header = styled.div`
  padding: 0 1rem;
  margin-bottom: 3rem;

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
`;
const Slider = styled.div`
  width: 100%;
`;

const StyledSlide = styled.div`
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
  }

  @media (min-width: 992px) {
    .img-wrapper {
      height: 20vw;
    }
  }
`;

const slides = [
  {
    title: "Bendy",
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

const swiperConfig = {
  spaceBetween: 50,
  slidesPerView: 1.5,
  breakpoints: {
    500: {
      slidesPerView: 2.5,
    },
  },
  breakpoints: {
    992: {
      slidesPerView: 3.5,
    },
  },
};

export default function Collection() {
  return (
    <Wrapper>
      <Header>
        <h2>Dark Knights</h2>
        <p>Regularly updated collections</p>
      </Header>
      <Slider>
        <Swiper {...swiperConfig}>
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.title}>
                <StyledSlide>
                  <div className="img-wrapper">
                    <Image src={slide.img} layout="fill" objectFit="cover" alt={slide.title} />
                  </div>
                  <h3>{slide.title}</h3>
                  <p>{slide.text}</p>
                </StyledSlide>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Slider>
    </Wrapper>
  );
}
