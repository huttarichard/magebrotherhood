import styled from "@emotion/styled";
import { faBinary } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BadgeButton, { BadgeButtonProps } from "components/ui/BadgeButton";
import Modal from "components/ui/Modal";
import { FullToken } from "hooks/useTokens";
import { useState } from "react";

interface ButtonProps extends Omit<BadgeButtonProps, "icon"> {
  token: FullToken;
}

const Code = styled.div`
  pre {
    max-width: 600px;
    overflow-y: scroll;
    font-size: 15px;
  }

  h1 {
    margin-top: 10px;
  }
`;

export default function MetadataButton({ token, ...props }: ButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <BadgeButton
        {...props}
        icon={<FontAwesomeIcon style={{ height: "50px", width: "50px", transform: "scale(0.5)" }} icon={faBinary} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        View Metadata
      </BadgeButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Code>
          <h1>IPFS Data</h1>
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </Code>
      </Modal>
    </>
  );
}
