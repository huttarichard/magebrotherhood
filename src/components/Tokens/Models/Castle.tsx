// import { useGLTF } from "@react-three/drei/core/useGLTF";
import { useGLTF } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";
import { useEffect } from "react";

export default function Castle(props: Omit<PrimitiveProps, "object">) {
  const { scene } = useGLTF("/models/environments/castle.glb");
  useEffect(() => {
    scene.traverse((obj) => (obj.receiveShadow = obj.castShadow = true));
  });
  return <primitive {...props} object={scene} />;
}

useGLTF.preload("/models/environments/castle.glb");
