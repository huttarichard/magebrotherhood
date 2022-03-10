import "@google/model-viewer/lib/model-viewer";

// import { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import Head from "next/head";
import Image from "next/image";

import Layout from "../../components/Layout/Layout";

export default function ID() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <style jsx>{`
          .Hotspot {
            background: #fff;
            border-radius: 32px;
            border: 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            box-sizing: border-box;
            cursor: pointer;
            height: 24px;
            padding: 8px;
            position: relative;
            transition: opacity 0.3s;
            width: 24px;
          }

          .Hotspot:not([data-visible]) {
            background: transparent;
            border: 4px solid #fff;
            box-shadow: none;
            height: 32px;
            pointer-events: none;
            width: 32px;
          }

          .Hotspot:focus {
            border: 4px solid rgb(0, 128, 200);
            height: 32px;
            outline: none;
            width: 32px;
          }

          .Hotspot > * {
            opacity: 1;
            transform: translateY(-50%);
          }

          .HotspotAnnotation {
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            color: rgba(0, 0, 0, 0.8);
            display: block;
            font-family: Futura, Helvetica Neue, sans-serif;
            font-size: 18px;
            font-weight: 700;
            left: calc(100% + 1em);
            max-width: 128px;
            overflow-wrap: break-word;
            padding: 0.5em 1em;
            position: absolute;
            top: 50%;
            width: max-content;
          }

          .Hotspot:not([data-visible]) > * {
            opacity: 0;
            pointer-events: none;
            transform: translateY(calc(-50% + 4px));
            transition: transform 0.3s, opacity 0.3s;
          }
        `}</style>
        <model-viewer
          class="min-h-[100vh] w-full"
          src="/assets/2.glb"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          poster="/data/2/poster.webp"
          shadow-intensity="1"
          animation-name="Armature.001|mixamo.com|Layer0"
          environment-image="/assets/studio.hdr"
          skybox-image="/assets/studio.hdr"
          autoplay
          min-field-of-view="80deg"
          disable-zoom
          max-camera-orbit="Infinity 90deg auto"
        >
          <button
            className="Hotspot"
            slot="hotspot-1"
            data-position="-0.32750255835575026m 1.388571179507904m 0.4491652455122156m"
            data-normal="-0.2986048198879707m -0.4614395947503901m 0.8354092781004223m"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">Here is some text</div>
          </button>
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          <button slot="ar-button" id="ar-button">
            View in your space
          </button>
          <div id="ar-prompt">
            <Image src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="hand" />
          </div>
        </model-viewer>
      </Layout>
    </>
  );
}
