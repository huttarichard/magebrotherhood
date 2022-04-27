import {
  ArLaunchParams,
  ArLaunchParamsOptions,
  ARMode,
  ARModeKind,
  isQuickLookSupported,
  isSceneViewerSupported,
  launchAndroidSceneViewer,
  launchIOSQuick,
} from "lib/ar";
import { useEffect, useState } from "react";

import { downloadAsBlobURL } from "./useBlobDownload";

interface ARState {
  mode: ARModeKind;
  launching: boolean;
  launcher: () => Promise<void>;
  progress: number;
  error: Error | null;
}

export interface Params extends ArLaunchParams {
  glb?: string;
  usdz?: string;
  reality?: string;
}

export default function useAR(params: Params): ARState {
  const arParams: ArLaunchParams = {
    link: params.link,
    resizable: params.resizable,
    soundURL: params.soundURL,
  };

  const [state, set] = useState<ARState>({
    mode: isQuickLookSupported() ? ARMode.QUICK_LOOK : ARMode.NONE,
    launching: false,
    launcher: () => Promise.reject(new Error("Device is not supported")),
    progress: 0,
    error: null,
  });

  const unsupported = () => {
    set({
      ...state,
      error: new Error("Scene viewer not supported on this device"),
      mode: ARMode.NONE,
    });
  };

  const launchReality = async () => {
    set({ ...state, launching: true });
    launchIOSQuick(params.reality as string, arParams);
    set({ ...state, launching: false, progress: 100 });
  };

  const launchUSDZ = async () => {
    set({ ...state, launching: true, progress: 0 });
    try {
      const blobURL = await downloadAsBlobURL(params.usdz as string, "model/vnd.usdz+zip", (p) => {
        set({ ...state, progress: p });
      });
      launchIOSQuick(blobURL, arParams);
    } catch (e) {
      set({ ...state, error: e });
    } finally {
      set({ ...state, launching: false, progress: 100 });
    }
  };

  const launchGLB = async () => {
    set({ ...state, launching: true, progress: 0 });
    const args: ArLaunchParamsOptions = arParams;
    args.error = unsupported;
    launchAndroidSceneViewer(params.glb as string, args);
    set({ ...state, launching: false, progress: 100 });
  };

  useEffect(() => {
    // Reality file, doesnt support blob urls
    if (isQuickLookSupported() && params.reality) {
      set({
        ...state,
        mode: ARMode.QUICK_LOOK,
        launcher: launchReality,
      });
      return;
    }

    // USDZ file, similar to reality, supports blob urls
    if (isQuickLookSupported() && params.usdz) {
      set({
        ...state,
        mode: ARMode.QUICK_LOOK,
        launcher: launchUSDZ,
      });
      return;
    }

    // GLB file, doesnt support blob urls
    if (isSceneViewerSupported()) {
      set({
        ...state,
        mode: ARMode.SCENE_VIEWER,
        launcher: launchGLB,
      });
      return;
    }

    set({
      ...state,
      mode: ARMode.NONE,
    });
  }, [params]);

  return state;
}
