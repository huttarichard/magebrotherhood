import styled from "@emotion/styled";
import Button from "components/ui/Button";
import { useConnector } from "components/Web3/Connector";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  let connector = useConnector();

  let handleConnect = async () => {
    await connector.connect();
  };

  return (
    <Wrapper>
      <Button onClick={handleConnect}>Connect wallet</Button>
    </Wrapper>
  );
}
