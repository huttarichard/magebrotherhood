import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Logo from "./Logo";

interface BrandProps {
  block?: boolean;
}

const Wrapper = styled.div<BrandProps>`
  display: flex;
  align-items: center;
  text-transform: uppercase;

  svg {
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }

  span {
    display: inline-block;
    color: #fff;
    letter-spacing: 1px;
    max-width: 100%;
    font-size: 1.4rem;
    line-height: 1.4rem;
    font-weight: 600;
  }

  ${(props) => props.theme.breakpoints.up("lg")} {
    span {
      font-size: 1.8rem;
    }
  }

  ${(props) =>
    props.block &&
    css`
      svg {
        width: 70px;
        height: 70px;
      }

      span {
        line-height: 28px;
        max-width: 159px;
        font-weight: 700;
      }
    `}
`;

export default function Brand(props: BrandProps) {
  return (
    <Wrapper block={props.block}>
      <Logo color="#fff" />
      <span>Mage Brotherhood</span>
    </Wrapper>
  );
}

export { default as Icon } from "./Logo";
