import styled from "@emotion/styled";
import Button from "components/ui/Button";

const Wrapper = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

export default function HeaderWallet() {
  return <Wrapper>{<Button>Connect wallet</Button>}</Wrapper>;
}
