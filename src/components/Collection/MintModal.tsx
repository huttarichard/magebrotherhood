import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { useEthers } from "@usedapp/core";
import { Playables } from "artifacts/types";
import Button from "components/ui/Button";
import TransactionStepper from "components/ui/TransactionStepper";
import { ethers } from "ethers";
import { usePlayableContract } from "hooks/useCoinContract";
import useWeb3 from "hooks/useWeb3";
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

  const { activateBrowserWallet, account, activate } = useEthers();
  const eths = useWeb3();
  const { contract, ready, error } = usePlayableContract(eths);
  let provider;
  let signer;

  useEffect(async () => {
    if (!ready) return;
    console.log("playable contract ready");

    provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("Prov", provider);
    signer = provider.getSigner();
  }, [ready]);

  console.log(eths);
  console.log(contract, ready, error);

  if (eths.account != undefined && activeStep == 0) {
    setActiveStep(1);
  }

  const mint = () => {
    if (!contract) return;
    if (!eths.account) return;

    // export declare namespace Playables {
    //   export type MintParamsStruct = {
    //     tokenId: BigNumberish;
    //     amount: BigNumberish;
    //     discount: string;
    //   };
    //   ...

    const params: Playables.MintParamsStruct = {
      tokenId: "1",
      amount: "1",
      discount: "",
    };
    contract
      .connect(signer)
      .mint(params, {
        gasLimit: 1000000,
      })
      .then((tx) => {
        console.log(tx);
        setHash(tx.hash);
        setActiveStep(2);
      });
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
            <Button onClick={activateBrowserWallet} text="Connect" borders distorted />
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
