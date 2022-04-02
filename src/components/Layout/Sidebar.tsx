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
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
`;

const List = styled.ul`
  margin: 0;
  margin-top: 5rem;
  list-style: none;
  padding: 0;

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 2rem;
  }
`;

const ListItem = styled.li`
  display: flex;
  border-bottom: 1px solid #cfcfcf29;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    svg {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 1rem;
      object-fit: contain;
      color: #fff;
    }

    > span {
      display: inline-block;
      letter-spacing: 1px;
      font-size: 1.1rem;
      line-height: 2.7rem;
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
    }
  }

  .MuiBadge-root svg {
    padding-top: 5px;
  }

  .MuiBadge-badge {
    font-size: 15px;
    letter-spacing: -0.8px;
    padding: 11px;
    top: 30%;
    background: ${({ theme }) => theme.primary2};
  }

  &:last-of-type {
    border-bottom: 0;
  }

  @media (min-width: 375px) {
    a {
      svg {
        width: 30px;
        height: 30px;
      }

      > span {
        font-size: 1.2rem;
        line-height: 3.5rem;
      }
    }
  }

  @media (min-width: 425px) {
    a {
      svg {
        width: 50px;
        height: 30px;
      }

      > span {
        line-height: 4rem;
      }
    }
  }

  ${(props) => props.theme.breakpoints.up("lg")} {
    a {
      > span {
        font-size: 1.4rem;
      }
    }
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

interface ItemProps {
  icon: IconDefinition;
  name: string | JSX.Element;
  link?: string;
  soon?: boolean;
}

function Item({ icon, name, link, soon = false }: ItemProps) {
  const largeEnough = useMediaQuery("screen and (min-height: 735px)");

  if (soon) {
    if (largeEnough) {
      return (
        <ListItem>
          <a>
            <Badge color="primary" badgeContent="soon">
              <FontAwesomeIcon icon={icon} />
              <span>{name}</span>
            </Badge>
          </a>
        </ListItem>
      );
    } else {
      return <></>;
    }
  } else {
    return (
      <ListItem>
        <Link href={link as string}>
          <a>
            <FontAwesomeIcon icon={icon} />
            <span>{name}</span>
          </a>
        </Link>
      </ListItem>
    );
  }
}

export interface LayoutNavbarProps {
  closeIcon?: boolean;
}

export default function LayoutNavbar({ closeIcon = false }: LayoutNavbarProps) {
  const { closeMenu } = useLayout();
  const router = useRouter();

  return (
    <Navbar container direction="column" wrap="nowrap">
      {closeIcon && (
        <CloseIcon>
          <FontAwesomeIcon className="close-icon" icon={faClose} onClick={closeMenu} />
        </CloseIcon>
      )}
      <Grid item xs="auto">
        <Brand block />
      </Grid>
      <Grid item flexGrow="1" sx={{ mb: 2 }}>
        <List>
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
          <Item icon={faCartArrowDown} name={<FormattedMessage defaultMessage="Marketplace" id="+lWQIJ" />} soon />
          <Item icon={faArrowsLeftRight} name={<FormattedMessage defaultMessage="Swap" id="s8BnAC" />} link="/swap" />
          <Item
            icon={faFileContract}
            name={<FormattedMessage defaultMessage="Litepaper" id="9fPQ1/" />}
            link="/paper"
          />
          <Item icon={faCommentsQuestion} name={<FormattedMessage defaultMessage="FAQ" id="W8nHSd" />} link="/faq" />
        </List>
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
