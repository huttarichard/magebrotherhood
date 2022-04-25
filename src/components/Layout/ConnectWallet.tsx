import Button from "components/ui/Button";
import { useWeb3ConnectWindow } from "components/ui/WalletConnectWindow";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useRouter } from "next/router";
import React from "react";

export default function ConnectWallet({ ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { connected } = useWeb3Wallet();
  const window = useWeb3ConnectWindow();

  return (
    <div {...props}>
      {connected ? (
        <Button onClick={() => router.push("/wallet")} text="Wallet" distorted borders block large />
      ) : (
        <Button onClick={window.connect} text="Connect Wallet" important distorted borders block large />
      )}
    </div>
  );
}
