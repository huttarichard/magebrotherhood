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

export const distortion = keyframes`
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
`;

export const distortionAlternative = keyframes`
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
`;
