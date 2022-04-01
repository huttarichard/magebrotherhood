import styled from "@emotion/styled";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

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
  display: none;
  position: relative;
  height: 100%;
  max-width: 340px;
  border-right: 1px solid #2c2c2c;

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: block;
  }
`;

const NavbarGrid = styled(Grid)`
  position: fixed;
  height: 60px;
  z-index: 10;
  display: block;
  border-bottom: 1px solid #2c2c2c;
  background: ${(props) => props.theme.bg1};

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: none;
  }
`;

const SidebarContent = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  max-width: 340px;
  border-right: 1px solid #2c2c2c;
  background: ${(props) => props.theme.bg1};
`;

const ContentGrid = styled(Grid)`
  position: relative;
  z-index: 9;
  padding-top: 60px;

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
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", closeMenu);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", closeMenu);
    };
  }, []);

  return (
    <MainGrid container>
      <SidebarGrid item>
        <SidebarContent>
          <Sidebar />
        </SidebarContent>
      </SidebarGrid>

      <Drawer PaperProps={{ style: { minWidth: 320 } }} anchor="left" open={menuOpened} onClose={closeMenu}>
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
