import styled from "@emotion/styled";
import Link from "next/link";
// import Image from "next/image";

const FullImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
`;

const defaultHeight = "32vh";

const MagicCardElement = styled.div`
  @property --rotate {
    syntax: "<angle>";
    initial-value: 132deg;
    inherits: false;
  }

  background: red;
  width: calc(${(props) => props.height || defaultHeight} / 1.5);
  height: ${(props) => props.height || defaultHeight};
  padding: 0px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 2em;
  color: rgb(198 63 255 / 0%);
  cursor: pointer;
  font-weight: 600;
  // font-family: cursive;

  &:hover {
    color: rgb(198 63 255 / 100%);
    transition: color 0.8s;
  }

  &:hover:before,
  &:hover:after {
    animation: none;
    opacity: 0;
  }

  &::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(var(--rotate), rgb(141, 17, 219), rgb(69 2 72));
    // background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
  }

  &::after {
    position: absolute;
    content: "";
    top: calc(${(props) => props.height || defaultHeight} / 12);
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(${(props) => props.height || defaultHeight} / 6));
    background-image: linear-gradient(var(--rotate), #c106ff, #900cff 43%, #4e00c2);
    opacity: 1;
    transition: opacity 0.5s;
    animation: spin 2.5s linear infinite;
  }

  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
`;

export default function MagicCard(props) {
  return (
    <Link href={props.link}>
      <MagicCardElement height={props.height}>
        <FullImage src={props.src} />
        {props.children}
      </MagicCardElement>
    </Link>
  );
}
