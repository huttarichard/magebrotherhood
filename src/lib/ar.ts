import { isAndroid } from "react-device-detect";

export type ARModeKind = "quick-look" | "scene-viewer" | "webxr" | "none";

export const ARMode: { [index: string]: ARModeKind } = {
  QUICK_LOOK: "quick-look",
  SCENE_VIEWER: "scene-viewer",
  WEBXR: "webxr",
  NONE: "none",
};

const noArViewerSigil = "#model-viewer-no-ar-fallback";
export interface ArLaunchParams {
  resizable: boolean;
  link: string;
  soundURL?: string;
}

export interface ArLaunchParamsOptions extends ArLaunchParams {
  error?: () => void;
}

export function isQuickLookSupported(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const a = document.createElement("a");
  const supported = a.relList.supports("ar");
  return supported;
}

export function launchIOSQuick(src: string, arParams: ArLaunchParams) {
  const anchor = document.createElement("a");
  anchor.setAttribute("rel", "ar");
  anchor.appendChild(document.createElement("img"));
  anchor.setAttribute("href", src);
  anchor.click();
}

export function isSceneViewerSupported(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return isAndroid;
}

export function launchAndroidSceneViewer(src: string, arParams: ArLaunchParams) {
  const location = window.location.toString();
  const locationUrl = new URL(location);
  const modelUrl = new URL(src, location);
  const params = new URLSearchParams(modelUrl.search);
  const a = document.createElement("a");

  locationUrl.hash = noArViewerSigil;

  // modelUrl can contain title/link/sound etc.
  params.set("mode", "ar_preferred");
  if (!params.has("disable_occlusion")) {
    params.set("disable_occlusion", "true");
  }
  if (!arParams.resizable) {
    params.set("resizable", "false");
  }
  if (arParams.soundURL) {
    const soundUrl = new URL(arParams.soundURL, location);
    params.set("sound", soundUrl.toString());
  }
  if (arParams.link) {
    const linkUrl = new URL(arParams.link, location);
    params.set("link", linkUrl.toString());
  }

  const modelURL = encodeURIComponent(modelUrl.toString());
  const fallbackURL = encodeURIComponent(locationUrl.toString());

  const intent = `intent://arvr.google.com/scene-viewer/1.0?${
    params.toString() + "&file=" + modelURL
  }#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${fallbackURL};end;`;

  const undoHashChange = () => {
    if (self.location.hash === noArViewerSigil) {
      arParams.error();
      // The new history will be the current URL with a new hash.
      // Go back one step so that we reset to the expected URL.
      // NOTE(cdata): this should not invoke any browser-level navigation
      // because hash-only changes modify the URL in-place without
      // navigating:
      self.history.back();
      console.warn("Error while trying to present in AR with Scene Viewer");
      console.warn("Falling back to next ar-mode");
    }
  };

  self.addEventListener("hashchange", undoHashChange, { once: true });

  a.setAttribute("href", intent);
  console.info("Attempting to present in AR with Scene Viewer...");
  a.click();
}
