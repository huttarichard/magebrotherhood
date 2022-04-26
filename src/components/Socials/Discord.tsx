import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTracking } from "hooks/useTracking";
import { AnchorHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

export default function Discord({
  children,
  ...props
}: PropsWithChildren<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>) {
  const tracking = useTracking();

  return (
    <a
      className="discord"
      href="https://discord.gg/HgPQAHzp3Z"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discord"
      onClick={(e) => {
        tracking.clickImportantButton();
        props.onClick?.(e);
      }}
      {...props}
    >
      <FontAwesomeIcon icon={faDiscord} size={"2x"} />
      {children}
    </a>
  );
}
