import styled from "@emotion/styled";
import { faBars } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import Brand from "components/Brand";

import { useLayout } from "./store";

const ActionArea = styled(Grid)`
  display: block;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  height: 100%;
`;

const BrandWrapper = styled(Grid)`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const GridWrapper = styled(Grid)`
  height: 100%;
`;

export default function Navbar() {
  const { openMenu } = useLayout();

  return (
    <GridWrapper container justifyContent="space-between" alignContent="center">
      <BrandWrapper item>
        <Brand />
      </BrandWrapper>
      <ActionArea item xs>
        <div>
          <FontAwesomeIcon icon={faBars} onClick={openMenu} />
        </div>
      </ActionArea>
    </GridWrapper>
  );
}
