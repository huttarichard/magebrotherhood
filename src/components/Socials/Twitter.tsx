import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTracking } from "hooks/useTracking";
import { AnchorHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

export default function Twitter({
  children,
  ...props
}: PropsWithChildren<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>) {
  const tracking = useTracking();

  return (
    <a
      className="twitter"
      href="https://twitter.com/MageBrotherhood"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      onClick={(e) => {
        tracking.clickImportantButton();
        props.onClick?.(e);
      }}
      {...props}
    >
      <FontAwesomeIcon icon={faTwitter} size={"2x"} />
      {children}
    </a>
  );
}
