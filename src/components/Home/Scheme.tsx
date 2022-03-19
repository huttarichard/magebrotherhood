import styled from "@emotion/styled";
import useOnScreen from "hooks/useOnScreen";
import React, { createRef } from "react";

import Ecosystem from "./Ecosystem";

const Wrapper = styled.div`
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #111;

  h2 {
    padding: 0 1rem;
    margin: 0;
    font-weight: 400;
    font-size: 3rem;
    color: #fff;
    text-align: center;
  }

  .scheme-wrapper {
    flex: 1;
    opacity: 0;
    transition: opacity 0.3s;
    max-width: 100vh;

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
  }
`;

export default function Scheme() {
  const ref = createRef<HTMLDivElement>();
  const visible = useOnScreen(ref);

  return (
    <Wrapper ref={ref}>
      <h2>Powerful Ecosystem</h2>
      <div className={`scheme-wrapper ${visible ? "visible" : ""}`}>
        <Ecosystem />
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur culpa nulla repellat nisi
        repellendus nihil perspiciatis amet excepturi architecto?
      </p>
    </Wrapper>
  );
}
