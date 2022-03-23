import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ButtonBase from "@mui/material/ButtonBase";
import React from "react";

import { distortion, distortionAlternative } from "./animations";

interface StyleModificationProps {
  large?: boolean;
  small?: boolean;
  block?: boolean;
  borders?: boolean;
  distorted?: boolean;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, StyleModificationProps {
  text: string;
}

const StyledButton = styled(ButtonBase)<StyleModificationProps>`
  position: relative;
  box-sizing: border-box;
  padding: 0 2.5rem;
  border: 0;
  background: #fff;
  color: black;
  text-transform: uppercase;
  line-height: 2.5rem;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  transition: opacity 0.2s;
  cursor: pointer;

  span {
    position: relative;
    display: block;
  }

  /* borders */
  ${({ theme, borders }) =>
    borders &&
    css`
      clip-path: polygon(1.2rem 0%, 100% 0, 100% 1.3rem, calc(100% - 1.2rem) 100%, 0 100%, 0 1.2rem);
      border-left: solid 5px ${theme.palette.primary.main};
      border-right: solid 5px ${theme.palette.secondary.main};

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 1.25rem 1.25rem 0 0;
        border-color: ${theme.palette.primary.main} transparent transparent transparent;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 1.25rem 1.25rem;
        border-color: transparent transparent ${theme.palette.secondary.main} transparent;
      }
    `}

  ${({ theme, small }) =>
    small &&
    css`
      background: ${theme.palette.secondary.main};
      height: 36px;
      letter-spacing: 0.8px;
      padding: 0 14px;
      border-radius: 8px;
      color: white;
      font-size: 18px;
    `}

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}

  ${({ large }) =>
    large &&
    css`
      line-height: 3.5rem;
      clip-path: polygon(1.2rem 0%, 100% 0, 100% 2.3rem, calc(100% - 1.2rem) 100%, 0 100%, 0 1.2rem);
    `}

  /* distortion */
  ${({ theme, distorted }) =>
    distorted &&
    css`
      span {
        &::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          width: 100%;
          text-shadow: -1px 0 ${theme.palette.primary.main};
          top: 0;
          color: #000;
          background: #fff;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: ${distortion} 2s infinite linear alternate-reverse;
        }

        &::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          width: 100%;
          text-shadow: 1px 0 ${theme.palette.secondary.main};
          top: 0;
          color: #000;
          background: #fff;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: ${distortionAlternative} 3s infinite linear alternate-reverse;
        }
      }
    `}

  /* responsiveness */
  ${({ theme }) => theme.breakpoints.up("md")} {
    line-height: 3rem;
    font-size: 1.3rem;

    ${({ theme, borders }) =>
      borders &&
      css`
        border-left: solid 7px ${theme.palette.primary.main};
        border-right: solid 7px ${theme.palette.secondary.main};
        clip-path: polygon(1.4rem 0%, 100% 0, 100% 1.6rem, calc(100% - 1.4rem) 100%, 0 100%, 0 1.4rem);

        &::before {
          border-width: 1.5rem 1.5rem 0 0;
        }

        &::after {
          border-width: 0 0 1.5rem 1.5rem;
        }
      `}
  }

  /* state */

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default function Button({ text, ...props }: Props) {
  return (
    <StyledButton {...props}>
      <span data-text={text}>{text}</span>
    </StyledButton>
  );
}
