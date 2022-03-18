import { keyframes } from "@emotion/react";

export const float = keyframes`
0% {
    transform: translatey(0);
}
50% {
    transform: translatey(-5px);
}
100% {
    transform: translatey(0);
}
`;

export const brighten = keyframes`
0% {
  filter: brightness(1);
}
50% {
    filter: brightness(1.3);
}
100% {
    filter: brightness(1);
}
`;

export const glow = keyframes`
0% {
filter: drop-shadow(0 0 0 #fff);
}
50% {
filter: drop-shadow(0 0 2px #fff);
}
100% {
filter: drop-shadow(0 0 0 #fff);
}
`;
