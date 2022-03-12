// import { css } from "@emotion/react";
import "@reach/dialog/styles.css";

import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import transparentize from "polished/lib/color/transparentize";
import React from "react";
import { animated, useSpring, useTransition } from "react-spring";
import { useGesture } from "react-use-gesture";
import { isMobile } from "lib/userAgent";

export interface DialogProps {
  mobile: boolean;
  minHeight?: number | false;
  maxHeight?: number;
  maxWidth?: string | number;
}

export interface ModalProps {
  isOpen: boolean;
  onDismiss?: () => void;
  minHeight?: number | false;
  maxHeight?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  mobile?: boolean;
}

const AnimatedDialogOverlay = animated(DialogOverlay);

const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.bg1};
  }
`;

const AnimatedDialogContent = animated(DialogContent);

// destructure to not pass custom props to Dialog DOM element
const StyledDialogContent = styled(AnimatedDialogContent, { shouldForwardProp: isPropValid })<DialogProps>`
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: ${({ theme }) => theme.bg2};
    border: 1px solid ${({ theme }) => theme.bg2};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow)};
    padding: 0px;
    width: 50vw;
    overflow-y: auto;
    overflow-x: hidden;
    align-self: "center";
    max-width: ${(props) => props.maxWidth};

    ${({ maxHeight }) =>
      maxHeight &&
      `
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      `
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: ${({ theme }) => theme.borderRadius};

    ${({ mobile, theme }) =>
      mobile &&
      `
        width: 100vw;
        align-self: flex-end;
        border-radius: ${theme.borderRadius};
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        margin: 0;
      `}
  }
`;

StyledDialogContent.defaultProps = { "aria-label": "dialog" };

export default function Modal(props: ModalProps) {
  const { isOpen, onDismiss, minHeight = false, maxHeight = 90, initialFocusRef, mobile = false, children } = props;
  const isPhone = isMobile || mobile;

  const transitions = useTransition(isOpen, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: {
      mass: 1,
      tension: 210,
      friction: 20,
    },
  }));

  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss && onDismiss();
      }
    },
  });

  return transitions((props, item, tr, index) => {
    if (!item) return null;
    return (
      <StyledDialogOverlay
        key={index}
        style={props}
        onDismiss={onDismiss}
        initialFocusRef={initialFocusRef}
        unstable_lockFocusAcrossFrames={false}
      >
        <StyledDialogContent
          {...(isPhone
            ? {
                ...bind(),
                style: { transform: y.to((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
              }
            : {})}
          aria-label="dialog content"
          minHeight={minHeight}
          maxHeight={maxHeight}
          mobile={isPhone}
        >
          {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
          {!initialFocusRef && isPhone ? <div tabIndex={1} /> : null}
          {children}
        </StyledDialogContent>
      </StyledDialogOverlay>
    );
  });
}
