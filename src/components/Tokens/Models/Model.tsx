import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

export interface Props extends Omit<PrimitiveProps, "object"> {
  glb: string;
}

export function Model({ glb, ...props }: Props) {
  const { scene, animations } = useGLTF(glb);
  const [mixer, setMixer] = useState<THREE.AnimationMixer>();

  useEffect(() => {
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
  // Here's the animation part
  // *************************

  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return <primitive object={scene} {...props} />;
}
