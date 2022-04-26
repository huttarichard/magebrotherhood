import { ArcballControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import { SpinnerBlock } from "components/ui/Spinner";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Group } from "three";
import { AnimationMixer } from "three/src/animation/AnimationMixer";

export interface Props extends Omit<PrimitiveProps, "object"> {
  glb: string;
}

export function Model({ glb, ...props }: Props) {
  const { scene, animations } = useGLTF(glb);
  const [mixer, setMixer] = useState<AnimationMixer>();

  useEffect(() => {
    scene.traverse((obj) => {
      obj.receiveShadow = obj.castShadow = true;
      obj.frustumCulled = false;
    });

    if (!animations.length) {
      return;
    }
    const mixer = new AnimationMixer(scene);
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

export function Manipulator() {
  const { camera, size } = useThree();
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = -0.1 - window.scrollY / size.height;
    ref.current.position.y = -2.1 - window.scrollY / size.height;
    ref.current.position.x = 1.4 - (300 / window.innerWidth) * 1.8;
  });

  const height = Math.min(window.innerHeight / 180, 5);
  console.log(height);

  return (
    <>
      {/* <ambientLight intensity={2} /> */}
      <pointLight position={[0, 10, 1]} color="#ffefef" intensity={1.4} />
      <pointLight position={[3, 0, 5]} color="#ffefef" intensity={1.2} />
      <pointLight position={[3, 0, 5]} color="#8d11db" intensity={0.2} />
      <hemisphereLight color="#8d11db" position={[3, 0, 5]} intensity={0.6} />

      <group ref={ref} position={[1.2, -2.1, 0]}>
        <Model position={[0, 0, 0]} scale={height} glb="/models/tokens/2/model.glb" />

        {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[170, 170]} />
          <meshPhongMaterial color="#ff0000" opacity={1} transparent />
        </mesh> */}
      </group>

      <ArcballControls enableZoom={false} enableRotate={false} makeDefault camera={camera} />
    </>
  );
}

export default function Character() {
  return (
    <Suspense fallback={<SpinnerBlock />}>
      <Canvas shadows camera={{ fov: 50, position: [0, -1, 4] }}>
        <Manipulator />

        {/* <PerspectiveCamera></PerspectiveCamera> */}
      </Canvas>
    </Suspense>
  );
}
