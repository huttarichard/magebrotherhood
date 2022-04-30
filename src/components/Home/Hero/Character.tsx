import { ArcballControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import { SpinnerBlock } from "components/ui/Spinner";
import useOnScreen from "hooks/useOnScreen";
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

  const height = Math.min(window.innerHeight / 130, 8);

  return (
    <>
      {/* <ambientLight intensity={2} /> */}
      <pointLight position={[0, 10, 1]} color="#ffefef" intensity={1.4} />
      <pointLight position={[3, 0, 5]} color="#ffefef" intensity={1.2} />
      <pointLight position={[3, 0, 5]} color="#8d11db" intensity={0.2} />
      <hemisphereLight color="#8d11db" position={[3, 0, 5]} intensity={0.6} />

      <group ref={ref} position={[1.2, -2.1, 0]}>
        <Model position={[0, 0, 0]} scale={height} glb="/models/tokens/2/model.glb" />
      </group>

      <ArcballControls enableZoom={false} enableRotate={false} makeDefault camera={camera} />
    </>
  );
}

export default function Character() {
  const canvas = useRef<any>();
  const visible = useOnScreen(canvas);

  return (
    <Suspense fallback={<SpinnerBlock />}>
      <Canvas ref={canvas} shadows camera={{ fov: 50, position: [0, -1, 4] }}>
        {visible && <Manipulator />}
      </Canvas>
    </Suspense>
  );
}
