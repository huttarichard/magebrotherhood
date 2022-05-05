import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BrotherhoodCoinLogo from "components/ui/BrotherhoodCoinLogo";
import EthereumLogo from "components/ui/EthereumLogo";
import Spinner from "components/ui/Spinner";
import { useCoinContract } from "hooks/useContract";
import { useWeb3Wallet } from "hooks/useWeb3";
import { formatBNToEtherFloatFixed } from "lib/bn";
import { useEffect, useState } from "react";

const Ethereum = styled(EthereumLogo)`
  width: 30px;
  height: 50px;
  display: inline;
`;

export default function Assets() {
  const web3 = useWeb3Wallet();
  const { connected, contract: coin } = useCoinContract(web3);

  const account = web3?.accounts?.[0];
  const [bhc, setBHC] = useState<BigNumber>(BigNumber.from(0));
  const [eth, setETH] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    if (!coin || !account) return;

    Promise.all([coin.balanceOf(account), web3.provider?.getBalance(account)]).then(([b, e]) => {
      setBHC(b as BigNumber);
      setETH(e as BigNumber);
    });
  }, [coin]);

  if (!connected) {
    return <Spinner />;
  }

  if (!account) {
    return <>No Account Connected.</>;
  }

  // web3.accounts;

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs container alignItems="center">
          <Grid item sx={{ minWidth: "50px" }}>
            <BrotherhoodCoinLogo width={50} height={50} color="#AE55A0" />
          </Grid>
          <Grid item>
            <Typography sx={{ padding: 1.5 }}>Brotherhood Coin</Typography>
          </Grid>
        </Grid>

        <Grid item xs="auto">
          <span>{formatBNToEtherFloatFixed(bhc).toFixed(8)}</span>
        </Grid>
      </Grid>

      <hr />

      <Grid container alignItems="center">
        <Grid item xs container alignItems="center">
          <Grid item sx={{ minWidth: "50px" }}>
            <Ethereum width={70} height={70} lightone="#ccc" color="white" />
          </Grid>
          <Grid item>
            <Typography sx={{ padding: 1.5 }}>Ethereum</Typography>
          </Grid>
        </Grid>

        <Grid item xs="auto">
          <span>{formatBNToEtherFloatFixed(eth).toFixed(8)}</span>
        </Grid>
      </Grid>
    </>
  );
}
