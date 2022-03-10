import type { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";

declare global {
  interface HTMLElementTagNameMap {
    "model-viewer": ModelViewerElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": { [name: string]: any } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
