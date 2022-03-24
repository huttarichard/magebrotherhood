import styled from "@emotion/styled";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { PropsWithChildren } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLayout } from "./store";

const MainGrid = styled(Grid)`
  height: 100%;
  flex-direction: column;

  ${(props) => props.theme.breakpoints.up("lg")} {
    flex-direction: row;
  }
`;

const SidebarGrid = styled(Grid)`
  border-right: 1px solid #2c2c2c;
  height: 100%;
  width: 340px;
  min-width: 340px;
  position: relative;
  display: none;

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: block;
  }
`;

const NavbarGrid = styled(Grid)`
  height: 60px;
  width: 100%;
  position: relative;
  display: block;
  border-bottom: 1px solid #2c2c2c;
  position: fixed;
  background: ${(props) => props.theme.bg1};
  z-index: 10;

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: none;
  }
`;

const SidebarContent = styled.div`
  height: 100%;
  width: 340px;
  position: fixed;
  background: ${(props) => props.theme.bg1};
  border-right: 1px solid #2c2c2c;
`;

const ContentGrid = styled(Grid)`
  padding-top: 60px;
  z-index: 9;
  position: relative;
  /* overflow: auto; */

  ${(props) => props.theme.breakpoints.up("lg")} {
    width: calc(100% - 340px);
    padding: 0;
  }
`;

export interface LayoutProps {
  footer?: boolean;
}

export default function Layout({ footer = false, children }: PropsWithChildren<LayoutProps>) {
  const { menuOpened, closeMenu } = useLayout();

  return (
    <MainGrid container>
      <SidebarGrid item>
        <SidebarContent>
          <Sidebar />
        </SidebarContent>
      </SidebarGrid>

      <Drawer PaperProps={{ style: { minWidth: 340 } }} anchor="left" open={menuOpened} onClose={closeMenu}>
        <SidebarContent>
          <Sidebar closeIcon />
        </SidebarContent>
      </Drawer>

      <NavbarGrid item>
        <Navbar />
      </NavbarGrid>

      <ContentGrid item flexGrow="1">
        {children}

        {footer && <Footer />}
      </ContentGrid>
    </MainGrid>
  );
}
