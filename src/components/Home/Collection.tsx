import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import knight from "assets/images/knight.png";
import { useTokens } from "hooks/useTokens";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

const Wrapper = styled.div`
  position: relative;
  padding-top: 4rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  padding: 6rem 1rem;
  max-width: 100vw;
  overflow: hidden;

  ${(props) => props.theme.breakpoints.up("md")} {
    /* max-width: 1432px; */
  }
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
    border-radius: 7px;
    overflow: hidden;
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
      max-height: 320px;
    }
  }
`;

const slides = [
  {
    title: "Bendy1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu, sed habitant in cursus proin.",
    img: knight.src,
  },
  {
    title: "Dark knight",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu.",
    img: knight.src,
  },
  {
    title: "Ninja",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu, sed habitant.",
    img: knight.src,
  },
  {
    title: "Bendy2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu.",
    img: knight.src,
  },
  {
    title: "Bendy3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst et risus arcu.",
    img: knight.src,
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
  const tokens = useTokens({ metadata: true });

  return (
    <Wrapper>
      <Header>
        <div className="text">
          <Typography variant="h3">
            <FormattedMessage defaultMessage="Upcomming Collection" id="home_collection_title" />
          </Typography>

          <FormattedMessage
            defaultMessage="Collection of dark night ERC1155 comming later this month."
            id="home_collection_subtitle"
            tagName="p"
          />
        </div>
      </Header>
      <StyledSlider>
        <Swiper {...sliderConfig}>
          {tokens.data.map((token) => {
            return (
              <SwiperSlide key={token.id}>
                <StyledSlide>
                  <div className="img-wrapper">
                    <Image
                      loading="lazy"
                      src={token.image}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="left bottom"
                      alt={token.name}
                    />
                  </div>
                  <h3>{token.name}</h3>
                  <p>{token.description.slice(0, 50)}</p>
                </StyledSlide>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </StyledSlider>
    </Wrapper>
  );
}
