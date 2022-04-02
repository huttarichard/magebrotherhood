import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLayout } from "./store";

const MainGrid = styled(Grid)`
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up("lg")} {
    flex-direction: row;
    min-height: 100vh;
  }
`;

const SidebarGrid = styled(Grid)`
  display: none;

  ${({ theme }) => theme.breakpoints.up("lg")} {
    display: block;
    position: relative;
    height: 100%;
    width: 340px;
    border-right: 1px solid #2c2c2c;
  }
`;

const SidebarContent = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  border-right: 1px solid #2c2c2c;
  background: ${({ theme }) => theme.bg1};

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 340px;
  }
`;

const ContentGrid = styled(Grid)`
  position: relative;
  z-index: 9;
  padding-top: 60px;

  ${({ theme }) => theme.breakpoints.up("lg")} {
    width: calc(100% - 340px);
    padding-top: 0;
  }
`;

export interface LayoutProps {
  footer?: boolean;
}

export default function Layout({ footer = false, children }: PropsWithChildren<LayoutProps>) {
  const { menuOpened, closeMenu } = useLayout();
  const router = useRouter();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

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

      {isSmall && (
        <Drawer PaperProps={{ style: { minWidth: 320 } }} anchor="left" open={menuOpened} onClose={closeMenu}>
          <Sidebar closeIcon />
        </Drawer>
      )}

      {isSmall && <Navbar />}

      <ContentGrid item flexGrow="1">
        {children}

        {footer && <Footer />}
      </ContentGrid>
    </MainGrid>
  );
}
