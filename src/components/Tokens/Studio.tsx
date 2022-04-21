import styled from "@emotion/styled";
import { Stats } from "@react-three/drei";
import Spinner from "components/ui/Spinner";
import { FullToken } from "hooks/useTokens";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { ARButton, MetadataButton, MintButton, OpenseaButton } from "./Buttons";
import Canvas from "./Models/Canvas";
import CastleStage from "./Models/CastleStage";
import { Model } from "./Models/Model";

export interface ItemProps {
  token: FullToken;
  stats?: boolean;
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  canvas {
    touch-action: none;
  }
`;

const ActionArea = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;

  .button {
    margin-bottom: 10px;
  }
`;

export function Studio({ token, stats }: ItemProps) {
  return (
    <Wrapper>
      <Suspense fallback={<Spinner />}>
        {stats && <Stats />}
        <Canvas>
          <color attach="background" args={["#fff"]} />
          <ambientLight color={"#8d11db"} intensity={0.6} />
          <CastleStage>
            <Model scale={20} glb={token.models.glb} />
          </CastleStage>
        </Canvas>

        <ActionArea>
          <ARButton className="button" folded inverse models={token.models} />
          <MetadataButton className="button" folded inverse token={token} />
          <MintButton className="button" folded inverse token={token} />
          <OpenseaButton className="button" folded inverse token={token} />
        </ActionArea>
      </Suspense>
    </Wrapper>
  );
}

export default dynamic(() => Promise.resolve(Studio), {
  ssr: false,
});
