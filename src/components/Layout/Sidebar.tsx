import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowsLeftRight,
  faCartArrowDown,
  faClose,
  faCoinBlank,
  faCommentsQuestion,
  faHouse,
  faMoneyCheckDollar,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Brand from "components/Brand";
import Link from "next/link";

import HeaderWallet from "./HeaderWallet";
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
    font-weight: 700;
    border-bottom: 1px solid #cfcfcf29;
    height: 4rem;
    line-height: 3.6rem;
    display: flex;

    &:last-of-type {
      border: 0;
    }

    .MuiBadge-root svg {
      padding-top: 5px;
    }
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

  .MuiBadge-badge {
    font-size: 15px;
    letter-spacing: -0.8px;
    padding: 11px;
    top: 7px;
    background: ${({ theme }) => theme.primary2};
  }
`;

const Bottom = styled(Grid)`
  margin: 0;
`;

export interface LayoutNavbarProps {
  closeIcon?: boolean;
}

interface ItemProps {
  icon: IconDefinition;
  name: string;
  link?: string;
}

function Item({ icon, name, link }: ItemProps) {
  return (
    <li>
      <Link href={link as string}>
        <a>
          <FontAwesomeIcon icon={icon} />
          <span>{name}</span>
        </a>
      </Link>
    </li>
  );
}

function ItemSoon({ icon, name }: ItemProps) {
  return (
    <li>
      <a>
        <Badge color="primary" badgeContent="soon">
          <FontAwesomeIcon icon={icon} />
          <span>{name}</span>
        </Badge>
      </a>
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
          <ItemSoon icon={faCartArrowDown} name="Marketplace" />
          <Item icon={faArrowsLeftRight} name="Swap" link="/swap" />
          <Item icon={faCommentsQuestion} name="FAQ" link="/faq" />
        </ul>
      </Grid>
      <Bottom item>
        <HeaderWallet />
      </Bottom>
    </Navbar>
  );
}
