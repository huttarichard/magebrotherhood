import { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "awesome-react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRectangleVerticalHistory,
  faCoinBlank,
  faCartArrowDown,
  faCommentsQuestion,
} from "@fortawesome/pro-light-svg-icons";
import HeaderWallet from "./HeaderWallet";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #ddd;

  @media (min-width: 992px) {
    position: static;
    height: 100vh;
    flex-direction: column;
    justify-content: center;

    > .icon-wrapper {
      display: none;
    }
  }
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 4rem 2rem;
  transform: translateX(100%);
  transition: transform 0.3s;
  background-color: #ccc;

  .icon-wrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;

    svg {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  &.toggled {
    transform: translateX(0);
  }

  @media (min-width: 992px) {
    position: static;
    transform: none;
    transition: none;
    background-color: transparent;

    .icon-wrapper {
      display: none;
    }
  }
`;

export default function Header() {
  const [show, setShow] = useState(false);
  const navClass = show ? "toggled" : "";

  return (
    <StyledHeader>
      <Logo
        style={{
          display: "block",
          height: 32,
          width: "auto",
        }}
      />
      <StyledNav className={navClass}>
        <Icon name="x" size={32} onClick={() => setShow(false)} />
        <ul>
          <li>
            <Link href="/">
              <a>
                <FontAwesomeIcon icon={faHouse} />
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/collections">
              <a>
                <FontAwesomeIcon icon={faRectangleVerticalHistory} />
                <span>Collections</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/staking">
              <a>
                <FontAwesomeIcon icon={faCoinBlank} />
                <span>Staking</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/marketplace">
              <a>
                <FontAwesomeIcon icon={faCartArrowDown} />
                <span>Marketplace</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <a>
                <FontAwesomeIcon icon={faCommentsQuestion} />
                <span>FAQ</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/account">
              <a>
                <span>Account</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/swap">
              <a>
                <span>Swap</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/mint">
              <a>
                <span>Mint</span>
              </a>
            </Link>
          </li>
        </ul>
      </StyledNav>
      <HeaderWallet />
      <Icon name="burger" onClick={() => setShow(true)} />
    </StyledHeader>
  );
}
