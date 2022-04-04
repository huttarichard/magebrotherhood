import Button from "components/ui/Button";
import { useWeb3ConnectWindow } from "components/ui/WalletConnectWindow";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

export default function HeaderWallet() {
  const router = useRouter();
  const { connected } = useWeb3Wallet();
  const window = useWeb3ConnectWindow();
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
    <div>
      {connected ? (
        <Button onClick={() => router.push("/wallet")} text={wallet} distorted borders block large />
      ) : (
        <Button onClick={window.connect} text={connect} distorted borders block large />
      )}
    </div>
  );
}
