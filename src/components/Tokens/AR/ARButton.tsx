import BadgeButton, { BadgeButtonProps } from "components/ui/BadgeButton";
import useAR, { Params } from "hooks/useAR";
import { ARMode } from "lib/ar";
import dynamic from "next/dynamic";
import React from "react";

import ARQuickIcon from "./ARIcon";

export function ARBadgeButton({ children, ...props }: Omit<BadgeButtonProps, "icon">) {
  const scale = props.small ? 1.4 : 1.8;
  return (
    <BadgeButton
      {...props}
      icon={
        <ARQuickIcon
          color={props.inverse ? "white" : "black"}
          style={{ width: "50px", transform: "scale(" + scale + ")" }}
        />
      }
      inverse={props.inverse}
    >
      {children}
    </BadgeButton>
  );
}

export interface ArQuickLookProps extends Omit<BadgeButtonProps, "icon"> {
  ar: Params;
}

function ARButton({ ar, ...props }: ArQuickLookProps) {
  const { error, mode, launching, progress, launcher } = useAR(ar);

  if (mode == ARMode.NONE) {
    return (
      <ARBadgeButton {...props} folded={true} disabled>
        Device not compatible
      </ARBadgeButton>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (launching) {
    return (
      <ARBadgeButton {...props} folded={false} disabled>
        {"Loading " + progress + "%"}
      </ARBadgeButton>
    );
  }

  return (
    <ARBadgeButton {...props} onClick={() => launcher()}>
      View in AR
    </ARBadgeButton>
  );
}

export default dynamic(() => Promise.resolve(ARButton), { ssr: false });
