import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { default as MuiModal, ModalProps } from "@mui/material/Modal";
import React from "react";

export type { ModalProps };

const Wrapper = styled(Box)`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% - 30px);
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  background-color: #000;

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 800px;
  }
`;

export default function Modal({ children, ...props }: React.PropsWithChildren<ModalProps>) {
  return (
    <MuiModal {...props}>
      <Wrapper>{children}</Wrapper>
    </MuiModal>
  );
}
