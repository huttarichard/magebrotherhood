import Header from "./Header";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  @media (min-width: 992px) {
    display: flex;

    main {
      flex: 1;
    }
  }
`;

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
    </Wrapper>
  );
}
