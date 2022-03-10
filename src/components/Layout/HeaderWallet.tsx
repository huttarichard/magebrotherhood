import styled from "@emotion/styled";
import Button from "components/ui/Button";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  // let connector = useConnector();

  const handleConnect = async () => {
    // await connector.connect();
  };

  return (
    <Wrapper>
      <Button onClick={handleConnect}>Connect wallet</Button>
    </Wrapper>
  );
}
