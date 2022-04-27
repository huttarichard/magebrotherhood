import { CameraShake, MeshReflectorMaterial, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PrimitiveProps } from "@react-three/fiber";
import { SpinnerBlock } from "components/ui/Spinner";
import { Suspense } from "react";
import { Color } from "three";

export function Logo({ ...props }: Omit<PrimitiveProps, "object">) {
  const { scene } = useGLTF("/models/logo_icon_vertical.glb");

  scene.traverse((obj) => {
    obj.receiveShadow = obj.castShadow = true;
    obj.frustumCulled = false;
  });

  return <primitive object={scene} {...props} />;
}

export default function FramePreviewPage() {
  return (
    <Suspense fallback={<SpinnerBlock />}>
      <Canvas
        shadows
        linear
        dpr={[1, 2]}
        camera={{ fov: 40, position: [0, 1, 15] }}
        onCreated={({ gl }) => {
          // gl.toneMapping = Uncharted2ToneMapping;
          gl.setClearColor(new Color("#020207"));
        }}
      >
        <pointLight position={[0, 10, 1]} color="#ffefef" intensity={1.4} />
        <pointLight position={[3, 0, 5]} color="#ffefef" intensity={1.2} />
        <pointLight position={[3, 0, 5]} color="#8d11db" intensity={0.2} />
        <hemisphereLight color="#8d11db" position={[3, 0, 5]} intensity={0.6} />

        <group position={[0, -4, 0]}>
          <Logo position={[0, 0, 0]} scale={0.8} />
          <CameraShake />
          <Stars count={10000} />

          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              mirror={1}
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
          </mesh>
        </group>

        <OrbitControls autoRotate enableZoom={false} makeDefault />
      </Canvas>
    </Suspense>
  );
}
