import styled from "@emotion/styled";
import { faBinary } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "@mui/material/Drawer";
import BadgeButton, { BadgeButtonProps } from "components/ui/BadgeButton";
import Modal from "components/ui/Modal";
import { FullToken } from "hooks/useTokens";
import { useState } from "react";
import { useWindowSize } from "react-use";

interface ButtonProps extends Omit<BadgeButtonProps, "icon"> {
  token: FullToken;
}

const Code = styled.div`
  padding: 10px;
  max-height: 600px;
  overflow: scroll;

  pre {
    max-width: 600px;
    overflow-y: scroll;
    font-size: 10px;
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

      <ModalMetadata open={open} token={token} onClose={() => setOpen(false)}></ModalMetadata>
    </>
  );
}

interface ModalMetadataProps {
  token: FullToken;
  open: boolean;
  onClose?: () => void;
}

export function ModalMetadata({ token, open, onClose }: ModalMetadataProps) {
  const { width } = useWindowSize();

  if (width <= 600) {
    return (
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        <Code>
          <h1>IPFS Data</h1>
          <p>This information represent data directly stored on IPFS</p>
          <hr />
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </Code>
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={onClose} wsx={{ width: "calc(100% - 30px)", maxWidth: "600px" }}>
      <Code>
        <h1>IPFS Data</h1>
        <p>This information represent data directly stored on IPFS</p>
        <hr />
        <pre>{JSON.stringify(token, null, 2)}</pre>
      </Code>
    </Modal>
  );
}
