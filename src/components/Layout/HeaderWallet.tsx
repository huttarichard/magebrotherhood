import styled from "@emotion/styled";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import Button from "components/ui/Button";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  return (
    <Wrapper>
      <Button onClick={() => connect()} text="Connect wallet" />
    </Wrapper>
  );
}
