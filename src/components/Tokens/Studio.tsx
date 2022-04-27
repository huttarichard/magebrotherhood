import styled from "@emotion/styled";
import { OrbitControls, Stats } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { SpinnerBlock } from "components/ui/Spinner";
import { FullToken } from "hooks/useTokens";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { ARButton, MetadataButton, MintButton, OpenseaButton } from "./Buttons";
import Canvas from "./Models/Canvas";
import Castle from "./Models/Castle";
import { Model } from "./Models/Model";

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

interface SceneProps {
  token: FullToken;
  position: Vector3;
}

function Scene({ token, position }: SceneProps) {
  return (
    <group position={position}>
      <spotLight position={[3, 7, 7]} intensity={4} angle={0.3} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
      <Model
        castShadow
        receiveShadow
        position={[0, -0.95, 0]}
        scale={5.5}
        glb={`/models/tokens/${token.id}/model.glb`}
      />
      <mesh castShadow receiveShadow position={[0, -1, 0]}>
        <Castle castShadow receiveShadow scale={2} />
      </mesh>
    </group>
  );
}

export interface StudioProps {
  token: FullToken;
  stats?: boolean;
  metadata?: boolean;
  mint?: boolean;
  opensea?: boolean;
  ar?: boolean;
  fov?: number;
}

export function Studio({ token, stats, metadata, mint, opensea, ar, fov }: StudioProps) {
  const loading = <SpinnerBlock>Loading Studio...</SpinnerBlock>;

  if (!token) {
    return loading;
  }

  return (
    <Wrapper>
      <Suspense fallback={loading}>
        {stats && <Stats />}

        <Canvas shadows camera={{ fov: fov ?? 50 }}>
          <ambientLight intensity={0.2} />
          <ambientLight color={"#8d11db"} intensity={0.15} />

          <Scene token={token} position={[0, -0.5, 0]} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.2}
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>

        <ActionArea>
          {ar && (
            <ARButton
              className="button"
              folded
              inverse
              ar={{
                glb: `/models/tokens/${token.id}/model.glb`,
                usdz: `/models/tokens/${token.id}/model.usdz`,
                link: "",
                resizable: true,
              }}
            />
          )}
          {metadata && <MetadataButton className="button" folded inverse token={token} />}
          {mint && <MintButton className="button" folded inverse token={token} />}
          {opensea && <OpenseaButton className="button" folded inverse token={token} />}
        </ActionArea>
      </Suspense>
    </Wrapper>
  );
}

export default dynamic(() => Promise.resolve(Studio), {
  ssr: false,
});
