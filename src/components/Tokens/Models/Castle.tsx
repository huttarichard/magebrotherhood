// import { useGLTF } from "@react-three/drei/core/useGLTF";
import { useGLTF } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";

export default function Castle(props: Omit<PrimitiveProps, "object">) {
  const gltf = useGLTF("/models/castle.glb");
  return <primitive {...props} object={gltf.scene} />;
}

useGLTF.preload("/models/castle.glb");
