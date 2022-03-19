import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faArrowsLeftRight,
  faCartArrowDown,
  faClose,
  faCoinBlank,
  faCommentsQuestion,
  faHouse,
  faMoneyCheckDollar,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import Brand from "components/Brand";
import Link from "next/link";

import { useLayout } from "./store";

const Navbar = styled(Grid)`
  padding: 2rem;
  transition: transform 0.3s;
  background-color: #111;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;

  .close-icon {
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
  }

  ul {
    margin: 0;
    margin-top: 5rem;
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.6rem;
    font-weight: 600;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 1.2rem;
    line-height: 2rem;

    ${(props) => props.theme.breakpoints.up("lg")} {
      font-size: 1.4rem;
      line-height: 2.7rem;
    }

    svg {
      display: inline-block;
      width: 50px;
      height: 30px;
      font-size: 20px;
      object-fit: contain;
      margin-right: 1rem;
    }
  }
`;

export interface LayoutNavbarProps {
  closeIcon?: boolean;
}

interface ItemProps {
  icon: IconDefinition;
  name: string;
  link: string;
}

function Item({ icon, name, link }: ItemProps) {
  return (
    <li>
      <Link href={link}>
        <a>
          <FontAwesomeIcon icon={icon} />
          <span>{name}</span>
        </a>
      </Link>
    </li>
  );
}

export default function LayoutNavbar({ closeIcon = false }: LayoutNavbarProps) {
  const { closeMenu } = useLayout();

  return (
    <Navbar container direction="column">
      {closeIcon && <FontAwesomeIcon className="close-icon" icon={faClose} onClick={closeMenu} />}
      <Grid item xs="auto">
        <Brand block />
      </Grid>
      <Grid item flexGrow="1">
        <ul>
          <Item icon={faHouse} name="Home" link="/" />
          <Item icon={faRectangleVerticalHistory} name="Collections" link="/collections" />
          <Item icon={faCoinBlank} name="Staking" link="/staking" />
          <Item icon={faMoneyCheckDollar} name="Affiliate" link="/affiliate" />
          <Item icon={faCartArrowDown} name="Marketplace" link="/marketplace" />
          <Item icon={faArrowsLeftRight} name="Swap" link="/swap" />
          <Item icon={faCommentsQuestion} name="FAQ" link="/faq" />
        </ul>
      </Grid>
      <Grid item>bottom</Grid>
    </Navbar>
  );
}
