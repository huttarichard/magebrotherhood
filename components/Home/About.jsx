import Image from "next/image";
import styled from "@emotion/styled";
import Button from "components/ui/Button";
import Slider from "react-slick";

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
`;

const StyledSlider = styled.div`
  width: 100%;
`;

const StyledSlide = styled.div`
  padding-right: 2rem;

  .img-wrapper {
    position: relative;
    height: 300px;
    margin-bottom: 1rem;
  }

  h3 {
    color: #8b5cf6;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 2rem;
  }

  span {
    color: #fff;
    opacity: 0.7;
  }

  @media (min-width: 992px) {
    .img-wrapper {
      height: 20vw;
    }
  }
`;

const team = [
  {
    name: "Tamara roja",
    position: "Founder",
    img: "/images/team0.jpg",
  },
  {
    name: "james phelps",
    position: "Creative Director",
    img: "/images/team1.jpg",
  },
  {
    name: "Giovanni Giorgio",
    position: "Financier",
    img: "/images/team2.jpg",
  },
  {
    name: "Abdalla zuberi",
    position: "Artist",
    img: "/images/team3.jpg",
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

export default function About() {
  return (
    <Wrapper>
      <Header>
        <div className="text">
          <h2>About Brotherhood</h2>
          <p>
            brotherhood is a collection of 10,000 unique brotherhood NFTs— unique digital collectibles living on the
            Ethereum blockchain. Your brotherhood as your Yacht Club membership card, and grants access to members-only
            benefits, the first of which is access to brotherhood, a collaborative graffiti board. Future areas and
            perks can be unlocked by the community through roadmap activation.
          </p>
        </div>
        <div className="actions">
          <Button>Connect Wallet</Button>
        </div>
      </Header>
      <StyledSlider>
        <Slider {...sliderConfig}>
          {team.map((person) => {
            return (
              <StyledSlide key={person.name}>
                <div className="img-wrapper">
                  <Image src={person.img} layout="fill" objectFit="cover" alt={person.name} />
                </div>
                <h3>{person.name}</h3>
                <span>{person.position}</span>
              </StyledSlide>
            );
          })}
        </Slider>
      </StyledSlider>
    </Wrapper>
  );
}
