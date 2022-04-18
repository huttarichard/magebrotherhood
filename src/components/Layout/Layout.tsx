import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { PropsWithChildren, useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import Footer from "./Footer";
import { Head } from "./Head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLayout } from "./store";

const MainGrid = styled(Grid)`
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up("lg")} {
    flex-direction: row;
    justify-content: flex-end;
    min-height: 100vh;
  }
`;

const SidebarGrid = styled(Grid)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 340px;
  border-right: 1px solid #2c2c2c;
  background: ${({ theme }) => theme.bg1};
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

const FullpageColumn = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 30px;
`;

const ErrorBoundaryWrapper = styled(FullpageColumn)`
  justify-content: center;
  align-items: center;
`;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <ErrorBoundaryWrapper>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button text="Try Again" onClick={resetErrorBoundary} />
    </ErrorBoundaryWrapper>
  );
}

type LayoutKind = "FullpageColumn";

export interface LayoutProps {
  footer?: boolean;
  layout?: LayoutKind;
}

export default function Layout({ footer = false, layout, children }: PropsWithChildren<LayoutProps>) {
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

  let content;

  switch (layout) {
    case "FullpageColumn":
      content = <FullpageColumn>{children}</FullpageColumn>;
      break;
    default:
      content = children;
      break;
  }

  return (
    <MainGrid container>
      {!isSmall && (
        <SidebarGrid item>
          <Sidebar />
        </SidebarGrid>
      )}

      {isSmall && (
        <Drawer anchor="left" open={menuOpened} onClose={closeMenu}>
          <Sidebar closeIcon />
        </Drawer>
      )}

      {isSmall && <Navbar />}

      <ContentGrid item>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{content}</ErrorBoundary>

        {footer && <Footer />}
      </ContentGrid>
    </MainGrid>
  );
}

export interface PageLayoutProps extends PropsWithChildren<LayoutProps> {
  title: string;
  description: string;
}

export function PageLayout({ children, title, description, ...props }: PageLayoutProps) {
  return (
    <>
      <NextSeo title={`MagebrotherHood - ${title}`} description={description} />
      <Layout {...props}>{children}</Layout>
    </>
  );
}

export function PageLayoutWithHead(props: PageLayoutProps) {
  return (
    <PageLayout {...props}>
      <Head headline={props.title} description={props.description} />
      {props.children}
    </PageLayout>
  );
}
