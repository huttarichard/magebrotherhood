import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import React from "react";
import { isMobile } from "react-device-detect";

export interface BadgeButtonFeatuers {
  disabled?: boolean;
  folded?: boolean;
  inverse?: boolean;
  small?: boolean;
  rounded?: boolean;
}

const Button = styled.div<BadgeButtonFeatuers>`
  border-radius: 8px;
  letter-spacing: 1.1px;
  font-size: 17px;
  min-width: 50px;
  height: 50px;
  background: white;
  color: black;
  display: inline-block;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  transition: all 0.2s ease;

  .wrapper {
    height: 100%;
  }

  .icon {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      overflow: hidden;
    }
  }

  .text {
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    padding-right: 25px;

    span {
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-weight: 600;
    }
  }

  &:hover {
    padding-left: 5px;
    width: auto;

    .text {
      display: flex;
    }
  }

  ${(props) =>
    !props.folded &&
    css`
      padding-left: 5px;

      .text {
        display: flex;
      }
    `}

  ${(props) =>
    props.rounded &&
    css`
      border-radius: 50px;
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: auto;
    `}


  ${(props) =>
    props.inverse &&
    css`
      color: white;
      background: black;
    `}

  ${(props) =>
    props.small &&
    css`
      height: 40px;
      padding-left: 0px;
      font-size: 15px;

      .text {
        padding-right: 15px;
      }

      svg {
        max-height: 40px;
      }
    `}
`;

export type BadgeButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  BadgeButtonFeatuers & {
    icon: JSX.Element;
  };

export default function BadgeButton({ children, small, inverse, folded, icon, ...props }: BadgeButtonProps) {
  const [foldedState, setFoldedState] = React.useState(folded);

  return (
    <Button
      inverse={inverse}
      small={small}
      folded={folded}
      {...props}
      onClick={(e) => {
        if (isMobile && foldedState) {
          setFoldedState(false);
          return;
        }
        return props.onClick?.(e);
      }}
    >
      <Grid container alignItems="center" className="wrapper">
        {icon && (
          <Grid item className="icon">
            {icon}
          </Grid>
        )}
        <Grid item className="text">
          <span>{children}</span>
        </Grid>
      </Grid>
    </Button>
  );
}
