import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { default as MuiModal, ModalProps } from "@mui/material/Modal";

interface StyledModalProps {
  children: JSX.Element[];
  modalProps: ModalProps;
}

const Wrapper = styled(Box)`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  background-color: #000;

  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 500px;
  }
`;

export default function Modal({ children, modalProps }: StyledModalProps) {
  return (
    <MuiModal {...modalProps}>
      <Wrapper>{children}</Wrapper>
    </MuiModal>
  );
}
