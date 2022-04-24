import { useMediaQuery } from "@mui/material";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import Spinner from "components/ui/Spinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import * as THREE from "three";

export interface Props extends Omit<PrimitiveProps, "object"> {
  glb: string;
}

export function Model({ glb, ...props }: Props) {
  const { scene, animations } = useGLTF(glb);
  const [mixer, setMixer] = useState<THREE.AnimationMixer>();

  useEffect(() => {
    scene.traverse((obj) => (obj.receiveShadow = obj.castShadow = true));

    if (!animations.length) {
      return;
    }
    const mixer = new THREE.AnimationMixer(scene);
    setMixer(mixer);
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }, [animations]);

  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return <primitive object={scene} {...props} />;
}

export function Character() {
  const large = useMediaQuery("(max-width: 1350px)");
  const medium = useMediaQuery("(max-width: 800px)");

  const settings = {
    modelPosition: [1.4, 0, 1],
    scale: 4,
  };

  if (large) {
    settings.modelPosition = [1.2, 0, 1];
    settings.scale = 4;
  }

  if (medium) {
    settings.modelPosition = [1, 0, 1];
    settings.scale = 3.5;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Canvas
        shadows
        camera={{
          fov: 45,
          position: [3, -1.4, 5],
        }}
      >
        <group position={[0.6, -2, 0]}>
          <ambientLight intensity={0.8} position={[1.4, 0, 1]} />
          <pointLight position={[100, 100, 100]} intensity={0.8} />
          <hemisphereLight color="#ffffff" groundColor="#8d11db" position={[-7, 25, 13]} intensity={0.25} />

          {/* <Box position={[1.2, 1, 0]}></Box> */}
          <Model position={settings.modelPosition} scale={settings.scale} glb="/models/tokens/2/model.glb" />

          {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[170, 170]} />
            <meshPhongMaterial color="#ff0000" opacity={1} transparent />
          </mesh> */}
        </group>

        {/* <PerspectiveCamera makeDefault ></PerspectiveCamera> */}

        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>
    </Suspense>
  );
}

export default dynamic(() => Promise.resolve(Character), {
  ssr: false,
});
