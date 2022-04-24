// import { useGLTF } from "@react-three/drei/core/useGLTF";
import { useGLTF } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";
import { useEffect } from "react";

export default function Castle(props: Omit<PrimitiveProps, "object">) {
  const gltf = useGLTF("/models/castle.glb");
  useEffect(() => {
    Object.values((gltf as any).nodes).forEach((node: any) => {
      if (node.isMesh) {
        // Set up shadows
        node.receiveShadow = node.castShadow = true;
      }
    });
  });
  return <primitive {...props} object={gltf.scene} />;
}

useGLTF.preload("/models/castle.glb");
