import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import WalletConnectWindow from "components/ui/WalletConnectWindow";
import { useCoinContract } from "hooks/useContract";
import useWeb3 from "hooks/useWeb3";
import { useEffect, useState } from "react";

export default function Test() {
  const [open, setOpen] = useState(false);
  const web3 = useWeb3();
  const contract = useCoinContract();

  console.log(contract);

  useEffect(() => {
    console.log(web3);
  }, [web3]);

  return (
    <Layout>
      <Button onClick={(e) => setOpen(true)} text="Connect" />
      <WalletConnectWindow open={open} onClose={() => setOpen(false)} onWalletConnected={() => setOpen(false)} />
    </Layout>
  );
}
