import styled from "@emotion/styled";
import { faBars } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@mui/material/Grid";
import Brand from "components/Brand";

import { useLayout } from "./store";

const NavbarContainer = styled(Grid)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  z-index: 10;
  border-bottom: 1px solid #2c2c2c;
  background: ${({ theme }) => theme.bg1};
`;

const GridWrapper = styled(Grid)`
  height: 100%;
  padding: 0 1rem;
`;

const BrandWrapper = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ActionArea = styled(Grid)`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default function Navbar() {
  const { openMenu } = useLayout();

  return (
    <NavbarContainer item>
      <GridWrapper container justifyContent="space-between" alignContent="center">
        <BrandWrapper item>
          <Brand />
        </BrandWrapper>
        <ActionArea item xs>
          <FontAwesomeIcon icon={faBars} onClick={openMenu} />
        </ActionArea>
      </GridWrapper>
    </NavbarContainer>
  );
}
