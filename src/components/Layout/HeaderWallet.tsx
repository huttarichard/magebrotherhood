import styled from "@emotion/styled";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import Button from "components/ui/Button";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();

  const handleDisconnect = () => {
    disconnect(connectedWallets[0]);
  };

  return (
    <Wrapper>
      {connectedWallets.length ? (
        <Button onClick={handleDisconnect} text="Disconnect wallet" />
      ) : (
        <Button onClick={() => connect({})} text="Connect wallet" disabled={connecting} />
      )}
    </Wrapper>
  );
}
