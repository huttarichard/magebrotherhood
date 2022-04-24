import { Canvas as FiberCanvas, Props as CanvasProps, Vector3 } from "@react-three/fiber";
import React from "react";

type Props = React.PropsWithChildren<
  CanvasProps & {
    cameraFov?: number;
    cameraPosition?: Vector3;
  }
>;

const Canvas = ({ children, cameraFov = 45, cameraPosition = [5, 5, 5], ...props }: Props) => (
  <FiberCanvas camera={{ position: cameraPosition, fov: cameraFov }} dpr={[1, 2]} {...props}>
    {children}
  </FiberCanvas>
);

export default Canvas;
