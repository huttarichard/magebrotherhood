declare module "@shopify/screenshot-glb/dist/capture-screenshot" {
  export function captureScreenshot(options: any): Promise<void>;
}
declare module "@shopify/screenshot-glb/dist/file-server" {
  export class FileServer {
    constructor(args: string);
    port: string;
    start(): Promise<any>;
    stop(): Promise<any>;
  }
}
declare module "@shopify/screenshot-glb/dist/prepare-app-options" {
  export function prepareAppOptions(options: any): any;
}
