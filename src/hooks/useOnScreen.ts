import React, { useEffect, useState } from "react";

export default function useOnScreen(ref: React.RefObject<Element>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (ref === null) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    observer.observe(ref.current as Element);

    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
