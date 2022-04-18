import BadgeButton, { BadgeButtonProps } from "components/ui/BadgeButton";
import useAR from "hooks/useAR";
import { FullToken } from "hooks/useTokens";
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
  token: FullToken;
}

export default function ARButton({ token, ...props }: ArQuickLookProps) {
  const { error, launch, launching, progress, supported } = useAR(token.models, {
    link: "https://www.google.com",
    resizable: true,
  });

  if (!supported) {
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
    <ARBadgeButton {...props} onClick={() => launch()}>
      View in AR
    </ARBadgeButton>
  );
}
