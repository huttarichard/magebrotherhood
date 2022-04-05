import Spinner from "components/ui/Spinner";
import { useCoinContract } from "hooks/useContract";
import { useWeb3Remote } from "hooks/useWeb3";

import SwapForm from "./Form";

export default function Swap() {
  const web3 = useWeb3Remote();
  const { connected, contract, error } = useCoinContract(web3);

  if (error) {
    return <>{error.message}</>;
  }

  if (!connected) {
    return <Spinner />;
  }

  return (
    <SwapForm
      onTransactionSubmit={(t) => {
        console.info(t);
      }}
    ></SwapForm>
  );
}
