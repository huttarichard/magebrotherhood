import styled from "@emotion/styled";
import React from "react";

import Sidebar from "./Sidebar";
// import { useEffect } from "react";
// import { useConnector } from "components/web3/Connector";

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

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  // let { modal } = useConnector();

  return (
    <Wrapper>
      <Sidebar />
      <main>{children}</main>
      {/* {modal.render()} */}
    </Wrapper>
  );
}
