import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import team0 from "assets/images/team0.jpg";
import team1 from "assets/images/team1.jpg";
import team2 from "assets/images/team2.jpg";
import team3 from "assets/images/team3.jpg";
import Image from "next/image";

const Wrapper = styled.div`
  position: relative;
  padding-top: 4rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #111;
  max-width: 100vw;
  padding: 4rem 1rem 10rem 2rem;

  @media (min-width: 992px) {
    padding-top: 4rem;
  }
`;

const Main = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 992px) {
    padding-right: 2rem;
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

const Container = styled(Grid)``;

const StyledSlide = styled(Grid)`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;

  .img-wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    margin-bottom: 1.5rem;
    border-radius: 50%;
    overflow: hidden;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.primary1};
    font-weight: 400;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const team = [
  {
    name: "Tamara roja",
    position: "Founder",
    img: team0.src,
  },
  {
    name: "james phelps",
    position: "Creative Director",
    img: team1.src,
  },
  {
    name: "Giovanni Giorgio",
    position: "Financier",
    img: team2.src,
  },
  {
    name: "Abdalla zuberi",
    position: "Artist",
    img: team3.src,
  },
];

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
        </Header>
        <Container container>
          {team.map((person, i) => {
            return (
              <StyledSlide item key={i}>
                <div className="img-wrapper">
                  <Image src={person.img} layout="fill" objectFit="cover" alt={person.name} />
                </div>
                <h3>{person.name}</h3>
                <span>{person.position}</span>
              </StyledSlide>
            );
          })}
        </Container>
      </Main>
    </Wrapper>
  );
}
