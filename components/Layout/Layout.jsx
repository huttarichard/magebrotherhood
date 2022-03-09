import Header from "./Header";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useConnector } from "components/Web3/Connector";

const Wrapper = styled.div`
  main {
    /* margin-top: 68px; */
  }

  @media (min-width: 992px) {
    display: flex;

    main {
      flex: 1;
      /* margin-top: 0; */
    }
  }
`;

export default function Layout({ children }) {
  let { modal } = useConnector();

  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      {modal.render()}
    </Wrapper>
  );
}
