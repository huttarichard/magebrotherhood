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
  background-color: #111;

  @media (min-width: 992px) {
    position: relative;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 3rem 2rem;

    > .icon-wrapper {
      display: none;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url("/images/navBg.png"), url("/images/navBg2.png");
      background-repeat: no-repeat;
      background-size: auto 103%;
      mix-blend-mode: color-dodge;
    }
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;

  svg {
    display: block;
    width: 32px;
    height: 32px;
    margin-right: 1rem;
  }

  span {
    display: inline-block;
    font-family: "Bebas Neue", sans-serif;
    color: #fff;
    letter-spacing: 1px;
    max-width: 85px;
  }

  @media (min-width: 992px) {
    margin-bottom: 5rem;

    svg {
      width: 77px;
      height: 77px;
    }

    span {
      font-size: 34px;
      max-width: 160px;
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
  padding: 6rem 2rem 4rem;
  transform: translateX(100%);
  transition: transform 0.3s;
  background: url("/images/navBg.png"), url("/images/navBg2.png");
  background-color: #111;
  background-repeat: no-repeat;
  background-size: contain;
  /* mix-blend-mode: color-dodge; */

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
    margin-bottom: 1rem;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    font-family: "Bebas Neue", sans-serif;
    letter-spacing: 1px;
    font-size: 18px;

    svg {
      display: inline-block;
      width: 20px;
      height: 20px;
      object-fit: contain;
      margin-right: 1rem;
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
    background: none;
    padding: 0;

    .icon-wrapper {
      display: none;
    }

    li {
      margin-bottom: 1.5rem;
    }

    a {
      font-size: 25px;

      svg {
        width: 32px;
        height: 32px;
        margin-right: 1.5rem;
      }
    }
  }
`;

export default function Header() {
  const [show, setShow] = useState(false);
  const navClass = show ? "toggled" : "";

  return (
    <StyledHeader>
      <Brand>
        <Logo color="#fff" />
        <span>Mage Brotherhood</span>
      </Brand>
      <StyledNav className={navClass}>
        <Icon name="x" size={32} color="#fff" onClick={() => setShow(false)} />
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
      <Icon name="burger" stroke="#fff" size={32} onClick={() => setShow(true)} />
    </StyledHeader>
  );
}
