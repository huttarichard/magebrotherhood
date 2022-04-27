import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { PageLayout } from "components/Layout/Layout";
import Studio from "components/Tokens/Studio";
import { SpinnerBlock } from "components/ui/Spinner";
import { FullToken, useToken } from "hooks/useTokens";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

const Wrapper = styled.div<{ height: number }>`
  position: relative;
  height: ${(props) => props.height}px;

  ${(props) => props.theme.breakpoints.up("lg")} {
    height: 100%;
    max-height: 100vh;
  }
`;

const GlobalStyles = css`
  body,
  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: fixed;
    * {
      user-select: none;
    }
  }
`;

export default function StudioPage() {
  const router = useRouter();
  const token = useToken(router.query.id as string);
  const [h, setH] = useState<number>(0);
  const dimensions = useWindowSize();

  useEffect(() => setH(dimensions.height - 60), [dimensions.height]);

  return (
    <PageLayout title="Studio" description="Explore characters from our metaverse.">
      <Global styles={GlobalStyles}></Global>
      <Wrapper height={h}>
        {token.loading ? (
          <SpinnerBlock>Loading Studio...</SpinnerBlock>
        ) : (
          <Studio ar opensea metadata mint token={token.data as FullToken} />
        )}
      </Wrapper>
    </PageLayout>
  );
}
