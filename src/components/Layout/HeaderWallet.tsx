import styled from "@emotion/styled";
import { useEthers } from "@usedapp/core";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

const Wrapper = styled.div`
  /* display: none;

  @media (min-width: 992px) {
    display: block;
  } */
`;

export default function HeaderWallet() {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();
  // const config = useConfig();

  const intl = useIntl();

  const wallet = intl.formatMessage({
    defaultMessage: "Wallet",
    id: "3yk8fB",
  });

  const connect = intl.formatMessage({
    defaultMessage: "Connect Wallet",
    id: "cg1VJ2",
  });

  return (
    <Wrapper>
      {account ? (
        <Button onClick={() => router.push("/wallet")} text={wallet} distorted borders block large />
      ) : (
        <Button onClick={activateBrowserWallet} text={connect} distorted borders block large />
      )}
    </Wrapper>
  );
}
