import { Canvas as FiberCanvas, Props as CanvasProps } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

type Props = React.PropsWithChildren<
  CanvasProps & {
    cameraFov?: number;
    cameraPosition?: THREE.Vector3;
  }
>;

const Canvas = ({ children, cameraFov = 45, cameraPosition = new THREE.Vector3(5, 5, 5), ...props }: Props) => (
  <FiberCanvas camera={{ position: cameraPosition, fov: cameraFov }} dpr={[1, 2]} {...props}>
    {children}
  </FiberCanvas>
);

export default Canvas;
