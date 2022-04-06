import { captureScreenshot } from "@shopify/screenshot-glb/dist/capture-screenshot";
import { FileServer } from "@shopify/screenshot-glb/dist/file-server";
import { prepareAppOptions } from "@shopify/screenshot-glb/dist/prepare-app-options";
import { readFileSync } from "fs";
import { glob } from "glob";
import path, { basename } from "path";

const inputDir = path.resolve(__dirname + "/../public/models");
const destDir = path.resolve(__dirname + "/../public/images/tokens");

export async function takeScreenshot(file: string) {
  const output = path.join(destDir, basename(file, ".glb") + ".png");

  const modelServer = new FileServer(path.dirname(file));
  await modelServer.start();

  console.info("Generating screenshot: ", output);

  const options = prepareAppOptions({
    modelPort: modelServer.port,
    argv: {
      input: file,
      output,
      width: 1400,
      height: 1400,
      image_format: "image/png",
      image_quality: 0.95,
      timeout: 90000,
      debug: true,
      verbose: true,
      // model_viewer_attributes: "skybox-image=/studio.hdr",
    },
  });

  try {
    await captureScreenshot({ ...options, devicePixelRatio: 1.0 });
  } catch (err) {
    console.info(`❌ ERROR: ${err}`);
  }

  await modelServer.stop();

  return readFileSync(output);
}

glob(path.join(inputDir, "**/*.glb"), async (err, files) => {
  if (err) throw err;

  for (const file of files) {
    await takeScreenshot(file);
  }
});
