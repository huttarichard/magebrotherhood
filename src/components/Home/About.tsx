import styled from "@emotion/styled";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding-top: 6rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #111;

  @media (min-width: 992px) {
    padding-top: 4rem;
  }

  @media (min-width: 1200px) {
    padding-top: 0;
  }
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

const StyledSlide = styled.div`
  padding-right: 2rem;

  .img-wrapper {
    position: relative;
    height: 300px;
    margin-bottom: 1rem;
  }

  h3 {
    color: ${({ theme }) => theme.primary1};
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

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  background-color: #fff;

  nav {
    width: 100%;
    margin-bottom: 1rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-evenly;
    }

    a {
      text-decoration: none;
      font-family: "Bebas Neue", sans-serif;
      color: #000;
    }
  }

  > ul {
    width: 50%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

    li {
      margin-right: 1rem;
    }

    a {
      color: #000;
    }
  }

  span {
    display: block;
    width: 50%;
    text-align: right;
    font-family: "Bebas Neue", sans-serif;
  }

  @media (min-width: 992px) {
    padding: 2rem 3rem;
    flex-wrap: nowrap;
    justify-content: space-between;

    nav {
      width: auto;
      justify-content: flex-start;
      margin-bottom: 0;

      li {
        margin-right: 1rem;
      }
    }

    > ul {
      width: auto;
    }

    span {
      width: auto;
    }
  }

  @media (min-width: 1200px) {
    nav {
      a {
        font-size: 25px;
      }
    }

    span {
      font-size: 25px;
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
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
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
      <Main>
        <Header>
          <div className="text">
            <h2>About Brotherhood</h2>
            <p>
              brotherhood is a collection of 10,000 unique brotherhood NFTs— unique digital collectibles living on the
              Ethereum blockchain. Your brotherhood as your Yacht Club membership card, and grants access to
              members-only benefits, the first of which is access to brotherhood, a collaborative graffiti board. Future
              areas and perks can be unlocked by the community through roadmap activation.
            </p>
          </div>
          <div className="actions">
            <Button text="Connect Wallet" />
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
      </Main>
      <Footer>
        <nav>
          <ul>
            <li>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use">
                <a>Terms of use</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
        <ul>
          <li>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
        </ul>
        <span>All rights reserved</span>
      </Footer>
    </Wrapper>
  );
}
