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

  .scheme-wrapper {
    flex: 1;
    opacity: 0;
    transition: opacity 0.3s;

    svg {
      height: 100%;
      width: 100%;
    }

    &.visible {
      opacity: 1;
      transition: opacity 1s;
      transition-delay: 0.4s;
    }
  }

  p {
    padding: 0 1rem;
    color: #fff;
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

export default function Scheme(props: React.PropsWithChildren<{ active: boolean }>) {
  return (
    <Wrapper>
      <h2>Powerful Ecosystem</h2>
      <div className={`scheme-wrapper ${props.active ? "visible" : ""}`}>
        <Ecosystem />
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur culpa nulla repellat nisi
        repellendus nihil perspiciatis amet excepturi architecto?
      </p>
    </Wrapper>
  );
}
