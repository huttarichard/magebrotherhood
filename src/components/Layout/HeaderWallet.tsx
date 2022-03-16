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

  const handleDisconnect = async () => {
    if (wallet.data && wallet.disconnect) {
      await wallet.disconnect();
    }
  };

  return (
    <Wrapper>
      {wallet.data ? (
        <Button onClick={handleDisconnect} text="Disconnect" block />
      ) : (
        <Button onClick={() => wallet.connect({})} text="Connect wallet" disabled={wallet.connecting} />
      )}
    </Wrapper>
  );
}
