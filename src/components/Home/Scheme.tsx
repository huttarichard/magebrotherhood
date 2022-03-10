import styled from "@emotion/styled";

import Ecosystem from "./Ecosystem";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #111;

  h2 {
    padding: 0 1rem;
    margin: 0;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 3rem;
    color: #fff;
    text-align: center;
  }

  svg {
    flex: 1;
    height: 100%;
    max-width: 100%;
    max-height: 70vh;
  }

  @media (min-width: 992px) {
    h2 {
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 1200px) {
    justify-content: center;

    h2 {
      font-size: 5rem;
    }

    svg {
      max-height: 80vh;
    }
  }
`;

export default function Scheme() {
  return (
    <Wrapper>
      <h2>Powerful Ecosystem</h2>
      <Ecosystem />
    </Wrapper>
  );
}
