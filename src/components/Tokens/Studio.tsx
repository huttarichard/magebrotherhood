import styled from "@emotion/styled";
import { Environment, MeshReflectorMaterial, PresentationControls, Stats } from "@react-three/drei";
import Spinner from "components/ui/Spinner";
import { FullToken } from "hooks/useTokens";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { ARButton, MetadataButton, MintButton, OpenseaButton } from "./Buttons";
import Canvas from "./Models/Canvas";
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
        {/* <Canvas>
          <color attach="background" args={["#fff"]} />
          <ambientLight color={"#8d11db"} intensity={0.6} />
          <CastleStage>
            <Model scale={20} glb={token.models.glb} />
          </CastleStage>
        </Canvas> */}
        <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 3, 7], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            // snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
          >
            {/* <TransformControls> */}
            <Model castShadow receiveShadow position={[0, -1, 0]} scale={5} glb={token.models.glb} />
            {/* </TransformControls> */}
          </PresentationControls>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.17, 0]}>
            <planeGeometry args={[170, 170]} />
            <MeshReflectorMaterial
              blur={[500, 500]}
              resolution={2048}
              mixBlur={1.5}
              mixStrength={50}
              roughness={1}
              depthScale={0.7}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#121212"
              metalness={0.5}
              mirror={0}
            />
          </mesh>
          <Environment preset="city" />
          {/* <OrbitControls makeDefault /> */}
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
