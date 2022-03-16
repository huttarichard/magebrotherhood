import styled from "@emotion/styled";
import Button from "components/ui/Button";
import useWallet from "hooks/useWallet";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  const wallet = useWallet();

  return (
    <Wrapper>
      {wallet.data ? (
        <button onClick={() => wallet.disconnect()}>Disconnect wallet</button>
      ) : (
        <Button onClick={() => wallet.connect({})} text="Connect wallet" disabled={wallet.connecting} />
      )}
    </Wrapper>
  );
}
