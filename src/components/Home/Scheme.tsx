import styled from "@emotion/styled";

import Ecosystem from "./Ecosystem";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: #111;

  svg {
    height: 100%;
    max-width: 100%;
    max-height: 700px;
  }

  h1 {
    color: white;
  }
`;

export default function Scheme() {
  return (
    <Wrapper>
      <h1>Powerful Ecosystem</h1>
      <Ecosystem />
    </Wrapper>
  );
}
