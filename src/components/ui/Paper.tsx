import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Paper as MuiPaper } from "@mui/material";

const spin = keyframes`
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
`;

const Paper = styled(MuiPaper)<{ magical?: boolean }>`
  border-radius: 5px;
  /* overflow: hidden; */
  position: relative;

  ${(props) =>
    props.magical &&
    css`
      border: 1px solid white;

      &::before {
        content: "";
        width: 104%;
        height: 102%;
        border-radius: 8px;
        background: linear-gradient(180deg, #5ddcff, #3c67e3 43%, #4e00c2);
        filter: blur(60px);
        position: absolute;
        z-index: -1;
        top: -1%;
        left: -2%;
        background-size: 200% 200%;
        animation: ${spin} 5s linear infinite;
      }

      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
        height: 100%;
        width: 100%;
        margin: 0 auto;
        transform: scale(0.8);
        filter: blur(60px);
        background: linear-gradient(180deg, #5ddcff, #3c67e3 43%, #4e00c2);
        opacity: 1;
        transition: opacity 0.5s;
        background-size: 200% 200%;
        animation: ${spin} 5s linear infinite;
      }
    `}
`;

export default Paper;
