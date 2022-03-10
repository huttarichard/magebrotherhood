import styled from "@emotion/styled";
import {
  faArrowsLeftRight,
  faCartArrowDown,
  faCoinBlank,
  faCommentsQuestion,
  faHouse,
  faMoneyCheckDollar,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "awesome-react-icons";
import Link from "next/link";
import { useState } from "react";

import HeaderWallet from "./HeaderWallet";
import Logo from "./Logo";

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
  height: 80px;

  @media (min-width: 992px) {
    position: relative;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 3rem 2rem;
    box-shadow: 0px 0px 20px 1px #ffffff0f;

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
      background-repeat: no-repeat;
      background-size: 100% auto;
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
    max-width: 100%;
    font-size: 22px;
  }

  @media (min-width: 992px) {
    margin-bottom: 5rem;

    svg {
      width: 70px;
      height: 70px;
    }

    span {
      font-size: 28px;
      line-height: 28px;
      max-width: 159px;
    }
  }
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: -1px;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem 4rem;
  transform: translateX(-100%);
  transition: transform 0.3s;
  background-color: #111;
  background-repeat: no-repeat;
  background-size: contain;
  justify-content: space-between;

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
    font-size: 22px;

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
    flex: 1;

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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.3s;

  &.toggled {
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
  }

  @media (min-width: 992px) {
    display: none !important;
  }
`;

export default function Header() {
  const [show, setShow] = useState(false);
  const navClass = show ? "toggled" : "";

  return (
    <StyledHeader>
      <Backdrop className={navClass} onClick={() => setShow(false)} />
      <Brand>
        <Logo color="#fff" />
        <span>Mage Brotherhood</span>
      </Brand>
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
            <Link href="/affiliate">
              <a>
                <FontAwesomeIcon icon={faMoneyCheckDollar} />
                <span>Affiliate</span>
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
            <Link href="/swap">
              <a>
                <FontAwesomeIcon icon={faArrowsLeftRight} />
                <span>Swap</span>
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
        </ul>
        <HeaderWallet />
      </StyledNav>
      <Icon name="burger" stroke="#fff" size={32} onClick={() => setShow(true)} />
    </StyledHeader>
  );
}
