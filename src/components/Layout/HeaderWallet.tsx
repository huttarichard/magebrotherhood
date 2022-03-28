import styled from "@emotion/styled";
import { useEthers } from "@usedapp/core";
import Button from "components/ui/Button";
import { useIntl } from "react-intl";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  const intl = useIntl();

  const disconnect = intl.formatMessage({
    defaultMessage: "Disconnect",
    id: "qj1uhz",
  });

  const connect = intl.formatMessage({
    defaultMessage: "Connect Wallet",
    id: "cg1VJ2",
  });

  return (
    <Wrapper>
      {account ? (
        <Button onClick={deactivate} text={disconnect} distorted borders block large />
      ) : (
        <Button onClick={activateBrowserWallet} text={connect} distorted borders block large />
      )}
    </Wrapper>
  );
}
