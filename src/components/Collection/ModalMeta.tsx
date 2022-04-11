import styled from "@emotion/styled";
import Modal from "components/ui/Modal";
import { useState } from "react";

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

export default function ModalMeta({ item }: { item: any }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <a onClick={() => setOpen(true)}>Open Metadata</a>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Code>
          <h1>IPFS Data</h1>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </Code>
      </Modal>
    </>
  );
}
