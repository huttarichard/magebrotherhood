import { PresentationControls, Stage } from "@react-three/drei";
import React from "react";

import Castle from "./Castle";

export default function CastleStage({ children }: React.PropsWithChildren<unknown>) {
  return (
    <PresentationControls speed={1.5} global zoom={0.8} polar={[-0.2, Math.PI / 4]}>
      <Stage environment={"night"} intensity={0.5} shadows position={[0, 1, 0]}>
        {children}

        {/* <planeGeometry args={[30, 0]} /> */}
      </Stage>

      <mesh position={[0, 0, 0]}>
        <Castle scale={10} />
      </mesh>
    </PresentationControls>
  );
}
