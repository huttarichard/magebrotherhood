import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { Playables } from "artifacts/types";
import Button from "components/ui/Button";
import TransactionStepper from "components/ui/TransactionStepper";
import { useWeb3ConnectWindow } from "components/ui/WalletConnectWindow";
import { usePlayableContract } from "hooks/useContract";
import { useWeb3Wallet } from "hooks/useWeb3";
import { StakingItem } from "pages/staking";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import Modal from "../ui/Modal";

interface MintModalProps {
  open: boolean;
  handleOpenState: (state: boolean) => void;
  stakeQueue: StakingItem[];
}

export default function MintModal({ open, handleOpenState }: MintModalProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hash, setHash] = useState<string | undefined>(undefined);
  const { width } = useWindowSize();

  // const { activateBrowserWallet, account, activate } = useEthers();

  const wallet = useWeb3Wallet();
  const window = useWeb3ConnectWindow();

  const { contract, error } = usePlayableContract(wallet);
  let provider;
  let signer;

  useEffect(async () => {
    if (!wallet.connected) return;
    console.log("playable contract ready");

    // provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log("Prov", provider);
    // signer = provider.getSigner();
  }, [wallet.connected]);

  console.log(wallet);
  console.log(contract, error);

  if (wallet.connected && activeStep == 0) {
    setActiveStep(1);
  }

  const mint = () => {
    if (!contract) return;
    if (!wallet.connected) return;

    // export declare namespace Playables {
    //   export type MintParamsStruct = {
    //     tokenId: BigNumberish;
    //     amount: BigNumberish;
    //     discount: string;
    //   };
    //   ...

    console.log(wallet);

    const params: Playables.MintParamsStruct = {
      tokenId: "1",
      amount: "1",
      discount: "",
    };

    contract
      .connect(wallet.provider)
      .mint(params, {
        gasLimit: 1000000,
      })
      .then((tx) => {
        console.log(tx);
        setHash(tx.hash);
        setActiveStep(2);
      });

    //TODO: watch for tx to complete
    //setActiveStep(3)
  };

  const resetTransaction = () => {
    setActiveStep(0);
    setHash(undefined);
  };

  const steps = [
    {
      error: false,
      label: "Connect Wallet",
      content: (
        <>
          <p>Connect your wallet before minting.</p>
          <Grid container flexDirection="column" alignItems="center">
            <Button onClick={window.connect} text="Connect" borders distorted />
          </Grid>
        </>
      ),
    },
    {
      error: false,
      label: "Mint",
      // labelOptional: "",
      content: (
        <>
          <p>Mighty Knight for 0.1 ETH</p>
          <Grid container flexDirection="column" alignItems="center">
            <Button onClick={mint} text="Mint" borders distorted />
          </Grid>
        </>
      ),
    },
    {
      error: false,
      label: "Waiting for confirmation",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, aut officia et possimus ratione, in provident
          magnam minus qui hic odit quis enim praesentium numquam deleniti adipisci aperiam optio quasi? Ipsam inventore
          consequatur accusantium ex? Magni animi, adipisci doloremque temporibus distinctio commodi consequuntur
          tenetur?
        </p>
      ),
    },
    {
      error: false,
      label: "Done",
      content: <p>Enjoy</p>,
    },
  ];

  const content = (
    <div style={{ padding: "20px" }}>
      <TransactionStepper steps={steps} activeStep={activeStep} hash={hash} />
      <Grid container flexDirection="column" alignItems="center">
        {/* <Button onClick={() => mockTransaction()} text="Mock transaction" borders distorted /> */}
        {/* <br /> */}
        <button onClick={() => resetTransaction()}>Reset transaction</button>
      </Grid>
    </div>
  );

  // debugger;
  if ((width ?? 0) <= 600) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => {
          handleOpenState(false);
          setActiveStep(0);
        }}
      >
        {content}
      </Drawer>
    );
  } else {
    return (
      <Modal
        wsx={{ minWidth: "calc(100% - 30px)" }}
        open={open}
        onClose={() => {
          handleOpenState(false);
          setActiveStep(0);
        }}
      >
        {content}
      </Modal>
    );
  }
}
