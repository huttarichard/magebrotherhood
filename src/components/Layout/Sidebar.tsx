import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowsLeftRight,
  faCartArrowDown,
  faClose,
  faCoinBlank,
  faCommentsQuestion,
  faFileContract,
  faHouse,
  faMoneyCheckDollar,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Brand from "components/Brand";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

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

    ${(props) => props.theme.breakpoints.down("md")} {
      margin-top: 2rem;
    }
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
  text-align: center;

  small {
    cursor: pointer;
    font-size: 1rem;
  }
`;

export interface LayoutNavbarProps {
  closeIcon?: boolean;
}

interface ItemProps {
  icon: IconDefinition;
  name: string | JSX.Element;
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
  const largeEnough = useMediaQuery("screen and (min-height: 735px)");
  if (!largeEnough) return null;

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
  const router = useRouter();

  return (
    <Navbar container direction="column">
      {closeIcon && <FontAwesomeIcon className="close-icon" icon={faClose} onClick={closeMenu} />}
      <Grid item xs="auto">
        <Brand block />
      </Grid>
      <Grid item flexGrow="1">
        <ul>
          <Item icon={faHouse} name={<FormattedMessage defaultMessage="Home" id="ejEGdx" />} link="/" />
          <Item
            icon={faRectangleVerticalHistory}
            name={<FormattedMessage defaultMessage="Collections" id="ulh3kf" />}
            link="/collections"
          />
          <Item icon={faCoinBlank} name={<FormattedMessage defaultMessage="Staking" id="+14VoL" />} link="/staking" />
          <Item
            icon={faMoneyCheckDollar}
            name={<FormattedMessage defaultMessage="Affiliate" id="tfQoB8" />}
            link="/affiliate"
          />
          <ItemSoon icon={faCartArrowDown} name={<FormattedMessage defaultMessage="Marketplace" id="+lWQIJ" />} />
          <Item icon={faArrowsLeftRight} name={<FormattedMessage defaultMessage="Swap" id="s8BnAC" />} link="/swap" />
          <Item
            icon={faFileContract}
            name={<FormattedMessage defaultMessage="Litepaper" id="9fPQ1/" />}
            link="/paper"
          />
          <Item icon={faCommentsQuestion} name={<FormattedMessage defaultMessage="FAQ" id="W8nHSd" />} link="/faq" />
        </ul>
      </Grid>
      <Bottom item>
        <HeaderWallet />
        {router.locale !== router.defaultLocale && (
          <Link href={router.pathname} locale={router.defaultLocale} passHref>
            <small>Switch to english version</small>
          </Link>
        )}
      </Bottom>
    </Navbar>
  );
}
