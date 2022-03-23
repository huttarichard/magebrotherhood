import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { DataGrid, GridColumns, GridRenderCellParams, GridSelectionModel } from "@mui/x-data-grid";
import Button from "components/ui/Button";
import { useState } from "react";

import Layout from "../components/Layout/Layout";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin: 0 0 2rem;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 3rem;
    text-transform: uppercase;
  }
`;

enum ItemType {
  Playable,
  Land,
}

type StakingItem = {
  id: number;
  title: string;
  type: ItemType;
  staked: boolean;
};

const rows: StakingItem[] = [
  { id: 1, title: "Knight", type: ItemType.Playable, staked: true },
  { id: 2, title: "Mage", type: ItemType.Playable, staked: false },
  { id: 3, title: "Dark wood", type: ItemType.Land, staked: true },
];

const columns: GridColumns = [
  { field: "id", headerName: "ID", sortable: false },
  { field: "title", headerName: "Name", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: (params: GridRenderCellParams<StakingItem>) => {
      const { staked } = params.row;
      if (staked) {
        return <button>Stake</button>;
      } else {
        return <button>Unstake</button>;
      }
    },
  },
];

export default function Staking() {
  enum Filter {
    All,
    Staked,
    Available,
  }

  const filterMap = {
    [Filter.All]: () => true,
    [Filter.Staked]: (el: StakingItem) => el.staked,
    [Filter.Available]: (el: StakingItem) => !el.staked,
  };

  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  console.log(selectionModel);

  const filteredRows = rows.filter(filterMap[filter]);

  return (
    <Layout>
      <Wrapper>
        <h1>Staking</h1>
        <Tabs value={filter} onChange={(event, newValue) => setFilter(newValue)}>
          <Tab label="All items" />
          <Tab label="Staked" />
          <Tab label="Available" />
        </Tabs>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          checkboxSelection
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableExtendRowFullWidth
          hideFooter
        />
        {!!selectionModel.length && (
          <Grid container justifyContent="space-between" sx={{ mb: 8 }}>
            <Grid item>
              <Button text="Stake Selected" />
            </Grid>
            <Grid item>
              <Button text="Unstake Selected" />
            </Grid>
          </Grid>
        )}
      </Wrapper>
    </Layout>
  );
}
