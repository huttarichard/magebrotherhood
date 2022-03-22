import styled from "@emotion/styled";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Main = styled.footer`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  background-color: #fff;

  nav {
    width: 100%;
    margin-bottom: 1rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-evenly;
    }

    a {
      text-decoration: none;
      font-family: "Bebas Neue", sans-serif;
      color: #000;
    }
  }

  > ul {
    width: 50%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

    li {
      margin-right: 1rem;
    }

    a {
      color: #000;
    }
  }

  span {
    display: block;
    width: 50%;
    text-align: right;
  }

  @media (min-width: 992px) {
    padding: 2rem 3rem;
    flex-wrap: nowrap;
    justify-content: space-between;

    nav {
      width: auto;
      justify-content: flex-start;
      margin-bottom: 0;

      li {
        margin-right: 1rem;
      }
    }

    > ul {
      width: auto;
    }

    span {
      width: auto;
    }
  }

  @media (min-width: 1200px) {
    nav {
      a {
        font-size: 25px;
      }
    }

    span {
      font-size: 25px;
    }
  }
`;

export default function Footer() {
  return (
    <Main>
      <nav>
        <ul>
          <li>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/terms-of-use">
              <a>Terms of use</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
      <ul>
        <li>
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
      </ul>
      <span>All rights reserved</span>
    </Main>
  );
}
