import {
  ArLaunchParams,
  ArLaunchParamsOptions,
  ARMode,
  isQuickLookSupported,
  isSceneViewerSupported,
  launchAndroidSceneViewer,
  launchIOSQuick,
} from "lib/ar";
import { useEffect, useState } from "react";

import { useBlobDownload } from "./useBlobDownload";

interface HookOutput {
  launching: boolean;
  progress: number;
  error: Error | null;
  supported: boolean;
  launch: () => Promise<void>;
}

export type Models = {
  glb: string;
  usdz: string;
};

const UNSUPPORTED = new Error("Scene viewer not supported on this device");

const UnsupportedHookOuput: HookOutput = {
  supported: false,
  error: UNSUPPORTED,
  launching: false,
  progress: 0,
  launch: () => Promise.reject(UNSUPPORTED),
};

export default function useAR(src: Models, arParams: ArLaunchParams) {
  const realityKit = src.usdz.includes(".reality");
  const contentType = !realityKit ? "model/vnd.usdz+zip" : "model/vnd.reality";
  const quickLook = useARQuickLook(src.usdz, contentType, arParams);
  const sceneViewer = useSceneViewer(src.glb, arParams);

  if (isQuickLookSupported()) {
    return { mode: ARMode.QUICK_LOOK, ...quickLook };
  }

  if (isSceneViewerSupported()) {
    return { mode: ARMode.SCENE_VIEWER, ...sceneViewer };
  }

  return UnsupportedHookOuput;
}

export function useARQuickLook(src: string, contentType: string, arParams: ArLaunchParams): HookOutput {
  const blob = useBlobDownload();
  const [error, setError] = useState<Error | null>(null);
  const [launching, setLaunching] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const launch = async () => {
    setLaunching(true);
    try {
      const blobURL = await blob.download(src, contentType);
      launchIOSQuick(blobURL, arParams);
    } catch (e) {
      setError(e);
    } finally {
      setLaunching(false);
    }
  };

  useEffect(() => setProgress(blob.progress), [blob.progress]);

  return { launching, progress, error, supported: isQuickLookSupported(), launch };
}

export function useSceneViewer(src: string, arParams: ArLaunchParams): HookOutput {
  const [error, setError] = useState<Error | null>(null);
  const [supported, setSupported] = useState<boolean>(isSceneViewerSupported());
  const [launching, setLaunching] = useState<boolean>(false);

  const unsupported = () => {
    setSupported(false);
    setError(new Error("Scene viewer not supported on this device"));
  };

  const launch = async () => {
    setLaunching(true);
    const params: ArLaunchParamsOptions = arParams;
    params.error = unsupported;
    if (supported) {
      launchAndroidSceneViewer(src, arParams);
      setLaunching(false);
    } else {
      unsupported();
    }
  };

  return { launching, progress: 0, error, supported, launch };
}
