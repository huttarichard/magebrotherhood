import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import knight from "assets/images/knight.png";
import Button from "components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Layout from "../components/Layout/Layout";
import StakingModal from "../components/Staking/StakingModal";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 30px;

  .head {
    border-bottom: 1px solid #303030;
    padding-bottom: 30px;
  }

  .tostake {
    padding: 15px;
    margin-bottom: 30px;
  }

  .image {
    background: white;
    border-radius: 6px;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 700;

    span {
      padding-left: 10px;
    }
  }
`;

enum ItemType {
  Playable,
  Land,
}

export type StakingItem = {
  id: number;
  title: string;
  type: ItemType;
  staked: boolean;
  queuedForStaking: boolean;
};

const initialRows: StakingItem[] = [
  { id: 1, title: "Knight", type: ItemType.Playable, staked: false, queuedForStaking: false },
  { id: 2, title: "Mage", type: ItemType.Playable, staked: false, queuedForStaking: false },
  { id: 3, title: "Dark wood", type: ItemType.Land, staked: false, queuedForStaking: false },
];

export default function Staking() {
  enum Filter {
    YourWallet,
    Staked,
  }

  const [rows, setRows] = useState<StakingItem[]>(initialRows);
  const [filter, setFilter] = useState<Filter>(Filter.YourWallet);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleStakingQueueChange = (row: StakingItem) => {
    const rowIndex = rows.findIndex((el) => el.id === row.id);
    rows[rowIndex].queuedForStaking = !rows[rowIndex].queuedForStaking;

    setRows([...rows]);
  };

  return (
    <Layout>
      <Wrapper>
        <div className="head">
          <Typography variant="h3">Staking</Typography>
          <br />
          <Typography variant="body1">
            Is a vital and key component of our ecosystem. It allows for equal distribution of tokens, it rewards long
            term investors and prevents cheating in game. More about staking in out <Link href="/paper">LitePaper</Link>
            .
          </Typography>
        </div>

        <br />

        <Tabs value={filter} onChange={(event, newValue) => setFilter(newValue)}>
          <Tab label="Your Wallet" />
          <Tab label="Staking" />
        </Tabs>

        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NFT Token</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: StakingItem) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <div className="title">
                      <Image
                        className="image"
                        src={knight.src}
                        alt="Knight"
                        priority
                        width={50}
                        height={50}
                        objectFit="cover"
                      />
                      <span>{row.title}</span>
                    </div>
                  </TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">
                    {row.staked ? (
                      <span>Staked</span>
                    ) : (
                      <Button
                        small
                        text={row.queuedForStaking ? "Remove selection" : "Select For Staking"}
                        onClick={() => handleStakingQueueChange(row)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <br />

        <Paper className="tostake">
          <Grid container justifyContent="space-between">
            {rows.filter((el) => el.queuedForStaking).length ? (
              <>
                <Grid item>You selected {rows.filter((el) => el.queuedForStaking).length} items for staking</Grid>
                <Grid item>
                  <Button text="Stake" small onClick={() => setModalOpen(true)} />
                </Grid>
              </>
            ) : (
              <Grid item>Please select character you want to stake.</Grid>
            )}
          </Grid>
        </Paper>
      </Wrapper>
      <StakingModal
        open={modalOpen}
        handleOpenState={setModalOpen}
        stakeQueue={rows.filter((el) => el.queuedForStaking)}
      />
    </Layout>
  );
}
