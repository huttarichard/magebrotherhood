import styled from "@emotion/styled";
import Image from "next/image";

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff url("/images/polygonLogo.png") no-repeat;
  background-size: contain;
  background-position: center;
  color: ${({ theme }) => theme.text2};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h2 {
    margin-bottom: 0;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 2.5rem;
  }

  .img-wrapper {
    position: relative;
    width: 90%;
    height: 25vw;
    max-width: 500px;
  }

  p {
    margin: 0;
  }

  @media (min-width: 992px) {
    h2 {
      font-size: 60px;
    }

    .img-wrapper {
      width: 100%;
      height: 12vw;
      max-width: 900px;
    }

    p {
      font-size: 22px;
    }
  }

  @media (min-width: 1200px) {
    h2 {
      font-size: 92px;
    }

    p {
      font-size: 28px;
    }
  }
`;

export default function Polygon() {
  return (
    <Wrapper>
      <Main>
        <h2>Coming soon</h2>
        <div className="img-wrapper">
          <Image src="/images/polygonText.png" layout="fill" objectFit="contain" alt="Polygon Technology" />
        </div>
        <p>But will power micro transactions and in-game spend.</p>
      </Main>
    </Wrapper>
  );
}
