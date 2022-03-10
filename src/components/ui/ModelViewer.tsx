import "@google/model-viewer";

import React from "react";

export default function Model(props: React.PropsWithChildren<any>) {
  return <model-viewer {...props}>{props.children}</model-viewer>;
}
