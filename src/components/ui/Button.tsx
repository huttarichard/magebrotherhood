import styled from "@emotion/styled";
import React from "react";

const StyledButton = styled.button`
  position: relative;
  height: 50px;
  padding: 0 40px;
  border: 0;
  background: #fff;
  color: black;
  text-transform: uppercase;
  line-height: 44px;
  border-left: solid 5px ${({ theme }) => theme.primary3};
  border-right: solid 5px ${({ theme }) => theme.primary1};
  clip-path: polygon(21px 0%, 100% 0, 100% 24px, calc(100% - 20px) 100%, 0 100%, 0 20px);
  font-family: "Bebas Neue", sans-serif;
  font-size: 19px;
  letter-spacing: 0.12em;
  cursor: pointer;

  span {
    position: relative;
    display: block;

    &::after {
      content: attr(data-text);
      position: absolute;
      left: 2px;
      width: 100%;
      text-shadow: -1px 0 ${({ theme }) => theme.primary1};
      top: 0;
      color: #000;
      background: #fff;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: noise-anim 2s infinite linear alternate-reverse;
    }

    &::before {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      width: 100%;
      text-shadow: 1px 0 ${({ theme }) => theme.primary3};
      top: 0;
      color: #000;
      background: #fff;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: noise-anim-2 3s infinite linear alternate-reverse;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 22px 22px 0 0;
    border-color: ${({ theme }) => theme.primary3} transparent transparent transparent;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 22px 22px;
    border-color: transparent transparent ${({ theme }) => theme.primary1} transparent;
  }

  @media (min-width: 992px) {
    line-height: 50px;
    font-size: 22px;
    border-left: solid 7px ${({ theme }) => theme.primary3};
    border-right: solid 7px ${({ theme }) => theme.primary1};
    clip-path: polygon(22px 0%, 100% 0, 100% 27px, calc(100% - 23px) 100%, 0 100%, 0 22px);

    &::before {
      border-width: 25px 25px 0 0;
    }

    &::after {
      border-width: 0 0 25px 25px;
    }
  }

  @keyframes noise-anim {
    0% {
      clip: rect(11px, 9999px, 68px, 0);
    }
    5% {
      clip: rect(20px, 9999px, 6px, 0);
    }
    10% {
      clip: rect(17px, 9999px, 15px, 0);
    }
    15% {
      clip: rect(23px, 9999px, 63px, 0);
    }
    20% {
      clip: rect(95px, 9999px, 95px, 0);
    }
    25% {
      clip: rect(42px, 9999px, 6px, 0);
    }
    30% {
      clip: rect(80px, 9999px, 66px, 0);
    }
    35% {
      clip: rect(59px, 9999px, 34px, 0);
    }
    40% {
      clip: rect(78px, 9999px, 72px, 0);
    }
    45% {
      clip: rect(32px, 9999px, 91px, 0);
    }
    50% {
      clip: rect(71px, 9999px, 58px, 0);
    }
    55% {
      clip: rect(85px, 9999px, 12px, 0);
    }
    60% {
      clip: rect(65px, 9999px, 61px, 0);
    }
    65% {
      clip: rect(35px, 9999px, 35px, 0);
    }
    70% {
      clip: rect(57px, 9999px, 49px, 0);
    }
    75% {
      clip: rect(44px, 9999px, 68px, 0);
    }
    80% {
      clip: rect(3px, 9999px, 81px, 0);
    }
    85% {
      clip: rect(74px, 9999px, 19px, 0);
    }
    90% {
      clip: rect(32px, 9999px, 59px, 0);
    }
    95% {
      clip: rect(56px, 9999px, 93px, 0);
    }
    100% {
      clip: rect(74px, 9999px, 36px, 0);
    }
  }

  @keyframes noise-anim-2 {
    0% {
      clip: rect(87px, 9999px, 99px, 0);
    }
    5% {
      clip: rect(77px, 9999px, 86px, 0);
    }
    10% {
      clip: rect(26px, 9999px, 68px, 0);
    }
    15% {
      clip: rect(56px, 9999px, 67px, 0);
    }
    20% {
      clip: rect(55px, 9999px, 73px, 0);
    }
    25% {
      clip: rect(60px, 9999px, 77px, 0);
    }
    30% {
      clip: rect(17px, 9999px, 82px, 0);
    }
    35% {
      clip: rect(23px, 9999px, 83px, 0);
    }
    40% {
      clip: rect(84px, 9999px, 95px, 0);
    }
    45% {
      clip: rect(84px, 9999px, 17px, 0);
    }
    50% {
      clip: rect(47px, 9999px, 75px, 0);
    }
    55% {
      clip: rect(81px, 9999px, 60px, 0);
    }
    60% {
      clip: rect(48px, 9999px, 49px, 0);
    }
    65% {
      clip: rect(52px, 9999px, 88px, 0);
    }
    70% {
      clip: rect(20px, 9999px, 59px, 0);
    }
    75% {
      clip: rect(1px, 9999px, 61px, 0);
    }
    80% {
      clip: rect(83px, 9999px, 64px, 0);
    }
    85% {
      clip: rect(30px, 9999px, 45px, 0);
    }
    90% {
      clip: rect(52px, 9999px, 45px, 0);
    }
    95% {
      clip: rect(43px, 9999px, 9px, 0);
    }
    100% {
      clip: rect(19px, 9999px, 2px, 0);
    }
  }
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, ...props }: Props) {
  return (
    <StyledButton {...props}>
      <span data-text={text}>{text}</span>
    </StyledButton>
  );
}
