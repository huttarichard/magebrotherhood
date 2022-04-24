import { useState } from "react";

export const downloadAsBlobURL = async (url: string, contentType: string, setProgress: (p: number) => void) => {
  const response = await fetch(url);
  const contentLength = response.headers.get("content-length");
  const total = parseInt(contentLength || "0", 10);
  let loaded = 0;

  const stream = new ReadableStream({
    async start(controller) {
      if (!response || !response.body) {
        return;
      }
      const reader = response.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        loaded += value.byteLength;
        setProgress(Math.floor(loaded / (total / 100)));
        controller.enqueue(value);
      }
      controller.close();
    },
  });
  const res = new Response(stream);
  let blob = await res.blob();
  blob = blob.slice(0, blob.size, contentType);
  const blobURL = window.URL.createObjectURL(blob);
  return blobURL;
};

export function useBlobDownload() {
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [blobURL, setBlobURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const download = async (url: string, contentType: string) => {
    setDownloading(true);
    const result = await downloadAsBlobURL(url, contentType, (p) => {
      setProgress(p);
    });
    setBlobURL(result);
    setDownloaded(true);
    setDownloading(false);
    return result;
  };

  return { downloaded, downloading, blobURL, progress, download: download };
}
