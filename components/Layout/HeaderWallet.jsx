import { useContext } from "react";
import styled from "@emotion/styled";
import { WalletContext } from "../../contexts/walletContext";

const Wrapper = styled.div``;

const StyledButton = styled.button``;

export default function HeaderWallet() {
  const { wallet, walletConnected, connectWallet } = useContext(WalletContext);

  if (!walletConnected) {
    return (
      <Wrapper>
        <StyledButton onClick={() => connectWallet()}>Connect wallet</StyledButton>
      </Wrapper>
    );
  } else {
    return <Wrapper>Wallet connected</Wrapper>;
  }
}
