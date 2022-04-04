import styled from "@emotion/styled";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import { default as MuiModal, ModalProps as MuiModalProps } from "@mui/material/Modal";
import React from "react";

const Wrapper = styled(Box)`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  background-color: #000;
`;

export interface ModalProps extends MuiModalProps {
  wsx?: SxProps;
}

export default function Modal({ children, wsx, ...props }: React.PropsWithChildren<ModalProps>) {
  return (
    <MuiModal {...props}>
      <Wrapper sx={wsx}>{children}</Wrapper>
    </MuiModal>
  );
}
