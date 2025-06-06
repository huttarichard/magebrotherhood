import { Global } from "@emotion/react";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

type Container = Element | (() => Element | null) | null;

interface Props {
  defaultOpen?: boolean;
  edge: JSX.Element;
  edgeSize: number;
  container?: Container;
}

export default function SwipeableEdgeDrawer(props: React.PropsWithChildren<Props>) {
  const { children, defaultOpen = false, edge, edgeSize = 0 } = props;
  const [open, setOpen] = React.useState(defaultOpen);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${edgeSize}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={() => document.body}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={150}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -edgeSize,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          {edge}
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
