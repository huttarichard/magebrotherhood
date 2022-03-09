import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

const StyledButton = styled.button``;

export default function HeaderWallet() {
  // if (false) {
  //   return <Wrapper>Wallet connected</Wrapper>;
  // }
  return <Wrapper>{/* <StyledButton onClick={() => connectWallet()}>Connect wallet</StyledButton> */}</Wrapper>;
}
