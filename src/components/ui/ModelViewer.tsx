import "@google/model-viewer";

import type { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import { useDebouncedEffect } from "hooks/useDebounce";
import useOnScreen from "hooks/useOnScreen";
import React, { createRef, useEffect, useMemo, useReducer, useState } from "react";

type Element = ModelViewerElement & HTMLDivElement;

interface ModelProps {
  [key: string]: any;
  animating?: boolean;
}

let counter = 0;

export default function Model(props: React.PropsWithChildren<ModelProps>) {
  const ref = createRef<HTMLDivElement>();
  const visible = useOnScreen(ref);
  const [_id] = useState(counter);
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    counter += 1;
  }, []);

  const id = "model-viewer-" + _id;

  const component = useMemo(() => {
    return (
      <model-viewer id={id} {...props}>
        {props.children}
      </model-viewer>
    );
    // eslint-disable-next-line
  }, [id]);

  const update = () => setTimeout(forceUpdate, 100);

  useDebouncedEffect(
    () => {
      const el = document.getElementById(id) as Element;

      // This helps to reschedule
      el.addEventListener("model-visibility", update);
      el.addEventListener("load", update);
      el.addEventListener("preload", update);

      if (!visible) {
        el.pause();
        el.style.display = "none";
        return;
      }
      el.style.display = "block";
      el.play();
    },
    [visible, id, x],
    200
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: "translate3d(0,0,0)",
        willChange: "auto",
      }}
      ref={ref}
    >
      {component}
    </div>
  );
  // return null;
}
