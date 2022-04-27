import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
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

export default function FrameIDPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const token = useToken(id, { metadata: true });
  const [h, setH] = useState<number>(0);
  const dimensions = useWindowSize();

  useEffect(() => setH(dimensions.height), [dimensions.height]);

  if (token.error) {
    return <div>{token.error?.message}</div>;
  }

  return (
    <>
      <Global styles={GlobalStyles}></Global>

      <Wrapper height={h}>
        {token.loading ? (
          <SpinnerBlock>Loading Studio...</SpinnerBlock>
        ) : (
          <Studio ar fov={40} token={token.data as FullToken} />
        )}
      </Wrapper>
    </>
  );
}
