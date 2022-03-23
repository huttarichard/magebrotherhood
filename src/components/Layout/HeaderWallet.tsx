import styled from "@emotion/styled";
import { useEthers } from "@usedapp/core";
import Button from "components/ui/Button";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  return (
    <Wrapper>
      {account ? (
        <Button onClick={deactivate} text="Disconnect" distorted borders block large />
      ) : (
        <Button onClick={activateBrowserWallet} text="Connect wallet" distorted borders block large />
      )}
    </Wrapper>
  );
}
