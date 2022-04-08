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
import { FormattedMessage, useIntl } from "react-intl";

import Layout from "../components/Layout/Layout";

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

  const intl = useIntl();

  const [rows, setRows] = useState<StakingItem[]>(initialRows);
  const [filter, setFilter] = useState<Filter>(Filter.YourWallet);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleStakingQueueChange = (row: StakingItem) => {
    const rowIndex = rows.findIndex((el) => el.id === row.id);
    rows[rowIndex].queuedForStaking = !rows[rowIndex].queuedForStaking;

    setRows([...rows]);
  };

  // i18n
  const tabLabelYourWallet = intl.formatMessage({
    defaultMessage: "Your Wallet",
    id: "staking_page_tab_label_your_wallet",
  });

  const tabLabelYourStaking = intl.formatMessage({
    defaultMessage: "Staking",
    id: "staking_page_tab_label_staking",
  });

  const tokenStakeButtonTextSelect = intl.formatMessage({
    defaultMessage: "Select For Staking",
    id: "staking_page_token_stake_button_text_select",
  });

  const tokenStakeButtonTextUnselect = intl.formatMessage({
    defaultMessage: "Remove selection",
    id: "staking_page_token_stake_button_text_unselect",
  });

  return (
    <Layout>
      <Wrapper>
        <div className="head">
          <Typography variant="h3">
            <FormattedMessage defaultMessage="Staking" id="staking_page_title" />
          </Typography>
          <br />
          <Typography variant="body1">
            <FormattedMessage
              defaultMessage="Is a vital and key component of our ecosystem. It allows for equal distribution of tokens, it rewards long term investors and prevents cheating in game. More about staking in out"
              id="staking_page_description"
            />
            &nbsp;
            <Link href="/paper">
              <a>
                <FormattedMessage defaultMessage="LitePaper" id="staking_page_description_link_text" />
              </a>
            </Link>
            .
          </Typography>
        </div>

        <br />

        <Tabs value={filter} onChange={(event, newValue) => setFilter(newValue)}>
          <Tab label={tabLabelYourWallet} />
          <Tab label={tabLabelYourStaking} />
        </Tabs>

        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Staking table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormattedMessage defaultMessage="NFT Token" id="staking_page_table_header_nft_token" />
                </TableCell>
                <TableCell align="right">
                  <FormattedMessage defaultMessage="Amount" id="staking_page_table_header_amount" />
                </TableCell>
                <TableCell align="right">
                  <FormattedMessage defaultMessage="Actions" id="staking_page_table_header_actions" />
                </TableCell>
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
                        text={row.queuedForStaking ? tokenStakeButtonTextUnselect : tokenStakeButtonTextSelect}
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
              <Grid item>
                <FormattedMessage
                  defaultMessage="Please select character you want to stake."
                  id="staking_page_staking_instruction"
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Wrapper>
    </Layout>
  );
}
