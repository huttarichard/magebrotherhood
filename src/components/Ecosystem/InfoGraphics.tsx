import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { blink, fading, float } from "components/ui/animations";
import React from "react";
import { isSafari } from "react-device-detect";

const StyledSVG = styled.svg`
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  transition: 1s ease-in-out;
  will-change: transform;
  backface-visibility: hidden;

  &.nft {
    transform: scale(2);
    transform-origin: 30vw 80%;
  }

  &.coin {
    transform: scale(2);
    transform-origin: 80vw 100%;
  }

  &.staking {
    transform: scale(2);
    transform-origin: 60vw 35%;
  }

  &.game {
    transform: scale(2);
    transform-origin: 10vw -10%;
  }

  @media (min-width: 426px) {
    &.game {
      transform-origin: 20vw -10%;
    }
  }

  @media (min-width: 1200px) {
    &.nft {
      transform-origin: 30% 80%;
    }

    &.coin {
      transform-origin: 80% 70%;
    }

    &.staking {
      transform-origin: 60% 45%;
    }

    &.game {
      transform-origin: 10% 30%;
    }
  }

  @media (min-width: 1400px) {
    &.nft {
      transform-origin: 30% 80%;
    }

    &.coin {
      transform-origin: 80% 100%;
    }

    &.staking {
      transform-origin: 60% 35%;
    }

    &.game {
      transform-origin: 20% 0;
    }
  }

  #burn,
  #battles,
  #loans,
  #quests,
  #playables,
  #land,
  #items,
  #renting {
    animation: ${float} 2s ease-in-out infinite;
  }
  #eth-symbol {
    animation-delay: 1s;
    animation: ${float} 2s ease-in-out infinite;
  }
  #contacts-inner-light {
    animation: ${blink} 6s linear infinite;
    animation-delay: 1s;
  }

  #coin-light {
    animation: ${fading} 2s ease-in-out infinite;
  }

  ${isSafari &&
  css`
    #coin-light,
    #contacts-inner-light,
    #eth-symbol,
    #burn,
    #battles,
    #loans,
    #quests,
    #playables,
    #land,
    #items,
    #renting {
      animation: none;
    }
  `}
`;

export default function InfoGraphics(props: { active?: string }) {
  return (
    <StyledSVG
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      className={props.active}
      viewBox="0 0 1446 1582"
      enableBackground="new 0 0 1446 1582"
      {...props}
    >
      <g id="coin-light" opacity="0.5">
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="1202"
          y1="1152.8241"
          x2="1202"
          y2="1573.7163"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#CD58DE" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_1_)"
          d="M1324,28.7L1201.8,0L1080,28.6c0,0,48.6,355,48.5,355.6c16,57.9,141.1,55.9,155.1,0
     C1283.5,381.9,1324,28.7,1324,28.7L1324,28.7z"
        />

        <linearGradient
          id="SVGID_00000014592315617456555410000018096617331703924864_"
          gradientUnits="userSpaceOnUse"
          x1="1202"
          y1="1155.0668"
          x2="1202"
          y2="1573.8282"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#7C1DC9" />
          <stop offset="3.000000e-02" stopColor="#741BBD" />
          <stop offset="0.16" stopColor="#56148B" />
          <stop offset="0.3" stopColor="#3B0E60" />
          <stop offset="0.43" stopColor="#26093E" />
          <stop offset="0.57" stopColor="#150523" />
          <stop offset="0.71" stopColor="#09020F" />
          <stop offset="0.85" stopColor="#020104" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000014592315617456555410000018096617331703924864_)"
          d="M1324,28.7L1201.8,0L1080,28.6
     c0,0,48.6,355,48.5,355.6c16,57.9,141.1,55.9,155.1,0C1283.5,381.9,1324,28.7,1324,28.7L1324,28.7z"
        />
      </g>
      <g id="echnage-light" opacity="0.5">
        <linearGradient
          id="SVGID_00000030482596987266808120000016350365342048274576_"
          gradientUnits="userSpaceOnUse"
          x1="1198.8751"
          y1="305.9882"
          x2="1198.8751"
          y2="729.6613"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#CD58DE" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000030482596987266808120000016350365342048274576_)"
          d="M1276.9,872.9l-82.3-28.9l-73.8,28.8
     c0,0,0.1,357.4,0,358c16,58.2,142,56.4,156.1,0C1276.9,1228.4,1276.9,872.9,1276.9,872.9z"
        />

        <linearGradient
          id="SVGID_00000113350444596876688980000017696134369268719010_"
          gradientUnits="userSpaceOnUse"
          x1="1198.8751"
          y1="308.2477"
          x2="1198.8751"
          y2="729.7732"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#7C1DC9" />
          <stop offset="3.000000e-02" stopColor="#741BBD" />
          <stop offset="0.16" stopColor="#56148B" />
          <stop offset="0.3" stopColor="#3B0E60" />
          <stop offset="0.43" stopColor="#26093E" />
          <stop offset="0.57" stopColor="#150523" />
          <stop offset="0.71" stopColor="#09020F" />
          <stop offset="0.85" stopColor="#020104" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000113350444596876688980000017696134369268719010_)"
          d="M1276.9,872.9l-82.3-28.9l-73.8,28.8
     c0,0,0.1,357.4,0,358c16,58.2,142,56.4,156.1,0C1276.9,1228.4,1276.9,872.9,1276.9,872.9z"
        />
      </g>
      <path
        fill="none"
        stroke="#C4C4C4"
        strokeWidth="2"
        d="M693.2,994.7l139.4-80.5c1.9-1.1,5-1.1,6.9,0L979,994.7c1.9,1.1,1.9,2.9,0,4
   l-139.4,80.5c-1.9,1.1-5,1.1-6.9,0l-139.4-80.5C691.3,997.6,691.3,995.8,693.2,994.7z"
      />
      <linearGradient
        id="SVGID_00000155833609369610791970000000476107694813081496_"
        gradientUnits="userSpaceOnUse"
        x1="111.5161"
        y1="1340.766"
        x2="328.2411"
        y2="1376.012"
        gradientTransform="matrix(0.866 -0.5 -0.866 -0.5 1809.325 1796.0901)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000155833609369610791970000000476107694813081496_)"
        strokeWidth="2"
        d="M693.2,994.7
   l139.4-80.5c1.9-1.1,5-1.1,6.9,0L979,994.7c1.9,1.1,1.9,2.9,0,4l-139.4,80.5c-1.9,1.1-5,1.1-6.9,0l-139.4-80.5
   C691.3,997.6,691.3,995.8,693.2,994.7z"
      />
      <g>
        <linearGradient
          id="SVGID_00000052078188248502161590000001837747078703226771_"
          gradientUnits="userSpaceOnUse"
          x1="1144.39"
          y1="626.3359"
          x2="1261.34"
          y2="632.9979"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#C531DD" />
          <stop offset="0.23" stopColor="#F296FF" />
          <stop offset="0.605" stopColor="#9600AE" />
          <stop offset="0.831" stopColor="#F296FF" />
          <stop offset="0.97" stopColor="#C531DD" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000052078188248502161590000001837747078703226771_)"
          d="M1259.2,928.8h-115.5v16.8
     c0,18.5,25.9,33.5,57.7,33.5s57.8-15,57.8-33.5V928.8z"
        />

        <linearGradient
          id="SVGID_00000011008283912505330820000003060392460478596511_"
          gradientUnits="userSpaceOnUse"
          x1="1265.92"
          y1="638.888"
          x2="1265.9202"
          y2="638.888"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#FFBB96" />
          <stop offset="0.23" stopColor="#FFFBC9" />
          <stop offset="0.54" stopColor="#F9B673" />
          <stop offset="0.64" stopColor="#F9B876" />
          <stop offset="0.72" stopColor="#FABE81" />
          <stop offset="0.81" stopColor="#FCC993" />
          <stop offset="0.86" stopColor="#FED2A3" />
          <stop offset="0.97" stopColor="#FFC28C" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000011008283912505330820000003060392460478596511_)"
          d="M1259.2,943.3v-0.5
     C1259.2,943,1259.2,943.2,1259.2,943.3z"
        />
        <path
          opacity="0.52"
          fill="#740098"
          enableBackground="new    "
          d="M1219.2,977.4l1.6-0.3v-42.5h-1.6V977.4z M1226.4,975.7
     l1.6-0.5v-40.7h-1.6C1226.4,934.5,1226.4,975.7,1226.4,975.7z M1233.7,973.3l1.6-0.7v-38.1h-1.6V973.3L1233.7,973.3z M1211.9,978.4
     l1.6-0.2v-43.7h-1.6V978.4z M1248.2,965.1c0.5-0.4,1.1-0.9,1.6-1.3v-29.3h-1.6V965.1L1248.2,965.1z M1255.4,957.3
     c0.6-0.9,1.1-1.9,1.6-2.8v-20h-1.6V957.3z M1240.9,969.9c0.5-0.3,1.1-0.6,1.6-0.9v-34.5h-1.6V969.9z M1204.7,978.9h1.6v-44.4h-1.6
     V978.9z M1197.4,978.9h1.6v-44.4h-1.6V978.9z M1183,977.1c0.5,0,1.1,0.2,1.6,0.3v-42.9h-1.6V977.1z M1190.1,978.4h1.6v-43.8h-1.6
     V978.4z M1175.6,975.4l1.6,0.5v-41.3h-1.6V975.4z M1146.6,955.8c0.5,0.9,1,1.8,1.6,2.7v-24h-1.6V955.8z M1153.9,964.5
     c0.5,0.4,1.1,0.8,1.6,1.3v-31.2h-1.6V964.5L1153.9,964.5z M1168.4,972.9l1.6,0.6v-39h-1.6V972.9z M1161.1,969.5l1.6,0.9v-35.8h-1.6
     V969.5z"
        />

        <linearGradient
          id="SVGID_00000123436393110746683920000007011945497528612239_"
          gradientUnits="userSpaceOnUse"
          x1="1143.7299"
          y1="929.1339"
          x2="1259.21"
          y2="929.1339"
        >
          <stop offset="0" stopColor="#C531DD" />
          <stop offset="0.23" stopColor="#F296FF" />
          <stop offset="0.605" stopColor="#9600AE" />
          <stop offset="0.831" stopColor="#F296FF" />
          <stop offset="0.97" stopColor="#C531DD" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000123436393110746683920000007011945497528612239_)"
          d="M1201.5,962.5c31.9,0,57.7-15,57.7-33.5
     c-2.7-44.4-112.8-44.4-115.5,0C1143.7,947.5,1169.6,962.5,1201.5,962.5z"
        />
        <path
          fill="#C531DD"
          d="M1201.5,954.1c23.8,0,43.2-11.2,43.2-25.1c-2-33.2-84.4-33.2-86.4,0
     C1158.3,942.9,1177.6,954.1,1201.5,954.1z"
        />
        <path
          fill="#9600AE"
          d="M1201.5,906.7c23.1,0,41.8,10.5,43.1,23.7c0.8-15.1-18.7-26.2-43.2-26.4c-24.5,0.2-44,11.3-43.2,26.4
     C1159.7,917.2,1178.4,906.7,1201.5,906.7z"
        />
        <path
          fill="#9600AE"
          d="M1177.6,939.1c-2.9-2.1-4.8-4.5-5.3-7.2c-2.7-18.6,30.9-22.4,44.5-15.9c4,1.7,7,3.8,9.2,6.4
     c0.3,0.4,1.1,0.7,1.8,1c3.5,1,9.1,4,7.6,7c-1.2,2.1-3.6,3.7-7,4.7c-1.4,0.4-2.2,1-2.9,1.7c-7.4,8.4-26.6,11.6-40.3,6.4
     c1-0.6,1.9-1.1,2.9-1.7c-9.9-5.8-7.8-16,4.3-19.8c7.7-2.3,17.6-0.9,21.9,3.2c3.6,3.5,1.5,8.3-4.4,10.1c-4.5,1.4-10.3,0.5-12.6-1.9
     c-1.5-1.5-1.1-3.5,0.9-4.8c1.9-1.2,4.3-1.3,7.6-0.3c1.3-0.8,2.7-1.6,4.1-2.4c-2.6-2.2-9.2-2.7-13.7-1c-8.5,3.1-8,10.3,0.9,13.3
     c10.2,3.5,23-0.3,25.1-7.4c1.9-6.4-6.1-12.4-18-13.5C1188.9,915.4,1168.8,925,1177.6,939.1L1177.6,939.1z"
        />
        <path
          fill="#F296FF"
          d="M1177.6,937.1c-2.9-2.1-4.8-4.5-5.3-7.2c-2.7-18.6,30.9-22.4,44.5-15.9c4,1.7,7,3.8,9.2,6.4
     c0.3,0.4,1.1,0.7,1.8,1c3.5,1,9.1,4,7.6,7c-1.2,2.1-3.6,3.7-7,4.7c-1.4,0.4-2.2,1-2.9,1.7c-7.4,8.4-26.6,11.6-40.3,6.4
     c1-0.6,1.9-1.1,2.9-1.7c-9.9-5.8-7.8-16,4.3-19.8c7.7-2.3,17.6-0.9,21.9,3.2c3.6,3.5,1.5,8.3-4.4,10.1c-4.5,1.4-10.3,0.5-12.6-1.9
     c-1.5-1.5-1.1-3.5,0.9-4.8c1.9-1.2,4.3-1.3,7.6-0.3c1.3-0.8,2.7-1.6,4.1-2.4c-2.6-2.2-9.2-2.7-13.7-1c-8.5,3.1-8,10.3,0.9,13.3
     c10.2,3.5,23-0.3,25.1-7.4c1.9-6.4-6.1-12.4-18-13.5C1188.9,913.4,1168.8,923,1177.6,937.1L1177.6,937.1z"
        />
      </g>
      <path
        fill="#FFFFFF"
        d="M951.1,614.4c-1.2,0.7-2.1,0.8-2.7,0.4c-0.9-0.5-1-2.6-0.9-3.9l2.3-1.4c0,1-0.3,3.2,1.3,2.3
   c1.4-0.7,1.6-3.1,0.8-4.3c-0.7-1-3.3-1.6-3.8-2.7c-1.6-3.1,0-7.5,3.1-9.2c1.2-0.7,2.1-0.8,2.7-0.4c0.8,0.4,1,2.3,0.9,3.6l-2.3,1.4
   c0-0.5,0.1-1.9-0.3-2.1c-0.2-0.2-0.5-0.1-0.9,0.1c-1.3,0.6-1.6,2.9-0.8,4c0.7,0.9,3.4,1.6,3.8,2.7
   C955.9,608.1,954.3,612.7,951.1,614.4L951.1,614.4z M961.6,592.4l-2.6,1.5v-2.6l7.7-4.4v2.6l-2.6,1.5v15.6l-2.5,1.4V592.4z
    M972.2,583.8l3.4-1.9l2.6,16.7l-2.5,1.4l-0.5-3.4v0.1l-2.8,1.6l-0.5,3.8l-2.3,1.3L972.2,583.8L972.2,583.8z M974.9,594.4l-1.1-8.4
   l0,0l-1.1,9.6L974.9,594.4L974.9,594.4z M982.7,577.7l2.5-1.4v7.7l3.2-9.5l2.5-1.4l-3,8.4l3,9.8l-2.6,1.5l-2.1-6.9l-1,2.9v5.8
   l-2.5,1.4L982.7,577.7L982.7,577.7z M995.4,570.4l2.5-1.4v18.2l-2.5,1.4V570.4z M1003.1,565.9l3.1-1.8l2.4,9.5l0,0v-10.9l2.2-1.3
   v18.2l-2.5,1.5l-3-11.6l0,0v13.3l-2.2,1.3V565.9z M1019.6,574.8c-1.2,0.7-2.1,0.8-2.8,0.4c-0.6-0.4-0.9-1.4-0.9-2.9v-9.6
   c0-2.9,1.2-5.3,3.7-6.7c1.2-0.7,2.1-0.8,2.8-0.4c1,0.5,1,3,1,4.4l-2.3,1.4v-1.7c0-1.2-0.4-1.5-1.3-1.1c-0.9,0.5-1.3,1.3-1.3,2.5v10
   c0,1.2,0.4,1.5,1.3,1c0.9-0.5,1.3-1.3,1.3-2.5v-3.6l-1.2,0.7v-2.6l3.6-2.1v6C1023.3,571,1022.1,573.4,1019.6,574.8z M947.9,709.8
   l3.5-2l1.6,12.1l0,0l1.6-13.9l3.5-2V722l-2.3,1.4v-13.8l0,0l-1.8,14.8l-2.1,1.2l-1.8-12.8l0,0v13.8l-2.2,1.2L947.9,709.8
   L947.9,709.8z M965.3,699.7l3.4-1.9l2.6,16.7l-2.5,1.4l-0.5-3.4v0.1l-2.8,1.6l-0.5,3.8l-2.3,1.3L965.3,699.7z M968,710.3l-1.1-8.4
   l0,0l-1.1,9.6L968,710.3z M975.9,693.6l3.7-2.1c1.3-0.7,2.2-0.9,2.8-0.6c0.6,0.3,0.9,1.2,0.9,2.6c0.1,2.1-0.3,4.4-1.6,5.6v0.1
   c0.6-0.1,1,0,1.3,0.5c0.6,1,0.3,4.3,0.4,5.6c0,0.9,0,1.4,0.3,2.1l-2.5,1.5c-0.4-1.1-0.2-4.1-0.2-5.4c0-0.8-0.1-1.3-0.4-1.5
   c-0.4-0.4-1.6,0.4-2.1,0.7v7.8l-2.5,1.4L975.9,693.6L975.9,693.6z M979.2,699.5c1.1-0.6,1.5-1.5,1.5-2.8c0-0.6,0.1-2.4-0.3-2.7
   c-0.4-0.4-1.6,0.6-2.1,0.8v5.2L979.2,699.5L979.2,699.5z M988.3,686.4l2.5-1.4v7.7l3.2-9.5l2.5-1.4l-3,8.4l3,9.8l-2.6,1.5l-2.1-6.9
   l-1,2.9v5.8l-2.5,1.4V686.4L988.3,686.4z M1001,679.1l6.8-3.9v2.6l-4.3,2.5v4.8l3.4-2v2.6l-3.4,2v5.6l4.3-2.5v2.6l-6.8,3.9V679.1
   L1001,679.1z M1014.5,673.9l-2.6,1.5v-2.6l7.7-4.4v2.6l-2.6,1.5v15.6l-2.5,1.4L1014.5,673.9L1014.5,673.9z M1024.2,665.7l3.7-2.1
   c2.5-1.5,3.7-0.5,3.7,2.4c0.2,4.5-0.7,7-4.9,9.1v7.4l-2.5,1.4V665.7z M1027.8,671.8c0.9-0.6,1.2-1.3,1.2-2.4c-0.1-0.6,0.2-3-0.3-3.3
   c-0.4-0.4-1.6,0.6-2.1,0.8v5.6L1027.8,671.8z M1036.3,658.8l2.5-1.4v15.6l4.1-2.4v2.6l-6.6,3.8L1036.3,658.8L1036.3,658.8z
    M1049.4,651.2l3.4-1.9l2.6,16.7l-2.5,1.4l-0.4-3.4v0.1l-2.8,1.6l-0.4,3.8l-2.3,1.3L1049.4,651.2L1049.4,651.2z M1052.1,661.8
   l-1.1-8.4l-0.1,0l-1.1,9.6L1052.1,661.8z M1063.3,661.6c-2.5,1.4-3.7,0.4-3.7-2.4c0,0,0-9.8,0-9.8c0-2.8,1.2-5.2,3.7-6.6
   c1.2-0.7,2.1-0.8,2.7-0.4c1.1,0.5,1,3.3,0.9,4.7l-2.3,1.4v-2.1c0-1.1-0.4-1.5-1.2-1c-0.8,0.5-1.2,1.3-1.2,2.4V658
   c0,1.1,0.4,1.4,1.2,1c1.8-1,1.1-3.4,1.2-5.2l2.3-1.4v2.6C1067,657.8,1065.7,660.2,1063.3,661.6L1063.3,661.6z M1071.9,638.2l6.8-3.9
   v2.6l-4.3,2.5v4.8l3.4-2v2.6l-3.4,2v5.6l4.3-2.5v2.6l-6.8,3.9V638.2z M949.8,827.1l3.4-1.9l2.6,16.7l-2.5,1.4l-0.5-3.4v0.1l-2.8,1.6
   l-0.5,3.8l-2.3,1.3L949.8,827.1L949.8,827.1z M952.5,837.8l-1.1-8.4l0,0l-1.1,9.6L952.5,837.8L952.5,837.8z M963.9,837.5
   c-1.2,0.7-2.1,0.8-2.7,0.4c-0.6-0.4-0.9-1.4-0.9-2.9v-13.9l2.5-1.4v14.1c0,0.6,0.1,1,0.3,1.2c0.6,0.3,1.6-0.5,1.9-1.1
   c0.2-0.4,0.3-0.9,0.3-1.5v-14.1l2.4-1.4v13.9C967.6,833.6,966.4,836.1,963.9,837.5z M976.2,830.4c-1.2,0.7-2.1,0.8-2.7,0.4
   c-0.6-0.4-0.9-1.3-0.9-2.8v-9.8c0-2.8,1.2-5.2,3.7-6.6c1.2-0.7,2.1-0.8,2.7-0.4c1.1,0.5,1,3.3,0.9,4.7l-2.3,1.4v-2.1
   c0-1.1-0.4-1.5-1.2-1s-1.2,1.3-1.2,2.4v10.2c0,1.1,0.4,1.4,1.2,1s1.2-1.3,1.2-2.4v-2.8l2.3-1.4v2.6
   C979.9,826.6,978.7,829,976.2,830.4z M986.7,808.5l-2.6,1.5v-2.6l7.7-4.4v2.6l-2.6,1.5v15.6l-2.5,1.4V808.5L986.7,808.5z
    M996.3,800.3l2.5-1.4v18.2l-2.5,1.4V800.3z M1007.6,812.2c-2.5,1.5-3.8,0.4-3.8-2.4c0,0,0-9.6,0-9.6c0-2.8,1.3-5.3,3.8-6.8
   c1.2-0.7,2.2-0.8,2.8-0.4c0.6,0.4,1,1.4,1,2.8v9.6C1011.4,808.3,1010.1,810.8,1007.6,812.2z M1007.6,809.6c0.9-0.5,1.3-1.3,1.3-2.5
   v-9.9c0-1.2-0.4-1.5-1.3-1.1c-0.8,0.5-1.3,1.3-1.3,2.5v9.9C1006.4,809.8,1006.8,810.1,1007.6,809.6z M1016.5,788.7l3.1-1.8l2.4,9.5
   l0,0v-10.9l2.2-1.3v18.2l-2.5,1.5l-3-11.6l0,0v13.3l-2.2,1.3C1016.5,806.9,1016.5,788.7,1016.5,788.7z M1032.7,797.8
   c-1.2,0.7-2.1,0.8-2.7,0.4c-0.9-0.5-1-2.6-0.9-3.9l2.3-1.4v1.2c-0.1,2.1,1.7,1.1,2.2,0.1c0.5-0.8,0.5-2.6-0.1-3.3
   c-0.7-1-3.3-1.6-3.8-2.7c-1.6-3.1,0-7.5,3.1-9.2c1.2-0.7,2.1-0.8,2.7-0.4c0.8,0.4,1,2.3,0.9,3.6l-2.3,1.4c0-0.5,0.1-1.9-0.3-2.1
   c-0.2-0.2-0.5-0.1-0.9,0.1c-0.8,0.5-1.2,1.3-1.2,2.5c0,1.5,0.7,2,2.1,2.7c2.1,0.9,2.7,1.9,2.7,4.3
   C1036.4,793.9,1035.2,796.4,1032.7,797.8L1032.7,797.8z"
      />
      <path fill="none" stroke="#E0B2FF" strokeWidth="1.859" d="M1179.1,405L896,568.4" />
      <linearGradient
        id="SVGID_00000005243429139774879490000006092635352252158599_"
        gradientUnits="userSpaceOnUse"
        x1="1040.6682"
        y1="1089.4286"
        x2="1035.0823"
        y2="1099.8676"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#69F7F7" />
        <stop offset="1" stopColor="#9800FF" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000005243429139774879490000006092635352252158599_)"
        strokeWidth="1.859"
        d="M1179.1,405
   L896,568.4"
      />
      <path
        fill="none"
        stroke="#E0B2FF"
        strokeWidth="1.859"
        d="M779.4,938l-171.9-99.3c-4.5-2.6-6.8-3.9-9.4-4.4c-2.3-0.4-4.7-0.4-7,0
   c-2.6,0.5-4.9,1.8-9.4,4.4l-72,41.6"
      />
      <linearGradient
        id="SVGID_00000016772076610548092280000013133158550551819146_"
        gradientUnits="userSpaceOnUse"
        x1="629.7217"
        y1="759.7047"
        x2="652.7748"
        y2="625.8943"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000016772076610548092280000013133158550551819146_)"
        strokeWidth="1.859"
        d="M779.4,938
   l-171.9-99.3c-4.5-2.6-6.8-3.9-9.4-4.4c-2.3-0.4-4.7-0.4-7,0c-2.6,0.5-4.9,1.8-9.4,4.4l-72,41.6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#E0B2FF"
        d="M662.6,755.9L371.5,588.1l1.6-0.9L664.2,755
   c3.3,1.9,5.9,3.4,7.8,4.7c1.9,1.3,3.2,2.4,3.9,3.7c2.2,4.1,0.1,7.7-3.9,10.2c-1.9,1.3-4.4,2.8-7.8,4.7l-165.3,95.5l-1.6-0.9
   l165.3-95.4c3.4-2,5.9-3.4,7.7-4.6c3.7-2.3,5.3-5.2,3.4-8.9c-0.6-1-1.6-2-3.4-3.2C668.5,759.3,666,757.9,662.6,755.9z"
      />
      <linearGradient
        id="SVGID_00000012472847987036214760000008664703546881525660_"
        gradientUnits="userSpaceOnUse"
        x1="434.1437"
        y1="732.3445"
        x2="528.1108"
        y2="911.4506"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#SVGID_00000012472847987036214760000008664703546881525660_)"
        d="
   M662.6,755.9L371.5,588.1l1.6-0.9L664.2,755c3.3,1.9,5.9,3.4,7.8,4.7c1.9,1.3,3.2,2.4,3.9,3.7c2.2,4.1,0.1,7.7-3.9,10.2
   c-1.9,1.3-4.4,2.8-7.8,4.7l-165.3,95.5l-1.6-0.9l165.3-95.4c3.4-2,5.9-3.4,7.7-4.6c3.7-2.3,5.3-5.2,3.4-8.9c-0.6-1-1.6-2-3.4-3.2
   C668.5,759.3,666,757.9,662.6,755.9z"
      />
      <path
        fill="none"
        stroke="#05DDFF"
        strokeWidth="1.859"
        d="M443,1215.1l-18.7-10.9 M424.3,1204.2L289.9,1126 M424.3,1204.2
   l298,173.5"
      />
      <linearGradient
        id="SVGID_00000115496987575619260440000005542980878693447353_"
        gradientUnits="userSpaceOnUse"
        x1="506.0995"
        y1="456.7932"
        x2="506.0995"
        y2="203.4668"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000115496987575619260440000005542980878693447353_)"
        strokeWidth="1.859"
        d="M443,1215.1
   l-18.7-10.9 M424.3,1204.2L289.9,1126 M424.3,1204.2l298,173.5"
      />
      <path fill="none" stroke="#05DDFF" strokeWidth="1.859" d="M565.5,967.4l541.2,313.6" />
      <linearGradient
        id="SVGID_00000116196766968392153420000005051052017350161330_"
        gradientUnits="userSpaceOnUse"
        x1="836.1115"
        y1="615.3572"
        x2="836.1115"
        y2="300.1157"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000116196766968392153420000005051052017350161330_)"
        strokeWidth="1.859"
        d="M565.5,967.4
   l541.2,313.6"
      />
      <path
        fill="none"
        stroke="#E0B2FF"
        strokeWidth="1.859"
        d="M731.5,239.2l102.9-59.4c6.8-3.9,10.2-5.9,14.1-6.6
   c3.5-0.6,7.1-0.6,10.6,0c3.9,0.7,7.3,2.7,14,6.6l269.4,155.9"
      />
      <linearGradient
        id="SVGID_00000007420237499718976560000012861732958394023852_"
        gradientUnits="userSpaceOnUse"
        x1="940.0133"
        y1="1195.8779"
        x2="935.3503"
        y2="1348.2889"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#3E88FF" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000007420237499718976560000012861732958394023852_)"
        strokeWidth="1.859"
        d="M731.5,239.2
   l102.9-59.4c6.8-3.9,10.2-5.9,14.1-6.6c3.5-0.6,7.1-0.6,10.6,0c3.9,0.7,7.3,2.7,14,6.6l269.4,155.9"
      />
      <path fill="none" stroke="#05DDFF" strokeWidth="1.859" strokeDasharray="11.15,11.15" d="M1201,465v430" />
      <linearGradient
        id="SVGID_00000116952519189829863030000018199696797659823265_"
        gradientUnits="userSpaceOnUse"
        x1="1201"
        y1="120448"
        x2="1201"
        y2="120883"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#69F7F7" />
        <stop offset="1" stopColor="#9800FF" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000116952519189829863030000018199696797659823265_)"
        strokeWidth="1.859"
        strokeDasharray="11.15,11.15"
        d="
   M1201,465v430"
      />
      <linearGradient
        id="SVGID_00000034810784355997720060000000456301429369262508_"
        gradientUnits="userSpaceOnUse"
        x1="270.6269"
        y1="673.2009"
        x2="346.6104"
        y2="468.2267"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#SVGID_00000034810784355997720060000000456301429369262508_)"
        d="
   M21.3,1067.3l93.9-54.2l61.6-33.7c61.6-35.2,180-104.4,241-139c5.1-2.6,9.9-3,15.4-2c2.1,0.4,4.8-0.1,7,1c2.8,1.4,4.8,2.6,8.1,4.5
   c0,0,146.3,84.4,146.3,84.4c3.3,1.9,5.9,3.4,7.8,4.7c1.9,1.3,3.2,2.4,3.9,3.7c3.8,7.8-5.6,11-11.6,14.8c0,0-387,223.4-387,223.4
   c-5.7,3.2-8.9,5.5-14.5,6.7c-6,1-12,0.7-17.6-2.2c-2.2-1.1-4.8-2.6-8.1-4.5l-22.9-13.2l1.6-0.9l22.8,13.2c5.4,3.1,8.6,5.3,13.6,6.4
   c3.2,0.6,6.6,0.6,9.8,0c5-1.2,8.1-3.4,13.6-6.4c0,0,386.9-223.4,386.9-223.4c6.1-3.9,14.5-6.6,11.1-13.5c-0.6-1-1.6-2-3.4-3.2
   c-1.8-1.2-4.3-2.7-7.7-4.6l-146.2-84.4c-2.1-1.2-3.8-2.2-5.4-3c-2.5-1.4-5.7-3-8.2-3.4c-9.5-1.7-14.9,1.4-23.4,6.4
   c-72.6,42.1-326.6,188.2-394.6,228c-1.8,1.2-2.9,2.2-3.4,3.2c-3.5,6.9,5.6,9.9,11.1,13.5c0,0,21.7,12.5,21.7,12.5l-1.6,0.9
   c-5.4-3.2-24.9-14.2-29.5-17.2c-4-2.5-6.1-6.1-3.9-10.2c0.7-1.2,2-2.4,3.9-3.6C15.4,1070.8,17.9,1069.3,21.3,1067.3L21.3,1067.3z"
      />
      <linearGradient
        id="SVGID_00000124162780407709933200000010530180929812794763_"
        gradientUnits="userSpaceOnUse"
        x1="26771.3555"
        y1="5887.6235"
        x2="48973.6562"
        y2="10375.5225"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000124162780407709933200000010530180929812794763_)"
        d="M836.5,1004l-62.8-35.5l-11.3-22.1l-28.7-14.3
   v-41.8L837,950.6L836.5,1004L836.5,1004z"
      />
      <linearGradient
        id="SVGID_00000018203810091575438290000000223289201604776833_"
        gradientUnits="userSpaceOnUse"
        x1="38598.7617"
        y1="10470.5605"
        x2="57987.5625"
        y2="15541.2598"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#32054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000018203810091575438290000000223289201604776833_)"
        d="M836.6,1057l0.3-106.4l102.6-59.9v106.9
   L836.6,1057z"
      />
      <linearGradient
        id="SVGID_00000085247769579831424180000004117458482242987145_"
        gradientUnits="userSpaceOnUse"
        x1="32088.3105"
        y1="6609.1626"
        x2="47571.2539"
        y2="9586.3477"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#138BBD" />
        <stop offset="0.23" stopColor="#169AC7" />
        <stop offset="0.59" stopColor="#1FC3DF" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000085247769579831424180000004117458482242987145_)"
        d="M773.7,968.5l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3.1-3.2,3.3v42.9l-102.8-59.8v-60.1l28.7,14.3L773.7,968.5L773.7,968.5z"
      />
      <linearGradient
        id="SVGID_00000070833992587656341620000013095580730101099909_"
        gradientUnits="userSpaceOnUse"
        x1="825.8808"
        y1="559.6181"
        x2="720.0808"
        y2="631.7251"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#6FF2FC" />
        <stop offset="1" stopColor="#772CCD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000070833992587656341620000013095580730101099909_)"
        d="M773.7,968.5l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3.1-3.2,3.3v42.9l-102.8-59.8v-60.1l28.7,14.3L773.7,968.5L773.7,968.5z"
      />
      <linearGradient
        id="SVGID_00000042718240061539064820000004946986856543514498_"
        gradientUnits="userSpaceOnUse"
        x1="26864.541"
        y1="5597.7197"
        x2="49146.6445"
        y2="9880.7197"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000042718240061539064820000004946986856543514498_)"
        d="M773.7,973.7l62.8,35.5v48l-102.8-59.8v-60.1
   l28.7,14.4L773.7,973.7L773.7,973.7z"
      />
      <radialGradient
        id="SVGID_00000070818405285478134810000001085109556420890796_"
        cx="-230.7761"
        cy="1336.5554"
        r="1"
        gradientTransform="matrix(45.1771 0 0 -45.1809 11209.3604 61364.1719)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4B61B8" />
        <stop offset="0.13" stopColor="#38498A" />
        <stop offset="0.27" stopColor="#273360" />
        <stop offset="0.41" stopColor="#19203E" />
        <stop offset="0.55" stopColor="#0E1223" />
        <stop offset="0.7" stopColor="#06080F" />
        <stop offset="0.84" stopColor="#020204" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000070818405285478134810000001085109556420890796_)"
        d="M773.7,971.2l-11.3-22l-28.7-14.4v4.1l28.7,14.3
   l11.3,22.1l62.8,35.5v-4L773.7,971.2z"
      />
      <linearGradient
        id="SVGID_00000155134704658706089150000011815289662763603073_"
        gradientUnits="userSpaceOnUse"
        x1="2013.8092"
        y1="4537.8799"
        x2="-3145.5891"
        y2="-12321.0176"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0.74" stopColor="#45108A" />
        <stop offset="1" stopColor="#3746A3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000155134704658706089150000011815289662763603073_)"
        d="M733.7,890.3l103.2,60.3l102.8-60l-103.3-60.1
   L733.7,890.3z"
      />
      <linearGradient
        id="SVGID_00000145059334722513308870000004430154445116168383_"
        gradientUnits="userSpaceOnUse"
        x1="26771.3535"
        y1="6002.8203"
        x2="48973.6523"
        y2="10490.7207"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000145059334722513308870000004430154445116168383_)"
        d="M836.5,888.8l-62.8-35.5l-11.3-22.1l-28.7-14.3
   v-41.8L837,835.4L836.5,888.8L836.5,888.8z"
      />
      <linearGradient
        id="SVGID_00000025430997176838341100000010338358073443828415_"
        gradientUnits="userSpaceOnUse"
        x1="38598.7656"
        y1="10585.7539"
        x2="57987.5664"
        y2="15656.4531"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#32054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000025430997176838341100000010338358073443828415_)"
        d="M836.6,941.8l0.3-106.4l102.6-59.9v106.9
   L836.6,941.8z"
      />
      <linearGradient
        id="SVGID_00000044857611766646217020000002420424807807055250_"
        gradientUnits="userSpaceOnUse"
        x1="32088.3242"
        y1="6724.3584"
        x2="47571.2734"
        y2="9701.5439"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#138BBD" />
        <stop offset="0.23" stopColor="#169AC7" />
        <stop offset="0.59" stopColor="#1FC3DF" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000044857611766646217020000002420424807807055250_)"
        d="M773.7,853.3l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3-3.2,3.3v42.9L733.7,877v-60.1l28.7,14.3L773.7,853.3L773.7,853.3z"
      />
      <linearGradient
        id="SVGID_00000065042555840678808690000012709319621288829613_"
        gradientUnits="userSpaceOnUse"
        x1="825.8807"
        y1="674.8133"
        x2="720.0807"
        y2="746.9174"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#6FF2FC" />
        <stop offset="1" stopColor="#772CCD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000065042555840678808690000012709319621288829613_)"
        d="M773.7,853.3l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3-3.2,3.3v42.9L733.7,877v-60.1l28.7,14.3L773.7,853.3L773.7,853.3z"
      />
      <linearGradient
        id="SVGID_00000044173848432001698340000013354776767647167901_"
        gradientUnits="userSpaceOnUse"
        x1="26864.541"
        y1="5712.9106"
        x2="49146.6445"
        y2="9995.9111"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000044173848432001698340000013354776767647167901_)"
        d="M773.7,858.5l62.8,35.5v48l-102.8-59.8v-60.1
   l28.7,14.4L773.7,858.5L773.7,858.5z"
      />
      <radialGradient
        id="SVGID_00000010307466633737805250000002393343268943980213_"
        cx="-230.7761"
        cy="1336.5554"
        r="1"
        gradientTransform="matrix(45.1771 0 0 -45.1809 11209.3604 61248.9805)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4B61B8" />
        <stop offset="0.13" stopColor="#38498A" />
        <stop offset="0.27" stopColor="#273360" />
        <stop offset="0.41" stopColor="#19203E" />
        <stop offset="0.55" stopColor="#0E1223" />
        <stop offset="0.7" stopColor="#06080F" />
        <stop offset="0.84" stopColor="#020204" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000010307466633737805250000002393343268943980213_)"
        d="M773.7,856l-11.3-22l-28.7-14.4v4.1l28.7,14.3
   l11.3,22.1l62.8,35.5v-4.1L773.7,856z"
      />
      <linearGradient
        id="SVGID_00000103966680851454345720000012718770057550600127_"
        gradientUnits="userSpaceOnUse"
        x1="2013.8113"
        y1="4653.0796"
        x2="-3145.5876"
        y2="-12205.8203"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0.74" stopColor="#45108A" />
        <stop offset="1" stopColor="#3746A3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000103966680851454345720000012718770057550600127_)"
        d="M733.7,775.1l103.2,60.3l102.8-60l-103.3-60.1
   L733.7,775.1z"
      />
      <linearGradient
        id="SVGID_00000151505508195082972520000010427507789429324472_"
        gradientUnits="userSpaceOnUse"
        x1="26771.3535"
        y1="6118.0146"
        x2="48973.6523"
        y2="10605.915"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000151505508195082972520000010427507789429324472_)"
        d="M836.5,773.6l-62.8-35.5l-11.3-22.1l-28.7-14.3
   v-41.8L837,720.2L836.5,773.6L836.5,773.6z"
      />
      <linearGradient
        id="SVGID_00000047751551593311102440000013023797554348252565_"
        gradientUnits="userSpaceOnUse"
        x1="38598.7656"
        y1="10700.9473"
        x2="57987.5664"
        y2="15771.6465"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#32054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000047751551593311102440000013023797554348252565_)"
        d="M836.6,826.6l0.3-106.4l102.6-59.9v106.9
   L836.6,826.6L836.6,826.6z"
      />
      <linearGradient
        id="SVGID_00000057112538466903254300000008553689340798102452_"
        gradientUnits="userSpaceOnUse"
        x1="32088.3262"
        y1="6839.5518"
        x2="47571.2773"
        y2="9816.7373"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#138BBD" />
        <stop offset="0.23" stopColor="#169AC7" />
        <stop offset="0.59" stopColor="#1FC3DF" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000057112538466903254300000008553689340798102452_)"
        d="M773.7,738.1l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3-3.2,3.3v42.9l-102.8-59.8v-60.1l28.7,14.3L773.7,738.1L773.7,738.1z"
      />
      <linearGradient
        id="SVGID_00000126318362047065791280000003988521834119549368_"
        gradientUnits="userSpaceOnUse"
        x1="825.8807"
        y1="790.0073"
        x2="720.0807"
        y2="862.1113"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#6FF2FC" />
        <stop offset="1" stopColor="#772CCD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000126318362047065791280000003988521834119549368_)"
        d="M773.7,738.1l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3-3.2,3.3v42.9l-102.8-59.8v-60.1l28.7,14.3L773.7,738.1L773.7,738.1z"
      />
      <linearGradient
        id="SVGID_00000121259054072567727780000005907361706808712370_"
        gradientUnits="userSpaceOnUse"
        x1="26864.543"
        y1="5828.1045"
        x2="49146.6445"
        y2="10111.1045"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000121259054072567727780000005907361706808712370_)"
        d="M773.7,743.3l62.8,35.5v48L733.7,767v-60.1
   l28.7,14.4L773.7,743.3L773.7,743.3z"
      />
      <radialGradient
        id="SVGID_00000038408605374561437290000014371678569377566887_"
        cx="-230.7761"
        cy="1336.5554"
        r="1"
        gradientTransform="matrix(45.1771 0 0 -45.1809 11209.3604 61133.7891)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4B61B8" />
        <stop offset="0.13" stopColor="#38498A" />
        <stop offset="0.27" stopColor="#273360" />
        <stop offset="0.41" stopColor="#19203E" />
        <stop offset="0.55" stopColor="#0E1223" />
        <stop offset="0.7" stopColor="#06080F" />
        <stop offset="0.84" stopColor="#020204" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000038408605374561437290000014371678569377566887_)"
        d="M773.7,740.8l-11.3-22l-28.7-14.4v4.1l28.7,14.3
   l11.3,22.1l62.8,35.5v-4.1L773.7,740.8z"
      />
      <linearGradient
        id="SVGID_00000068642352130522066600000016727364886636494477_"
        gradientUnits="userSpaceOnUse"
        x1="2013.8129"
        y1="4768.2783"
        x2="-3145.5862"
        y2="-12090.6221"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0.74" stopColor="#45108A" />
        <stop offset="1" stopColor="#3746A3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000068642352130522066600000016727364886636494477_)"
        d="M733.7,659.9l103.2,60.3l102.8-60l-103.3-60.1
   L733.7,659.9z"
      />
      <linearGradient
        id="SVGID_00000165229042294184525010000011118746295704676007_"
        gradientUnits="userSpaceOnUse"
        x1="26771.1387"
        y1="6233.2798"
        x2="48973.4375"
        y2="10721.2803"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000165229042294184525010000011118746295704676007_)"
        d="M836.5,658.4L773.7,623l-11.3-22.1l-28.7-14.3
   v-41.8L837,605L836.5,658.4L836.5,658.4z"
      />
      <linearGradient
        id="SVGID_00000054953636049974287430000014792872180949628045_"
        gradientUnits="userSpaceOnUse"
        x1="38598.7617"
        y1="10816.1436"
        x2="57987.5625"
        y2="15886.8447"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#32054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000054953636049974287430000014792872180949628045_)"
        d="M836.6,711.4l0.3-106.4l102.6-59.9V652
   L836.6,711.4L836.6,711.4z"
      />
      <linearGradient
        id="SVGID_00000143610265065609232460000000515351761524797841_"
        gradientUnits="userSpaceOnUse"
        x1="32088.3223"
        y1="6954.7441"
        x2="47571.2695"
        y2="9931.9297"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#138BBD" />
        <stop offset="0.23" stopColor="#169AC7" />
        <stop offset="0.59" stopColor="#1FC3DF" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000143610265065609232460000000515351761524797841_)"
        d="M773.7,623l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3-3.2,3.3v42.9l-102.8-59.8v-60.1l28.7,14.3L773.7,623L773.7,623z"
      />
      <linearGradient
        id="SVGID_00000008131141265152181400000012968865230172665472_"
        gradientUnits="userSpaceOnUse"
        x1="825.8809"
        y1="905.2004"
        x2="720.0809"
        y2="977.3034"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#6FF2FC" />
        <stop offset="1" stopColor="#772CCD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000008131141265152181400000012968865230172665472_)"
        d="M773.7,623l62.8,35.5l0.6-0.2
   c1.3-0.3,2.6,0.7,2.5,2c0,1.8-1.4,3-3.2,3.3v42.9l-102.8-59.8v-60.1l28.7,14.3L773.7,623L773.7,623z"
      />
      <linearGradient
        id="SVGID_00000147934465900015053080000004028768348428414878_"
        gradientUnits="userSpaceOnUse"
        x1="26864.5449"
        y1="5943.2979"
        x2="49146.6484"
        y2="10226.2979"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000147934465900015053080000004028768348428414878_)"
        d="M773.7,628.1l62.8,35.5v48l-102.8-59.8v-60.1
   l28.7,14.4L773.7,628.1L773.7,628.1z"
      />
      <radialGradient
        id="SVGID_00000128476589405175850320000010099897416700033674_"
        cx="-230.7761"
        cy="1336.5554"
        r="1"
        gradientTransform="matrix(45.1771 0 0 -45.1809 11209.3604 61018.5938)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4B61B8" />
        <stop offset="0.13" stopColor="#38498A" />
        <stop offset="0.27" stopColor="#273360" />
        <stop offset="0.41" stopColor="#19203E" />
        <stop offset="0.55" stopColor="#0E1223" />
        <stop offset="0.7" stopColor="#06080F" />
        <stop offset="0.84" stopColor="#020204" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000128476589405175850320000010099897416700033674_)"
        d="M773.7,625.6l-11.3-22l-28.7-14.4v4.1l28.7,14.3
   l11.3,22.1l62.8,35.5V661L773.7,625.6z"
      />
      <linearGradient
        id="SVGID_00000144335188178062399300000018217560497979980432_"
        gradientUnits="userSpaceOnUse"
        x1="2013.8132"
        y1="4883.4756"
        x2="-3145.5842"
        y2="-11975.4355"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0.74" stopColor="#45108A" />
        <stop offset="1" stopColor="#3746A3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000144335188178062399300000018217560497979980432_)"
        d="M733.7,544.7L836.9,605l102.8-60l-103.3-60.1
   L733.7,544.7z"
      />
      <linearGradient
        id="SVGID_00000108293271721728810030000016897825428144612994_"
        gradientUnits="userSpaceOnUse"
        x1="1334.9312"
        y1="2666.7124"
        x2="-848.6684"
        y2="-4468.2373"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#BD97FF" />
        <stop offset="0" stopColor="#BD97FF" />
        <stop offset="1" stopColor="#0023FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000108293271721728810030000016897825428144612994_)"
        d="M793.1,543.2l43.7,25.5l43.5-25.4l-43.7-25.5
   L793.1,543.2L793.1,543.2z"
      />
      <linearGradient
        id="contacts-inner-light_00000053535998848419143790000012676076841936923788_"
        gradientUnits="userSpaceOnUse"
        x1="849.764"
        y1="1013.783"
        x2="849.764"
        y2="1382.4351"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#2AF6FF" />
        <stop offset="2.000000e-02" stopColor="#29EEF7" />
        <stop offset="0.13" stopColor="#1FB7BE" />
        <stop offset="0.25" stopColor="#17868B" />
        <stop offset="0.37" stopColor="#105D60" />
        <stop offset="0.49" stopColor="#0A3B3E" />
        <stop offset="0.62" stopColor="#062123" />
        <stop offset="0.74" stopColor="#030F0F" />
        <stop offset="0.87" stopColor="#010404" />
        <stop offset="1" stopColor="#000000" />
      </linearGradient>
      <path
        id="contacts-inner-light"
        opacity="0.5"
        fill="url(#contacts-inner-light_00000053535998848419143790000012676076841936923788_)"
        enableBackground="new    "
        d="
   M959.2,346.9V300L743.7,426l-3.3,45.1l53.6,72.3l42.7,24.9l43.3-24.9L959.2,346.9z"
      />
      <g>
        <linearGradient
          id="SVGID_00000094617207647261483010000001447403935755979452_"
          gradientUnits="userSpaceOnUse"
          x1="865.8909"
          y1="859.2221"
          x2="919.667"
          y2="859.2221"
        >
          <stop offset="0" stopColor="#9801FF" />
          <stop offset="1" stopColor="#69F7F7" />
        </linearGradient>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="url(#SVGID_00000094617207647261483010000001447403935755979452_)"
          d="
     M880.7,835.4c-2.5,1.9-12.5,20.5-13.9,23.3c-0.8,2.3-0.8,2-0.8,16.1c0,14.1,0,14.1,0.8,15.3c0.5,0.7,10.9,6.8,12.1,7
     c1.2,0.2,2.1,0,4.2-1.1l1.8-0.9l16-9.2c2.3-1.4,4.7-2.9,6-4.9c1.1-1.6,11.6-19.7,12.1-21c0.8-2.2,0.8-2.1,0.8-16.1
     c0-8.7-0.1-13.1-0.2-13.6c-0.4-1.8-0.7-2.1-6.8-5.7c-3.9-2.3-6-3.4-6.4-3.4c-1.5,0-1.5,0-13.6,7
     C883.3,833.6,881.3,834.8,880.7,835.4L880.7,835.4z M904.1,827c0.5,0,10.7,6,11,6.5c0.1,0.2,0.2,3.7,0.2,12.8
     c0,10.6,0,12.7-0.2,13.1c-0.1,0.3-2.6,4.7-5.5,9.7c-4,7-5.4,9.3-5.8,9.6c-0.7,0.6-21.2,12.5-21.9,12.6c-0.4,0.1-1.8-0.6-5.8-2.9
     c-2.9-1.7-5.4-3.2-5.5-3.4c-0.2-0.3-0.2-2.3-0.2-12.9c0-9.1,0-12.7,0.2-13c0.3-0.7,10.4-18.5,11-19.1c0.4-0.5,1.2-1,11.3-6.8
     C902.9,827.5,903.7,827,904.1,827L904.1,827z M877.4,857.4c-0.4,0.5-0.8,1.1-1,1.5c-0.3,0.7-0.3,1-0.3,10.2v9.4l0.3,0.4
     c0.6,0.8,0.9,0.7,4.3-1.3l3-1.8c2.7-2.7,4.8-7,4.3-10.2c-0.2-1.2-0.5-2-1.2-2.6c1.3-3.3,2-7.3-0.3-8.9c-1.4-1-3-0.7-6.4,1.3
     C878.3,856.5,878,856.7,877.4,857.4L877.4,857.4z M891.7,849.1c-0.4,0.5-0.8,1.1-1,1.5c-0.3,0.7-0.3,1-0.3,10.2
     c0,9.1,0,9.4,0.3,9.8c0.8,1.1,2.9,0,3.8-2.1c0.3-0.6,0.3-1.1,0.3-10.2c0-9.3,0-9.6-0.3-9.9c-0.3-0.4-1.3-0.5-1.8-0.2
     C892.5,848.3,892.1,848.7,891.7,849.1L891.7,849.1z M898.7,845.1c-0.4,0.5-0.8,1.1-1,1.5c-0.3,0.7-0.3,1-0.3,10.2v9.4
     c1.1,1.4,0.8,1.3,4.8-1c3.1-1.8,3.2-1.9,4-2.8c1.7-1.8,2.8-4.3,3.1-6.6c0.2-1.6,0.2-10.1,0-11.5c-0.3-2.6-2.1-3.7-4.5-2.8
     C904,841.6,898.9,844.4,898.7,845.1L898.7,845.1z M883.2,859.4c0.8,0.3,0.5,1.8,0,2.5c-0.3,0.9-1.7,1.5-2.7,2c0-0.7,0-3.3,0.1-3.5
     c0.1-0.1,0.6-0.4,1.1-0.7C882.6,859.2,882.8,859.2,883.2,859.4L883.2,859.4z M904.4,846.7c0.6,0,0.7,0.6,0.6,6
     c0,7.1-0.1,5.5-3.2,7.6c0-2.3,0-11.6,0.1-12.2C902.1,847.8,904,846.8,904.4,846.7z M883.2,868.1c0.6,0.3,0.6,1.4,0,2.5
     c-0.4,0.7-0.5,0.8-1.6,1.4l-1.1,0.6c0-0.7,0-3.3,0.1-3.6C880.9,868.7,882.8,867.6,883.2,868.1z M900.8,885.9l-16,9.2
     C889.8,892.1,895.7,888.7,900.8,885.9z"
        />

        <linearGradient
          id="SVGID_00000180327591911297747340000009907499014007280014_"
          gradientUnits="userSpaceOnUse"
          x1="866.6534"
          y1="973.618"
          x2="923.9993"
          y2="973.618"
        >
          <stop offset="0" stopColor="#9801FF" />
          <stop offset="1" stopColor="#69F7F7" />
        </linearGradient>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="url(#SVGID_00000180327591911297747340000009907499014007280014_)"
          d="
     M892.6,942.2c-9,6.3-16.8,16.4-21.6,28c-7.2,17.1-6.8,39.9,11.7,40.5c14.4-0.6,26.9-14.3,33.8-27c5.2-9.6,8.2-20.1,7.3-30.6
     C921.5,934.6,906.1,932.7,892.6,942.2L892.6,942.2z M893.6,948.6v3.1c-4.1,2.8-8.2,7.2-11.1,11.8c-0.7-0.4-3.6-2.1-3.8-2.2
     c0-0.3,3-4.5,4.5-6.3c3.2-3.8,7.4-7.8,10.4-9.5L893.6,948.6L893.6,948.6z M899,942.6c4.3-1.8,9.4-2.3,12.9-0.5
     c-0.1,0.3-3.1,5.4-3.8,6.6c-3.1-1.3-7.3-0.7-11.1,1.1v-6.2C897.6,943.2,898.1,943,899,942.6L899,942.6z M878.2,966.5l1.9,1.1
     c-2.5,4.8-4.2,10.6-4.6,15.5c-1.3,0.8-4,2.3-5.4,3.1c0.2-6.5,2.8-14.7,6.2-20.8C876.3,965.4,877.2,965.9,878.2,966.5L878.2,966.5z
      M897.2,953.6c13.6-5.7,18.5,9.1,11.3,23.8c-6.7,14.1-19.9,21.7-26.6,15.2c-4.3-4.2-4.3-13.5,0-22.6
     C885.6,962.8,890.1,957,897.2,953.6z M915.1,943.9c3.3,2.6,5.5,8.9,5.5,13.2c-1.3,0.8-4,2.3-5.4,3.1c-0.3-4.1-2-8.2-4.6-10.2
     c0.7-1.2,3.6-6.3,3.8-6.6C914.4,943.4,914.7,943.6,915.1,943.9L915.1,943.9z M894.8,959.9c-0.9,1-1.2,1.7-1.2,3.3c0,0,0,1.2,0,1.2
     c-3.5,1.9-6.9,8-4.9,11.6c1.9,2.1,3.2,1.4,6.5-0.5c2.2-1.3,2.4-1.4,2.9-1.4c0.6,0,1,0.6,1,1.3s-0.4,1.8-1,2.4
     c-0.5,0.5-0.6,0.7-2.8,1.9c-2.7,1.6-3.2,1.7-4,1.4c-0.7-0.3-0.9-0.3-1.5,0c-0.9,0.5-1.6,1.8-1.6,2.9c0,1.5,2.2,2.1,4.4,1.1l1.1-0.5
     v1.2c-0.2,2.6,1.6,2.2,2.6,0.9c0.9-1.1,0.8-2.6,0.8-4.1c3.5-1.9,6.8-7.9,5-11.5c-1.8-2.3-3.2-1.5-6.6,0.4c-2.2,1.3-2.4,1.4-2.9,1.4
     c-0.6,0-1-0.6-1-1.3s0.4-1.8,1-2.4c0.5-0.5,0.6-0.7,2.6-1.8c2.8-1.6,3.1-1.7,4-1.1c0.8,0.5,1.3,0.5,2-0.1c3.3-3.4-0.4-5.8-3.9-3.9
     c-0.2,0.1-0.3,0.1-0.3-1.1c0-1.1,0-1.3-0.3-1.6C896.3,959.2,895.5,959.3,894.8,959.9z M875.5,987.7c0.5,4.1,2.1,7.5,4.5,9.5
     c-0.7,1.2-3.6,6.3-3.8,6.6c-0.1,0.1-1.3-1-2.1-1.9c-2.5-2.6-4.1-8.2-4.1-11.8c1.3-0.8,4-2.3,5.4-3.1L875.5,987.7z M920.6,961.5
     c-0.2,5.8-3.3,15.3-6.2,20.3c-0.2,0-3.1-1.7-3.8-2.1c2.5-4.8,4.2-10.6,4.6-15.5c1.3-0.8,4-2.3,5.4-3.1L920.6,961.5L920.6,961.5z
      M883.2,998.8c2.7,1,7.1,0.3,10.5-1.3v6.2c-4.9,2.6-10.7,3.3-15,1.5l1.9-3.3c1-1.8,2-3.3,2-3.3
     C882.7,998.7,882.9,998.8,883.2,998.8L883.2,998.8z M911.9,986.1c-3,5.2-9.7,12.7-14.9,15.7v-6.2c4.1-2.8,8.2-7.2,11.1-11.8
     C908.9,984.2,911.8,985.9,911.9,986.1z"
        />

        <linearGradient
          id="SVGID_00000002365320016823735620000005353970762016490410_"
          gradientUnits="userSpaceOnUse"
          x1="868.0168"
          y1="960.3545"
          x2="918.7169"
          y2="946.5054"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#9801FF" />
          <stop offset="1" stopColor="#69F7F7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000002365320016823735620000005353970762016490410_)"
          d="M881.8,644.6c2.1-0.3,5.4-1.4,7.2-2.3
     L881.8,644.6L881.8,644.6z M881.8,644.6L881.8,644.6c-0.2,1.9,0,9.1-0.1,12L881.8,644.6L881.8,644.6z M865.3,632.1L865.3,632.1
     L865.3,632.1c-0.3,7-0.3,15.8,0,22.8c0.4,2.8,1.8,4.8,4.1,6.3c10.6,5.9,26.2-3.9,35.9-14.2c5.7-6.2,11.3-14.7,12.4-22.4
     c0.2-3.6,0.1-7.4,0.2-11.5c0-4.1,0-7.6-0.2-11.3c-1.8-10.3-14.1-10.6-22.7-6.4l0,0.1l0-0.1c-1.8,0.8-5.3,2.8-7,4l0,0.1l0-0.1
     C877.9,606.3,866.5,621.6,865.3,632.1L865.3,632.1z M881.8,644.6L881.8,644.6L881.8,644.6z M901,645.5L901,645.5L901,645.5
     c-1.6,1.6-5.3,4.5-7.3,5.8v-11.7c2.4-1.7,5.3-4.1,7.5-6.3v0c0.1,3,0,8.6,0.1,11.9L901,645.5L901,645.5z M894.5,601.2
     c5.8-2.7,11.6-2.9,15.3-0.7c7.2,4.5,1.7,13.2-2.4,19.7c-3.3,4.7-8,9.8-12.5,13.2c-1.5,1.2-5,3.2-6.7,3.9c-4.5,1.7-9.2,2.2-12.5,1.3
     c-7.2-2.4-7-7.8-3.6-14.6C876.2,615,885.6,605,894.5,601.2L894.5,601.2z M871.8,644c1.6,0.6,3.4,0.9,5.3,1c0,3.4,0,8.8,0,11.9
     c-3.6-0.3-6.8-2.1-7.3-5.4c-0.2-1.2-0.1-6.6-0.1-8.6C870.3,643.3,871.2,643.8,871.8,644L871.8,644z M913.1,627
     c-0.6,3.4-3.8,9.1-7.2,13.3c-0.1-3.4,0-8.4,0-11.9c2.8-3.3,5.7-7.4,7.4-10.6C913.2,619.7,913.3,626.8,913.1,627L913.1,627z"
        />

        <linearGradient
          id="SVGID_00000160898768812358171590000000352378834036657562_"
          gradientUnits="userSpaceOnUse"
          x1="869.9398"
          y1="847.6254"
          x2="917.4636"
          y2="834.3077"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#9801FF" />
          <stop offset="1" stopColor="#69F7F7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000160898768812358171590000000352378834036657562_)"
          d="M867.8,764.2c0.4-0.4,1.1-0.9,1.7-0.8l-0.1,0.2
     l0.1-0.2c0.2,0.1,0.4,0.2,0.5,0.3 M867.8,764.2l2-0.2 M867.8,764.2c-0.8,1.1-1,1.6-1,3.1c0,0.7,0,1.7,0,3.5c0,3.1,0,4.7,0.1,5.6
     c0,0.9,0.1,1.1,0.2,1.5c0.6,1.7,2.1,2.8,4.1,2.4l0.1-0.2l-0.1,0.2c6.4-3.2,8.5-4.8,20.7-11.7c9.6-5.5,14.6-8.4,17.3-10
     c1.1-0.6,2.5-1.4,3.4-2.2c2-1.9,3.5-4.5,4.1-7.1l-0.2,0 M867.8,764.2l48.6-14.9 M870,763.8l-0.2,0.2 M870,763.8l-0.2,0.2
      M871.8,763.5c0.1,0.1-1.7,0.4-1.6,0.5c0.3,2.2,0.1,9.3,0.3,10.7c0,0.1,0.1,0.2,0.1,0.3c0.2,0.4,0.9,0.8,1.3,0.7 M869.8,764
     c0.2,0.2,0.2,0.4,0.2,4.4c0,6.3,0.1,6.5,0.3,6.8c0.3,0.5,1,0.8,1.4,0.8c0.6-0.1,39.5-22.6,40.1-23.1 M871.8,775.7L871.8,775.7
     L871.8,775.7 M871.8,775.7L871.8,775.7 M871.8,775.7L871.8,775.7c12.9-7.2,27.7-15.7,39.9-23l0,0l0,0 M871.9,775.7l-0.1,0.3
     L871.9,775.7z M911.8,752.6L911.8,752.6l0.1,0.2 M911.8,752.6L911.8,752.6L911.8,752.6l0.1,0.2 M916.4,749.3c0.8-1-3.1,1.1-3.1-0.2
     c0-0.9,0-2.5,0.1-5.7c0.1-2.7-0.2-3.3,0.3-4.8 M913.6,743.2c0.3-4,0.1-4.2,0.2-4.6 M911.9,752.8c0.5-0.5,1.2-1.7,1.4-2.4
      M913.6,738.6l0.2,0 M913.6,738.6l0.2,0 M913.6,738.6c0.4-1,1.9-2.8,2.9-1.7c0.1,0.1,0.1,0.2,0.1,0.3c0.2,1.3,0.1,1.8,0.1,4.4
     c-0.1,1.5,0.2,6.3-0.2,7.7l-0.2,0 M913.8,738.6c0.4-1,1.8-2.4,2.6-1.5c0.2,0.2,0.2,0.3,0.2,4.6c-0.1,1.4,0.2,6.3-0.2,7.7
      M871.9,724c-2.7,2.1-5,6-5.1,9.6c0,0,0,8.8,0,8.8c0,5.6-0.1,7.4,0.1,10.6c0.9,5.2,5.7,4.7,8.9,1.8c1.5-1.3,3.1-3.4,4-5.4
     c1.1,0.8,2.5,1.1,4,0.7l0.1-0.3l-0.1,0.3c3.7-1.1,6.3-4.5,8-7.9c2.3,2.1,5.9,0.5,8-1.4l-0.1-0.2l0.1,0.2c1.5-1.3,3-3.4,4-5.3
     c1,0.9,2.5,1.2,4,0.8c4.2-1.5,7.2-5.9,8.5-10.3c0.3-1.1,0.4-1.7,0.5-3c0.1-1.5,0.1-4.1,0.1-9.2c0-5.1,0-7.7-0.1-9.1
     c0.1-2.4-1.5-4.4-4-4c-0.7-0.4-19.7,11.3-20.7,11.6C885.4,716.2,878.6,720,871.9,724L871.9,724z M913.1,706.1
     c0.1,0.2,0.2,0.5,0.2,1.6c0,0,0,3.5,0,3.5c-10.7,6.2-32.4,18.7-43.1,24.9l0-3.5c0.1-1.5,0.1-1.9,0.8-3.1l-0.1-0.1l0.1,0.1
     c0.4-0.6,0.6-0.9,1.2-1.4l0,0c8.5-5,30.2-17.5,36.5-21.1c1.3-0.7,2-1.1,2.5-1.4c0.4-0.2,0.5-0.2,0.6-0.2
     C912.3,705.3,912.9,705.7,913.1,706.1L913.1,706.1z M872.3,728L872.3,728L872.3,728z M890,732.4c-0.1,4.1,0.2,4.5-0.2,6.8l0.2,0
     l-0.2,0c-0.8,2.8-2.8,5.3-4.7,6.1l0,0.2l0-0.2c-2.4,0.9-3.8-0.9-3.6-3.5c0-1.3,0-5.9,0-8c2.2-1.2,6.5-3.7,8.6-5L890,732.4
     L890,732.4z M873.5,752l0,0.2L873.5,752c-1.9,0.7-3.1-0.5-3.2-2.2c-0.1-1-0.1-2.7-0.1-6v-3.5c1.9-1.1,5.7-3.3,7.7-4.4
     c0,3.2,0.1,7.2-0.1,9.9C877.4,748.5,875.4,751.3,873.5,752L873.5,752z M893.6,730.4l0-3.5c2.2-1.2,6.5-3.7,8.6-5
     c0,3,0.1,7.5-0.1,9.7c-0.4,2.3-1.8,4.7-3.5,6l0,0.2l0-0.2c-1.5,1.3-3.9,1.5-4.7-0.7c-0.1-0.1-0.1-0.3-0.1-0.4
     c0-0.3-0.1-0.5-0.1-0.8C893.6,734.9,893.6,733.4,893.6,730.4L893.6,730.4z M913.4,718.9c0,3.3,0,5-0.1,6c0,0.4-0.1,0.8-0.2,1.2
     c-0.3,1.3-1.1,2.7-1.9,3.7c-2.2,2.6-4.9,2.5-5.4-0.2c-0.2-3.1-0.1-6.7-0.1-9.8c1.9-1.1,5.7-3.3,7.7-4.4L913.4,718.9L913.4,718.9z"
        />
      </g>
      <g id="contracts-light">
        <linearGradient
          id="SVGID_00000112634187579718124000000014253880542514527635_"
          gradientUnits="userSpaceOnUse"
          x1="836.952"
          y1="976.973"
          x2="836.952"
          y2="1302.563"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#7C1DC9" />
          <stop offset="3.000000e-02" stopColor="#741BBD" />
          <stop offset="0.16" stopColor="#56148B" />
          <stop offset="0.3" stopColor="#3B0E60" />
          <stop offset="0.43" stopColor="#26093E" />
          <stop offset="0.57" stopColor="#150523" />
          <stop offset="0.71" stopColor="#09020F" />
          <stop offset="0.85" stopColor="#020104" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          opacity="0.5"
          fill="url(#SVGID_00000112634187579718124000000014253880542514527635_)"
          enableBackground="new    "
          d="
     M972.2,322.1l-135.5-49.1l-135,49l32.5,222.8L836.4,605l103-59.7L972.2,322.1L972.2,322.1z"
        />

        <linearGradient
          id="SVGID_00000079476741488008574210000008114857508794178179_"
          gradientUnits="userSpaceOnUse"
          x1="850.4029"
          y1="1013.783"
          x2="850.4029"
          y2="1382.434"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2AF6FF" />
          <stop offset="2.000000e-02" stopColor="#29EEF7" />
          <stop offset="0.13" stopColor="#1FB7BE" />
          <stop offset="0.25" stopColor="#17868B" />
          <stop offset="0.37" stopColor="#105D60" />
          <stop offset="0.49" stopColor="#0A3B3E" />
          <stop offset="0.62" stopColor="#062123" />
          <stop offset="0.74" stopColor="#030F0F" />
          <stop offset="0.87" stopColor="#010404" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          opacity="0.14"
          fill="url(#SVGID_00000079476741488008574210000008114857508794178179_)"
          enableBackground="new    "
          d="
     M958.5,348.8l-28,15.5l-22,13.9l-42.4,168.2l-10.1,4.7l32.1-161.4l-27.1,15.9l-16.2,152.3h-5l2-141.7l-12.1,7.4L803.3,438l15,117.4
     l-8.6-6.2l-32-95.8L742.3,473l51.7,70.3l42.7,24.9l43.3-24.9L958.5,348.8L958.5,348.8z"
        />
      </g>
      <linearGradient
        id="SVGID_00000014615189697032501800000007047672620541040533_"
        gradientUnits="userSpaceOnUse"
        x1="1127.895"
        y1="1111.7195"
        x2="1285.835"
        y2="1120.7174"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000014615189697032501800000007047672620541040533_)"
        d="M1283,434h-156v22.7c0,25,34.9,45.3,78,45.3
   c43.1,0,78-20.3,78-45.3V434z"
      />
      <path
        opacity="0.52"
        fill="#740098"
        enableBackground="new    "
        d="M1229,499l2-0.5V442h-2V499z M1239,497l2-0.6V442h-2V497z
    M1248,494l3-0.9V442h-3V494z M1219,501l2-0.2V442h-2V501z M1268,483c0.7-0.6,1.4-1.2,2-1.8V442h-2V483z M1278,473
   c0.7-1.2,1.4-2.5,2-3.9V442h-2V473z M1258,489c0.7-0.4,1.3-0.7,2-1.2V442h-2V489z M1209,502h2v-60h-2V502z M1200,501h2v-59h-2V501z
    M1180,499.6c0.7,0,1.3,0.3,2,0.4v-58h-2V499.6z M1190,501h2v-59h-2V501z M1170,496.4l2,0.6v-55h-2V496.4z M1131,470.4
   c0.9,1.2,1.9,2.4,3,3.6v-32h-3V470.4z M1141,482.3c0.6,0.6,1.3,1.1,2,1.7v-42h-2V482.3z M1161,493.2l2,0.8v-52h-2V493.2z
    M1151,488.9l2,1.1v-48h-2V488.9z"
      />
      <linearGradient
        id="SVGID_00000165929239137479070490000007337589042186939014_"
        gradientUnits="userSpaceOnUse"
        x1="1381.0636"
        y1="1317.8112"
        x2="1196.3827"
        y2="1139.85"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="1" stopColor="#F296FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000165929239137479070490000007337589042186939014_)"
        d="M1205,479c43.1,0,78-20.1,78-45
   c-3.6-59.6-152.4-59.6-156,0C1127,458.9,1161.9,479,1205,479z"
      />
      <path fill="#C531DD" d="M1205,468c32,0,58-15,58-33.5c-2.7-44.4-113.4-44.3-116,0C1147,453,1173,468,1205,468z" />
      <radialGradient
        id="SVGID_00000056398305207885746720000018024167086662895279_"
        cx="-235.8039"
        cy="1331.6"
        r="1.0005"
        gradientTransform="matrix(1386.2 0 0 -418.25 391918.7812 563102.8125)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000056398305207885746720000018024167086662895279_)"
        d="M1207.1,402.6c31,0,56.2,13.9,57.9,31.4
   c1.1-20-25.1-34.8-58-35c-32.9,0.2-59.1,15-58,35C1150.9,416.5,1176.1,402.6,1207.1,402.6z"
      />
      <path
        fill="#9600AE"
        d="M1205.1,404.6c31,0,56.2,13.9,57.9,31.4c1.1-20-25.1-34.8-58-35c-32.9,0.2-59.1,15-58,35
   C1148.9,418.5,1174.1,404.6,1205.1,404.6z"
      />
      <radialGradient
        id="SVGID_00000128446679859019915810000009446602370344819593_"
        cx="-233.9317"
        cy="1330.1288"
        r="0.9994"
        gradientTransform="matrix(48.9735 -143.5711 -580.815 -198.1216 650225.0625 108349.0859)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#F49587" />
        <stop offset="0.12" stopColor="#BD7368" />
        <stop offset="0.24" stopColor="#8B554D" />
        <stop offset="0.36" stopColor="#603B35" />
        <stop offset="0.48" stopColor="#3E2622" />
        <stop offset="0.61" stopColor="#231513" />
        <stop offset="0.74" stopColor="#0F0908" />
        <stop offset="0.86" stopColor="#040202" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000128446679859019915810000009446602370344819593_)"
        d="M1272.1,417.3c2.9-8.6-8.8-20.4-26.2-26.3
   c-42.2-13.4-52.3,16.1-10.6,31.2C1252.6,428.1,1269.1,425.9,1272.1,417.3z"
      />
      <linearGradient
        id="SVGID_00000165950306542499137150000013523656816442005662_"
        gradientUnits="userSpaceOnUse"
        x1="1127.895"
        y1="1135.7195"
        x2="1285.835"
        y2="1144.7174"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000165950306542499137150000013523656816442005662_)"
        d="M1283,410h-156v22.7c0,25,34.9,45.3,78,45.3
   c43.1,0,78-20.3,78-45.3V410z"
      />
      <path
        opacity="0.52"
        fill="#740098"
        enableBackground="new    "
        d="M1229,475l2-0.5V418h-2V475z M1239,473l2-0.6V418h-2V473z
    M1248,470l3-0.9V418h-3V470z M1219,477l2-0.2V418h-2V477z M1268,459c0.7-0.6,1.4-1.2,2-1.8V418h-2V459z M1278,448
   c0.7-1.2,1.4-2.5,2-3.7V418h-2V448z M1258,465c0.7-0.4,1.3-0.7,2-1.2V418h-2V465z M1209,477h2v-59h-2V477z M1200,477h2v-59h-2V477z
    M1180,474.6c0.7,0,1.3,0.3,2,0.4v-57h-2V474.6z M1190,477h2v-59h-2V477z M1170,472.4l2,0.6v-55h-2V472.4z M1131,446.4
   c0.9,1.2,1.9,2.4,3,3.6v-32h-3V446.4z M1141,458.3c0.6,0.6,1.3,1.1,2,1.7v-42h-2V458.3z M1161,469.2l2,0.8v-52h-2V469.2z
    M1151,464.9l2,1.1v-48h-2V464.9z"
      />
      <linearGradient
        id="SVGID_00000156566872773123307920000008687981710984596926_"
        gradientUnits="userSpaceOnUse"
        x1="1381.0636"
        y1="1341.8112"
        x2="1196.3827"
        y2="1163.85"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="1" stopColor="#F296FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000156566872773123307920000008687981710984596926_)"
        d="M1205,455c43.1,0,78-20.1,78-45
   c-3.6-59.6-152.4-59.6-156,0C1127,434.9,1161.9,455,1205,455z"
      />
      <path fill="#C531DD" d="M1205,444c32,0,58-15.2,58-34c-2.7-45-113.3-45-116,0C1147,428.8,1173,444,1205,444z" />
      <radialGradient
        id="SVGID_00000078751307124794252130000008617420763030175106_"
        cx="-235.8039"
        cy="1331.6"
        r="1.0005"
        gradientTransform="matrix(1386.2 0 0 -418.25 391918.7812 563078.8125)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000078751307124794252130000008617420763030175106_)"
        d="M1207.1,378.6c31,0,56.2,13.9,57.9,31.4
   c1.1-20-25.1-34.8-58-35c-32.9,0.2-59.1,15-58,35C1150.9,392.5,1176.1,378.6,1207.1,378.6z"
      />
      <path
        fill="#9600AE"
        d="M1205.1,379.7c31,0,56.2,14.3,57.9,32.3c1.1-20.5-25.1-35.8-58-36c-32.9,0.2-59.1,15.5-58,36
   C1148.9,394,1174.1,379.7,1205.1,379.7z"
      />
      <radialGradient
        id="SVGID_00000178894227808456371720000018104821325639597721_"
        cx="-233.9317"
        cy="1330.1284"
        r="0.9994"
        gradientTransform="matrix(48.9735 -143.5711 -580.815 -198.1216 650225.0625 108325.0859)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#F49587" />
        <stop offset="0.12" stopColor="#BD7368" />
        <stop offset="0.24" stopColor="#8B554D" />
        <stop offset="0.36" stopColor="#603B35" />
        <stop offset="0.48" stopColor="#3E2622" />
        <stop offset="0.61" stopColor="#231513" />
        <stop offset="0.74" stopColor="#0F0908" />
        <stop offset="0.86" stopColor="#040202" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000178894227808456371720000018104821325639597721_)"
        d="M1272.1,393.1c2.9-8.6-8.8-20.4-26.2-26.3
   c-42.2-13.4-52.3,16.1-10.6,31.2C1252.6,403.9,1269.1,401.7,1272.1,393.1z"
      />
      <linearGradient
        id="SVGID_00000071553982264514654100000005029116341172212410_"
        gradientUnits="userSpaceOnUse"
        x1="1127.8992"
        y1="1160.1825"
        x2="1285.8291"
        y2="1169.3135"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000071553982264514654100000005029116341172212410_)"
        d="M1283,386h-156v22.4c0,24.6,34.9,44.6,78,44.6
   c43.1,0,78-20,78-44.6V386z"
      />
      <path
        opacity="0.52"
        fill="#740098"
        enableBackground="new    "
        d="M1229,451l2-0.5V393h-2V451z M1239,449l2-0.6V393h-2V449z
    M1248,446l3-0.9V393h-3V446z M1219,452l2-0.2V393h-2V452z M1268,435c0.7-0.6,1.4-1.2,2-1.8V393h-2V435z M1278,424
   c0.7-1.2,1.4-2.5,2-3.9V393h-2V424z M1258,441c0.7-0.4,1.3-0.8,2-1.2V393h-2V441z M1209,453h2v-60h-2V453z M1200,453h2v-60h-2V453z
    M1180,450.6c0.7,0,1.3,0.3,2,0.4v-58h-2V450.6z M1190,452h2v-59h-2V452z M1170,448.4l2,0.6v-56h-2V448.4z M1131,422.3
   c0.9,1.3,1.9,2.5,3,3.7v-33h-3V422.3z M1141,433.3c0.6,0.6,1.3,1.1,2,1.7v-42h-2V433.3z M1161,445.2l2,0.8v-53h-2V445.2z
    M1151,440.8l2,1.2v-49h-2V440.8z"
      />
      <linearGradient
        id="SVGID_00000183963300629586148570000014676858600227878073_"
        gradientUnits="userSpaceOnUse"
        x1="1381.0636"
        y1="1365.8112"
        x2="1196.3827"
        y2="1187.85"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="1" stopColor="#F296FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000183963300629586148570000014676858600227878073_)"
        d="M1205,431c43.1,0,78-20.1,78-45
   c-3.6-59.6-152.4-59.6-156,0C1127,410.9,1161.9,431,1205,431z"
      />
      <path fill="#C531DD" d="M1205,420c32,0,58-15.2,58-34c-2.7-45-113.3-45-116,0C1147,404.8,1173,420,1205,420z" />
      <radialGradient
        id="SVGID_00000129186107314144370310000010296480575344445843_"
        cx="-235.8029"
        cy="1331.5834"
        r="1.0005"
        gradientTransform="matrix(1386.2 0 0 -430.2 391918.7812 579123.875)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000129186107314144370310000010296480575344445843_)"
        d="M1207.1,353.7c31,0,56.2,14.3,57.9,32.3
   c1.1-20.5-25.1-35.8-58-36c-32.9,0.2-59.1,15.5-58,36C1150.9,368,1176.1,353.7,1207.1,353.7z"
      />
      <path
        fill="#9600AE"
        d="M1205.1,355.7c31,0,56.2,14.3,57.9,32.3c1.1-20.5-25.1-35.8-58-36c-32.9,0.2-59.1,15.5-58,36
   C1148.9,370,1174.1,355.7,1205.1,355.7z"
      />
      <radialGradient
        id="SVGID_00000010291681423929087210000010147060196087849649_"
        cx="-233.9318"
        cy="1330.1287"
        r="0.9994"
        gradientTransform="matrix(48.9735 -143.5711 -580.815 -198.1216 650225.0625 108301.0859)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#F49587" />
        <stop offset="0.12" stopColor="#BD7368" />
        <stop offset="0.24" stopColor="#8B554D" />
        <stop offset="0.36" stopColor="#603B35" />
        <stop offset="0.48" stopColor="#3E2622" />
        <stop offset="0.61" stopColor="#231513" />
        <stop offset="0.74" stopColor="#0F0908" />
        <stop offset="0.86" stopColor="#040202" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000010291681423929087210000010147060196087849649_)"
        d="M1272.1,368.9c2.9-8.6-8.8-20.4-26.2-26.3
   c-42.2-13.4-52.3,16.1-10.6,31.2C1252.6,379.7,1269.1,377.5,1272.1,368.9z"
      />
      <linearGradient
        id="SVGID_00000057133338875348032910000002398351864558076555_"
        gradientUnits="userSpaceOnUse"
        x1="1127.895"
        y1="1183.7195"
        x2="1285.835"
        y2="1192.7174"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000057133338875348032910000002398351864558076555_)"
        d="M1283,362h-156v22.7c0,25,34.9,45.3,78,45.3
   c43.1,0,78-20.3,78-45.3V362z"
      />
      <path
        opacity="0.52"
        fill="#740098"
        enableBackground="new    "
        d="M1229,428l2-0.5V370h-2V428z M1239,425l2-0.6V370h-2V425z
    M1248,422l3-0.9V370h-3V422z M1219,429l2-0.2V370h-2V429z M1268,411c0.7-0.6,1.4-1.2,2-1.8V370h-2V411z M1278,401
   c0.7-1.2,1.4-2.5,2-3.9V370h-2V401z M1258,417c0.7-0.4,1.3-0.7,2-1.2V370h-2V417z M1209,430h2v-60h-2V430z M1200,430h2v-60h-2V430z
    M1180,427.6c0.7,0,1.3,0.3,2,0.4v-58h-2V427.6z M1190,429h2v-59h-2V429z M1170,424.4l2,0.6v-55h-2V424.4z M1131,398.4
   c0.9,1.2,1.9,2.4,3,3.6v-32h-3V398.4z M1141,410.3c0.6,0.6,1.3,1.1,2,1.7v-42h-2V410.3z M1161,421.2l2,0.8v-52h-2V421.2z
    M1151,416.9l2,1.1v-48h-2V416.9z"
      />
      <linearGradient
        id="SVGID_00000169559365422535778230000009068581707907833531_"
        gradientUnits="userSpaceOnUse"
        x1="1382.9308"
        y1="1389.2317"
        x2="1196.29"
        y2="1211.3575"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000169559365422535778230000009068581707907833531_)"
        d="M1205,408c43.1,0,78-20.4,78-45.5
   c-3.6-60.3-152.4-60.2-156,0C1127,387.6,1161.9,408,1205,408z"
      />
      <path fill="#C531DD" d="M1205,396c32,0,58-15,58-33.5c-2.7-44.4-113.4-44.3-116,0C1147,381,1173,396,1205,396z" />
      <path
        fill="#9600AE"
        d="M1205.1,332.6c31,0,56.2,13.9,57.9,31.4c1.1-20-25.1-34.8-58-35c-32.9,0.2-59.1,15-58,35
   C1148.9,346.5,1174.1,332.6,1205.1,332.6z"
      />
      <path
        fill="#9600AE"
        d="M1172.9,376.1c-4-2.8-6.5-6-7.2-9.6c-3.6-25.1,41.4-30.1,59.8-21.4c5.4,2.3,9.4,5.1,12.4,8.6
   c0.4,0.5,1.4,1,2.3,1.3c4.6,1.3,12.3,5.4,10.2,9.5c-1.7,2.8-4.8,5-9.5,6.3c-1.9,0.5-2.9,1.3-3.8,2.4c-10,11.4-35.8,15.6-54.1,8.6
   c1.3-0.8,2.6-1.5,3.9-2.3c-13.4-7.9-10.5-21.5,5.8-26.6c10.3-3.1,23.7-1.2,29.4,4.3c4.9,4.7,2,11.2-5.9,13.6c-6,1.8-13.8,0.7-17-2.5
   c-2-2-1.5-4.7,1.2-6.4c2.5-1.6,5.8-1.8,10.2-0.4c1.8-1.1,3.7-2.1,5.5-3.2c-3.5-2.9-12.3-3.6-18.4-1.4c-11.4,4.1-10.8,13.8,1.2,17.9
   c13.8,4.7,30.9-0.4,33.7-10c2.5-8.7-8.2-16.6-24.2-18.1c-16.4-1.5-31.7,4.4-36.8,14.2C1169,365.9,1169.6,371,1172.9,376.1
   L1172.9,376.1z"
      />
      <path
        fill="#F296FF"
        d="M1172.9,373.4c-4-2.8-6.5-6-7.2-9.6c-3.6-25.1,41.4-30.2,59.8-21.4c5.4,2.3,9.4,5.1,12.4,8.6
   c0.4,0.5,1.4,1,2.3,1.3c4.6,1.3,12.3,5.4,10.2,9.5c-1.7,2.8-4.8,5-9.5,6.3c-1.9,0.5-2.9,1.3-3.8,2.4c-10,11.4-35.8,15.6-54.1,8.6
   c1.3-0.8,2.6-1.5,3.9-2.3c-13.4-7.9-10.5-21.5,5.8-26.6c10.3-3.1,23.7-1.2,29.4,4.3c4.9,4.7,2,11.2-5.9,13.6c-6,1.8-13.8,0.7-17-2.5
   c-2-2-1.5-4.7,1.2-6.4c2.5-1.6,5.8-1.8,10.2-0.4c1.8-1.1,3.7-2.1,5.5-3.2c-3.5-2.9-12.3-3.6-18.4-1.4c-11.4,4.1-10.8,13.8,1.2,17.9
   c13.8,4.7,30.9-0.4,33.7-10c2.5-8.7-8.2-16.6-24.2-18.1c-16.4-1.5-31.7,4.4-36.8,14.2C1169,363.2,1169.6,368.3,1172.9,373.4
   L1172.9,373.4z"
      />
      <linearGradient
        id="SVGID_00000182527171591208952650000001523918761052808347_"
        gradientUnits="userSpaceOnUse"
        x1="694.462"
        y1="276.015"
        x2="694.4621"
        y2="276.015"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000182527171591208952650000001523918761052808347_)"
        d="M685.4,1306.3v-0.6
   C685.4,1305.9,685.4,1306.1,685.4,1306.3z"
      />
      <linearGradient
        id="SVGID_00000042703032737672608580000015867069219494678959_"
        gradientUnits="userSpaceOnUse"
        x1="694.462"
        y1="299.4901"
        x2="694.4621"
        y2="299.4901"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000042703032737672608580000015867069219494678959_)"
        d="M685.4,1282.8v-0.6
   C685.4,1282.4,685.4,1282.6,685.4,1282.8z"
      />
      <linearGradient
        id="SVGID_00000027583414207418840400000005403052167467213448_"
        gradientUnits="userSpaceOnUse"
        x1="694.462"
        y1="322.965"
        x2="694.4621"
        y2="322.965"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000027583414207418840400000005403052167467213448_)"
        d="M685.4,1259.3v-0.6
   C685.4,1258.9,685.4,1259.1,685.4,1259.3z"
      />
      <linearGradient
        id="SVGID_00000050648657861821154570000014933850783776561280_"
        gradientUnits="userSpaceOnUse"
        x1="694.462"
        y1="346.6249"
        x2="694.4621"
        y2="346.6249"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000050648657861821154570000014933850783776561280_)"
        d="M685.4,1235.7v-0.6
   C685.4,1235.3,685.4,1235.5,685.4,1235.7z"
      />
      <linearGradient
        id="coin-inner-light_00000129169926312288317450000011601900788402160554_"
        gradientUnits="userSpaceOnUse"
        x1="1201.5"
        y1="1184.34"
        x2="1201.5"
        y2="1506.6561"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9B08B3" />
        <stop offset="1" stopColor="#000000" />
      </linearGradient>
      <path
        id="coin-inner-light"
        opacity="0.5"
        fill="url(#coin-inner-light_00000129169926312288317450000011601900788402160554_)"
        enableBackground="new    "
        d="
   M1293,90.9L1201.4,69L1110,90.9l36.4,272.3l2.2,9c17.6,32.5,96.2,30.7,112.3,0l1.8-9L1293,90.9z"
      />
      <linearGradient
        id="SVGID_00000142174832061201817190000008195644607940787861_"
        gradientUnits="userSpaceOnUse"
        x1="499.2133"
        y1="264.537"
        x2="652.9364"
        y2="264.537"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#2FB5B6" />
        <stop offset="0.23" stopColor="#24E4A8" />
        <stop offset="0.604" stopColor="#208FB4" />
        <stop offset="0.843" stopColor="#2BBBB2" />
        <stop offset="0.97" stopColor="#319BC1" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000142174832061201817190000008195644607940787861_)"
        d="M654.7,1283.9H498.5v22.4
   c0,24.7,35,44.7,78.1,44.7c43.1,0,78.1-20,78.1-44.7L654.7,1283.9L654.7,1283.9z"
      />
      <path
        opacity="0.34"
        fill="#5C84A4"
        enableBackground="new    "
        d="M576.5,1346.3c-42.9,0-77.8-19-77.8-42.6
   c-2.8,27.7,32.3,46.7,77.8,47.3c45.4-0.6,80.5-19.5,77.8-47.1C654.3,1327.3,619.5,1346.3,576.5,1346.3L576.5,1346.3z"
      />
      <path
        fill="#5C84A4"
        d="M577.3,1273.2c31.2,0,56.6,14.2,58.3,32.1c1.1-20.4-25.3-35.5-58.4-35.7c-33.1,0.2-59.5,15.3-58.4,35.7
   C520.7,1287.4,546.1,1273.2,577.3,1273.2z"
      />
      <linearGradient
        id="SVGID_00000178177665419553943810000013466190297075196835_"
        gradientUnits="userSpaceOnUse"
        x1="499.2168"
        y1="280.8503"
        x2="652.9398"
        y2="280.8503"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#2FB5B6" />
        <stop offset="0.23" stopColor="#24E4A8" />
        <stop offset="0.604" stopColor="#208FB4" />
        <stop offset="0.843" stopColor="#2BBBB2" />
        <stop offset="0.97" stopColor="#319BC1" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000178177665419553943810000013466190297075196835_)"
        d="M654.7,1256H498.5v30.2c0,33.2,35,60.1,78.1,60.1
   c43.1,0,78.1-26.9,78.1-60.1L654.7,1256L654.7,1256z"
      />
      <path
        fill="#5C84A4"
        d="M600.3,1344.2l2.3-0.6v-76.8h-2.3V1344.2z M610.5,1341.1l2.3-0.8v-73.6h-2.3V1341.1z M620.7,1337.7l2.3-1.3
   v-69.7h-2.3V1337.7L620.7,1337.7z M590.1,1345.1l2.3-0.3v-78h-2.3V1345.1z M641,1325.8c0.8-0.8,1.5-1.7,2.2-2.6v-56.5H641
   C641,1266.7,641,1325.8,641,1325.8z M651.2,1311.3c0.8-1.8,1.6-3.7,2.3-5.6v-39h-2.3V1311.3z M630.8,1333.2c0.7-0.5,1.5-1,2.3-1.7
   v-64.8h-2.3V1333.2L630.8,1333.2z M579.9,1345.5h2.3v-78.7h-2.3V1345.5z M569.7,1345.5h2.3v-78.7h-2.3V1345.5z M549.5,1343.7
   c0.7,0,1.5,0.4,2.3,0.6v-77.6h-2.3V1343.7z M559.5,1345.1h2.3v-78.3h-2.3V1345.1z M539.2,1340.6l2.3,0.8v-74.7h-2.3V1340.6z
    M498.5,1305.2c0.7,1.7,1.5,3.3,2.3,4.8v-43.3h-2.3V1305.2z M508.7,1322.8c0.7,0.8,1.5,1.5,2.2,2.3v-58.4h-2.2V1322.8z M529,1336.2
   l2.3,1.1v-70.5H529V1336.2z M518.8,1330.8l2.3,1.6v-65.6h-2.3V1330.8z"
      />
      <path
        fill="#3CFFBB"
        d="M577.3,1301.7c43.1,0,78.1-20.3,78.1-45.4c-3.6-60.1-152.6-60.1-156.2,0
   C499.2,1281.3,534.1,1301.7,577.3,1301.7z"
      />
      <path
        fill="#006056"
        d="M577.3,1290.2c32.3,0,58.4-15.2,58.4-33.9c-2.7-44.9-114.1-44.9-116.8,0C518.9,1275,545,1290.2,577.3,1290.2
   z"
      />
      <radialGradient
        id="SVGID_00000117655799946944485510000018103196809348804744_"
        cx="-235.8261"
        cy="1331.4939"
        r="1.0005"
        gradientTransform="matrix(1395.24 0 0 -427.091 393870.3438 575773.375)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#000000" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000117655799946944485510000018103196809348804744_)"
        d="M579.2,1224.1c31.2,0,56.6,14.2,58.3,32.1
   c1.1-20.4-25.3-35.5-58.4-35.7c-33.1,0.2-59.5,15.3-58.4,35.7C522.6,1238.3,548,1224.1,579.2,1224.1L579.2,1224.1z"
      />
      <path
        d="M577.3,1226c31.2,0,56.6,14.2,58.3,32.1c1.1-20.4-25.3-35.5-58.4-35.7c-33.1,0.2-59.5,15.3-58.4,35.7
   C520.7,1240.2,546.1,1226,577.3,1226z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M584.4,1240.7c-14.3,2.2-26,4.1-26,4.1c0,0.1,9.8,15.9,9.9,16.1
   c0.1,0.1,28.1,5.9,28.1,5.8c-0.2,0.5,14.1-30.3,13.9-29.8C610.5,1236.7,605.8,1237.4,584.4,1240.7L584.4,1240.7z M598,1250.2
   c-2.2,4.6-4,8.4-4,8.4c-0.3-0.4-4.7-7.4-5.7-9.1l-7.8-1.6c-4.3-0.9-7.8-1.6-7.8-1.7c0.3,0,27.4-4.5,29.3-4.5
   C601.9,1241.7,600.1,1245.6,598,1250.2L598,1250.2z M588.4,1260c0.6,0.9,0.9,1.6,0.8,1.6c-0.3,0-16-3.3-16.1-3.3
   c-0.2-0.1-5.9-9.3-5.8-9.3c0.7,0.1,13.3,2.7,16.3,3.3C584.9,1254.3,587.4,1258.3,588.4,1260L588.4,1260z M545.9,1262.5
   c-4,8.5-7.3,15.6-7.2,15.6c0.2,0.1,53.8-8.3,53.7-8.4c0.6,0.1-29.4-6-28.8-6c-0.1-0.1-2.3-3.6-4.9-7.8c-3.1-5-4.7-7.6-5.5-8.9
   L545.9,1262.5L545.9,1262.5z M556.8,1263.1l2.1,3.4c2.4,0.5,12.9,2.6,13.5,2.8c0,0-5.7,0.9-12.6,2c-6.9,1.1-12.6,1.9-12.6,1.9
   c0-0.1,6.6-14.2,6.8-14.4C554.1,1258.6,554.2,1258.7,556.8,1263.1L556.8,1263.1z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#72FFDD"
        d="M584.4,1238c-14.3,2.2-26,4.1-26,4.1c0,0.1,9.8,15.9,9.9,16.1
   c0.1,0.1,28.1,5.9,28.1,5.8c-0.2,0.5,14.1-30.3,13.9-29.8C610.5,1234,605.8,1234.7,584.4,1238L584.4,1238z M598,1247.5
   c-2.2,4.6-4,8.4-4,8.4c-0.3-0.4-4.7-7.4-5.7-9.1l-7.8-1.6c-4.3-0.9-7.8-1.6-7.8-1.7c0.3,0,27.4-4.5,29.3-4.5
   C601.9,1239,600.1,1242.9,598,1247.5L598,1247.5z M588.4,1257.3c0.6,0.9,0.9,1.6,0.8,1.6c-0.3,0-16-3.2-16.1-3.3
   c-0.2-0.1-5.9-9.3-5.8-9.3c0.7,0.1,13.3,2.7,16.3,3.3C584.9,1251.6,587.4,1255.6,588.4,1257.3L588.4,1257.3z M545.9,1259.8
   c-4,8.5-7.3,15.6-7.2,15.6c0.2,0.1,53.8-8.3,53.7-8.4c0.6,0.1-29.4-6-28.8-6c-0.1-0.1-2.3-3.6-4.9-7.8c-3.1-5-4.7-7.6-5.5-8.9
   L545.9,1259.8L545.9,1259.8z M556.8,1260.3l2.1,3.4c2.4,0.5,12.9,2.6,13.5,2.8c0,0-5.7,0.9-12.6,2c-6.9,1.1-12.6,1.9-12.6,1.9
   c0-0.1,6.6-14.2,6.8-14.4C554.1,1255.9,554.2,1256,556.8,1260.3L556.8,1260.3z"
      />
      <g id="eth-light" opacity="0.5">
        <linearGradient
          id="SVGID_00000016754366283365617530000009803876092398038411_"
          gradientUnits="userSpaceOnUse"
          x1="572.9"
          y1="274.6725"
          x2="572.9"
          y2="698.3456"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2AF6FF" />
          <stop offset="2.000000e-02" stopColor="#29EEF7" />
          <stop offset="0.13" stopColor="#1FB7BE" />
          <stop offset="0.25" stopColor="#17868B" />
          <stop offset="0.37" stopColor="#105D60" />
          <stop offset="0.49" stopColor="#0A3B3E" />
          <stop offset="0.62" stopColor="#062123" />
          <stop offset="0.74" stopColor="#030F0F" />
          <stop offset="0.87" stopColor="#010404" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000016754366283365617530000009803876092398038411_)"
          d="M695.7,904.2l-123-28.8l-122.6,28.8
     c0,0,48.9,357.4,48.8,358c16.1,58.3,142.1,56.3,156.1,0C655,1259.7,695.7,904.2,695.7,904.2z"
        />

        <linearGradient
          id="SVGID_00000119798335075221682480000007716844127250085036_"
          gradientUnits="userSpaceOnUse"
          x1="572.9"
          y1="276.9322"
          x2="572.9"
          y2="698.4677"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#7C1DC9" />
          <stop offset="3.000000e-02" stopColor="#741BBD" />
          <stop offset="0.16" stopColor="#56148B" />
          <stop offset="0.3" stopColor="#3B0E60" />
          <stop offset="0.43" stopColor="#26093E" />
          <stop offset="0.57" stopColor="#150523" />
          <stop offset="0.71" stopColor="#09020F" />
          <stop offset="0.85" stopColor="#020104" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000119798335075221682480000007716844127250085036_)"
          d="M695.7,904.2l-123-28.8l-122.6,28.8
     c0,0,48.9,357.4,48.8,358c16.1,58.3,142.1,56.3,156.1,0C655,1259.7,695.7,904.2,695.7,904.2z"
        />
      </g>
      <linearGradient
        id="SVGID_00000134956616076839239330000009195014148368571315_"
        gradientUnits="userSpaceOnUse"
        x1="552.2114"
        y1="546.9376"
        x2="571.1774"
        y2="431.4196"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#7F70D1" />
        <stop offset="1" stopColor="#402F9E" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000134956616076839239330000009195014148368571315_)"
        d="M575.8,1167.4v-47l-39-24.3L575.8,1167.4z
    M533.6,1088.9l42.2,26.3v-103.4L533.6,1088.9z"
      />
      <g id="eth-symbol">
        <linearGradient
          id="SVGID_00000038390260487279637170000004022612198507826824_"
          gradientUnits="userSpaceOnUse"
          x1="581.2215"
          y1="489.1061"
          x2="499.9505"
          y2="538.837"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2196B3" />
          <stop offset="1" stopColor="#69FFDA" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000038390260487279637170000004022612198507826824_)"
          d="M575.8,1167.4v-47l-39-24.3L575.8,1167.4z
      M533.6,1088.9l42.2,26.3v-103.4L533.6,1088.9z"
        />

        <linearGradient
          id="SVGID_00000178198818440003699640000000140214992447391666_"
          gradientUnits="userSpaceOnUse"
          x1="582.9793"
          y1="410.4304"
          x2="598.0703"
          y2="541.4403"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2196B3" />
          <stop offset="1" stopColor="#69FFDA" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000178198818440003699640000000140214992447391666_)"
          d="M575.8,1167.4l39-71.3l-39,24.3V1167.4z
      M575.8,1011.7v103.4l42.2-26.3L575.8,1011.7L575.8,1011.7z"
        />
      </g>
      <path
        fill="#FFFFFF"
        d="M440.8,979.8l2.5-1.4l15.8,9.1l-2.5,1.4L440.8,979.8L440.8,979.8z M451.6,976.1l-2.6,1.5l-2.3-1.3l7.7-4.4
   l2.3,1.3l-2.6,1.5l13.5,7.8l-2.5,1.4L451.6,976.1L451.6,976.1z M457.8,969.9l6.8-3.9l2.3,1.3l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3l-3.4,2
   l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9L457.8,969.9z M468.3,963.9l3.5-2l12.9,5.6l0,0L475,960l3.5-2l15.8,9.1l-2.3,1.4l-11.9-6.9l0,0
   l10.1,7.9l-2.1,1.2l-13.7-5.9l0,0l11.9,6.9L484,973L468.3,963.9L468.3,963.9z M501.9,963c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.4
   c1.2,0.8,2.6,1.6,3.9,0.8c1.9-1.1-1.5-2.3-2.5-2.4c-3.4-0.4-8.2,0.6-11.2-1.3c-1.2-0.7-1.9-1.5-1.9-2.2c-0.1-0.8,0.5-1.5,1.7-2.2
   c2.7-1.6,5.7-1.1,8.2,0.6l-2.3,1.4c-0.6-0.4-1.6-1-2.3-1c-1.2-0.1-2.9,1-1,1.9c1.8,0.9,3.1,0.8,5.5,0.7c3.3-0.1,5.2-0.1,7.8,1.3
   c1.3,0.7,2,1.5,2,2.3C503.7,961.5,503.1,962.3,501.9,963L501.9,963z"
      />
      <linearGradient
        id="SVGID_00000085955689827360328170000005539772735404707982_"
        gradientUnits="userSpaceOnUse"
        x1="1282.4501"
        y1="521.6801"
        x2="1282.4501"
        y2="274.09"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="3.000000e-02" stopColor="#7C1DC9" />
        <stop offset="0.21" stopColor="#6E41D2" />
        <stop offset="0.62" stopColor="#4C9BE8" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000085955689827360328170000005539772735404707982_)"
        d="M1364.2,1228.4v182.8l-163.4-95.4v-182.8
   L1364.2,1228.4z"
      />
      <linearGradient
        id="SVGID_00000128470480974370738920000004809450570108206238_"
        gradientUnits="userSpaceOnUse"
        x1="1120.37"
        y1="-21681.3008"
        x2="1120.37"
        y2="-49979.6992"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="3.000000e-02" stopColor="#7C1DC9" />
        <stop offset="0.21" stopColor="#6E41D2" />
        <stop offset="0.62" stopColor="#4C9BE8" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000128470480974370738920000004809450570108206238_)"
        d="M1039.3,1228.1v183.6l162.2-94.6v-183.5
   L1039.3,1228.1z"
      />
      <linearGradient
        id="SVGID_00000069374318688550591390000006874865368255947708_"
        gradientUnits="userSpaceOnUse"
        x1="1265.92"
        y1="273.085"
        x2="1265.9202"
        y2="273.085"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000069374318688550591390000006874865368255947708_)"
        d="M1259.2,1309.1v-0.4
   C1259.2,1308.9,1259.2,1309,1259.2,1309.1z"
      />
      <path
        opacity="0.52"
        fill="#740098"
        enableBackground="new    "
        d="M1211.9,1344.2l1.6-0.2v-43.7h-1.6V1344.2z M1240.9,1335.7
   c0.5-0.3,1.1-0.6,1.6-0.9v-34.5h-1.6V1335.7z M1190.1,1344.1h1.6v-43.8h-1.6V1344.1z M1168.4,1338.7l1.6,0.6v-39h-1.6V1338.7z"
      />
      <linearGradient
        id="SVGID_00000154409988077938516090000012782043472487806110_"
        gradientUnits="userSpaceOnUse"
        x1="1332.5895"
        y1="412.8514"
        x2="1195.0494"
        y2="281.1498"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="1" stopColor="#F296FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000154409988077938516090000012782043472487806110_)"
        d="M1201.5,1328.3c31.9,0,57.7-15,57.7-33.5
   c-2.7-44.4-112.8-44.4-115.5,0C1143.7,1313.3,1169.6,1328.3,1201.5,1328.3z"
      />
      <linearGradient
        id="SVGID_00000183968532085282029910000003960175356225446016_"
        gradientUnits="userSpaceOnUse"
        x1="1152.7029"
        y1="204.55"
        x2="716.794"
        y2="334.9499"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9F79C8" />
        <stop offset="0.14" stopColor="#A580CB" />
        <stop offset="0.33" stopColor="#B492D3" />
        <stop offset="0.55" stopColor="#CDB0E1" />
        <stop offset="0.58" stopColor="#D1B4E3" />
        <stop offset="0.76" stopColor="#DBC4E9" />
        <stop offset="1" stopColor="#EBDEF3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000183968532085282029910000003960175356225446016_)"
        d="M1201.3,1322.5V1508l-163.4-95.4v-185.6
   L1201.3,1322.5z"
      />
      <linearGradient
        id="SVGID_00000116193872920294651040000000889884468429719683_"
        gradientUnits="userSpaceOnUse"
        x1="-4316.2881"
        y1="-757.7766"
        x2="-38459.0391"
        y2="-6685.9746"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9F79C8" />
        <stop offset="0.14" stopColor="#A580CB" />
        <stop offset="0.33" stopColor="#B492D3" />
        <stop offset="0.55" stopColor="#CDB0E1" />
        <stop offset="0.58" stopColor="#D1B4E3" />
        <stop offset="0.76" stopColor="#DBC4E9" />
        <stop offset="1" stopColor="#EBDEF3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000116193872920294651040000000889884468429719683_)"
        d="M1201.7,1322.5V1508l164-95.7v-185.5
   L1201.7,1322.5z"
      />
      <linearGradient
        id="SVGID_00000137830630228498506880000011588265992040180897_"
        gradientUnits="userSpaceOnUse"
        x1="1359.2545"
        y1="345.1975"
        x2="1210.5645"
        y2="120.4975"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="1.000000e-02" stopColor="#9F19AB" />
        <stop offset="0.43" stopColor="#5F27BD" />
        <stop offset="0.9" stopColor="#3D065F" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000137830630228498506880000011588265992040180897_)"
        d="M1348.8,1369.1v-111.5l-131.1,76.5v111.6
   L1348.8,1369.1z"
      />
      <linearGradient
        id="SVGID_00000108270999648366269660000004603575761829583513_"
        gradientUnits="userSpaceOnUse"
        x1="1256.87"
        y1="317.895"
        x2="1256.8701"
        y2="317.895"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000108270999648366269660000004603575761829583513_)"
        d="M1253.6,1263.9v0.4
   C1253.6,1264.2,1253.6,1264,1253.6,1263.9z"
      />
      <linearGradient
        id="SVGID_00000120516979015306854320000007488392603115879100_"
        gradientUnits="userSpaceOnUse"
        x1="8314.7578"
        y1="-22996.9004"
        x2="18089.3613"
        y2="-55084.625"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9F79C8" />
        <stop offset="0.14" stopColor="#A580CB" />
        <stop offset="0.33" stopColor="#B492D3" />
        <stop offset="0.55" stopColor="#CDB0E1" />
        <stop offset="0.58" stopColor="#D1B4E3" />
        <stop offset="0.76" stopColor="#DBC4E9" />
        <stop offset="1" stopColor="#EBDEF3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000120516979015306854320000007488392603115879100_)"
        d="M1145.1,1258.2c30.6,17.7,80.2,17.6,110.9-0.2
   c30.7-17.7,30.9-46.5,0.4-64.1c-30.5-17.7-80.2-17.6-110.9,0.2C1114.7,1211.8,1114.6,1240.6,1145.1,1258.2z M1201.3,1133l163.8,95.5
   l-163.9,94.5l-163.4-96L1201.3,1133L1201.3,1133z"
      />
      <linearGradient
        id="SVGID_00000123405932705052247670000001991273410778465425_"
        gradientUnits="userSpaceOnUse"
        x1="1298.33"
        y1="374.1658"
        x2="971.761"
        y2="374.1658"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="1.000000e-02" stopColor="#C1A1D5" />
        <stop offset="5.000000e-02" stopColor="#C8ABDA" />
        <stop offset="0.11" stopColor="#DAC6E6" />
        <stop offset="0.2" stopColor="#F7F2F9" />
        <stop offset="0.22" stopColor="#FFFFFF" />
        <stop offset="0.25" stopColor="#F9F5FB" />
        <stop offset="0.3" stopColor="#E9DBF2" />
        <stop offset="0.36" stopColor="#D1B4E3" />
        <stop offset="0.43" stopColor="#B395D6" />
        <stop offset="0.49" stopColor="#9C7DCB" />
        <stop offset="0.56" stopColor="#8E6EC5" />
        <stop offset="0.61" stopColor="#8969C3" />
        <stop offset="0.76" stopColor="#9471C6" />
        <stop offset="1" stopColor="#B086CC" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000123405932705052247670000001991273410778465425_)"
        d="M1256.4,1211.2c-34.9-21.3-115.3-18.7-132.6,23.8
   c-4.8-14.3,2.4-29.7,21.7-40.9c30.7-17.8,80.4-17.8,110.9-0.2c19,11,26.1,26.2,21.4,40.5C1274.9,1225.9,1267.8,1217.7,1256.4,1211.2
   L1256.4,1211.2z"
      />
      <path
        opacity="0.2"
        fill="#8770B8"
        enableBackground="new    "
        d="M1181.6,1444.2l-4.3,25.6l1.7,6v18.8l-93.5,54.9
   c-72.7,42-190,42.2-262.3,0.5l-95.6-58.8l-26,14.4l0.6-79.9l186.5-0.3l-42.3,24.1l64,39.4c24.4,14.1,64,14,88.5-0.2l146.2-86.5
   l4.8,2.7L1181.6,1444.2L1181.6,1444.2z"
      />
      <linearGradient
        id="SVGID_00000181059767579689406550000018361771745203304122_"
        gradientUnits="userSpaceOnUse"
        x1="1172.8102"
        y1="112.2094"
        x2="1197.1101"
        y2="119.4894"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000181059767579689406550000018361771745203304122_)"
        d="M1170.1,1466.6v10.4l9.1-5.2v-10.4L1170.1,1466.6z
   "
      />
      <linearGradient
        id="SVGID_00000079462452837616943250000015450846934343451012_"
        gradientUnits="userSpaceOnUse"
        x1="1174.8429"
        y1="119.4473"
        x2="1078.3871"
        y2="150.6728"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000079462452837616943250000015450846934343451012_)"
        d="M1170.1,1466.6v10.4l-87.1-49.9v-10.4
   L1170.1,1466.6L1170.1,1466.6z"
      />
      <linearGradient
        id="SVGID_00000082342532946049553840000012888597135632192432_"
        gradientUnits="userSpaceOnUse"
        x1="-48331.1875"
        y1="164386.2656"
        x2="-48122.1875"
        y2="163692.2656"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000082342532946049553840000012888597135632192432_)"
        d="M1083.1,1416.8l87.1,49.8l9.1-5.2l-87.1-49.9
   L1083.1,1416.8z"
      />
      <linearGradient
        id="SVGID_00000027582964644932292800000004744135219385214604_"
        gradientUnits="userSpaceOnUse"
        x1="-29250.1406"
        y1="-9941.5029"
        x2="-20418.2402"
        y2="-6987.2021"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="3.000000e-02" stopColor="#7C1DC9" />
        <stop offset="0.21" stopColor="#6E41D2" />
        <stop offset="0.62" stopColor="#4C9BE8" />
        <stop offset="1" stopColor="#2AF6FF" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000027582964644932292800000004744135219385214604_)"
        d="M1170.1,1347.5l-118.5-69.2v109.5l118.5,69.1
   V1347.5z"
      />
      <linearGradient
        id="SVGID_00000150813837914665175130000004030804120115365518_"
        gradientUnits="userSpaceOnUse"
        x1="365.9893"
        y1="-44928.6602"
        x2="644.9904"
        y2="-23318.9609"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#25054D" />
        <stop offset="1" stopColor="#45108A" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000150813837914665175130000004030804120115365518_)"
        d="M999,1435.8l163.2-97.5l16.1,8.8l11.1,82.3
   l-103.6,60.7c-72.7,42-190,42.2-262.3,0.5l-73.2-44.7l-42.6,25.8v-100.1l159.2-0.2l-26.2,21.9l69.9,42.7
   C934.8,1450,974.5,1449.9,999,1435.8L999,1435.8z"
      />
      <linearGradient
        id="SVGID_00000161626082728432202120000016004236935805336235_"
        gradientUnits="userSpaceOnUse"
        x1="161143.75"
        y1="-22247.4883"
        x2="125585.75"
        y2="-17257.4844"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000161626082728432202120000016004236935805336235_)"
        d="M1180.8,1341.3v141.9l-10.8-6.3v-129.4
   l-118.5-69.2v124l-10.8-6.3v-136.5L1180.8,1341.3L1180.8,1341.3z"
      />
      <linearGradient
        id="SVGID_00000148634051686875730350000010827237170090948279_"
        gradientUnits="userSpaceOnUse"
        x1="-11972.2002"
        y1="204.4901"
        x2="-14260.5996"
        y2="204.4901"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9F79C8" />
        <stop offset="0.14" stopColor="#A580CB" />
        <stop offset="0.33" stopColor="#B492D3" />
        <stop offset="0.55" stopColor="#CDB0E1" />
        <stop offset="0.58" stopColor="#D1B4E3" />
        <stop offset="0.76" stopColor="#DBC4E9" />
        <stop offset="1" stopColor="#EBDEF3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000148634051686875730350000010827237170090948279_)"
        d="M837.7,1381.2l51.3-25.7l-0.2,25.5l-31.6,18.4
   l-16.2-8.7L837.7,1381.2L837.7,1381.2z"
      />
      <linearGradient
        id="SVGID_00000181064095628020422510000012362111696806326926_"
        gradientUnits="userSpaceOnUse"
        x1="7481.0107"
        y1="137.5039"
        x2="7048.6807"
        y2="144.5039"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000181064095628020422510000012362111696806326926_)"
        d="M1060.5,1397.4l-8.9,5.1v-124.1l8.9,5.2V1397.4z"
      />
      <path
        opacity="0.5"
        enableBackground="new    "
        d="M762.7,1454.7l91-52.6l-2.4-1.4l-91,52.6L762.7,1454.7z M782.9,1467.1l91-52.6
   l-2.4-1.4l-91,52.6L782.9,1467.1z M803.1,1479.6l91-52.6l-2.4-1.4l-91,52.6L803.1,1479.6z M823.3,1492.1l91-52.6l-2.4-1.4l-91,52.6
   L823.3,1492.1L823.3,1492.1z M1087.7,1491.8l-90.4-52.2l-2.4,1.4l90.4,52.2L1087.7,1491.8L1087.7,1491.8z M1110.4,1478.4l-90.4-52.2
   l-2.4,1.4l90.4,52.2L1110.4,1478.4L1110.4,1478.4z M1133.1,1465l-90.4-52.2l-2.4,1.4l90.4,52.2L1133.1,1465z M1155.8,1451.7
   l-90.4-52.3l-2.4,1.4l90.4,52.3L1155.8,1451.7L1155.8,1451.7z M1178.6,1438.3l-90.4-52.2l-2.4,1.4l90.4,52.2L1178.6,1438.3
   L1178.6,1438.3z M954.3,1523.3l0.4-74.1h-3.4l-0.4,74.1H954.3z M1004.2,1519.8l-32.8-71.6l-3.3,0.5l32.8,71.5L1004.2,1519.8z
    M1049.9,1508.5l-63.8-64.1l-3,1l63.8,64.1L1049.9,1508.5z M907.4,1519.7l33.6-71.7l-3.3-0.5l-33.6,71.7L907.4,1519.7L907.4,1519.7z
    M863.9,1509.8l64.5-64.3l-3-1l-64.5,64.3L863.9,1509.8z"
      />
      <linearGradient
        id="SVGID_00000161618224151165601120000016480111794181843128_"
        gradientUnits="userSpaceOnUse"
        x1="748.943"
        y1="103.3071"
        x2="1188.1381"
        y2="103.3071"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="1.000000e-02" stopColor="#C1A1D5" />
        <stop offset="0.13" stopColor="#C3A4D6" />
        <stop offset="0.21" stopColor="#C9ADDA" />
        <stop offset="0.29" stopColor="#D3BCE1" />
        <stop offset="0.35" stopColor="#E2D2EB" />
        <stop offset="0.41" stopColor="#F4EEF8" />
        <stop offset="0.44" stopColor="#FFFFFF" />
        <stop offset="0.47" stopColor="#F9F5FB" />
        <stop offset="0.52" stopColor="#E9DBF2" />
        <stop offset="0.57" stopColor="#D1B4E3" />
        <stop offset="0.63" stopColor="#B395D6" />
        <stop offset="0.69" stopColor="#9C7DCB" />
        <stop offset="0.75" stopColor="#8E6EC5" />
        <stop offset="0.8" stopColor="#8969C3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000161618224151165601120000016480111794181843128_)"
        d="M750,1436l73.2,44.7
   c72.2,41.7,189.6,41.5,262.2-0.5l103.8-60.8v26l-103.6,60.8c-72.7,42-190,42.2-262.3,0.5L750,1462L750,1436L750,1436L750,1436z"
      />
      <path
        opacity="0.5"
        enableBackground="new    "
        d="M751.8,1436l93-53.8l-2.4-1.4l-90.6,52.5L751.8,1436L751.8,1436z M706.1,1437
   l115.5-67l-2.4-1.4l-113.2,65.7L706.1,1437L706.1,1437z M704,1415l85.6-49.8l-2.4-1.4l-83.3,48.5L704,1415L704,1415z M704,1392.5
   l43.1-25.1l-2.4-1.4l-40.7,23.8L704,1392.5L704,1392.5z"
      />
      <linearGradient
        id="SVGID_00000030447391583598413780000000158917696656990888_"
        gradientUnits="userSpaceOnUse"
        x1="-14271.5996"
        y1="119.5051"
        x2="-16291.5996"
        y2="119.5051"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9F79C8" />
        <stop offset="0.14" stopColor="#A580CB" />
        <stop offset="0.33" stopColor="#B492D3" />
        <stop offset="0.55" stopColor="#CDB0E1" />
        <stop offset="0.58" stopColor="#D1B4E3" />
        <stop offset="0.76" stopColor="#DBC4E9" />
        <stop offset="1" stopColor="#EBDEF3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000030447391583598413780000000158917696656990888_)"
        d="M750.4,1461.2l-48.7,28.5l0.1-26.2l48.6-28.2
   V1461.2z"
      />
      <linearGradient
        id="SVGID_00000031909218094561919480000005052715386452343728_"
        gradientUnits="userSpaceOnUse"
        x1="69098"
        y1="190.3168"
        x2="113348"
        y2="190.3168"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="1.000000e-02" stopColor="#C1A1D5" />
        <stop offset="0.13" stopColor="#C3A4D6" />
        <stop offset="0.21" stopColor="#C9ADDA" />
        <stop offset="0.29" stopColor="#D3BCE1" />
        <stop offset="0.35" stopColor="#E2D2EB" />
        <stop offset="0.41" stopColor="#F4EEF8" />
        <stop offset="0.44" stopColor="#FFFFFF" />
        <stop offset="0.47" stopColor="#F9F5FB" />
        <stop offset="0.52" stopColor="#E9DBF2" />
        <stop offset="0.57" stopColor="#D1B4E3" />
        <stop offset="0.63" stopColor="#B395D6" />
        <stop offset="0.69" stopColor="#9C7DCB" />
        <stop offset="0.75" stopColor="#8E6EC5" />
        <stop offset="0.8" stopColor="#8969C3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000031909218094561919480000005052715386452343728_)"
        d="M999,1437.1c-24.5,14.2-64.1,14.3-88.5,0.2
   l-72.8-44.8v-12l72.8,44.9c24.4,14.1,64,14,88.5-0.2l151-89.5l10.2,5.8L999,1437.1L999,1437.1z"
      />
      <linearGradient
        id="SVGID_00000107569759138637941760000008433446574146335662_"
        gradientUnits="userSpaceOnUse"
        x1="823.7634"
        y1="-1110.3546"
        x2="812.0642"
        y2="-639.8245"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9F79C8" />
        <stop offset="0.14" stopColor="#A580CB" />
        <stop offset="0.33" stopColor="#B492D3" />
        <stop offset="0.55" stopColor="#CDB0E1" />
        <stop offset="0.58" stopColor="#D1B4E3" />
        <stop offset="0.76" stopColor="#DBC4E9" />
        <stop offset="1" stopColor="#EBDEF3" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000107569759138637941760000008433446574146335662_)"
        d="M855.4,1373.6H707.3v-12.2h167.1L855.4,1373.6
   L855.4,1373.6z"
      />
      <path
        fill="#E3D1EE"
        d="M701.7,1464.2l0.6-107.7l186.5-0.3l-42.3,24.1l64,39.4c24.4,14.1,64,14,88.5-0.2l146.2-86.5l4.8,2.7
   l-151,89.5c-24.5,14.2-64.1,14.2-88.5,0.1l-72.8-44.8l33.9-18.8l-163.8,0.3l-0.5,93.3l43.5-24.8l72.5,43.9
   c72.2,41.7,189.6,41.5,262.2-0.5l98.1-57.5l5.5,3.2l-103.6,60.8c-72.7,42-190,42.2-262.3,0.5L750,1436L701.7,1464.2z"
      />
      <path
        opacity="0.5"
        enableBackground="new    "
        d="M1175.8,1410.7l-65.3-38.4l-2.4,1.4l65.4,38.4L1175.8,1410.7z M1175.8,1385.3
   l-44.2-25.9l-2.4,1.4l44.2,25.9L1175.8,1385.3z M1186.6,1365.9l-32.8-19.1l-2.4,1.4l32.8,19L1186.6,1365.9z"
      />
      <linearGradient
        id="SVGID_00000114761421286990535840000009934615055559641006_"
        gradientUnits="userSpaceOnUse"
        x1="1188.33"
        y1="183.285"
        x2="1188.3301"
        y2="183.285"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000114761421286990535840000009934615055559641006_)"
        d="M1181.6,1398.9v-0.4
   C1181.6,1398.7,1181.6,1398.8,1181.6,1398.9z"
      />
      <g>
        <linearGradient
          id="SVGID_00000057855042379668006310000012298125836679639484_"
          gradientUnits="userSpaceOnUse"
          x1="1066.67"
          y1="172.425"
          x2="1180.33"
          y2="172.425"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2FB5B6" />
          <stop offset="0.23" stopColor="#24E4A8" />
          <stop offset="0.604" stopColor="#208FB4" />
          <stop offset="0.843" stopColor="#2BBBB2" />
          <stop offset="0.97" stopColor="#319BC1" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000057855042379668006310000012298125836679639484_)"
          d="M1181.6,1384.4h-115.5v16.8
     c0,18.5,25.9,33.5,57.7,33.5c31.9,0,57.8-15,57.8-33.5V1384.4z"
        />
        <path
          fill="#5C84A4"
          d="M1141.5,1433l1.6-0.3v-42.5h-1.6V1433z M1148.8,1431.3l1.6-0.4v-40.7h-1.6V1431.3L1148.8,1431.3z
      M1156.1,1428.9l1.6-0.7v-38.1h-1.6V1428.9L1156.1,1428.9z M1134.3,1434l1.6-0.2v-43.7h-1.6V1434z M1170.6,1420.8
     c0.5-0.4,1.1-0.9,1.6-1.3v-29.3h-1.6V1420.8z M1177.8,1412.9c0.6-0.9,1.1-1.9,1.6-2.8v-20h-1.6V1412.9z M1163.3,1425.5
     c0.5-0.3,1.1-0.6,1.6-0.9v-34.5h-1.6V1425.5z M1127,1434.5h1.6v-44.4h-1.6V1434.5z M1119.8,1434.5h1.6v-44.4h-1.6V1434.5z
      M1105.3,1432.7c0.5,0,1.1,0.2,1.6,0.3v-42.9h-1.6C1105.3,1390.1,1105.3,1432.7,1105.3,1432.7z M1112.5,1433.9h1.6v-43.8h-1.6
     V1433.9z M1098,1431l1.6,0.5v-41.3h-1.6V1431z M1069,1411.4c0.5,0.9,1,1.8,1.6,2.7v-24h-1.6V1411.4L1069,1411.4z M1076.3,1420
     c0.5,0.4,1.1,0.8,1.6,1.3v-31.2h-1.6V1420z M1090.8,1428.5l1.6,0.6v-39h-1.6V1428.5z M1083.5,1425.1l1.6,0.8v-35.8h-1.6V1425.1z"
        />

        <linearGradient
          id="SVGID_00000067939261800320438120000010593649722836463773_"
          gradientUnits="userSpaceOnUse"
          x1="1066.1099"
          y1="1384.7349"
          x2="1181.59"
          y2="1384.7349"
        >
          <stop offset="0" stopColor="#2FB5B6" />
          <stop offset="0.23" stopColor="#24E4A8" />
          <stop offset="0.604" stopColor="#208FB4" />
          <stop offset="0.843" stopColor="#2BBBB2" />
          <stop offset="0.97" stopColor="#319BC1" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000067939261800320438120000010593649722836463773_)"
          d="M1123.8,1418.1c31.9,0,57.7-15,57.7-33.5
     c-2.7-44.4-112.8-44.4-115.5,0C1066.1,1403.1,1092,1418.1,1123.8,1418.1z"
        />
        <path
          fill="#42CFD2"
          d="M1123.8,1409.7c23.8,0,43.2-11.2,43.2-25.1c-2-33.2-84.4-33.2-86.4,0
     C1080.7,1398.4,1100,1409.7,1123.8,1409.7z"
        />
        <path
          fill="#3593B4"
          d="M1123.8,1362.3c23.1,0,41.8,10.5,43.1,23.7c0.8-15.1-18.7-26.2-43.2-26.4c-24.5,0.2-44,11.3-43.2,26.4
     C1082,1372.8,1100.8,1362.3,1123.8,1362.3z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#358FB4"
          d="M1129.2,1373.2c-10.6,1.6-19.2,3-19.2,3c0,0.1,7.2,11.7,7.3,11.9
     c0.1,0.1,20.8,4.4,20.8,4.3c-0.2,0.4,10.5-22.4,10.3-22C1148.4,1370.2,1144.9,1370.7,1129.2,1373.2L1129.2,1373.2z M1139.2,1380.1
     c-1.6,3.4-2.9,6.2-3,6.2c-0.2-0.3-3.5-5.5-4.2-6.7c-2.1-0.4-11.1-2.3-11.6-2.4c0,0,19.9-3.2,21.3-3.3c0.2,0,0.4,0,0.4,0
     C1142.1,1373.9,1140.8,1376.7,1139.2,1380.1L1139.2,1380.1z M1132.1,1387.3c0.4,0.7,0.7,1.2,0.6,1.2c-0.2,0-11.8-2.4-11.9-2.5
     c-0.1-0.1-4.3-6.9-4.3-6.9c0.5,0,9.9,2,12,2.4C1129.5,1383.2,1131.3,1386.1,1132.1,1387.3L1132.1,1387.3z M1100.7,1389.2
     c-3,6.3-5.4,11.5-5.3,11.5c0.1,0,39.7-6.2,39.7-6.2c0.4,0-21.7-4.4-21.3-4.4c-0.2,0-7.3-11.8-7.4-11.9l-0.3-0.4L1100.7,1389.2
     L1100.7,1389.2z M1108.7,1389.6l1.5,2.5c1.8,0.4,9.6,2,10,2.1c0.5,0-19.2,3.1-18.7,2.9c0-0.1,4.9-10.5,5-10.6
     C1106.7,1386.3,1106.8,1386.4,1108.7,1389.6L1108.7,1389.6z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#9AFFF5"
          d="M1129.2,1371.2c-10.6,1.6-19.2,3-19.2,3c0,0.1,7.2,11.7,7.3,11.9
     c0.1,0.1,20.8,4.4,20.8,4.3c-0.2,0.4,10.5-22.4,10.3-22C1148.4,1368.2,1144.9,1368.7,1129.2,1371.2L1129.2,1371.2z M1139.2,1378.1
     c-1.6,3.4-2.9,6.2-3,6.2c-0.2-0.3-3.5-5.5-4.2-6.7c-2.1-0.4-11.1-2.3-11.6-2.4c0,0,19.9-3.2,21.3-3.3c0.2,0,0.4,0,0.4,0
     C1142.1,1371.9,1140.8,1374.7,1139.2,1378.1L1139.2,1378.1z M1132.1,1385.3c0.4,0.7,0.7,1.2,0.6,1.2c-0.2,0-11.8-2.4-11.9-2.5
     c-0.1-0.1-4.3-6.9-4.3-6.9c0.5,0,9.9,2,12,2.4C1129.5,1381.2,1131.3,1384.1,1132.1,1385.3L1132.1,1385.3z M1100.7,1387.2
     c-3,6.3-5.4,11.5-5.3,11.5c0.1,0,39.7-6.2,39.7-6.2c0.4,0.1-21.7-4.4-21.3-4.4c-0.2-0.1-7.3-11.8-7.4-11.9l-0.3-0.4L1100.7,1387.2
     L1100.7,1387.2z M1108.7,1387.6l1.5,2.5c1.8,0.4,9.6,1.9,10,2.1c0.5,0-19.2,3.1-18.7,2.9c0-0.1,4.9-10.5,5-10.6
     C1106.7,1384.3,1106.8,1384.4,1108.7,1387.6L1108.7,1387.6z"
        />
      </g>
      <linearGradient
        id="SVGID_00000178885573679375751970000013182783239270085560_"
        gradientUnits="userSpaceOnUse"
        x1="161143.75"
        y1="-22247.4883"
        x2="125585.75"
        y2="-17257.4844"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000178885573679375751970000013182783239270085560_)"
        d="M1180.8,1341.3v141.9l-10.8-6.3v-129.4
   l-118.5-69.2v77.3l-10.8-6.3v-89.8L1180.8,1341.3L1180.8,1341.3z"
      />
      <linearGradient
        id="SVGID_00000050645955767529122720000011578504493365715645_"
        gradientUnits="userSpaceOnUse"
        x1="1190.9294"
        y1="172.1123"
        x2="1179.5188"
        y2="172.3177"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000050645955767529122720000011578504493365715645_)"
        d="M1180.8,1341.3v141.9l8.9-5.1v-141.8
   L1180.8,1341.3z"
      />
      <linearGradient
        id="SVGID_00000007416934167073822900000016738059401905374594_"
        gradientUnits="userSpaceOnUse"
        x1="-958.2139"
        y1="-12798.2305"
        x2="-1789.413"
        y2="-18042.6309"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9D9EB3" />
        <stop offset="0.58" stopColor="#D4D1D8" />
        <stop offset="1" stopColor="#EEEBF2" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000007416934167073822900000016738059401905374594_)"
        d="M1189.7,1336.3l-8.9,5l-140-81.8l9.1-5.1
   L1189.7,1336.3z"
      />
      <path
        opacity="0.7"
        fill="#3C0862"
        enableBackground="new    "
        d="M1218.8,1444.1l130.1-75.2v-109.4l-130.1,75.2V1444.1z
    M1347.1,1367.8l-126.5,73.1v-105.2l126.5-73.1V1367.8z"
      />
      <path
        opacity="0.7"
        fill="#3C0862"
        enableBackground="new    "
        d="M1335,1268.6h1.8v106.7h-1.8V1268.6z M1320.3,1277h1.8v106.8
   h-1.8V1277z M1305.7,1285.4h1.8v106.8h-1.8V1285.4z M1291,1293.8h1.8v106.9h-1.8V1293.8z M1276.4,1302.3h1.8v106.9h-1.8
   C1276.4,1409.2,1276.4,1302.3,1276.4,1302.3z M1261.7,1310.7h1.8v107h-1.8V1310.7z M1232.4,1327.5h1.8v107.1h-1.8V1327.5
   L1232.4,1327.5z M1247,1319.3h1.8v107h-1.8V1319.3z"
      />
      <path
        opacity="0.7"
        fill="#3C0862"
        enableBackground="new    "
        d="M1346.4,1280.3l0.9,1.6l-128.9,74.1l-0.9-1.6L1346.4,1280.3z
    M1347.6,1291.7l0.9,1.6l-128.3,74.1l-0.9-1.6L1347.6,1291.7z M1347.6,1306.8l0.9,1.6l-128.3,74.1l-0.9-1.6L1347.6,1306.8z
    M1347.6,1322l0.9,1.6l-128.3,74.1l-0.9-1.6L1347.6,1322L1347.6,1322z M1347.6,1337.2l0.9,1.6l-128.3,74.1l-0.9-1.6L1347.6,1337.2z
    M1347.6,1352.3l0.9,1.6l-128.3,74.1l-0.9-1.6L1347.6,1352.3z"
      />
      <radialGradient
        id="SVGID_00000018917242982094354890000002455524108858780585_"
        cx="-238.0127"
        cy="1328.9967"
        r="1"
        gradientTransform="matrix(-117.483 0 0 117.583 -26719.1074 -154918.1875)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FF63CE" />
        <stop offset="1" stopColor="#9F19AB" />
      </radialGradient>
      <path
        fill="url(#SVGID_00000018917242982094354890000002455524108858780585_)"
        d="M1268.8,1362.8c3.2-0.2,6.2-1.1,8.9-2.9
   c7.7-4.4,14.2-10.6,19-18.1c5.2-8.1,12.3-14.8,20.7-19.5c3.7-2.6,8.8-3.1,13-1.4c11.7,5.2,16.7,28.1,16.8,28.4
   c0.3,1.2,2.1,0.8,1.8-0.4c-0.2-1-5.2-24.1-17.8-29.7c-4.7-2-10.4-1.4-14.7,1.5c-8.6,4.9-15.9,11.7-21.3,20.1
   c-4.6,7.3-10.9,13.3-18.4,17.7c-21.6,12.3-15-25.8-56.8-1.5c-0.2,0.1-0.4,0.3-0.4,0.6c-0.1,0.2,0,0.5,0.1,0.7
   c0.1,0.2,0.3,0.4,0.6,0.4c23.9-12.9,30.8-7.9,37.9-1.2C1261.2,1360,1264.2,1362.8,1268.8,1362.8L1268.8,1362.8z"
      />
      <g>
        <linearGradient
          id="SVGID_00000138573330374104562770000005571452346188209079_"
          gradientUnits="userSpaceOnUse"
          x1="5927.915"
          y1="8228.4678"
          x2="5954.5381"
          y2="8274.0703"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#DC3DAA" />
          <stop offset="0.25" stopColor="#A32D7E" />
          <stop offset="0.77" stopColor="#2F0D24" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000138573330374104562770000005571452346188209079_)"
          d="M1245.9,1318c0.3,24.5,0.7,83.8,0.8,108.8
     c0,1.5-1.2,1.6-1.2,0C1245.5,1401.6,1245.7,1342.7,1245.9,1318z"
        />
      </g>
      <linearGradient
        id="SVGID_00000183248558027812662180000015256891143319438730_"
        gradientUnits="userSpaceOnUse"
        x1="1234.3785"
        y1="247.2305"
        x2="1248.9956"
        y2="229.6119"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="4.000000e-02" stopColor="#9F19AB" />
        <stop offset="0.24" stopColor="#AE25B1" />
        <stop offset="0.65" stopColor="#D744BF" />
        <stop offset="1" stopColor="#FF63CE" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000183248558027812662180000015256891143319438730_)"
        d="M1249.8,1346.8c-0.1,2.6-1.6,5-3.7,6.4
   c-2,1.2-3.7,0.2-3.7-2.1c0.1-2.6,1.5-5,3.7-6.4C1248.2,1343.5,1249.8,1344.4,1249.8,1346.8z"
      />
      <linearGradient
        id="SVGID_00000016071455747490542280000013777733556127306418_"
        gradientUnits="userSpaceOnUse"
        x1="1144.3901"
        y1="355.2844"
        x2="1261.3401"
        y2="361.9543"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000016071455747490542280000013777733556127306418_)"
        d="M1259.2,1199.8h-115.5v16.8
   c0,18.5,25.9,33.5,57.7,33.5s57.8-15,57.8-33.5V1199.8z"
      />
      <path
        opacity="0.52"
        fill="#740098"
        enableBackground="new    "
        d="M1219.2,1248.4l1.6-0.3v-42.5h-1.6V1248.4z M1226.4,1246.7
   l1.6-0.5v-40.7h-1.6V1246.7L1226.4,1246.7z M1233.7,1244.4l1.6-0.7v-38.1h-1.6V1244.4L1233.7,1244.4z M1211.9,1249.5l1.6-0.2v-43.8
   h-1.6V1249.5z M1248.2,1236.2c0.5-0.4,1.1-0.9,1.6-1.3v-29.3h-1.6V1236.2z M1255.4,1228.4c0.6-0.9,1.1-1.9,1.6-2.8v-20h-1.6V1228.4z
    M1240.9,1241c0.5-0.3,1.1-0.6,1.6-0.9v-34.5h-1.6V1241z M1204.7,1250h1.6v-44.4h-1.6V1250z M1197.4,1249.9h1.6v-44.4h-1.6V1249.9z
    M1183,1248.2c0.5,0,1.1,0.2,1.6,0.3v-42.9h-1.6C1183,1205.6,1183,1248.2,1183,1248.2z M1190.1,1249.4h1.6v-43.8h-1.6V1249.4z
    M1175.6,1246.5l1.6,0.4v-41.3h-1.6V1246.5z M1146.6,1226.9c0.5,0.9,1,1.8,1.6,2.7v-24h-1.6V1226.9L1146.6,1226.9z M1153.9,1235.5
   c0.5,0.4,1.1,0.8,1.6,1.2v-31.2h-1.6V1235.5z M1168.4,1244l1.6,0.6v-39h-1.6V1244z M1161.1,1240.5l1.6,0.8v-35.8h-1.6
   C1161.1,1205.6,1161.1,1240.5,1161.1,1240.5z"
      />
      <linearGradient
        id="SVGID_00000020369085068179948910000008581736236236924323_"
        gradientUnits="userSpaceOnUse"
        x1="1143.7299"
        y1="1200.1801"
        x2="1259.21"
        y2="1200.1801"
      >
        <stop offset="0" stopColor="#C531DD" />
        <stop offset="0.23" stopColor="#F296FF" />
        <stop offset="0.605" stopColor="#9600AE" />
        <stop offset="0.831" stopColor="#F296FF" />
        <stop offset="0.97" stopColor="#C531DD" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000020369085068179948910000008581736236236924323_)"
        d="M1201.5,1233.6c31.9,0,57.7-15,57.7-33.5
   c-2.7-44.4-112.8-44.4-115.5,0C1143.7,1218.6,1169.6,1233.6,1201.5,1233.6z"
      />
      <path
        fill="#C531DD"
        d="M1201.5,1225.1c23.8,0,43.2-11.2,43.2-25.1c-2-33.2-84.4-33.2-86.4,0
   C1158.3,1213.9,1177.6,1225.1,1201.5,1225.1z"
      />
      <path
        fill="#9600AE"
        d="M1201.5,1177.7c23.1,0,41.8,10.5,43.1,23.7c0.8-15.1-18.7-26.2-43.2-26.4c-24.5,0.2-44,11.3-43.2,26.4
   C1159.7,1188.2,1178.4,1177.7,1201.5,1177.7z"
      />
      <path
        fill="#9600AE"
        d="M1177.6,1210.2c-2.9-2.1-4.8-4.5-5.3-7.2c-2.7-18.6,30.9-22.4,44.5-15.9c4,1.7,7,3.8,9.2,6.4
   c0.3,0.4,1.1,0.8,1.8,1c3.5,1,9.1,4,7.6,7c-1.2,2.1-3.6,3.7-7,4.7c-1.4,0.4-2.2,1-2.9,1.8c-7.4,8.4-26.6,11.6-40.3,6.4
   c1-0.6,1.9-1.1,2.9-1.7c-9.9-5.8-7.8-16,4.3-19.8c7.7-2.3,17.6-0.9,21.9,3.2c3.6,3.5,1.5,8.3-4.4,10.1c-4.5,1.4-10.3,0.5-12.6-1.9
   c-1.5-1.5-1.1-3.5,0.9-4.8c1.9-1.2,4.3-1.3,7.6-0.3c1.3-0.8,2.7-1.6,4.1-2.4c-2.6-2.2-9.2-2.7-13.7-1c-8.5,3.1-8,10.3,0.9,13.3
   c10.2,3.5,23-0.3,25.1-7.4c1.9-6.4-6.1-12.4-18-13.5C1188.9,1186.4,1168.8,1196,1177.6,1210.2L1177.6,1210.2z"
      />
      <path
        fill="#F296FF"
        d="M1177.6,1208.2c-7.6-5.2-7.4-14,0.3-19.8c11.7-8.6,37.2-9.2,48.1,3.1c0.3,0.4,1.1,0.7,1.8,1
   c3.6,1.1,6.3,2.7,7.6,5c1.3,2.9-3.8,5.9-7.1,6.8c-1.4,0.4-2.2,1-2.9,1.8c-7.4,8.4-26.6,11.6-40.3,6.4c1-0.6,1.9-1.1,2.9-1.7
   c-9.9-5.8-7.8-16,4.3-19.8c7.7-2.3,17.6-0.9,21.9,3.2c3.6,3.5,1.5,8.3-4.4,10.1c-4.5,1.4-10.3,0.5-12.6-1.9
   c-1.5-1.5-1.1-3.5,0.9-4.8c1.9-1.2,4.3-1.3,7.6-0.3c1.3-0.8,2.7-1.6,4.1-2.4c-2.6-2.2-9.2-2.7-13.7-1c-8.5,3.1-8,10.3,0.9,13.3
   c10.2,3.5,23-0.3,25.1-7.4c1.9-6.4-6.1-12.4-18-13.5C1188.9,1184.4,1168.8,1194,1177.6,1208.2L1177.6,1208.2z"
      />
      <g>
        <linearGradient
          id="SVGID_00000116933686906159777870000015107437481665174437_"
          gradientUnits="userSpaceOnUse"
          x1="1144.3901"
          y1="458.8543"
          x2="1261.3401"
          y2="465.5244"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#C531DD" />
          <stop offset="0.23" stopColor="#F296FF" />
          <stop offset="0.605" stopColor="#9600AE" />
          <stop offset="0.831" stopColor="#F296FF" />
          <stop offset="0.97" stopColor="#C531DD" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000116933686906159777870000015107437481665174437_)"
          d="M1259.2,1096.3h-115.5v16.8
     c0,18.5,25.9,33.5,57.7,33.5s57.8-15,57.8-33.5V1096.3z"
        />

        <linearGradient
          id="SVGID_00000064352556007239599870000012672694263526033333_"
          gradientUnits="userSpaceOnUse"
          x1="1265.92"
          y1="471.4149"
          x2="1265.9202"
          y2="471.4149"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#FFBB96" />
          <stop offset="0.23" stopColor="#FFFBC9" />
          <stop offset="0.54" stopColor="#F9B673" />
          <stop offset="0.64" stopColor="#F9B876" />
          <stop offset="0.72" stopColor="#FABE81" />
          <stop offset="0.81" stopColor="#FCC993" />
          <stop offset="0.86" stopColor="#FED2A3" />
          <stop offset="0.97" stopColor="#FFC28C" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000064352556007239599870000012672694263526033333_)"
          d="M1259.2,1110.8v-0.4
     C1259.2,1110.5,1259.2,1110.7,1259.2,1110.8z"
        />
        <path
          opacity="0.52"
          fill="#740098"
          enableBackground="new    "
          d="M1219.2,1144.9l1.6-0.3V1102h-1.6V1144.9z M1226.4,1143.2
     l1.6-0.4V1102h-1.6V1143.2z M1233.7,1140.8l1.6-0.7V1102h-1.6V1140.8z M1211.9,1145.9l1.6-0.2V1102h-1.6V1145.9z M1248.2,1132.6
     c0.5-0.4,1.1-0.9,1.6-1.3V1102h-1.6V1132.6z M1255.4,1124.8c0.6-0.9,1.1-1.9,1.6-2.8v-20h-1.6V1124.8z M1240.9,1137.4
     c0.5-0.3,1.1-0.6,1.6-0.9V1102h-1.6V1137.4L1240.9,1137.4z M1204.7,1146.4h1.6V1102h-1.6V1146.4L1204.7,1146.4z M1197.4,1146.4h1.6
     V1102h-1.6V1146.4L1197.4,1146.4z M1183,1144.6c0.5,0,1.1,0.2,1.6,0.3V1102h-1.6V1144.6L1183,1144.6z M1190.1,1145.8h1.6V1102h-1.6
     V1145.8L1190.1,1145.8z M1175.6,1142.9l1.6,0.4V1102h-1.6V1142.9L1175.6,1142.9z M1146.6,1123.3c0.5,0.9,1,1.8,1.6,2.7v-24h-1.6
     V1123.3L1146.6,1123.3z M1153.9,1131.9c0.5,0.4,1.1,0.8,1.6,1.2V1102h-1.6V1131.9L1153.9,1131.9z M1168.4,1140.4l1.6,0.6v-39h-1.6
     V1140.4L1168.4,1140.4z M1161.1,1136.9l1.6,0.9V1102h-1.6V1136.9L1161.1,1136.9z"
        />

        <linearGradient
          id="SVGID_00000116231383396161048180000003155396126993430191_"
          gradientUnits="userSpaceOnUse"
          x1="1143.7299"
          y1="1096.6101"
          x2="1259.21"
          y2="1096.6101"
        >
          <stop offset="0" stopColor="#C531DD" />
          <stop offset="0.23" stopColor="#F296FF" />
          <stop offset="0.605" stopColor="#9600AE" />
          <stop offset="0.831" stopColor="#F296FF" />
          <stop offset="0.97" stopColor="#C531DD" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000116231383396161048180000003155396126993430191_)"
          d="M1201.5,1130c31.9,0,57.7-15,57.7-33.5
     c-2.7-44.4-112.8-44.4-115.5,0C1143.7,1115,1169.6,1130,1201.5,1130z"
        />
        <path
          fill="#C531DD"
          d="M1201.5,1121.6c23.8,0,43.2-11.2,43.2-25.1c-2-33.2-84.4-33.2-86.4,0
     C1158.3,1110.3,1177.6,1121.6,1201.5,1121.6z"
        />
        <path
          fill="#9600AE"
          d="M1201.5,1074.2c23.1,0,41.8,10.5,43.1,23.7c0.8-15.1-18.7-26.2-43.2-26.4c-24.5,0.2-44,11.3-43.2,26.4
     C1159.7,1084.6,1178.4,1074.2,1201.5,1074.2z"
        />
        <path
          fill="#9600AE"
          d="M1177.6,1106.6c-7.6-5.2-7.4-14,0.3-19.8c11.7-8.6,37.2-9.2,48.1,3.1c0.3,0.4,1.1,0.7,1.8,1
     c3.6,1.1,6.3,2.7,7.6,5c1.3,2.9-3.8,5.9-7.1,6.8c-1.4,0.4-2.2,1-2.9,1.8c-7.4,8.4-26.6,11.6-40.3,6.4c1-0.6,1.9-1.1,2.9-1.7
     c-9.9-5.8-7.8-16,4.3-19.8c7.7-2.3,17.6-0.9,21.9,3.2c3.6,3.5,1.5,8.3-4.4,10.1c-4.5,1.4-10.3,0.5-12.6-1.9
     c-1.5-1.5-1.1-3.5,0.9-4.8c1.9-1.2,4.3-1.3,7.6-0.3c1.3-0.8,2.7-1.6,4.1-2.4c-2.6-2.2-9.2-2.7-13.7-1c-8.5,3.1-8,10.3,0.9,13.3
     c10.2,3.5,23-0.3,25.1-7.4c1.9-6.4-6.1-12.4-18-13.5C1188.9,1082.8,1168.8,1092.4,1177.6,1106.6L1177.6,1106.6z"
        />
        <path
          fill="#F296FF"
          d="M1177.6,1104.6c-7.6-5.2-7.4-14,0.3-19.8c11.7-8.6,37.2-9.2,48.1,3.1c0.3,0.4,1.1,0.7,1.8,1
     c3.6,1.1,6.3,2.7,7.6,5c1.3,2.9-3.8,5.9-7.1,6.8c-1.4,0.4-2.2,1-2.9,1.8c-7.4,8.4-26.6,11.6-40.3,6.4c1-0.6,1.9-1.1,2.9-1.7
     c-9.9-5.8-7.8-16,4.3-19.8c7.7-2.3,17.6-0.9,21.9,3.2c3.6,3.5,1.5,8.3-4.4,10.1c-4.5,1.4-10.3,0.5-12.6-1.9
     c-1.5-1.5-1.1-3.5,0.9-4.8c1.9-1.2,4.3-1.3,7.6-0.3c1.3-0.8,2.7-1.6,4.1-2.4c-2.6-2.2-9.2-2.7-13.7-1c-8.5,3.1-8,10.3,0.9,13.3
     c10.2,3.5,23-0.3,25.1-7.4c1.9-6.4-6.1-12.4-18-13.5C1188.9,1080.8,1168.8,1090.4,1177.6,1104.6L1177.6,1104.6z"
        />
      </g>
      <g>
        <linearGradient
          id="SVGID_00000162332121642722590370000006745671180611275144_"
          gradientUnits="userSpaceOnUse"
          x1="931.792"
          y1="106.8651"
          x2="1045.45"
          y2="106.8651"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2FB5B6" />
          <stop offset="0.23" stopColor="#24E4A8" />
          <stop offset="0.604" stopColor="#208FB4" />
          <stop offset="0.843" stopColor="#2BBBB2" />
          <stop offset="0.97" stopColor="#319BC1" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000162332121642722590370000006745671180611275144_)"
          d="M1046.7,1450H931.2v16.8
     c0,18.5,25.9,33.5,57.7,33.5c31.9,0,57.8-15,57.8-33.5V1450z"
        />
        <path
          fill="#5C84A4"
          d="M1006.7,1498.6l1.6-0.3v-42.5h-1.6V1498.6z M1013.9,1496.9l1.6-0.5v-40.7h-1.6V1496.9L1013.9,1496.9z
      M1021.2,1494.5l1.6-0.7v-38.1h-1.6V1494.5L1021.2,1494.5z M999.4,1499.6l1.6-0.2v-43.8h-1.6V1499.6z M1035.7,1486.3
     c0.5-0.4,1.1-0.9,1.6-1.3v-29.3h-1.6V1486.3z M1042.9,1478.5c0.6-0.9,1.1-1.9,1.6-2.8v-20h-1.6V1478.5z M1028.4,1491.1
     c0.5-0.3,1.1-0.6,1.6-0.9v-34.5h-1.6V1491.1z M992.1,1500.1h1.6v-44.4h-1.6V1500.1z M984.9,1500h1.6v-44.4h-1.6V1500z
      M970.5,1498.3c0.5,0,1.1,0.2,1.6,0.3v-42.9h-1.6C970.5,1455.7,970.5,1498.3,970.5,1498.3z M977.6,1499.5h1.6v-43.8h-1.6V1499.5z
      M963.1,1496.6l1.6,0.4v-41.3h-1.6V1496.6z M934.1,1477c0.5,0.9,1,1.8,1.6,2.7v-24h-1.6V1477L934.1,1477z M941.4,1485.6
     c0.5,0.4,1.1,0.8,1.6,1.2v-31.2h-1.6V1485.6z M955.9,1494.1l1.6,0.6v-39h-1.6V1494.1z M948.6,1490.6l1.6,0.8v-35.8h-1.6
     C948.6,1455.7,948.6,1490.6,948.6,1490.6z"
        />

        <linearGradient
          id="SVGID_00000085961789427442159210000001492045440605982595_"
          gradientUnits="userSpaceOnUse"
          x1="931.231"
          y1="1450.2899"
          x2="1046.7001"
          y2="1450.2899"
        >
          <stop offset="0" stopColor="#2FB5B6" />
          <stop offset="0.23" stopColor="#24E4A8" />
          <stop offset="0.604" stopColor="#208FB4" />
          <stop offset="0.843" stopColor="#2BBBB2" />
          <stop offset="0.97" stopColor="#319BC1" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000085961789427442159210000001492045440605982595_)"
          d="M989,1483.7c31.9,0,57.7-15,57.7-33.5
     c-2.7-44.4-112.8-44.4-115.5,0C931.2,1468.7,957.1,1483.7,989,1483.7L989,1483.7z"
        />
        <path
          fill="#42CFD2"
          d="M989,1475.2c23.8,0,43.2-11.2,43.2-25.1c-2-33.2-84.4-33.1-86.3,0C945.8,1464,965.1,1475.2,989,1475.2z"
        />
        <path
          fill="#3593B4"
          d="M989,1427.8c23.1,0,41.8,10.5,43.1,23.7c0.8-15.1-18.7-26.2-43.2-26.4c-24.5,0.2-44,11.3-43.1,26.4
     C947.2,1438.3,965.9,1427.8,989,1427.8L989,1427.8z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#358FB4"
          d="M994.3,1438.7c-10.6,1.7-19.3,3-19.3,3c0,0.1,7.2,11.7,7.3,11.8
     c0.1,0.1,20.7,4.4,20.8,4.3c-0.1,0.3,10.4-22.3,10.3-22C1013.5,1435.8,1010,1436.3,994.3,1438.7z M1004.3,1445.7
     c-1.6,3.4-2.9,6.2-3,6.2c-0.2-0.3-3.5-5.5-4.2-6.7l-5.8-1.2c-3.2-0.7-5.8-1.2-5.8-1.2c0,0,19.9-3.2,21.3-3.3c0.2,0,0.4,0,0.4,0
     C1007.2,1439.5,1005.9,1442.3,1004.3,1445.7L1004.3,1445.7z M997.2,1452.9c0.4,0.7,0.7,1.2,0.6,1.2c-0.2,0-11.8-2.4-11.9-2.5
     c-0.1-0.1-4.3-6.9-4.3-6.9c0.5,0.1,9.9,2,12,2.4C994.6,1448.7,996.4,1451.7,997.2,1452.9L997.2,1452.9z M965.8,1454.8
     c-3,6.3-5.4,11.5-5.3,11.5c0.1,0,39.7-6.2,39.7-6.2c0.4,0-21.7-4.4-21.3-4.4c-0.8-1.2-5.7-9.2-7.4-11.9l-0.3-0.4L965.8,1454.8
     L965.8,1454.8z M973.9,1455.2l1.5,2.5c1.8,0.4,9.6,1.9,10,2.1c0.5,0-19.2,3.1-18.7,2.9c0-0.1,4.9-10.5,5-10.6
     C971.8,1451.9,971.9,1452,973.9,1455.2L973.9,1455.2z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#9AFFF5"
          d="M994.3,1436.7c-10.6,1.7-19.3,3-19.3,3c0,0.1,7.2,11.7,7.3,11.8
     c0.1,0.1,20.7,4.4,20.8,4.3c-0.1,0.3,10.4-22.3,10.3-22C1013.5,1433.8,1010,1434.3,994.3,1436.7z M1004.3,1443.7
     c-1.6,3.4-2.9,6.2-3,6.2c-0.2-0.3-3.5-5.5-4.2-6.7l-5.8-1.2c-3.2-0.7-5.8-1.2-5.8-1.2c0,0,19.9-3.2,21.3-3.3c0.2,0,0.4,0,0.4,0
     C1007.2,1437.5,1005.9,1440.3,1004.3,1443.7L1004.3,1443.7z M997.2,1450.9c0.4,0.7,0.7,1.2,0.6,1.2c-0.2,0-11.8-2.4-11.9-2.5
     c-0.1-0.1-4.3-6.9-4.3-6.9c0.5,0.1,9.9,2,12,2.4C994.6,1446.7,996.4,1449.7,997.2,1450.9L997.2,1450.9z M965.8,1452.8
     c-3,6.3-5.4,11.5-5.3,11.5c0.1,0,39.7-6.2,39.7-6.2c0.4,0-21.7-4.4-21.3-4.4c-0.8-1.2-5.7-9.2-7.4-11.9l-0.3-0.4L965.8,1452.8
     L965.8,1452.8z M973.9,1453.2l1.5,2.5c1.8,0.4,9.6,1.9,10,2.1c0.5,0-19.2,3.1-18.7,2.9c0-0.1,4.9-10.5,5-10.6
     C971.8,1449.9,971.9,1450,973.9,1453.2L973.9,1453.2z"
        />
      </g>
      <linearGradient
        id="SVGID_00000054984617042820400960000013949271382070219145_"
        gradientUnits="userSpaceOnUse"
        x1="895.405"
        y1="157.9449"
        x2="895.4052"
        y2="157.9449"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#FFBB96" />
        <stop offset="0.23" stopColor="#FFFBC9" />
        <stop offset="0.54" stopColor="#F9B673" />
        <stop offset="0.64" stopColor="#F9B876" />
        <stop offset="0.72" stopColor="#FABE81" />
        <stop offset="0.81" stopColor="#FCC993" />
        <stop offset="0.86" stopColor="#FED2A3" />
        <stop offset="0.97" stopColor="#FFC28C" />
      </linearGradient>
      <path
        fill="url(#SVGID_00000054984617042820400960000013949271382070219145_)"
        d="M888.7,1424.3v-0.4
   C888.7,1424,888.7,1424.1,888.7,1424.3z"
      />
      <g>
        <linearGradient
          id="SVGID_00000129193447825799623610000018243348145848127401_"
          gradientUnits="userSpaceOnUse"
          x1="773.8"
          y1="147.085"
          x2="887.457"
          y2="147.085"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2FB5B6" />
          <stop offset="0.23" stopColor="#24E4A8" />
          <stop offset="0.604" stopColor="#208FB4" />
          <stop offset="0.843" stopColor="#2BBBB2" />
          <stop offset="0.97" stopColor="#319BC1" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000129193447825799623610000018243348145848127401_)"
          d="M888.7,1409.7H773.2v16.8
     c0,18.5,25.9,33.5,57.7,33.5c31.9,0,57.8-15,57.8-33.5V1409.7z"
        />
        <path
          fill="#5C84A4"
          d="M848.7,1458.3l1.6-0.3v-42.5h-1.6V1458.3z M855.9,1456.6l1.6-0.4v-40.7h-1.6V1456.6L855.9,1456.6z
      M863.2,1454.3l1.6-0.7v-38.1h-1.6V1454.3L863.2,1454.3z M841.4,1459.4l1.6-0.2v-43.7h-1.6V1459.4z M877.7,1446.1
     c0.5-0.4,1.1-0.9,1.6-1.3v-29.3h-1.6V1446.1z M884.9,1438.3c0.6-0.9,1.1-1.9,1.6-2.8v-20h-1.6V1438.3z M870.4,1450.8
     c0.5-0.3,1.1-0.6,1.6-0.9v-34.5h-1.6V1450.8z M834.2,1459.8h1.6v-44.4h-1.6V1459.8z M826.9,1459.8h1.6v-44.4h-1.6V1459.8z
      M812.5,1458.1c0.5,0,1.1,0.2,1.6,0.3v-42.9h-1.6C812.5,1415.5,812.5,1458.1,812.5,1458.1z M819.6,1459.3h1.6v-43.8h-1.6V1459.3z
      M805.1,1456.4l1.6,0.4v-41.3h-1.6V1456.4z M776.1,1436.8c0.5,0.9,1,1.8,1.6,2.7v-24h-1.6V1436.8L776.1,1436.8z M783.4,1445.4
     c0.5,0.4,1.1,0.8,1.6,1.2v-31.2h-1.6V1445.4z M797.9,1453.9l1.6,0.6v-39h-1.6V1453.9z M790.6,1450.4l1.6,0.8v-35.8h-1.6V1450.4z"
        />

        <linearGradient
          id="SVGID_00000139272514195181752630000011784527231492914108_"
          gradientUnits="userSpaceOnUse"
          x1="773.239"
          y1="1410.0795"
          x2="888.713"
          y2="1410.0795"
        >
          <stop offset="0" stopColor="#2FB5B6" />
          <stop offset="0.23" stopColor="#24E4A8" />
          <stop offset="0.604" stopColor="#208FB4" />
          <stop offset="0.843" stopColor="#2BBBB2" />
          <stop offset="0.97" stopColor="#319BC1" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000139272514195181752630000011784527231492914108_)"
          d="M831,1443.5c31.9,0,57.7-15,57.7-33.5
     c-2.7-44.4-112.8-44.4-115.5,0C773.2,1428.5,799.1,1443.5,831,1443.5z"
        />
        <path
          fill="#42CFD2"
          d="M831,1435c23.8,0,43.2-11.2,43.2-25.1c-2-33.2-84.4-33.2-86.4,0C787.8,1423.8,807.1,1435,831,1435z"
        />
        <path
          fill="#3593B4"
          d="M831,1387.6c23.1,0,41.8,10.5,43.1,23.7c0.8-15.1-18.7-26.2-43.2-26.4c-24.5,0.2-44,11.3-43.1,26.4
     C789.2,1398.1,807.9,1387.6,831,1387.6z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#358FB4"
          d="M836.3,1398.5c-10.6,1.6-19.3,3-19.3,3c0,0.1,7.2,11.7,7.3,11.8
     c0.1,0.1,20.7,4.4,20.8,4.3c-0.2,0.4,10.4-22.3,10.3-22C855.5,1395.5,852,1396,836.3,1398.5z M846.3,1405.5c-1.6,3.4-2.9,6.2-3,6.2
     c-0.2-0.3-3.5-5.5-4.2-6.7l-5.8-1.2c-3.2-0.7-5.8-1.2-5.8-1.2c0.2,0,20.3-3.3,21.7-3.3C849.2,1399.2,847.9,1402.1,846.3,1405.5
     L846.3,1405.5z M839.2,1412.7c0.4,0.7,0.7,1.2,0.6,1.2c-0.2,0-11.8-2.4-11.9-2.5c-0.1-0.1-4.3-6.9-4.3-6.9c0.5,0,9.9,2,12,2.4
     C836.6,1408.5,838.4,1411.5,839.2,1412.7L839.2,1412.7z M807.8,1414.6c-3,6.3-5.4,11.5-5.3,11.5c0.1,0,39.7-6.2,39.7-6.2
     c0.4,0-21.6-4.4-21.3-4.4c-0.1,0-1.7-2.6-3.6-5.8c-2.3-3.7-3.5-5.6-4.1-6.6L807.8,1414.6L807.8,1414.6z M815.9,1414.9l1.5,2.5
     c1.8,0.4,9.6,1.9,10,2.1c0.5,0-19.2,3.1-18.7,2.9c0-0.1,4.9-10.5,5-10.6C813.8,1411.7,813.9,1411.8,815.9,1414.9L815.9,1414.9z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#9AFFF5"
          d="M836.3,1396.5c-10.6,1.6-19.3,3-19.3,3c0,0.1,7.2,11.7,7.3,11.8
     c0.1,0.1,20.7,4.4,20.8,4.3c-0.2,0.4,10.4-22.3,10.3-22C855.5,1393.5,852,1394,836.3,1396.5z M846.3,1403.5c-1.6,3.4-2.9,6.2-3,6.2
     c-0.2-0.3-3.5-5.5-4.2-6.7l-5.8-1.2c-3.2-0.7-5.8-1.2-5.8-1.2c0.2,0,20.3-3.3,21.7-3.3C849.2,1397.2,847.9,1400.1,846.3,1403.5
     L846.3,1403.5z M839.2,1410.7c0.4,0.7,0.7,1.2,0.6,1.2c-0.2,0-11.8-2.4-11.9-2.5c-0.1-0.1-4.3-6.9-4.3-6.9c0.5,0,9.9,2,12,2.4
     C836.6,1406.5,838.4,1409.5,839.2,1410.7L839.2,1410.7z M807.8,1412.6c-3,6.3-5.4,11.5-5.3,11.5c0.1,0,39.7-6.2,39.7-6.2
     c0.4,0-21.7-4.4-21.3-4.4c-0.1,0-1.7-2.6-3.6-5.8c-2.3-3.7-3.5-5.6-4.1-6.6L807.8,1412.6L807.8,1412.6z M815.9,1412.9l1.5,2.5
     c1.8,0.4,9.6,2,10,2.1c0.5,0-19.2,3.1-18.7,2.9c0-0.1,4.9-10.5,5-10.6C813.8,1409.7,813.9,1409.8,815.9,1412.9L815.9,1412.9z"
        />
      </g>
      <path
        fill="#FFFFFF"
        d="M947.9,937.8l3.7-2.2c1.3-0.7,2.2-0.9,2.8-0.6c0.6,0.3,0.9,1.2,0.9,2.6c0.1,1.9-0.3,3.8-1.6,5.2v0.1
   c2-0.4,1.9,2.5,1.8,4.3c0,5.1-3.9,6.5-7.7,8.7L947.9,937.8L947.9,937.8z M951.4,943.2c1.1-0.6,1.5-1.5,1.5-2.8c0-0.6,0.1-2-0.3-2.3
   c-0.4-0.4-1.7,0.6-2.1,0.8v4.8L951.4,943.2L951.4,943.2z M951.8,951.1c0.4-0.3,0.8-0.6,1-1c0.4-0.7,0.3-2.3,0.3-3.2
   c0-0.8-0.1-1.3-0.4-1.5c-0.4-0.4-1.8,0.6-2.3,0.8v5.6L951.8,951.1L951.8,951.1z M960.4,930.5l6.8-3.9v2.6l-4.3,2.5v4.8l3.4-2v2.6
   l-3.4,2v5.6l4.3-2.5v2.6l-6.8,3.9C960.4,948.8,960.4,930.5,960.4,930.5z M973.9,925.3l-2.6,1.5v-2.6l7.7-4.4v2.6l-2.6,1.5v15.6
   l-2.5,1.4V925.3z M985.7,918.5l-2.6,1.5v-2.6l7.7-4.4v2.6l-2.6,1.5v15.6l-2.5,1.4V918.5z M995.4,910.4l2.5-1.4v18.2l-2.5,1.4V910.4z
    M1003.1,905.9l3.1-1.8l2.4,9.5l0,0v-10.9l2.2-1.3v18.2l-2.5,1.5l-3-11.6l0,0v13.3l-2.2,1.3V905.9z M1019.6,914.8
   c-1.2,0.7-2.1,0.8-2.8,0.4c-0.6-0.4-0.9-1.4-0.9-2.9v-9.6c0-2.9,1.2-5.3,3.7-6.7c1.2-0.7,2.1-0.8,2.8-0.4c1,0.5,1,3,1,4.4l-2.3,1.4
   v-1.7c0-1.2-0.4-1.5-1.3-1.1c-0.9,0.5-1.3,1.3-1.3,2.5v10c0,1.2,0.4,1.5,1.3,1c0.9-0.5,1.3-1.3,1.3-2.5v-3.6l-1.2,0.7v-2.6l3.6-2.1
   v6C1023.3,911,1022.1,913.4,1019.6,914.8z"
      />
      <g id="game-light">
        <linearGradient
          id="SVGID_00000166660299403033444450000014431535626848073365_"
          gradientUnits="userSpaceOnUse"
          x1="416.292"
          y1="1256.7454"
          x2="314.085"
          y2="1533.7814"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2AF6FF" />
          <stop offset="2.000000e-02" stopColor="#29EEF7" />
          <stop offset="0.13" stopColor="#1FB7BE" />
          <stop offset="0.25" stopColor="#17868B" />
          <stop offset="0.37" stopColor="#105D60" />
          <stop offset="0.49" stopColor="#0A3B3E" />
          <stop offset="0.62" stopColor="#062123" />
          <stop offset="0.74" stopColor="#030F0F" />
          <stop offset="0.87" stopColor="#010404" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          opacity="0.5"
          fill="url(#SVGID_00000166660299403033444450000014431535626848073365_)"
          enableBackground="new    "
          d="
     M411.5,121.9l-102.7,60.2L149.2,413.3l2.8,102.2l526.4-298.8l-6.5-105.5L411.5,121.9L411.5,121.9z"
        />

        <linearGradient
          id="SVGID_00000067956841086328104500000009342641600521898410_"
          gradientUnits="userSpaceOnUse"
          x1="460.5513"
          y1="1273.0737"
          x2="358.3433"
          y2="1550.1097"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2AF6FF" />
          <stop offset="2.000000e-02" stopColor="#29EEF7" />
          <stop offset="0.13" stopColor="#1FB7BE" />
          <stop offset="0.25" stopColor="#17868B" />
          <stop offset="0.37" stopColor="#105D60" />
          <stop offset="0.49" stopColor="#0A3B3E" />
          <stop offset="0.62" stopColor="#062123" />
          <stop offset="0.74" stopColor="#030F0F" />
          <stop offset="0.87" stopColor="#010404" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          opacity="0.1"
          fill="url(#SVGID_00000067956841086328104500000009342641600521898410_)"
          enableBackground="new    "
          d="
     M390.4,132.7l-7.6,4.9l161.4,61.4l-66.5,39.7l-120.9-85.1l-12.8,6.6l81.2,108.2l-59.2,31.6l-30.4-134.8l-15.8,9.3l-64.6,188.2
     l86.9-50.2l5.2,7.1l-2.9,89.5l21.6-16.7v-92.5l59.2-31.6l25.6-14.4l1.4,98.2l25.5-16v-97.6l66.5-39.6l13.4-4.5l2.3,98l26.9-17.2
     V174.4l41.6-20.9L390.4,132.7L390.4,132.7z"
        />
      </g>
      <g id="renting-float">
        <path
          fill="#42E8E0"
          d="M644.3,345.2c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C651.1,344.5,647.7,345.2,644.3,345.2L644.3,345.2z
      M635.4,342.2c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L635.4,342.2L635.4,342.2z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M708.7,297.2V280l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6l-35.5,21
     l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0
     l49.5-29c2.9-1.7,4.3-3.9,4.3-6C708.7,297.4,708.7,297.3,708.7,297.2L708.7,297.2z"
        />

        <linearGradient
          id="SVGID_00000070825070211407578420000016295640924344346526_"
          gradientUnits="userSpaceOnUse"
          x1="592.2123"
          y1="1333.1692"
          x2="695.0739"
          y2="1274.5724"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000070825070211407578420000016295640924344346526_)"
          d="M708.7,281.9v-11.4l-3.1-1.8
     c-0.9,5.4-7.1,8.9-12.3,9.6l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v11.7
     c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C708.7,282.1,708.7,282,708.7,281.9
     L708.7,281.9z"
        />

        <linearGradient
          id="SVGID_00000178201308030777805940000009184156577522455466_"
          gradientUnits="userSpaceOnUse"
          x1="579.9136"
          y1="1311.4838"
          x2="708.7332"
          y2="1311.4838"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000178201308030777805940000009184156577522455466_)"
          d="M633.8,305.7l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C649,309,639.6,309,633.8,305.7L633.8,305.7z"
        />
      </g>
      <g id="burn-float">
        <path
          fill="#42E8E0"
          d="M202.5,596.8c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C209.3,596,205.9,596.8,202.5,596.8z M193.6,593.7
     c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L193.6,593.7L193.6,593.7z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M266.9,548.7v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6
     l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29
     c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C266.9,548.9,266.9,548.8,266.9,548.7L266.9,548.7z"
        />

        <linearGradient
          id="SVGID_00000108298012254721985150000005529980359116865426_"
          gradientUnits="userSpaceOnUse"
          x1="150.4112"
          y1="1081.6534"
          x2="253.2727"
          y2="1023.0566"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000108298012254721985150000005529980359116865426_)"
          d="M266.9,533.4V522l-3.1-1.8
     c-0.9,5.4-7.1,8.9-12.3,9.6L216,551l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v11.7
     c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C266.9,533.6,266.9,533.5,266.9,533.4
     L266.9,533.4z"
        />

        <linearGradient
          id="SVGID_00000069382514832583363510000002934638667482718601_"
          gradientUnits="userSpaceOnUse"
          x1="138.1124"
          y1="1059.9673"
          x2="266.9319"
          y2="1059.9673"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000069382514832583363510000002934638667482718601_)"
          d="M192,557.2l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C207.2,560.6,197.8,560.6,192,557.2L192,557.2z"
        />
      </g>
      <g id="quests-loans">
        <path
          fill="#42E8E0"
          d="M534.3,408.5c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C541,407.7,537.6,408.5,534.3,408.5L534.3,408.5z
      M525.4,405.4c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L525.4,405.4z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M598.7,360.4v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6
     l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29
     c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C598.7,360.6,598.7,360.5,598.7,360.4L598.7,360.4z"
        />

        <linearGradient
          id="SVGID_00000103967683064315026920000006455233291856701591_"
          gradientUnits="userSpaceOnUse"
          x1="482.1633"
          y1="1269.969"
          x2="585.0236"
          y2="1211.3715"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000103967683064315026920000006455233291856701591_)"
          d="M598.7,345.1v-11.4l-3.1-1.8
     c-0.9,5.4-7.1,8.9-12.3,9.6l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v11.7
     c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C598.7,345.3,598.7,345.2,598.7,345.1z"
        />

        <linearGradient
          id="SVGID_00000144306494092826665850000011598495667772853659_"
          gradientUnits="userSpaceOnUse"
          x1="469.864"
          y1="1248.2828"
          x2="598.6841"
          y2="1248.2828"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000144306494092826665850000011598495667772853659_)"
          d="M523.7,368.9l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C539,372.2,529.6,372.2,523.7,368.9z"
        />
      </g>
      <g id="loans-float">
        <path
          fill="#42E8E0"
          d="M424.5,470.1c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C431.3,469.4,427.9,470.1,424.5,470.1L424.5,470.1z
      M415.6,467.1c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L415.6,467.1L415.6,467.1z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M488.9,422v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6l-35.5,21
     l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0
     l49.5-29c2.9-1.7,4.3-3.9,4.3-6C488.9,422.2,488.9,422.1,488.9,422L488.9,422z"
        />

        <linearGradient
          id="SVGID_00000008148492696654356580000007431944435463653538_"
          gradientUnits="userSpaceOnUse"
          x1="372.429"
          y1="1208.3167"
          x2="475.2894"
          y2="1149.72"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000008148492696654356580000007431944435463653538_)"
          d="M488.9,406.8v-11.4l-3.1-1.8
     c-0.9,5.4-7.1,8.9-12.3,9.6l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v11.7
     c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C488.9,406.9,488.9,406.8,488.9,406.8
     L488.9,406.8z"
        />

        <linearGradient
          id="SVGID_00000088854750612247470580000013547274165317000835_"
          gradientUnits="userSpaceOnUse"
          x1="360.1301"
          y1="1186.6311"
          x2="488.9494"
          y2="1186.6311"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000088854750612247470580000013547274165317000835_)"
          d="M414,430.5l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C429.3,433.9,419.8,433.9,414,430.5L414,430.5z"
        />
      </g>
      <g id="battles-float">
        <path
          fill="#42E8E0"
          d="M314.5,534.7c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C321.3,534,317.9,534.7,314.5,534.7z M305.6,531.7
     c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L305.6,531.7L305.6,531.7z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M378.9,486.6v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6
     l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29
     c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C378.9,486.8,378.9,486.7,378.9,486.6L378.9,486.6z"
        />

        <linearGradient
          id="SVGID_00000121978912413030588050000013997262748696336000_"
          gradientUnits="userSpaceOnUse"
          x1="262.3931"
          y1="1143.6942"
          x2="365.2546"
          y2="1085.0974"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000121978912413030588050000013997262748696336000_)"
          d="M378.9,471.4V460l-3.1-1.8
     c-0.9,5.4-7.1,8.9-12.3,9.6l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v11.7
     c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C378.9,471.6,378.9,471.5,378.9,471.4
     L378.9,471.4z"
        />

        <linearGradient
          id="SVGID_00000137109481818428193010000017648706416497008004_"
          gradientUnits="userSpaceOnUse"
          x1="250.0944"
          y1="1122.0081"
          x2="378.9139"
          y2="1122.0081"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000137109481818428193010000017648706416497008004_)"
          d="M304,495.1l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C319.2,498.5,309.8,498.5,304,495.1L304,495.1z"
        />
      </g>
      <g id="nft-light">
        <linearGradient
          id="SVGID_00000056404196762872060060000000060095200605674930_"
          gradientUnits="userSpaceOnUse"
          x1="281.0815"
          y1="718.668"
          x2="281.0815"
          y2="1087.3199"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2AF6FF" />
          <stop offset="2.000000e-02" stopColor="#29EEF7" />
          <stop offset="0.13" stopColor="#1FB7BE" />
          <stop offset="0.25" stopColor="#17868B" />
          <stop offset="0.37" stopColor="#105D60" />
          <stop offset="0.49" stopColor="#0A3B3E" />
          <stop offset="0.62" stopColor="#062123" />
          <stop offset="0.74" stopColor="#030F0F" />
          <stop offset="0.87" stopColor="#010404" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          opacity="0.5"
          fill="url(#SVGID_00000056404196762872060060000000060095200605674930_)"
          enableBackground="new    "
          d="
     M295.7,687.4L193,747.6l-66,163l4.6,103.1l303.4-172.4l-2.8-104.1L295.7,687.4z"
        />

        <linearGradient
          id="SVGID_00000065042038770040631860000004410489240874594448_"
          gradientUnits="userSpaceOnUse"
          x1="289.245"
          y1="718.669"
          x2="289.245"
          y2="1087.3199"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#2AF6FF" />
          <stop offset="2.000000e-02" stopColor="#29EEF7" />
          <stop offset="0.13" stopColor="#1FB7BE" />
          <stop offset="0.25" stopColor="#17868B" />
          <stop offset="0.37" stopColor="#105D60" />
          <stop offset="0.49" stopColor="#0A3B3E" />
          <stop offset="0.62" stopColor="#062123" />
          <stop offset="0.74" stopColor="#030F0F" />
          <stop offset="0.87" stopColor="#010404" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <path
          opacity="0.1"
          fill="url(#SVGID_00000065042038770040631860000004410489240874594448_)"
          enableBackground="new    "
          d="
     M262.3,706.8l55.7,97.9l-19,11.6l-51.6-100.4l-10.6,5.4l26.9,114.3l-23.9,13.6l-18.9-118.2l-7.5,4.3l-32,143.6l33.5-10.7l1.9,96.2
     l23.1-12.5V849.3l78.2-44.6l2,102.4l32.4-23l-4.7-97.4l49.4-30.1l-116.4-60.1l-5.1,3l96.8,72.2l-24.7,15.1L268.9,703L262.3,706.8z"
        />
      </g>
      <g>
        <g opacity="0.41">
          <linearGradient
            id="SVGID_00000041979195427601025140000017148798292621491620_"
            gradientUnits="userSpaceOnUse"
            x1="225.2339"
            y1="870.6042"
            x2="263.0581"
            y2="805.09"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#508BFF" />
            <stop offset="1" stopColor="#50FFFF" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000041979195427601025140000017148798292621491620_)"
            d="M190.8,748.5l8-4.6l6.2,24.5l0.1-0.1v-28
       l5.7-3.3v46.8l-6.5,3.8l-7.6-29.8l-0.1,0.1V792l-5.7,3.3V748.5z M218.4,732.5l16.9-9.7v6.7l-10.5,6.1v13l8.2-4.8v6.7l-8.2,4.8
       v20.4l-6.4,3.7V732.5L218.4,732.5z M246.8,722.8l-6.7,3.8V720l19.7-11.4v6.7l-6.7,3.8v40.1l-6.4,3.7V722.8L246.8,722.8z
        M268.4,710.7l-2.1,1.2v-7.1l6.1-3.5v6.4l-3.5,10.8l-3,1.7L268.4,710.7z M288.4,739.6c-3.1,1.8-5.4,2.1-7,1
       c-1.6-1.1-2.4-3.6-2.4-7.4v-2.7l6-3.5c0.1,2.6-0.8,8.2,3.3,5.9c3.7-1.8,4.2-8.1,2.1-11.1c-0.8-1.1-2.2-2.1-4.3-2.9
       c-5.2-2.4-7-4.8-7.1-10.5c0-7.2,3.3-13.5,9.5-17.1c3.1-1.8,5.4-2.1,6.9-0.9c1.6,1.1,2.4,3.5,2.4,7.3v1.9l-6,3.5
       c0-1.4,0.2-4.9-0.8-5.4c-0.5-0.4-1.3-0.4-2.4,0.2c-3.3,1.5-4.2,7.5-2,10.4c0.8,1,2.3,2,4.3,2.8c2.7,1.1,4.5,2.5,5.5,4.1
       c1,1.6,1.5,3.9,1.5,6.8C298.1,729.5,294.9,735.9,288.4,739.6L288.4,739.6z"
          />
        </g>
        <path
          fill="#FFFFFF"
          d="M193.4,746.6l8-4.6l6.2,24.5l0.1-0.1v-28l5.7-3.3v46.8l-6.5,3.8l-7.6-29.8l-0.1,0.1v34.2l-5.7,3.3
     C193.4,793.4,193.4,746.6,193.4,746.6z M221.1,730.7l16.9-9.7v6.7l-10.5,6.1v13l8.2-4.8v6.7l-8.2,4.8v20.4l-6.4,3.7V730.7
     L221.1,730.7z M249.4,721l-6.7,3.8v-6.7l19.7-11.4v6.7l-6.7,3.8v40.1l-6.4,3.7V721z M271.1,708.9l-2.1,1.2V703l6.1-3.5v6.4
     l-3.5,10.8l-3,1.7L271.1,708.9L271.1,708.9z M291.1,737.7c-3.1,1.8-5.4,2.1-7,1c-1.6-1.1-2.4-3.6-2.4-7.4v-2.7l6-3.5
     c0.1,2.6-0.8,8.2,3.3,5.9c3.7-1.8,4.2-8.1,2.1-11.1c-0.8-1.1-2.2-2.1-4.3-2.9c-5.2-2.4-7-4.8-7.1-10.5c0-7.2,3.3-13.5,9.5-17.1
     c3.1-1.8,5.4-2.1,6.9-0.9c1.6,1.1,2.4,3.5,2.4,7.3v1.9l-6,3.5c0-1.4,0.2-4.9-0.8-5.4c-0.5-0.4-1.3-0.4-2.4,0.2
     c-3.3,1.5-4.2,7.5-2,10.4c0.8,1,2.3,2,4.3,2.8c2.7,1.1,4.5,2.5,5.5,4.1c1,1.6,1.5,3.9,1.5,6.8C300.7,727.7,297.5,734,291.1,737.7
     L291.1,737.7z"
        />
      </g>
      <g>
        <g opacity="0.41">
          <linearGradient
            id="SVGID_00000144301571699880303160000016708830911340835749_"
            gradientUnits="userSpaceOnUse"
            x1="835.2996"
            y1="1222.6215"
            x2="873.1703"
            y2="1157.0264"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#508BFF" />
            <stop offset="1" stopColor="#50FFFF" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000144301571699880303160000016708830911340835749_)"
            d="M751.1,472.8c-3.1,1.8-5.4,2.1-7,1
       c-1.6-1.1-2.4-3.5-2.4-7.1v-25.2c0-7.1,3.2-13.4,9.4-16.9c3.1-1.8,5.4-2.1,7-1c1.6,1.1,2.4,3.4,2.4,7.1v5l-6,3.5v-5.4
       c0-2.9-1.1-3.7-3.2-2.5c-2.1,1.2-3.2,3.3-3.2,6.2v26.2c0,2.9,1.1,3.7,3.2,2.4c2.1-1.2,3.2-3.3,3.2-6.1v-7.2l6-3.5v6.6
       C760.5,462.9,757.3,469.2,751.1,472.8L751.1,472.8z M776.5,458.1c-6.4,3.7-9.7,1-9.7-6.2c0,0,0-24.6,0-24.6
       c0-3.7,0.8-7.1,2.5-10.1c3.9-7.2,17.1-15.3,16.9-1c0,0,0,24.6,0,24.6C786.2,448,782.8,454.5,776.5,458.1z M776.5,451.4
       c2.2-1.3,3.3-3.4,3.3-6.5v-25.6c0-3.1-1.1-4-3.3-2.7s-3.3,3.4-3.3,6.5v25.6C773.2,451.8,774.3,452.7,776.5,451.4z M793.4,400.8
       l8-4.6l6.2,24.5l0.1-0.1v-28l5.7-3.3v46.8l-6.5,3.8l-7.6-29.8l-0.1,0.1v34.2l-5.7,3.3C793.4,447.7,793.4,400.8,793.4,400.8z
        M826,388.7l-6.7,3.8v-6.7l19.7-11.4v6.7l-6.7,3.8v40.1l-6.4,3.7L826,388.7L826,388.7z M845,371l9.4-5.5c3.3-1.9,5.7-2.4,7.2-1.5
       c2.4,1.2,2.3,6.2,2.3,9.7c0,4.9-1.4,8.7-4.2,11.6v0.1c1.5-0.4,2.6,0.1,3.2,1.4c1.5,2.5,0.9,11,1,14.3c0.1,2.2-0.1,3.5,0.7,5.3
       l-6.5,3.7c-0.7-2-0.5-2.6-0.6-5.4c0,0,0-8.6,0-8.6c0-2.1-0.3-3.5-0.9-3.9c-0.9-1.1-4,1.1-5.3,1.8v20.1l-6.4,3.7L845,371L845,371z
        M853.7,386.1c1.3-0.7,2.2-1.7,2.8-2.8c1.2-1.8,1-5.7,1-8c0-1.7-0.3-2.8-0.8-3.2c-0.5-0.5-1.3-0.4-2.4,0.3l-2.9,1.7v13.4
       L853.7,386.1z M876.2,353l8.6-5l6.6,43l-6.4,3.7l-1.2-8.6v0.1l-7.2,4.2l-1.2,9.8l-5.9,3.4L876.2,353z M883.1,380.3l-2.8-21.5
       l-0.1,0.1l-2.8,24.8L883.1,380.3L883.1,380.3z M906.3,383.1c-3.1,1.8-5.4,2.1-7,1c-1.6-1.1-2.4-3.5-2.4-7.1v-25.2
       c0-7.1,3.2-13.4,9.4-16.9c3.1-1.8,5.4-2.1,7-1c1.6,1.1,2.4,3.4,2.4,7.1v5l-6,3.5v-5.4c0-2.9-1.1-3.7-3.2-2.5
       c-2.1,1.2-3.2,3.3-3.2,6.2v26.2c0,2.9,1.1,3.7,3.2,2.4c2.1-1.2,3.2-3.3,3.2-6.1v-7.2l6-3.5v6.6
       C915.7,373.3,912.5,379.6,906.3,383.1L906.3,383.1z M927.4,330.2l-6.7,3.8v-6.7l19.7-11.4v6.7l-6.7,3.8v40.1l-6.4,3.7L927.4,330.2
       L927.4,330.2z M954.7,355.2c-3.1,1.8-5.4,2.1-7,1c-1.6-1.1-2.4-3.6-2.4-7.4v-2.7l6-3.5c0.1,2.6-0.8,8.2,3.3,5.9
       c3.7-1.8,4.2-8.1,2.1-11.1c-0.8-1.1-2.2-2.1-4.3-2.9c-5.2-2.4-7-4.8-7.1-10.5c0-7.2,3.3-13.5,9.5-17.1c3.1-1.8,5.3-2.1,6.9-0.9
       c1.6,1.1,2.4,3.5,2.4,7.3v1.9l-6,3.5c0-1.4,0.2-4.9-0.8-5.4c-0.5-0.4-1.3-0.4-2.4,0.2c-3.3,1.5-4.2,7.5-2,10.4
       c0.8,1,2.3,2,4.3,2.8c2.7,1.1,4.5,2.5,5.5,4.1c1,1.6,1.5,3.9,1.5,6.8C964.3,345.1,961.1,351.5,954.7,355.2L954.7,355.2z"
          />
        </g>
        <path
          fill="#FFFFFF"
          d="M754.3,472.7c-3.1,1.8-5.4,2.1-7,1c-1.6-1.1-2.4-3.5-2.4-7.1v-25.2c0-7.1,3.2-13.4,9.4-16.9
     c3.1-1.8,5.4-2.1,7-1c1.6,1.1,2.4,3.4,2.4,7.1v5l-6,3.5v-5.4c0-2.9-1.1-3.7-3.2-2.5c-2.1,1.2-3.2,3.3-3.2,6.2v26.2
     c0,2.9,1.1,3.7,3.2,2.4c2.1-1.2,3.2-3.3,3.2-6.1v-7.2l6-3.5v6.6C763.7,462.9,760.5,469.1,754.3,472.7L754.3,472.7z M779.7,458
     c-6.4,3.7-9.7,1-9.7-6.2c0,0,0-24.6,0-24.6c0-3.7,0.8-7.1,2.5-10.1c3.9-7.2,17.1-15.3,16.9-1c0,0,0,24.6,0,24.6
     C789.4,447.9,786.1,454.4,779.7,458z M779.7,451.3c2.2-1.3,3.3-3.4,3.3-6.5v-25.6c0-3.1-1.1-4-3.3-2.7c-2.2,1.3-3.3,3.4-3.3,6.5
     v25.6C776.4,451.7,777.5,452.6,779.7,451.3z M796.6,400.7l8-4.6l6.2,24.5l0.1-0.1v-28l5.7-3.3V436l-6.5,3.8l-7.6-29.8l-0.1,0.1
     v34.2l-5.7,3.3V400.7L796.6,400.7z M829.2,388.6l-6.7,3.8v-6.7l19.7-11.4v6.7l-6.7,3.8v40.1l-6.4,3.7L829.2,388.6L829.2,388.6z
      M848.3,370.9l9.4-5.5c3.3-1.9,5.7-2.4,7.2-1.5c2.4,1.2,2.3,6.2,2.3,9.7c0,4.9-1.4,8.7-4.2,11.6v0.1c1.5-0.4,2.6,0.1,3.2,1.4
     c1.5,2.5,0.9,11,1,14.3c0.1,2.2-0.1,3.5,0.7,5.3l-6.5,3.7c-0.7-2-0.5-2.6-0.6-5.4c0,0,0-8.6,0-8.6c0-2.1-0.3-3.5-0.9-3.9
     c-0.9-1.1-4,1.1-5.3,1.8v20.1l-6.4,3.7L848.3,370.9L848.3,370.9z M856.9,386c1.3-0.7,2.2-1.7,2.8-2.8c1.2-1.8,1-5.7,1-8
     c0-1.7-0.3-2.8-0.8-3.2c-0.5-0.5-1.3-0.4-2.4,0.3l-2.9,1.7v13.4L856.9,386L856.9,386z M879.5,352.9l8.6-5l6.6,43l-6.4,3.7l-1.2-8.6
     v0.1l-7.2,4.2l-1.2,9.8l-5.9,3.4L879.5,352.9L879.5,352.9z M886.4,380.2l-2.8-21.5l-0.1,0.1l-2.8,24.8L886.4,380.2z M909.5,383.1
     c-3.1,1.8-5.4,2.1-7,1c-1.6-1.1-2.4-3.5-2.4-7.1v-25.2c0-7.2,3.2-13.4,9.4-16.9c3.1-1.8,5.4-2.1,7-1c1.6,1.1,2.4,3.4,2.4,7.1v5
     l-6,3.5V344c0-2.9-1.1-3.7-3.2-2.5c-2.1,1.2-3.2,3.3-3.2,6.2v26.2c0,2.9,1.1,3.7,3.2,2.4c2.1-1.2,3.2-3.3,3.2-6.1V363l6-3.5v6.6
     C918.9,373.2,915.7,379.5,909.5,383.1L909.5,383.1z M930.6,330.1l-6.7,3.8v-6.7l19.7-11.4v6.7l-6.7,3.8v40.1l-6.4,3.7V330.1z
      M957.9,355.1c-3.1,1.8-5.4,2.1-7,1c-1.6-1.1-2.4-3.6-2.4-7.4v-2.7l6-3.5c0.1,2.6-0.8,8.2,3.3,5.9c3.7-1.8,4.2-8.1,2.1-11.1
     c-0.8-1.1-2.2-2.1-4.3-2.9c-5.2-2.4-7-4.8-7.1-10.5c0-7.2,3.3-13.5,9.5-17.1c3.1-1.8,5.3-2.1,6.9-0.9c1.6,1.1,2.4,3.5,2.4,7.3v1.9
     l-6,3.5c0-1.4,0.2-4.9-0.8-5.4c-0.5-0.4-1.3-0.4-2.4,0.2c-3.3,1.5-4.2,7.5-2,10.4c0.8,1,2.3,2,4.3,2.8c2.7,1.1,4.5,2.5,5.5,4.1
     s1.5,3.9,1.5,6.8C967.6,345.1,964.3,351.4,957.9,355.1L957.9,355.1z"
        />
      </g>
      <g>
        <g opacity="0.41">
          <linearGradient
            id="SVGID_00000018203002699316189870000010089437087912606606_"
            gradientUnits="userSpaceOnUse"
            x1="340.6426"
            y1="1435.3721"
            x2="378.4678"
            y2="1369.8577"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#508BFF" />
            <stop offset="1" stopColor="#50FFFF" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000018203002699316189870000010089437087912606606_)"
            d="M314.4,226.5c-3.1,1.8-5.4,2.1-7.1,1.1
       c-1.6-1.1-2.4-3.6-2.4-7.4v-24.6c0-7.3,3.2-13.6,9.5-17.3c3.1-1.8,5.4-2.1,7.1-1c2.8,1.6,2.5,7.5,2.4,11.3l-6,3.5v-4.5
       c0-3.1-1.1-4-3.3-2.7c-2.2,1.3-3.3,3.4-3.3,6.5V217c0,3,1.1,3.9,3.3,2.6c2.2-1.3,3.3-3.4,3.3-6.5v-9.2l-3.2,1.8v-6.7l9.2-5.3v15.3
       C323.9,216.5,320.7,222.8,314.4,226.5L314.4,226.5z M335.8,166.6l8.6-5l6.6,43l-6.4,3.7l-1.2-8.6v0.1l-7.2,4.2l-1.2,9.8l-5.9,3.4
       L335.8,166.6L335.8,166.6z M342.7,193.9l-2.8-21.5l-0.1,0.1l-2.8,24.8L342.7,193.9z M357,154.3l9.1-5.3l4.1,31.2l0.1-0.1l4.1-35.9
       l9.1-5.3v46.8l-6,3.5v-35.5l-0.1,0.1l-4.6,38.1l-5.3,3.1l-4.6-32.8l-0.1,0.1V198l-5.6,3.2L357,154.3L357,154.3z M391.1,134.7
       l17.4-10v6.7l-11,6.4v12.4l8.7-5.1v6.7l-8.7,5.1v14.4l11-6.4v6.7l-17.4,10V134.7z"
          />
        </g>
        <path
          fill="#FFFFFF"
          d="M210.1,606.1l2.5-1.4l15.8,9.1l-2.5,1.4L210.1,606.1z M216.6,602.3l3.1-1.8l11.9,4.1l0,0l-9.4-5.5l2.2-1.3
     l15.8,9.1l-2.5,1.5l-14.5-4.9l0,0l11.5,6.6l-2.2,1.3L216.6,602.3L216.6,602.3z M234.9,599.5l5-2.9l2.3,1.3l-5,2.9L234.9,599.5
     L234.9,599.5z M256.4,597.8c-2.5,1.4-5.2,1.3-7.7-0.2c0,0-8.3-4.8-8.3-4.8c-1.3-0.7-1.9-1.5-2-2.2c0-2,3.7-3.3,5.5-3.2
     c1.8,0,3.7,1,5.2,1.9l-2.3,1.4l-1.5-0.9c-1-0.6-2-0.7-2.8-0.2c-0.9,0.5-0.8,1,0.3,1.6l8.6,5c1,0.6,2,0.6,2.8,0.1s0.8-1-0.2-1.6
     l-3.1-1.8l-1.2,0.7l-2.3-1.3l3.6-2.1l5.2,3c1.3,0.7,1.9,1.5,2,2.2C258.1,596.4,257.6,597.1,256.4,597.8L256.4,597.8z M249.8,583.1
     l3.4-1.9l18.3,7.6l-2.5,1.4l-3.6-1.5l0,0l-2.8,1.6l2.6,2l-2.3,1.3L249.8,583.1L249.8,583.1z M263.1,587.6l-8.9-3.9l0,0l6.7,5.1
     L263.1,587.6L263.1,587.6z M259.2,577.7l3.5-2l12.9,5.6l0,0l-9.7-7.4l3.5-2l15.8,9.1l-2.3,1.4l-11.9-6.9l0,0l10.1,7.9l-2.1,1.2
     l-13.7-5.9l0,0l11.9,6.9l-2.2,1.2L259.2,577.7L259.2,577.7z M273.6,569.4l6.8-3.9l2.3,1.3l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3l-3.4,2
     l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9L273.6,569.4L273.6,569.4z M240.7,637.9c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.4c1.2,0.8,2.6,1.6,3.9,0.8
     c1.9-1.1-1.5-2.3-2.5-2.4c-3.4-0.4-8.2,0.6-11.2-1.3c-1.2-0.7-1.9-1.5-1.9-2.2c-0.1-0.8,0.5-1.5,1.7-2.2c2.7-1.6,5.7-1.1,8.2,0.6
     l-2.3,1.4c-0.6-0.4-1.6-1-2.3-1c-1.2-0.1-2.9,1-1,1.9c1.8,0.9,3.1,0.8,5.5,0.7c3.4-0.1,5.2-0.1,7.8,1.3c1.3,0.7,2,1.5,2,2.3
     C242.5,636.4,241.9,637.2,240.7,637.9L240.7,637.9z M232.1,624.3c2-1.1,5.1-3.4,7.4-3.1c1.8-0.1,3.8,1.1,5.4,2
     c3.5,2.1,1.8,3.6-1,5.1l6.4,3.7l-2.5,1.4L232.1,624.3z M242.9,626.3c0.4-0.2,0.6-0.5,0.6-0.7c0-0.6-2.2-1.6-2.7-1.9
     c-1-0.6-1.8-0.7-2.7-0.2l-1.2,0.7l4.8,2.8L242.9,626.3L242.9,626.3z M243.1,618l6.8-3.9l2.3,1.3l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3
     l-3.4,2l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9L243.1,618L243.1,618z M253.5,612l3.1-1.8l11.9,4.1l0,0l-9.4-5.5l2.2-1.3l15.8,9.1
     l-2.5,1.5l-14.5-4.9l0,0l11.5,6.6l-2.2,1.3L253.5,612L253.5,612z M265.4,605.1c2.1-1.1,5.2-3.5,7.5-3.2c1.3,0,2.6,0.4,3.8,1.1
     l8,4.6c2.5,1.4,2.7,2.9,0.2,4.4c0,0-3.8,2.2-3.8,2.2L265.4,605.1z M282.6,610.8c0.4-0.2,0.6-0.5,0.6-0.7c0-0.3-0.3-0.6-0.8-0.9
     l-8.2-4.7c-0.5-0.3-1-0.5-1.5-0.5c-0.8-0.1-1.8,0.7-2.5,1.1l11.3,6.5L282.6,610.8L282.6,610.8z M282.6,595.2c2-1,5.2-3.4,7.4-3.3
     c1.4,0,2.9,0.6,4.2,1.4c0.8,0.5,1.3,0.9,1.6,1.4c0.3,0.4,0.2,0.9-0.1,1.3l0,0c2.1-0.7,4.5,0.3,6.5,1.6c1.2,0.7,1.8,1.4,1.8,2.2
     c0,0.7-0.6,1.4-1.8,2.2l-3.9,2.3L282.6,595.2L282.6,595.2z M292.5,596.9c0.5-0.3,0.7-0.6,0.7-0.9c0-0.3-0.3-0.6-0.9-1
     c-0.7-0.4-1.7-1.1-2.4-1c-0.8-0.1-1.8,0.6-2.5,1l4.2,2.4L292.5,596.9L292.5,596.9z M300.1,600.7c0.4-0.3,0.6-0.5,0.6-0.8
     c0-0.3-0.3-0.6-0.9-0.9c-0.9-0.5-2.4-1.5-3.2-1.4c-0.9-0.1-2,0.7-2.7,1.1l4.8,2.8L300.1,600.7L300.1,600.7z M313.6,595.8
     c-2.5,1.4-5.2,1.3-7.7-0.2c0,0-12-6.9-12-6.9l2.5-1.4c0.8,0.3,13.2,8,13.7,7.5c0.6,0,1.9-0.4,1.9-1.1c0-0.3-0.3-0.6-0.8-0.9
     l-12.2-7.1l2.4-1.4l12,6.9c1.3,0.7,1.9,1.5,2,2.3C315.4,594.3,314.8,595.1,313.6,595.8L313.6,595.8z M305.3,582.1
     c3.7-2.1,6.8-4.7,11-2.1c1.5,0.8,3.5,2,2.5,3.3l0,0c3.1-1,6.2,2,8.9,3.2c0.3,0.1,0.7,0.3,1,0.3l-2.5,1.5c-1.3-0.3-3.8-2-5-2.7
     c-0.7-0.4-1.3-0.6-1.9-0.7c-0.8-0.1-1.8,0.5-2.5,0.9l6.8,3.9l-2.5,1.4L305.3,582.1L305.3,582.1z M315.5,584
     c0.5-0.3,0.7-0.6,0.7-0.9c0-0.3-0.3-0.6-0.9-1c-0.7-0.4-2-1.3-2.8-1.2c-0.8-0.1-1.8,0.6-2.5,1l4.5,2.6L315.5,584L315.5,584z
      M316.7,575.5l3.1-1.8l11.9,4.1l0,0l-9.4-5.5l2.2-1.3l15.8,9.1l-2.5,1.5l-14.5-4.9l0,0l11.5,6.6l-2.2,1.3L316.7,575.5L316.7,575.5z
      M335.2,549.5c2-1.1,5.2-3.4,7.4-3.3c1.4,0,2.9,0.6,4.2,1.4c0.8,0.5,1.3,0.9,1.6,1.4c0.3,0.4,0.2,0.9-0.1,1.3l0,0
     c2.1-0.7,4.5,0.3,6.5,1.6c1.2,0.7,1.8,1.4,1.8,2.2c0,0.7-0.6,1.4-1.8,2.2l-3.9,2.3L335.2,549.5L335.2,549.5z M345.1,551.3
     c0.5-0.3,0.7-0.6,0.7-0.9c0-0.3-0.3-0.6-0.9-1c-0.7-0.4-1.7-1.1-2.4-1c-0.8-0.1-1.8,0.6-2.5,1l4.2,2.4L345.1,551.3L345.1,551.3z
      M352.6,555.1c0.4-0.3,0.6-0.5,0.6-0.8c0-0.3-0.3-0.6-0.9-0.9c-0.9-0.5-2.4-1.5-3.2-1.4c-0.9-0.1-2,0.7-2.7,1.1l4.8,2.8
     L352.6,555.1L352.6,555.1z M348.5,541.9l3.4-1.9l18.3,7.6l-2.5,1.4l-3.6-1.5l0,0l-2.8,1.6l2.6,2l-2.3,1.3L348.5,541.9L348.5,541.9z
      M361.7,546.4l-8.9-3.9l0,0l6.7,5.1L361.7,546.4L361.7,546.4z M361,537.2l-2.6,1.5l-2.3-1.3l7.7-4.4l2.3,1.3l-2.6,1.5l13.5,7.8
     l-2.5,1.4L361,537.2z M371.7,531.1l-2.6,1.5l-2.3-1.3l7.7-4.4l2.3,1.3l-2.6,1.5l13.5,7.8l-2.5,1.4L371.7,531.1z M378,524.8l2.5-1.4
     l13.5,7.8l4.1-2.4l2.3,1.3l-6.6,3.8L378,524.8L378,524.8z M388,519.1l6.8-3.9l2.3,1.3l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3l-3.4,2
     l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9L388,519.1L388,519.1z M417.7,520.4c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.4c1.2,0.8,2.6,1.6,3.9,0.8
     c1.9-1.1-1.5-2.3-2.5-2.4c-3.4-0.4-8.2,0.6-11.2-1.3c-1.2-0.7-1.9-1.5-1.9-2.2c-0.1-0.8,0.5-1.5,1.7-2.2c2.7-1.6,5.7-1.1,8.2,0.6
     l-2.3,1.4c-0.6-0.4-1.6-1-2.3-1c-1.2-0.1-2.9,1-1,1.9c1.8,0.9,3.1,0.8,5.5,0.7c3.3-0.1,5.2-0.1,7.8,1.3c1.3,0.7,2,1.5,2,2.3
     C419.5,519,418.9,519.7,417.7,520.4L417.7,520.4z M454,481.7l2.5-1.4l13.5,7.8l4.1-2.4l2.3,1.3l-6.6,3.8L454,481.7L454,481.7z
      M483.5,483.1c-2.5,1.4-5.3,1.3-7.7-0.1c0,0-8.3-4.8-8.3-4.8c-1.3-0.7-1.9-1.5-2-2.2c0-0.8,0.5-1.5,1.8-2.2
     c2.5-1.4,5.3-1.3,7.7,0.1c0,0,8.3,4.8,8.3,4.8C485.8,480.1,486,481.7,483.5,483.1z M481.3,481.8c0.9-0.5,0.8-1-0.3-1.6l-8.6-5
     c-1-0.6-2-0.6-2.8-0.2s-0.8,1,0.3,1.6l8.6,5C479.5,482.3,480.4,482.3,481.3,481.8z M477.1,468.4l3.4-1.9l18.3,7.6l-2.5,1.4
     l-3.6-1.5l0,0l-2.8,1.6l2.6,2l-2.3,1.3L477.1,468.4L477.1,468.4z M490.3,472.9l-8.9-3.9l0,0l6.7,5.1L490.3,472.9L490.3,472.9z
      M486.5,463l3.1-1.8l11.9,4.1l0,0l-9.4-5.5l2.2-1.3l15.8,9.1l-2.5,1.5l-14.5-4.9l0,0l11.5,6.6l-2.2,1.3L486.5,463L486.5,463z
      M517.6,463.5c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.4l1.1,0.6c1,0.6,2,0.6,2.8,0.1c1.9-1.1-1.5-2.3-2.5-2.4c-3.4-0.4-8.2,0.6-11.2-1.3
     c-1.2-0.7-1.9-1.5-1.9-2.2c-0.1-0.8,0.5-1.5,1.7-2.2c2.7-1.6,5.7-1.1,8.2,0.6l-2.3,1.4c-0.6-0.4-1.6-1-2.3-1c-1.2-0.1-2.9,1-1,1.9
     c1.8,0.9,3.1,0.8,5.5,0.7c3.3-0.1,5.2-0.1,7.8,1.3c1.3,0.7,2,1.5,2,2.3C519.4,462.1,518.8,462.8,517.6,463.5L517.6,463.5z
      M583,426.9c-1.1,0.7-2.3,0.8-3.6,0.3c-2.3,2.5-6.3,2.7-9.1,1c0,0-8.3-4.8-8.3-4.8c-4.8-2.6,0.5-5.6,3.6-5.5c1.3,0,2.6,0.4,3.9,1.1
     l8.3,4.8c1.1,0.6,1.7,1.2,1.9,1.9c0.2,0,0.5,0,0.6,0c0.2-0.1,0.4-0.2,0.7-0.3l0.4-0.2l2.3,1.3L583,426.9L583,426.9z M575.8,427
     c0.9-0.5,0.8-1-0.3-1.6l-8.6-5c-1-0.6-2-0.6-2.8-0.2c-0.9,0.5-0.8,1,0.3,1.6l8.6,5C574,427.5,574.9,427.5,575.8,427z M589.3,421.8
     c-2.5,1.4-5.2,1.3-7.7-0.2c0,0-12-6.9-12-6.9l2.5-1.4c0.8,0.3,13.2,8,13.7,7.5c0.6,0,1.9-0.4,1.9-1.1c0-0.3-0.3-0.6-0.8-0.9
     l-12.2-7.1l2.4-1.4l12,6.9c1.3,0.7,1.9,1.5,2,2.2C591.1,420.4,590.5,421.1,589.3,421.8L589.3,421.8z M581,408.1l6.8-3.9l2.3,1.3
     l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3l-3.4,2l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9L581,408.1L581,408.1z M610.7,409.5
     c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.4c1.2,0.8,2.6,1.6,3.9,0.8c1.9-1.1-1.5-2.3-2.5-2.4c-3.4-0.4-8.2,0.6-11.2-1.3
     c-1.2-0.7-1.9-1.5-1.9-2.2c-0.1-0.8,0.5-1.5,1.7-2.2c2.7-1.6,5.7-1.1,8.2,0.6l-2.3,1.4c-0.6-0.4-1.6-1-2.3-1c-1.2-0.1-2.9,1-1,1.9
     c1.8,0.9,3.1,0.8,5.5,0.7c3.3-0.1,5.2-0.1,7.8,1.3c1.3,0.7,2,1.5,2,2.3C612.5,408,612,408.8,610.7,409.5L610.7,409.5z M606.4,396.1
     l-2.6,1.5l-2.3-1.3l7.7-4.4l2.3,1.3l-2.6,1.5l13.5,7.8l-2.5,1.4L606.4,396.1z M631.8,397.3c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.4
     c1.2,0.8,2.6,1.6,3.9,0.8c1.9-1.1-1.5-2.3-2.5-2.4c-3.4-0.4-8.2,0.6-11.2-1.3c-1.2-0.7-1.9-1.5-1.9-2.2c-0.1-0.8,0.5-1.5,1.7-2.2
     c2.7-1.6,5.7-1.1,8.2,0.6l-2.3,1.4c-0.6-0.4-1.6-1-2.3-1c-1.2-0.1-2.9,1-1,1.9c1.8,0.9,3.1,0.8,5.5,0.7c3.4-0.1,5.2-0.1,7.8,1.3
     c1.3,0.7,2,1.5,2,2.3C633.6,395.8,633.1,396.6,631.8,397.3L631.8,397.3z M661.5,361.7c3.7-2.1,6.8-4.7,11-2.1
     c1.5,0.8,3.5,2,2.5,3.3l0,0c0.8-0.2,1.6-0.3,2.4-0.1c2.5,0.5,5.1,3,7.6,3.6l-2.5,1.5c-1.3-0.3-3.8-2-5-2.7
     c-0.7-0.4-1.3-0.6-1.9-0.7c-0.8-0.1-1.8,0.5-2.5,0.9l6.8,3.9l-2.5,1.4L661.5,361.7L661.5,361.7z M671.7,363.7
     c0.5-0.3,0.7-0.6,0.7-0.9c0-0.3-0.3-0.6-0.9-1c-0.7-0.4-2-1.2-2.8-1.2c-0.8-0.1-1.8,0.6-2.5,1l4.5,2.6L671.7,363.7L671.7,363.7z
      M672.9,355.2l6.8-3.9l2.3,1.3l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3l-3.4,2l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9L672.9,355.2z M683.3,349.2
     l3.1-1.8l11.9,4.1l0,0l-9.4-5.5l2.2-1.3l15.8,9.1l-2.5,1.5l-14.5-4.9l0,0l11.5,6.6l-2.2,1.3L683.3,349.2L683.3,349.2z M699.4,342.5
     l-2.6,1.5l-2.3-1.3l7.7-4.4l2.3,1.3l-2.6,1.5l13.5,7.8l-2.5,1.4L699.4,342.5L699.4,342.5z M705.6,336.3l2.5-1.4l15.8,9.1l-2.5,1.4
     L705.6,336.3z M712.2,332.5l3.1-1.8l11.9,4.1l0,0l-9.4-5.5l2.2-1.3l15.8,9.1l-2.5,1.5l-14.5-4.9l0,0l11.5,6.6l-2.2,1.3L712.2,332.5
     z M743.6,332.8c-2.5,1.4-5.2,1.3-7.7-0.2c0,0-8.3-4.8-8.3-4.8c-1.3-0.7-1.9-1.5-2-2.2c0-2,3.7-3.3,5.5-3.2c1.8,0,3.7,1,5.2,1.9
     l-2.3,1.4l-1.5-0.9c-1-0.6-2-0.6-2.8-0.2c-0.9,0.5-0.8,1,0.3,1.6l8.6,5c1,0.6,2,0.6,2.8,0.1c0.9-0.5,0.8-1-0.2-1.6l-3.1-1.8
     l-1.2,0.7l-2.3-1.3l3.6-2.1l5.2,3c1.3,0.7,1.9,1.5,2,2.3C745.4,331.4,744.8,332.1,743.6,332.8z M318.1,224.6
     c-3.1,1.8-5.4,2.1-7.1,1.1c-1.6-1.1-2.4-3.6-2.4-7.4v-24.6c0-7.3,3.2-13.6,9.5-17.3c3.1-1.8,5.4-2.1,7.1-1
     c2.8,1.6,2.5,7.5,2.4,11.3l-6,3.5v-4.5c0-3.1-1.1-4-3.3-2.7c-2.2,1.3-3.3,3.4-3.3,6.5v25.6c0,3,1.1,3.9,3.3,2.6s3.3-3.4,3.3-6.5
     v-9.2l-3.2,1.8v-6.7l9.2-5.3v15.3C327.6,214.7,324.4,221,318.1,224.6L318.1,224.6z M339.5,164.7l8.6-5l6.6,43l-6.4,3.7l-1.2-8.6
     v0.1l-7.2,4.2l-1.2,9.8l-5.9,3.4L339.5,164.7z M346.4,192l-2.8-21.5l-0.1,0.1l-2.8,24.8L346.4,192z M360.7,152.5l9.1-5.3l4.1,31.2
     l0.1-0.1l4.1-35.9l9.1-5.3v46.8l-6,3.5v-35.5l-0.1,0.1l-4.6,38.1l-5.3,3.1l-4.6-32.8l-0.1,0.1v35.5l-5.6,3.2
     C360.7,199.3,360.7,152.5,360.7,152.5z M394.8,132.8l17.4-10v6.7l-11,6.4v12.4l8.8-5.1v6.7l-8.8,5.1v14.4l11-6.4v6.7l-17.4,10
     V132.8L394.8,132.8z"
        />
      </g>
      <linearGradient
        id="SVGID_00000054255230480157894180000000154697068287556259_"
        gradientUnits="userSpaceOnUse"
        x1="335.312"
        y1="1311.9274"
        x2="478.0948"
        y2="1063.5421"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9800FF" />
        <stop offset="1" stopColor="#00E3FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#SVGID_00000054255230480157894180000000154697068287556259_)"
        d="
   M680.6,209.9C681,210,680.3,209.8,680.6,209.9c9,4.9,153.3,88.2,162,93.5c4.2,2.5,6.2,6.5,3.9,10.7c-0.7,1.3-2.1,2.5-3.9,3.7
   c-1.9,1.3-4.4,2.8-7.8,4.7L222.7,676c-10.7,6.3-14.7,8.1-25.1,6.6c-4.1-0.8-7.6-2.8-14.2-6.6l-22.2-12.8c-1-0.6-0.1-2.2,0.9-1.6
   l22,12.7c6.8,3.9,10,5.8,13.7,6.5c10.1,1.5,13.2-0.3,24-6.5c0,0,611.9-353.3,611.9-353.3c3.4-2,5.9-3.4,7.7-4.6
   c1.8-1.2,2.8-2.2,3.4-3.1c1.7-3.5,0.2-6.1-3.4-8.3c-7.1-4.5-153.3-88.7-160.9-93c-0.3-0.1,0.3,0.1,0,0L680.6,209.9L680.6,209.9z
    M133.3,514.2c-3.1,1.9-102.9,59.2-103,59.6c-1.8,1.2-2.8,2.2-3.4,3.1c-1.8,3.5-0.2,6,3.4,8.3c1.8,1.2,4.3,2.7,7.7,4.6l20.9,12
   c1,0.6,0.1,2.2-0.9,1.6l-20.9-12.1c-3.3-1.9-5.9-3.4-7.8-4.7c-1.9-1.3-3.2-2.4-3.9-3.7c-4-8.2,5.3-11.4,11.7-15.4
   c7.2-4.2,106.6-61.5,110.1-63.6v0.3l-9.9,5.8C135.7,511.1,134.1,512.4,133.3,514.2L133.3,514.2z"
      />
      <linearGradient
        id="SVGID_00000104700400162558354200000009511924234034839977_"
        gradientUnits="userSpaceOnUse"
        x1="37.4696"
        y1="636.4768"
        x2="169.7097"
        y2="636.4768"
      >
        <stop offset="0" stopColor="#9801FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fill="none"
        stroke="url(#SVGID_00000104700400162558354200000009511924234034839977_)"
        strokeWidth="5"
        d="M107.4,600.2
   c-16.9-2.4-41.5,6.1-57.3,14.9l-0.3-0.2l0.3,0.2c-4.5,2.6-6.2,3.8-7.9,5.6l-0.5-0.1l0.5,0.1c-9.8,11.4,16.4,12.7,29.6,13.2l0,0.3
   l0-0.3c10.4,0.2,18.2,3.1,26.4,8.2c4.4,2.8,7.8,6.1,9.1,9l-0.5,0.1l0.5-0.1c0.3,0.7,0.7,2.3,0.8,3.8c0.5,4.9,1.5,8.6,3,11.3
   c4.7,8.6,14.7,8.1,23.1,4.6c12.7-5.4,42.1-27.1,30.5-39.2 M107.4,600.2c7.7,1,12.5,5.1,18.6,10.9l0.5-0.2l-0.5,0.2
   c4.5,4.3,6.8,6.2,8.8,7.3c2.1,1.2,5.6,2.6,12.7,5.1l0.3-0.3l-0.3,0.3c9.1,3.2,10.2,3.6,13.3,5.5c2.3,1.4,2.9,1.7,3.7,2.6"
      />
      <g id="items-float">
        <path
          fill="#42E8E0"
          d="M395.2,966.4c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C402,965.7,398.6,966.4,395.2,966.4L395.2,966.4z
      M386.3,963.4c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L386.3,963.4z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M459.6,918.3v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6
     l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29
     c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C459.6,918.5,459.6,918.4,459.6,918.3L459.6,918.3z"
        />

        <linearGradient
          id="SVGID_00000162326256988734492610000001018007267875341446_"
          gradientUnits="userSpaceOnUse"
          x1="343.1218"
          y1="712.0076"
          x2="445.9821"
          y2="653.41"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000162326256988734492610000001018007267875341446_)"
          d="M459.6,903.1v-11.4l-66.4,34.6l-48.3-26.5
     c-4.2-2-14.1-8.2-14.1-8.2v11.7c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6
     C459.6,903.2,459.6,903.2,459.6,903.1z"
        />

        <linearGradient
          id="SVGID_00000158741590248979862080000015172600063301235351_"
          gradientUnits="userSpaceOnUse"
          x1="330.8225"
          y1="690.3214"
          x2="459.6425"
          y2="690.3214"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000158741590248979862080000015172600063301235351_)"
          d="M384.7,926.8l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C400,930.2,390.5,930.2,384.7,926.8z"
        />
      </g>
      <g id="land-float">
        <path
          fill="#42E8E0"
          d="M286.5,1028.7c-3.4,0-6.8-0.8-9.3-2.3l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C293.3,1028,289.9,1028.7,286.5,1028.7z M277.6,1025.7
     c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5c0,1.9,1.3,3.6,3.6,5L277.6,1025.7L277.6,1025.7z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M350.9,980.7v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6
     l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29
     c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C350.9,980.8,350.9,980.8,350.9,980.7L350.9,980.7z"
        />

        <linearGradient
          id="SVGID_00000119818751320736474770000014953350234946586291_"
          gradientUnits="userSpaceOnUse"
          x1="234.3952"
          y1="649.6821"
          x2="337.2559"
          y2="591.0853"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000119818751320736474770000014953350234946586291_)"
          d="M350.9,965.4V954l-66.4,34.6l-62.4-34.7v11.7
     c0,2.2,1.4,4.5,4.3,6.1l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C350.9,965.6,350.9,965.5,350.9,965.4
     L350.9,965.4z"
        />

        <linearGradient
          id="SVGID_00000052811903571830139990000007197958424158995636_"
          gradientUnits="userSpaceOnUse"
          x1="222.0962"
          y1="627.9966"
          x2="350.9158"
          y2="627.9966"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000052811903571830139990000007197958424158995636_)"
          d="M276,989.1l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C291.2,992.5,281.8,992.5,276,989.1z"
        />
      </g>
      <g id="playables-float">
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M242.1,1042.3v-17.2l-3.1-1.8c-0.9,5.4-7.1,8.9-12.3,9.6
     l-35.5,21l-15.5,5.7l-49.4-25.9l1.1-0.7c-4.2-2-6.5-6.6-8.8-10.8l-3.3,2l-2,0.6v17.5c0,2.2,1.4,4.5,4.3,6.1l49.5,29
     c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.9,4.3-6C242.1,1042.5,242.1,1042.4,242.1,1042.3L242.1,1042.3z"
        />
        <path
          fill="#42E8E0"
          d="M177.8,1091.6c-3.4,0-6.8-0.8-9.3-2.2l-49.5-29c-5.3-3-5.3-8.5,0-11.4c0,0,49.5-29,49.5-29
     c5.1-3,13.5-3,18.7,0l49.5,29c5.3,3,5.3,8.5,0,11.4c0,0-49.5,29-49.5,29C184.5,1090.9,181.2,1091.6,177.8,1091.6z M168.9,1088.6
     c4.9,2.9,12.9,2.9,17.8,0l49.5-29c4.7-2.7,4.7-7.2,0-9.9c0,0-49.5-29-49.5-29c-4.9-2.9-12.9-2.9-17.8,0l-49.5,29
     c-2.3,1.3-3.6,3.1-3.6,5s1.3,3.6,3.6,5L168.9,1088.6L168.9,1088.6z"
        />

        <linearGradient
          id="SVGID_00000002356112221366383460000007995279569005202094_"
          gradientUnits="userSpaceOnUse"
          x1="125.6691"
          y1="586.7818"
          x2="228.5343"
          y2="528.1863"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.227" stopColor="#AAADF8" />
          <stop offset="0.68" stopColor="#7C83E5" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000002356112221366383460000007995279569005202094_)"
          d="M242.2,1028.3v-11.4l-66.4,34.6l-62.4-34.7v11.7
     c0,2.2,1.4,4.5,4.3,6.2l49.5,29c5.8,3.4,15.2,3.4,21,0l49.5-29c2.9-1.7,4.3-3.8,4.3-6C242.2,1028.5,242.2,1028.4,242.2,1028.3z"
        />

        <linearGradient
          id="SVGID_00000068663037249717695330000004872383790929364910_"
          gradientUnits="userSpaceOnUse"
          x1="113.3735"
          y1="565.0989"
          x2="242.1935"
          y2="565.0989"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#E9E9FD" />
          <stop offset="0.36" stopColor="#D3D2F9" />
          <stop offset="0.706" stopColor="#C5C4F7" />
          <stop offset="1" stopColor="#C0BFF6" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000068663037249717695330000004872383790929364910_)"
          d="M167.3,1052l-49.5-29c-5.8-3.4-5.8-8.9,0-12.3
     l49.5-29c5.8-3.4,15.2-3.4,21,0l49.5,29c5.8,3.4,5.8,8.9,0,12.3l-49.5,29C182.5,1055.4,173.1,1055.4,167.3,1052L167.3,1052z"
        />
      </g>
      <path
        fill="#FFFFFF"
        d="M194.1,1123.5c2-1.1,5.1-3.4,7.4-3.1c1.8-0.1,3.8,1.1,5.4,2.1c3.5,2,1.8,3.6-1,5.1l6.4,3.7l-2.5,1.4
   L194.1,1123.5L194.1,1123.5z M204.8,1125.4c0.4-0.2,0.6-0.5,0.6-0.7c0-0.3-0.3-0.5-0.8-0.8c-0.8-0.4-2.5-1.6-3.3-1.6
   c-0.8-0.1-1.8,0.6-2.4,1l4.8,2.8L204.8,1125.4L204.8,1125.4z M205,1117.1l2.5-1.4l13.5,7.8l4.1-2.4l2.3,1.3l-6.6,3.8L205,1117.1
   L205,1117.1z M217,1110.2l3.4-1.9l18.3,7.6l-2.5,1.4l-3.6-1.6l0,0l-2.8,1.6l2.6,2l-2.3,1.3L217,1110.2L217,1110.2z M230.3,1114.7
   l-8.9-3.9l0,0l6.7,5.1L230.3,1114.7z M236.7,1109.3l-12.1-3.5l2.6-1.5l7.5,2.4l0,0l-4.1-4.3l2.4-1.4l6.1,7l6.7,3.9l-2.5,1.4
   L236.7,1109.3z M237.4,1098.5l3.4-1.9l18.3,7.6l-2.5,1.4l-3.6-1.6l0,0l-2.8,1.6l2.6,2l-2.3,1.3L237.4,1098.5L237.4,1098.5z
    M250.6,1103l-8.9-3.9l0,0l6.7,5.1L250.6,1103z M246.8,1093c2-1.1,5.2-3.4,7.4-3.2c1.4,0,2.9,0.6,4.2,1.4c0.8,0.5,1.3,0.9,1.6,1.4
   c0.3,0.4,0.2,0.9-0.1,1.3l0,0c2.1-0.7,4.5,0.3,6.5,1.6c1.2,0.7,1.8,1.4,1.8,2.2c0,0.7-0.6,1.4-1.8,2.2l-3.9,2.2L246.8,1093
   L246.8,1093z M256.6,1094.8c0.5-0.3,0.7-0.6,0.7-0.9c0.1-0.5-1.3-1.2-1.8-1.5c-1-0.6-1.9-0.8-2.9-0.2c0,0-1.2,0.7-1.2,0.7l4.2,2.4
   L256.6,1094.8L256.6,1094.8z M264.2,1098.6c0.4-0.2,0.6-0.5,0.6-0.8c0-0.3-0.3-0.6-0.9-0.9c-0.9-0.5-2.4-1.5-3.2-1.4
   c-0.9-0.1-2,0.6-2.8,1.1l4.8,2.8L264.2,1098.6L264.2,1098.6z M258.1,1086.5l2.5-1.4l13.5,7.8l4.1-2.4l2.3,1.3l-6.6,3.8L258.1,1086.5
   L258.1,1086.5z M268.1,1080.7l6.8-3.9l2.3,1.3l-4.3,2.5l4.2,2.4l3.4-2l2.3,1.3l-3.4,2l4.8,2.8l4.3-2.5l2.3,1.3l-6.8,3.9
   L268.1,1080.7L268.1,1080.7z M297.8,1082c-2.8,1.7-5.9,1-8.5-0.7l2.3-1.3l1.1,0.6c1,0.6,2,0.6,2.8,0.2c1-0.6,0.7-1.1-0.3-1.7
   c-2.6-1.6-7.5-0.4-10.3-1c-1.8-0.3-4.9-1.6-5-3.3c0-2,3.6-3.3,5.4-3.1c1.5,0,3.1,0.7,4.5,1.5l-2.3,1.3l-0.8-0.5
   c-1-0.6-1.9-0.7-2.8-0.2c-1.7,1,1.2,2.2,2.3,2.2c3.5,0.3,8.3-0.6,11.3,1.4c1.3,0.7,2,1.5,2,2.3C299.6,1080.6,299,1081.3,297.8,1082
   L297.8,1082z M332.4,1042.7l2.5-1.4l13.5,7.8l4.1-2.3l2.3,1.3l-6.6,3.8L332.4,1042.7L332.4,1042.7z M344.4,1035.7l3.4-1.9l18.3,7.6
   l-2.5,1.4l-3.6-1.6l0,0l-2.8,1.6l2.6,2l-2.3,1.3L344.4,1035.7L344.4,1035.7z M357.6,1040.3l-8.9-3.9l0,0l6.7,5.1L357.6,1040.3
   L357.6,1040.3z M353.8,1030.3l3.1-1.8l11.9,4.1l0,0l-9.4-5.4l2.2-1.3l15.8,9.1l-2.5,1.5l-14.5-4.9l0,0l11.5,6.7l-2.2,1.3
   L353.8,1030.3L353.8,1030.3z M365.6,1023.5c2.1-1.1,5.2-3.5,7.5-3.2c1.3,0,2.6,0.4,3.8,1.1l8,4.6c2.5,1.4,2.7,2.9,0.2,4.4
   c0,0-3.8,2.2-3.8,2.2L365.6,1023.5z M382.9,1029.1c0.4-0.2,0.6-0.5,0.6-0.8c0-0.3-0.3-0.6-0.8-0.9l-8.2-4.7c-0.5-0.3-1-0.5-1.5-0.5
   c-0.8-0.1-1.9,0.7-2.5,1l11.3,6.5L382.9,1029.1L382.9,1029.1z"
      />
      <path
        fill="#8C38FF"
        d="M78.2,1112.1l4.7,2.7l-10.5,10.3l0.1,0l14.2-8.2l3.3,1.9l-23.7,13.7l-3.8-2.2l12.8-12.5l-0.1,0l-17.3,10
   l-3.3-1.9L78.2,1112.1L78.2,1112.1z M98,1123.6l9.8,5.7l-3.4,1.9l-6.1-3.5l-6.6,3.8l4.8,2.8l-3.4,1.9l-4.8-2.8l-10.3,5.9l-3.7-2.1
   L98,1123.6L98,1123.6z M114.9,1137.2l-3.9-2.2l3.4-1.9l11.5,6.6l-3.4,1.9l-3.9-2.2l-20.3,11.7l-3.7-2.1
   C94.6,1148.9,114.9,1137.2,114.9,1137.2z"
      />
      <path fill="none" stroke="#05DDFF" strokeWidth="1.859" strokeDasharray="11.15,11.15" d="M1201.6,979.2v115.2" />
      <g>
        <path fill="none" stroke="#05DDFF" strokeWidth="1.859" strokeDasharray="11.15,11.15" d="M1201.6,979.2v115.2" />
      </g>
      <g>
        <path
          fill="#8C38FF"
          d="M1227.8,540.7c-0.1-3.7,2.7-4.7,6-4.5v2.9h-1.3c-1.8-0.1-2.5,1.7-1.5,2.8c0.8,0.7,2.8,0.4,3.7-0.1
     c1.5-0.8,3.8-4.1,5.3-4.7c1.8-1.1,5.2-1,6.6,0.4c1.7,1.4,1.7,5.4,0,6.7c-0.9,0.9-2.8,1.2-4.4,1.1v-2.9c0.7,0,2,0.1,2.4-0.4
     c0.3-0.3,0.5-0.6,0.5-1.1c0.1-1.9-2.6-1.8-3.8-1c-1.4,0.9-3.8,4.2-5.3,4.7c-1.9,1.1-5.4,1-6.9-0.5
     C1228.2,543.4,1227.8,542.2,1227.8,540.7L1227.8,540.7z M1247.6,551.8v8.4h-2.8v-5.3h-5.2v4.2h-2.8v-4.2h-6v5.3h-2.8v-8.4
     C1228.1,551.8,1247.6,551.8,1247.6,551.8z M1247.6,566.7v3.1h-16.7v5h-2.8v-8.1H1247.6z M1247.6,581v3.1h-16.7v5h-2.8V581
     L1247.6,581L1247.6,581z M1247.6,595.3v3.1h-19.5v-3.1H1247.6z M1247.6,605.5v3.8l-11.7,3v0.1h11.7v2.7h-19.5v-3.2l14.2-3.7v-0.1
     h-14.2v-2.7L1247.6,605.5L1247.6,605.5z M1227.8,626.4c0-3.1,1.9-4.6,4.9-4.6c0,0,10.3,0,10.3,0c1.6,0,2.8,0.4,3.6,1.2
     c1.7,1.4,1.7,5.4,0,6.8c-1.1,1.2-3.5,1.2-5.3,1.2v-2.9c1.4,0,3.9,0.4,3.8-1.6c0-1.1-0.6-1.6-1.9-1.6h-10.7c-2.6-0.2-2.6,3.4,0,3.2
     c0,0,3.8,0,3.8,0v-1.5h2.8v4.4h-6.4C1229.7,631,1227.8,629.5,1227.8,626.4L1227.8,626.4z M1244.8,649.3v-3.2h2.8v9.5h-2.8v-3.2
     h-16.7v-3.1L1244.8,649.3L1244.8,649.3z M1247.6,662.9v4.2l-19.5,3.2v-3.1l3.9-0.6h-0.1v-3.5l-3.8-0.6v-2.8L1247.6,662.9z
      M1234.6,666.3l9.7-1.4v-0.1l-9.7-1.3C1234.6,663.5,1234.6,666.3,1234.6,666.3z M1238.1,679.2l9.5-3.4v3.2l-6.3,2.1v0.1l6.3,2.1
     v2.9l-9.5-3.4l-10,3.5v-3.2l6.8-2.2v-0.1l-6.8-2.3v-2.9L1238.1,679.2z M1227.8,706.3c0-4,3-4.8,6.4-4.6v2.9c-1.4,0-3.7-0.4-3.7,1.6
     c0,1.1,0.6,1.6,1.9,1.6h4.4c1.3,0,1.9-0.5,1.9-1.6c0-1.1-0.8-1.6-2.1-1.6v-2.9l10.9,0.6v8.1h-2.8V705l-4.7-0.3v0.1
     c1.8,0.9,1.9,4.1,0.3,5.2c-0.8,0.6-1.9,0.9-3.3,0.9C1233.2,710.8,1227.8,711.9,1227.8,706.3z M1236.8,720.5c0-2,1.2-3,3.1-3h4.9
     c2,0,3.1,1,3.1,3c0,2-1.2,3-3.1,3h-4.9C1237.9,723.4,1236.7,722.4,1236.8,720.5z M1247.6,727.6v2l-19.5-7.6v-2L1247.6,727.6z
      M1238.5,720.5c0,0.7,0.4,1,1.2,1h5.2c0.8,0,1.2-0.3,1.2-1s-0.4-1-1.2-1h-5.2C1238.9,719.5,1238.5,719.8,1238.5,720.5z M1227.8,729
     c0-2,1.2-3,3.1-3h4.9c2,0,3.1,1,3.1,3c0,2-1.2,3-3.1,3h-4.9C1229,732,1227.8,731,1227.8,729z M1229.6,729c0,0.7,0.4,1,1.2,1h5.2
     c0.8,0,1.2-0.3,1.2-1s-0.4-1-1.2-1h-5.2C1230,728,1229.6,728.4,1229.6,729z"
        />
        <path
          fill="#8C38FF"
          d="M963.2,194.1c2.1,1.3,5.9,3,7,5.3c0.6,1.2,1,2.6,1,4.2l-0.1,9.9c0,3.1-1.3,4.1-4,2.5l-4-2.4L963.2,194.1
     L963.2,194.1z M967.1,213.1c0.4,0.3,0.8,0.3,1,0.1c0.2-0.2,0.4-0.6,0.4-1.2l0.1-10.1c0-0.7-0.1-1.2-0.3-1.7
     c-0.4-0.8-1.6-1.4-2.3-1.8l-0.1,13.9L967.1,213.1L967.1,213.1z M976.8,202.1l7.2,4.2l0,2.8l-4.6-2.7l0,5.2l3.6,2.1l0,2.8l-3.6-2.1
     l-0.1,6l4.6,2.7l0,2.8l-7.2-4.2L976.8,202.1L976.8,202.1z M989.4,209.5l7,4.1l0,2.8l-4.3-2.6l0,5.4l3.4,2l0,2.8l-3.4-2l-0.1,8.5
     l-2.6-1.6L989.4,209.5L989.4,209.5z M1001.5,216.6l2.6,1.6l-0.2,16.7l4.3,2.6l0,2.8l-7-4.1L1001.5,216.6L1001.5,216.6z M1015.7,225
     l3.6,2.1l2.6,21.1l-2.7-1.6l-0.4-4.2v0.1l-3-1.8l-0.5,3.5l-2.5-1.4L1015.7,225L1015.7,225z M1018.5,239.7l-1.1-10.3l0,0l-1.2,9
     L1018.5,239.7z M1028.1,235.1l-2.8-1.6l0-2.8l8.2,4.8l0,2.8l-2.8-1.6l-0.1,16.7l-2.7-1.6L1028.1,235.1L1028.1,235.1z M1038.7,238.5
     l2.7,1.6l-0.2,19.5l-2.6-1.6L1038.7,238.5L1038.7,238.5z M1050.8,265.5c-2.6-1.5-4-4.2-4-7.3c0,0,0.1-10.3,0.1-10.3
     c0-1.6,0.4-2.6,1.1-3c0.7-0.4,1.7-0.3,3,0.5c2.6,1.5,4,4.2,4,7.3c0,0-0.1,10.3-0.1,10.3C1054.8,266,1053.5,267.1,1050.8,265.5
     L1050.8,265.5z M1050.8,262.8c0.9,0.5,1.4,0.2,1.4-1.1l0.1-10.6c0-1.3-0.4-2.2-1.4-2.7c-0.9-0.5-1.4-0.2-1.4,1.1l-0.1,10.6
     C1049.5,261.3,1049.9,262.2,1050.8,262.8z M1060.6,251.4l3.3,2l2.5,13.2l0.1,0l0.1-11.7l2.3,1.4l-0.2,19.5l-2.7-1.6l-3.1-16.1
     l-0.1,0l-0.1,14.2l-2.4-1.4L1060.6,251.4L1060.6,251.4z"
        />
        <path
          fill="#8C38FF"
          d="M727.4,1082.5l2.7,1.5l-14.5,8.4l4.4,2.5l-2.4,1.4l-7-4.1L727.4,1082.5z M740.7,1090.1l2.7,1.5l-16.9,9.8
     l-2.7-1.5L740.7,1090.1z M739.6,1110.8c-1.2-0.7-1.4-1.4-0.6-2.2c-3.2-0.9-5.9-3.4-1.8-5.6c0,0,8.9-5.1,8.9-5.1
     c2.6-1.5,5.7-1.7,8.3-0.1c2.7,1.5,2.4,3.3-0.2,4.8c0,0-8.9,5.1-8.9,5.1c-1.1,0.7-2.3,1-3.5,1.2c-0.2,0.5,0.6,0.8,1,1l-2.4,1.4
     L739.6,1110.8L739.6,1110.8z M739.4,1106.4c0.9,0.5,1.9,0.5,3-0.2l9.2-5.3c1.1-0.7,1.2-1.2,0.3-1.8c-0.9-0.5-1.9-0.5-3,0.2
     l-9.2,5.3C738.5,1105.3,738.4,1105.9,739.4,1106.4z M751.6,1116.2c-1.3-0.7-1.9-1.5-1.9-2.3c0.1-0.8,0.8-1.6,2.1-2.4l12.9-7.4
     l2.7,1.5l-13.1,7.6c-0.6,0.3-0.9,0.6-0.9,0.9c0,0.7,1.3,1.2,2,1.2c0.5,0.5,13.5-7.5,14.7-8.1l2.6,1.5l-12.9,7.4
     C757.2,1117.6,754.2,1117.8,751.6,1116.2L751.6,1116.2z M779.5,1112.6l2.7,1.5l-16.9,9.8l-2.7-1.5L779.5,1112.6z M789.1,1118.1
     l4.1,2.3c2.7,1.6,2.4,3.2-0.2,4.7l-8.5,4.9c-1.4,0.8-2.7,1.2-4.1,1.2c-2.5,0.3-5.9-2.3-8.1-3.4L789.1,1118.1L789.1,1118.1z
      M778.6,1128.8c0.4,0.2,0.9,0.4,1.4,0.3c0.5,0,1-0.2,1.6-0.5l8.8-5.1c0.6-0.3,0.9-0.7,0.9-0.9c0.1-0.6-1.5-1.2-2-1.6l-12.1,7
     L778.6,1128.8L778.6,1128.8z M803.9,1126.6l2.7,1.5l-16.9,9.8l-2.7-1.5L803.9,1126.6z M813.1,1134.8l-2.8-1.6l2.4-1.4l8.2,4.7
     l-2.4,1.4l-2.8-1.6l-14.5,8.4l-2.7-1.5L813.1,1134.8z M820,1147.2l6.5-7.5l2.8,1.6l-4.4,4.6l0,0l8-2.5l2.6,1.5l-12.9,3.8l-7.2,4.2
     l-2.7-1.5L820,1147.2z M850.6,1153.6l3.9,2.3c2.7,1.6,2.4,3.2-0.2,4.7c-4.1,2.6-6.9,3.1-11.1,0.4l-6.9,4l-2.7-1.5L850.6,1153.6
     L850.6,1153.6z M846.9,1160.2c0.4,0.2,0.9,0.4,1.3,0.3c0.9,0.1,2.7-1.2,3.6-1.7c0.6-0.3,0.9-0.6,0.9-0.9c0.1-0.6-1.4-1.2-1.9-1.5
     l-5.2,3L846.9,1160.2L846.9,1160.2z M864.8,1161.8l3.9,2.3c1.4,0.8,2,1.6,2,2.3c0,0.7-0.7,1.5-2,2.2c-1.9,1.2-4.2,2.1-6.1,1.5l0,0
     c0.5,0.5,0.5,1,0.2,1.5c-1,1.4-4.6,2.9-6.1,4c-0.3,0.2-0.5,0.4-0.6,0.6l-2.7-1.6c0.8-1,3.8-2.4,4.9-3.1c0.8-0.4,1.2-0.8,1.2-1.2
     c0.2-0.6-1.2-1.2-1.7-1.5l-7.2,4.2l-2.7-1.5L864.8,1161.8L864.8,1161.8z M861.2,1168.1c0.5,0.3,1.1,0.5,1.6,0.4
     c0.9,0.1,2.3-0.8,3.1-1.3c0.6-0.4,0.9-0.7,1-1c0.2-0.6-1.4-1.2-1.8-1.5l-4.8,2.8L861.2,1168.1L861.2,1168.1z M866.2,1182.4
     c-2.7-1.5-2.4-3.3,0.2-4.8c0,0,8.9-5.1,8.9-5.1c2.6-1.5,5.7-1.7,8.3-0.1c1.3,0.8,1.9,1.5,1.9,2.4c0,0.8-0.7,1.6-2.1,2.4l-8.9,5.1
     C871.9,1183.8,868.9,1184,866.2,1182.4z M868.6,1181c0.9,0.5,1.9,0.5,3-0.2l9.2-5.3c1.1-0.7,1.2-1.2,0.3-1.8
     c-0.9-0.5-1.9-0.5-3,0.2l-9.2,5.3C867.8,1179.9,867.7,1180.5,868.6,1181z M893.4,1178.3l2.7,1.5l-11.4,8.6l0,0l14.8-6.6l2.4,1.4
     l-19.5,8.3l-3.5-2L893.4,1178.3z M908.3,1186.9l2.7,1.5l-16.9,9.8l-2.7-1.5L908.3,1186.9z M917.9,1192.4l4.1,2.3
     c2.7,1.6,2.4,3.2-0.2,4.7c0,0-8.5,4.9-8.5,4.9c-1.4,0.8-2.7,1.2-4.1,1.2c-2.6,0.3-5.9-2.3-8.1-3.4L917.9,1192.4z M907.4,1203.1
     c0.4,0.2,0.9,0.4,1.4,0.3c0.5,0,1-0.2,1.6-0.5l8.8-5.1c0.6-0.3,0.9-0.7,0.9-0.9c0.1-0.6-1.5-1.2-2-1.6l-12.1,7L907.4,1203.1z
      M932.6,1201l7.2,4.2l-2.4,1.4l-4.6-2.6l-4.5,2.6l3.6,2.1l-2.4,1.4l-3.6-2.1l-5.2,3l4.6,2.6l-2.4,1.4l-7.2-4.2L932.6,1201
     L932.6,1201z M946.3,1208.9l3.9,2.3c1.4,0.8,2,1.6,2,2.3c0,0.7-0.7,1.5-2,2.2c-1.9,1.2-4.2,2.1-6.1,1.5l0,0c0.5,0.5,0.5,1,0.2,1.5
     c-1,1.5-4.6,2.9-6.1,4c-0.3,0.2-0.5,0.4-0.6,0.6l-2.7-1.6c0.2-0.2,0.4-0.4,0.6-0.6c0.6-0.4,3.6-2.1,4.3-2.6
     c0.8-0.4,1.2-0.8,1.2-1.2c0.2-0.6-1.2-1.2-1.7-1.5l-7.2,4.2l-2.7-1.5L946.3,1208.9L946.3,1208.9z M942.7,1215.2
     c0.5,0.3,1.1,0.5,1.6,0.4c0.9,0.1,2.3-0.8,3.1-1.3c0.6-0.3,0.9-0.7,1-1c0.2-0.6-1.4-1.2-1.8-1.5l-4.8,2.8L942.7,1215.2
     L942.7,1215.2z M1248.4,1506.8l7.2-4.2l2.4,1.4l-4.6,2.7l4.5,2.6l3.7-2.1l2.4,1.4l-3.7,2.1l5.2,3l4.6-2.7l2.4,1.4l-7.2,4.2
     L1248.4,1506.8z M1272.7,1502.3l-11.2-3.1l2.8-1.6l7.2,2.1l0.1,0l-3.6-4.2l2.5-1.4l5.3,6.5l11.7,3.2l-2.8,1.6l-7.8-2.3l0,0l3.9,4.6
     l-2.5,1.4L1272.7,1502.3z M1297.4,1498.3c-2.6,1.5-5.5,1.4-8.1-0.1c0,0-9.1-5.2-9.1-5.2c-1.3-0.8-2-1.6-2.1-2.3
     c0-2.1,3.9-3.5,5.8-3.4c2-0.1,4.1,1.2,5.9,2.2l-2.5,1.4c-1.4-0.8-3.3-2.3-4.8-1.3c-0.9,0.5-0.8,1.1,0.2,1.7l9.4,5.4
     c1,0.6,2,0.6,2.9,0.1c0.9-0.5,0.8-1.1-0.2-1.7l-2.6-1.5l2.5-1.4C1297.3,1493.7,1301.7,1495.7,1297.4,1498.3z M1290.7,1482.4
     l2.7-1.5l6.9,4l2.8-1.7l-6.9-4l2.7-1.5l16.9,9.8l-2.7,1.5l-7.6-4.4l-2.8,1.7l7.6,4.4l-2.7,1.5L1290.7,1482.4z M1307.8,1472.5
     l3.6-2.1l19.7,8.2l-2.7,1.5l-3.8-1.7l0.1,0l-3,1.8l2.8,2.2l-2.5,1.4L1307.8,1472.5L1307.8,1472.5z M1322,1477.3l-9.5-4.1l-0.1,0
     l7.2,5.5L1322,1477.3L1322,1477.3z M1320.4,1465.2l3.3-1.9l12.7,4.3l0.1,0l-10.1-5.8l2.4-1.4l16.9,9.8l-2.7,1.6l-15.5-5.3l-0.1,0
     l12.3,7.1l-2.4,1.4L1320.4,1465.2L1320.4,1465.2z M1356.6,1464.1c-2.6,1.5-5.6,1.4-8.2-0.2c0,0-8.9-5.1-8.9-5.1
     c-1.4-0.8-2.1-1.6-2.1-2.4c0-2.1,3.9-3.5,5.9-3.4c1.9,0,3.9,1,5.6,2.1l-2.5,1.4l-1.6-0.9c-1.1-0.6-2.1-0.7-3.1-0.2
     c-0.9,0.5-0.8,1.1,0.3,1.8l9.2,5.3c1.1,0.6,2.1,0.7,3,0.2s0.8-1.1-0.3-1.7l-3.3-1.9l-1.3,0.8l-2.4-1.4l3.8-2.2l5.5,3.2
     C1358.9,1460.9,1359.3,1462.6,1356.6,1464.1L1356.6,1464.1z M1350.1,1448.1l7.2-4.2l2.4,1.4l-4.6,2.7l4.5,2.6l3.7-2.1l2.4,1.4
     l-3.7,2.1l5.2,3l4.6-2.6l2.4,1.4l-7.2,4.2L1350.1,1448.1z"
        />
        <path
          fill="#8C38FF"
          d="M346.9,1189.4l6.5-7.4l2.8,1.6l-4.4,4.6l0,0l8-2.5l2.6,1.5l-12.9,3.8l-7.2,4.2l-2.7-1.5L346.9,1189.4
     L346.9,1189.4z M353.8,1202c-2.7-1.6-2.4-3.3,0.2-4.8c0,0,8.9-5.1,8.9-5.1c2.6-1.5,5.6-1.7,8.3-0.1c1.3,0.8,1.9,1.5,1.9,2.4
     s-0.7,1.6-2.1,2.4l-8.9,5.1C359.4,1203.4,356.4,1203.5,353.8,1202z M356.2,1200.6c0.9,0.5,1.9,0.5,3-0.2l9.2-5.3
     c1.1-0.6,1.2-1.2,0.3-1.8c-0.9-0.5-1.9-0.5-3,0.2l-9.2,5.3C355.4,1199.4,355.3,1200,356.2,1200.6L356.2,1200.6z M367.3,1209.8
     c-1.3-0.7-1.9-1.5-1.9-2.3c0.1-0.8,0.8-1.6,2.1-2.4l12.9-7.4l2.7,1.5l-13.1,7.6c-0.6,0.3-0.9,0.6-0.9,0.9c0,0.3,0.2,0.6,0.6,0.8
     c0.4,0.2,0.9,0.4,1.4,0.3c0.5,0,1-0.2,1.6-0.5l13.1-7.6l2.6,1.5l-12.9,7.4C372.9,1211.2,370,1211.3,367.3,1209.8L367.3,1209.8z
      M394.2,1205.5l3.9,2.3c1.4,0.8,2,1.6,2,2.3c0,0.7-0.7,1.5-2,2.2c-1.9,1.2-4.2,2.1-6.1,1.5l0,0c0.5,0.5,0.5,1,0.2,1.5
     c-1,1.5-4.6,2.9-6.1,4c-0.3,0.2-0.5,0.4-0.6,0.7l-2.7-1.6c0.8-1,3.8-2.4,4.9-3.1c0.8-0.4,1.2-0.8,1.2-1.1c0.2-0.6-1.2-1.2-1.7-1.5
     l-7.2,4.2l-2.7-1.5L394.2,1205.5L394.2,1205.5z M390.6,1211.8c0.5,0.3,1.1,0.4,1.6,0.4c0.9,0.1,2.3-0.8,3.1-1.3
     c0.6-0.3,0.9-0.7,1-1c0.2-0.6-1.4-1.2-1.8-1.5l-4.8,2.8L390.6,1211.8L390.6,1211.8z M415.5,1217.8l3.3,1.9l-7.5,7.3l0,0l10.1-5.8
     l2.4,1.4l-16.9,9.8l-2.7-1.6l9.1-9l0,0l-12.3,7.1l-2.4-1.4L415.5,1217.8L415.5,1217.8z M429.7,1226l7,4.1l-2.4,1.4l-4.4-2.5
     l-4.7,2.7l3.4,2l-2.4,1.4l-3.4-2l-7.4,4.2l-2.7-1.5L429.7,1226L429.7,1226z M441.7,1235.7l-2.8-1.6l2.4-1.4l8.2,4.7l-2.4,1.4
     l-2.8-1.6l-14.5,8.4l-2.7-1.5L441.7,1235.7L441.7,1235.7z"
        />
      </g>
      <linearGradient
        id="SVGID_00000027569524390221189860000016770620664729794998_"
        gradientUnits="userSpaceOnUse"
        x1="27.3549"
        y1="477.3791"
        x2="153.7519"
        y2="419.2092"
        gradientTransform="matrix(1 0 0 -1 0 1582)"
      >
        <stop offset="0" stopColor="#9801FF" />
        <stop offset="1" stopColor="#69F7F7" />
      </linearGradient>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#SVGID_00000027569524390221189860000016770620664729794998_)"
        d="
   M137.4,1105.3c-1.9-0.3-62.6-9.7-63.1-9.8c-0.3,0-1,0.1-1.6,0.2c-1,0.2-2.3,0.9-24.3,13.6c-22,12.7-23.2,13.4-23.6,14
   c-0.2,0.3-0.4,0.8-0.4,0.9c0.1,0.3,16.4,35.5,16.9,36.5c0.5,0.8,1.2,1.3,2.7,1.6c1.5,0.3,60.7,9.5,62.3,9.7c0.7,0.1,1.6,0.1,2.3-0.1
   c1.1-0.2,2-0.7,24.3-13.6c22.4-12.9,23.2-13.4,23.6-14.1c0.3-0.4,0.3-0.9,0.2-1.3c-0.4-0.9-16.3-35.1-16.7-36
   C139.7,1106,138.8,1105.5,137.4,1105.3z M140.9,1126.2l7.7,16.6c-10.5,6.1-31.7,18.3-42.2,24.4c-10.5-1.6-55.2-8.5-57.7-9
   c-0.9-1.5-12.8-27.3-15.6-33.4c10.5-6.1,31.7-18.3,42.2-24.4c10.5,1.6,55.1,8.5,57.7,9C133,1109.5,136.6,1117.1,140.9,1126.2z"
      />
      <g>
        <defs>
          <rect
            id="SVGID_00000128450594674810997180000010119291059821087162_"
            x="1151"
            y="108"
            width="107"
            height="106"
          />
        </defs>
        <clipPath id="SVGID_00000107571388772909034920000011827949320430745274_">
          <use href="#SVGID_00000128450594674810997180000010119291059821087162_" overflow="visible" />
        </clipPath>
        <g opacity="0.8" clipPath="url(#SVGID_00000107571388772909034920000011827949320430745274_)">
          <path
            fill="#E232EE"
            d="M1151,160.8c1.6-23.5,14.9-43.3,37.8-50c19.5-6.1,37.5-1.9,52.4,12.3c31.3,28.5,16.4,81.3-24.5,91l-0.4-3
       c-3.8-0.4-7.6-0.5-11.2-1.1c-24.8-4.4-41.3-31.2-33.7-54.8c6.2-19.5,28.4-30.3,46.3-22.5c12.1,5.3,18.9,19.6,15.4,32.3
       c-5.3,19.1-34.8,21.4-36.1-0.3c-0.2-5.1,2.6-8.8,8.2-10.8c2.5-0.9,3.2-2.1,3-4.6c-0.2-3,0-6,0-9.2c-4.9-1-9.2,0.4-13.1,3
       c-15.6,10-15.5,33.5-0.1,44.6c17.7,12.7,42.4,3.1,49.6-16.9c8.4-23.6-7.9-49.8-32.8-52.9c-53.8-5.4-73.2,64.7-28.7,92.7
       c-19.9-8.7-30-26.1-31.9-47.4L1151,160.8L1151,160.8z"
          />
        </g>
      </g>
      <g id="bullet5">
        <g opacity="0.77">
          <radialGradient
            id="SVGID_00000072240269830044986190000018081100191714275000_"
            cx="-246.461"
            cy="1340.8334"
            r="0.9987"
            gradientTransform="matrix(0 24 24 0 -31613 6882)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#032BFF" />
            <stop offset="1" stopColor="#03E0FF;stop-opacity:0" />
          </radialGradient>
          <path
            fill="url(#SVGID_00000072240269830044986190000018081100191714275000_)"
            d="M567,943c13.3,0,24,10.7,24,24
       c-1.3,31.8-46.7,31.8-48,0C543,953.7,553.7,943,567,943z"
          />
        </g>
        <g>
          <path
            fill="#1EFFFF"
            d="M567,961.9c2.8,0,5.1,2.3,5.1,5.1c-0.2,6.7-9.9,6.7-10.1,0C561.9,964.2,564.2,961.9,567,961.9z"
          />
        </g>
      </g>
      <g id="bullet4">
        <g opacity="0.77">
          <radialGradient
            id="SVGID_00000039095230729473204350000013884841609061325962_"
            cx="-255.77"
            cy="1349.5861"
            r="0.9987"
            gradientTransform="matrix(1.000000e-15 12.6977 12.6977 -1.000000e-15 -16497.9395 3681.355)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#032BFF" />
            <stop offset="1" stopColor="#03E0FF;stop-opacity:0" />
          </radialGradient>
          <path
            fill="url(#SVGID_00000039095230729473204350000013884841609061325962_)"
            d="M638.7,421c7,0,12.7,5.7,12.7,12.7
       c-0.7,16.8-24.7,16.8-25.4,0C626,426.7,631.7,421,638.7,421z"
          />
        </g>
        <g>
          <path fill="#1EFFFF" d="M638.7,431c3.5,0.1,3.5,5.3,0,5.4C635.2,436.3,635.2,431.1,638.7,431z" />
        </g>
      </g>
      <g id="bullet3">
        <g opacity="0.77">
          <radialGradient
            id="SVGID_00000176734782063038700240000016814667224589303192_"
            cx="-254.745"
            cy="1386.4889"
            r="0.9987"
            gradientTransform="matrix(1.000000e-15 12.6977 12.6977 -1.000000e-15 -16497.9395 3681.355)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#032BFF" />
            <stop offset="1" stopColor="#03E0FF;stop-opacity:0" />
          </radialGradient>
          <path
            fill="url(#SVGID_00000176734782063038700240000016814667224589303192_)"
            d="M1107.3,434c7,0,12.7,5.7,12.7,12.7
       c-0.7,16.8-24.7,16.8-25.4,0C1094.6,439.7,1100.3,434,1107.3,434z"
          />
        </g>
        <g>
          <path fill="#1EFFFF" d="M1107.3,444c3.5,0.1,3.5,5.3,0,5.4C1103.7,449.3,1103.7,444.1,1107.3,444z" />
        </g>
      </g>
      <g id="bullet2">
        <g opacity="0.77">
          <radialGradient
            id="SVGID_00000104705927032581847410000002153640381268184725_"
            cx="-233.6208"
            cy="1346.0468"
            r="0.9987"
            gradientTransform="matrix(1.000000e-15 12.6977 12.6977 -1.000000e-15 -16497.9395 3681.355)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#032BFF" />
            <stop offset="1" stopColor="#03E0FF;stop-opacity:0" />
          </radialGradient>
          <path
            fill="url(#SVGID_00000104705927032581847410000002153640381268184725_)"
            d="M593.8,702.2c7,0,12.7,5.7,12.7,12.7
       c-0.7,16.8-24.7,16.8-25.4,0C581.1,707.9,586.7,702.2,593.8,702.2z"
          />
        </g>
        <g>
          <path fill="#1EFFFF" d="M593.8,712.3c3.5,0.1,3.5,5.3,0,5.4C590.2,717.5,590.2,712.4,593.8,712.3z" />
        </g>
      </g>
      <g id="bullet1">
        <g opacity="0.77">
          <radialGradient
            id="SVGID_00000070107746190718561530000007555220665003231667_"
            cx="-243.549"
            cy="1301.9587"
            r="0.9987"
            gradientTransform="matrix(1.000000e-15 12.6977 12.6977 -1.000000e-15 -16497.9395 3681.355)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#032BFF" />
            <stop offset="1" stopColor="#03E0FF;stop-opacity:0" />
          </radialGradient>
          <path
            fill="url(#SVGID_00000070107746190718561530000007555220665003231667_)"
            d="M33.9,576.2c7,0,12.7,5.7,12.7,12.7
       c-0.7,16.8-24.7,16.8-25.4,0C21.2,581.9,26.9,576.2,33.9,576.2z"
          />
        </g>
        <g>
          <path fill="#1EFFFF" d="M33.9,586.2c3.5,0.1,3.5,5.3,0,5.4C30.4,591.5,30.4,586.3,33.9,586.2z" />
        </g>
      </g>
      <g id="burn">
        <linearGradient
          id="SVGID_00000170999235998428491440000003501391148675526274_"
          gradientUnits="userSpaceOnUse"
          x1="221.967"
          y1="1140.7488"
          x2="146.516"
          y2="1140.7488"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000170999235998428491440000003501391148675526274_)"
          d="M152.3,409.3l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
     v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2H156c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
     l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C147.2,415.2,149.5,410.9,152.3,409.3z M154.5,508.9l76.7-43.1c0.6-0.4,1.2-1.3,1.2-2.2
     v-91.5l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L154.5,508.9L154.5,508.9z"
        />
        <path
          opacity="0.6"
          fill="#0F054C"
          enableBackground="new    "
          d="M148.9,413.1l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
     c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C147.2,416.9,147.9,414.9,148.9,413.1L148.9,413.1z
     "
        />

        <linearGradient
          id="SVGID_00000052098033969115833310000005199704736213499569_"
          gradientUnits="userSpaceOnUse"
          x1="242.229"
          y1="1139.0936"
          x2="152.383"
          y2="1139.0936"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000052098033969115833310000005199704736213499569_)"
          d="M157.5,412.2l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     V464c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C152.4,418.1,154.7,413.8,157.5,412.2L157.5,412.2z M157,511.8
     c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V511.8
     L157,511.8z"
        />

        <linearGradient
          id="SVGID_00000038396203550170263450000001793922366845929662_"
          gradientUnits="userSpaceOnUse"
          x1="254.638"
          y1="1139.0936"
          x2="92.539"
          y2="1139.0936"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#706EC4" />
          <stop offset="2.200000e-02" stopColor="#6D6BC2" />
          <stop offset="0.251" stopColor="#5651AC" />
          <stop offset="0.486" stopColor="#463F9D" />
          <stop offset="0.731" stopColor="#3C3494" />
          <stop offset="1" stopColor="#393091" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000038396203550170263450000001793922366845929662_)"
          d="M157.5,412.2l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     V464c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C152.4,418.1,154.7,413.8,157.5,412.2L157.5,412.2z M157,511.8
     c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V511.8
     L157,511.8z"
        />
        <path
          fill="#251C72"
          d="M231.3,465.8c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
     l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L231.3,465.8L231.3,465.8z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M157,511.8c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
     c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V511.8L157,511.8z"
        />
        <g>
          <path
            fill="none"
            stroke="#41FFFF"
            strokeWidth="4"
            d="M196.9,410.1c-4.9,5.6-8.1,15-8.1,22.8c0,3.7,0.7,5.8,3,9.1
       c1,1.4,1.2,2.1,1.2,3.1c-0.1,2.1-2,4.6-3.8,5.2c-0.9,0.3-1.3,0.2-2-0.5c-0.9-1-1.8-2.9-2.8-5.7c-0.4-1.3-0.7-1.8-1.2-2.2
       c-2.3-1.4-4.6,5.5-5.2,8.4c-4.9,21.2,8.5,30.7,24.6,18c9.5-7.8,16.5-20.8,17.3-32.7c0.4-5.1-0.6-8.4-3.2-10.9
       c-2.1-2-4.4-3.2-7.9-3.9c-1.1-0.2-2.4-0.6-2.8-0.9c-1.8-1-3.5-4.2-4.5-8.4c-0.6-2.7-0.7-2.8-1.2-3.1
       C199.3,408.1,198.1,408.6,196.9,410.1L196.9,410.1z"
          />
        </g>
      </g>
      <g id="battles">
        <linearGradient
          id="SVGID_00000032645311716810207580000000668580766907983260_"
          gradientUnits="userSpaceOnUse"
          x1="333.2453"
          y1="1204.6161"
          x2="257.7943"
          y2="1204.6161"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000032645311716810207580000000668580766907983260_)"
          d="M263.6,345.4l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
     v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2h-2.4c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
     l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1V355C258.5,351.3,260.8,347,263.6,345.4L263.6,345.4z M265.8,445l76.7-43.1
     c0.6-0.4,1.2-1.3,1.2-2.2v-91.5l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L265.8,445z"
        />
        <path
          opacity="0.6"
          fill="#0F054C"
          enableBackground="new    "
          d="M260.1,349.2l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
     c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1V355C258.5,353.1,259.1,351,260.1,349.2L260.1,349.2z"
        />

        <linearGradient
          id="SVGID_00000014617533163954105950000016859197813502041243_"
          gradientUnits="userSpaceOnUse"
          x1="353.5073"
          y1="1202.9608"
          x2="263.6613"
          y2="1202.9608"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000014617533163954105950000016859197813502041243_)"
          d="M268.8,348.3l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C263.7,354.2,265.9,349.9,268.8,348.3L268.8,348.3z
      M268.3,447.9c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
     c-0.6,0.4-1.2,1.3-1.2,2.2V447.9z"
        />

        <linearGradient
          id="SVGID_00000173860777429912102690000013877387755530945693_"
          gradientUnits="userSpaceOnUse"
          x1="365.9163"
          y1="1202.9608"
          x2="203.8173"
          y2="1202.9608"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#706EC4" />
          <stop offset="2.200000e-02" stopColor="#6D6BC2" />
          <stop offset="0.251" stopColor="#5651AC" />
          <stop offset="0.486" stopColor="#463F9D" />
          <stop offset="0.731" stopColor="#3C3494" />
          <stop offset="1" stopColor="#393091" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000173860777429912102690000013877387755530945693_)"
          d="M268.8,348.3l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C263.7,354.2,265.9,349.9,268.8,348.3L268.8,348.3z
      M268.3,447.9c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
     c-0.6,0.4-1.2,1.3-1.2,2.2V447.9z"
        />
        <path
          fill="#251C72"
          d="M342.5,402c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
     l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L342.5,402z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M268.3,447.9c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
     c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V447.9z"
        />
        <path
          fill="#41FFFF"
          stroke="#41FFFF"
          strokeWidth="0.558"
          d="M318.3,380.7c0.8-1.3,2.3-4,3.1-5.4 M318.3,380.7
     c-1.4,2.3-3.2,5.6-4.6,7.9c-1.2-0.7-3.6-2.1-4.8-2.8c0.8-1.4,2.4-4.1,3.2-5.5 M318.3,380.7l3.1-5.4 M312.1,380.4
     c1.3-2.3,3.2-5.5,4.5-7.8 M312.1,380.4l4.5-7.8 M316.6,372.6c1.2,0.7,3.6,2.1,4.8,2.8 M316.6,372.6l4.8,2.8 M331,333.9
     c-0.7,0.6-10.1,8.8-12.4,10.9c-2.8,4.8-8.4,14.5-11.1,19.3c-2.5-1.5-7.6-4.4-10.2-5.8l-6.1,1.7c-3.4,0.9-6.3,1.8-6.5,1.9
     c-0.4,0.2-0.9,1-0.9,1.5c0.1,0.8,2.6,10.5,3.2,13c2.5,1.5,7.6,4.4,10.1,5.8c-0.7,1.2-3.6,6.2-3.8,6.5c-0.1,0-0.3,0-0.5-0.2
     c-2.4-1.5-6.3,3.7-4.9,6.5c0.2,0.5,2,1.5,2.7,1.9c-1.6,2.7-4.7,8.1-6.3,10.8l-0.8-0.5c-0.9-0.5-1.2-0.5-1.7,0.1
     c-0.2,0.2-1.3,2.1-2.6,4.3c-3.1,5.5-2.7,4.3-0.5,5.9c-2.7,7,2.2,9.7,6.8,4c0.8,0.3,1.6,1.1,2.2,0.7c0.4-0.3,0.6-0.5,2.8-4.3
     c3.2-5.7,2.9-4.5,0.6-6c1.6-2.7,4.7-8.1,6.3-10.8c0.8,0.4,3.1,1.8,3.6,1.8c2.3-0.3,4.2-3.1,4.2-5.3c0.1-1.6-0.4-2-1.5-2.6
     c1-1.6,2.9-5,3.8-6.6c1.2,0.7,3.6,2.1,4.8,2.8c-0.7,1.3-1.6,2.9-1.5,4.1c0,2,1.3,2.7,2.9,1.7c1-0.6,1.6-1.3,3.3-4.2
     c0.8-1.5,1.6-2.7,1.6-2.7c0.1-0.1,6.1,3.4,6.1,3.5c0,0.1-0.4,0.8-0.8,1.5c-1.2,2.2-1.3,2.1,1.5,3.7c1.2,0.7,2.4,1.3,2.6,1.3
     c0.6,0.1,1.9-2.3,2.5-3.4c3.4,0.4,7.7-4.7,7.6-9.1c0-1.6-0.2-1.7-0.7-2.8l0.9-1.5c1.3-2.3,1.4-2.2-1.5-3.8
     c-2.2-1.3-2.4-1.3-2.8-1.1c-0.4,0-1.7,2.4-2.2,3.1c-1.6-0.9-4.7-2.7-6.2-3.6c0.8-1.3,2.8-4.8,2.8-5.5c0.4-2-0.2-3.3-1.6-3.2
     c-1.4,0-3.1,2-3.9,3.8c-1.2-0.7-3.6-2.1-4.8-2.8l5.5-9.6c4.8-8.2,5.5-9.7,5.7-10.2c1.8-9.2,3.1-15.8,3.1-16c0-0.4-0.4-0.7-0.7-0.6
     C331.3,333.7,331.2,333.8,331,333.9L331,333.9z M328.5,344.1l-1.3,6.8c-6.2,10.8-18.7,32.5-25,43.2c-2.5-1.4-5-2.9-7.7-4.4
     c6.2-10.8,18.8-32.5,25-43.3c1.9-1.6,9.7-8.5,10.2-8.9C329.8,337.4,329.3,340.4,328.5,344.1L328.5,344.1z M291.2,362.3l5.1-1.4
     c2.4,1.4,7.3,4.2,9.7,5.6c-1.9,3.3-4.1,7.2-6,10.4c-0.8,1.4-1.6,2.7-1.6,2.7c-0.5-0.1-7.9-4.4-9.7-5.5c-0.5-1.9-2.5-10-2.6-10.5
     C286.1,363.7,288.4,363.1,291.2,362.3L291.2,362.3z M296.9,394.3c3.4,2,6.2,3.7,6.3,3.8c0.2,0.7-0.5,1.8-1.2,2
     c-0.4,0.1-12.2-6.6-12.5-7.1c-0.2-0.4-0.1-0.9,0.3-1.5C290.5,390.5,290.3,390.4,296.9,394.3L296.9,394.3z M326.1,371.7
     c0.4,0.1,0.5,0.6,0.3,1.2c-0.1,0.3-2.9,5.2-6.2,10.9c-5.5,9.2-6.1,11.3-7.2,10.9c-0.9-0.8,0.2-1.7,5.9-11.9
     C325.6,371.2,325.5,371.4,326.1,371.7z M293.9,399l2,1.2c-1.6,2.7-4.7,8.2-6.3,10.9c-1-0.6-3.1-1.8-4.1-2.4
     c1.1-2,5.9-10.3,6.3-10.8C291.8,397.8,292.8,398.3,293.9,399L293.9,399z M327.3,382l3.1,1.8c-1,1.8-3.2,5.5-4.2,7.3
     c-1.6-0.9-4.7-2.7-6.3-3.6c0.8-1.3,4-6.9,4.2-7.2C324.2,380.2,325.6,381,327.3,382L327.3,382z M289,417.1l-1.4,2.4
     c-2.1-1.2-6.3-3.6-8.4-4.8c0.7-1.2,2.1-3.6,2.8-4.8c2.1,1.2,6.3,3.6,8.4,4.8L289,417.1L289,417.1z M332.6,389.8l-4.2,7.3
     c-0.7-0.4-2.1-1.2-2.8-1.6c2.1-3.6,6.3-10.9,8.4-14.5c0.7,0.4,2.1,1.2,2.8,1.6L332.6,389.8z M283.8,420.8c-2.4,2.3-4.9,1.4-3.8-2.4
     C280.7,418.8,283.8,420.5,283.8,420.8z M336.2,388.2c0.1,1.3-0.5,3-1.5,4.3c-0.4,0.6-1.9,1.5-2.5,1.6c-0.1,0,0.8-1.6,1.8-3.4
     C336.1,387,336,387,336.2,388.2L336.2,388.2z"
        />
      </g>
      <g id="renting">
        <linearGradient
          id="SVGID_00000005988598549776466350000014964895087878865819_"
          gradientUnits="userSpaceOnUse"
          x1="662.4549"
          y1="1392.9878"
          x2="587.0029"
          y2="1392.9878"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000005988598549776466350000014964895087878865819_)"
          d="M592.8,157.1l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
     v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2h-2.4c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
     l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C587.7,162.9,590,158.7,592.8,157.1L592.8,157.1z M595,256.6l76.7-43.1
     c0.6-0.4,1.2-1.3,1.2-2.2v-91.5l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L595,256.6L595,256.6z"
        />
        <path
          opacity="0.6"
          fill="#0F054C"
          enableBackground="new    "
          d="M589.3,160.8l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
     c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C587.7,164.7,588.3,162.6,589.3,160.8L589.3,160.8z
     "
        />

        <linearGradient
          id="SVGID_00000065789748351214994950000016615201026777382282_"
          gradientUnits="userSpaceOnUse"
          x1="682.7159"
          y1="1391.3324"
          x2="592.8709"
          y2="1391.3324"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000065789748351214994950000016615201026777382282_)"
          d="M598,160l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8v92.8
     c0,3.7-2.3,8-5.1,9.6L598,266.1c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C592.9,165.8,595.2,161.6,598,160L598,160z M597.5,259.5
     c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V259.5
     z"
        />

        <linearGradient
          id="SVGID_00000158748191362826063700000004095639696868982958_"
          gradientUnits="userSpaceOnUse"
          x1="695.1259"
          y1="1391.3324"
          x2="533.0259"
          y2="1391.3324"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#706EC4" />
          <stop offset="2.200000e-02" stopColor="#6D6BC2" />
          <stop offset="0.251" stopColor="#5651AC" />
          <stop offset="0.486" stopColor="#463F9D" />
          <stop offset="0.731" stopColor="#3C3494" />
          <stop offset="1" stopColor="#393091" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000158748191362826063700000004095639696868982958_)"
          d="M598,160l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8v92.8
     c0,3.7-2.3,8-5.1,9.6L598,266.1c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C592.9,165.8,595.2,161.6,598,160L598,160z M597.5,259.5
     c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V259.5
     z"
        />
        <path
          fill="#251C72"
          d="M671.7,213.6c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
     l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L671.7,213.6L671.7,213.6z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M597.5,259.5c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
     c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V259.5z"
        />
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#41FFFF"
            stroke="#41FFFF"
            strokeWidth="0.558"
            d="M627.5,161.8
       c-3.1,2.3-6.1,6.3-7.5,9.6c-8.2,3.5-15.4,14.9-15.2,23.9c-0.1,3.8,1.1,7,4,8.7c-0.4,2.2-2.2,10.8-2.3,11.5c0,0.2,1.1,2.4,1.1,2.6
       c0,0.2-2.4,3.4-2.4,3.6c-0.2,0.6-0.1,1.1,0.5,2.2c0.3,0.6,0.6,1.1,0.5,1.2c-0.1,0.2-2.3,3-2.4,3.2c-0.5,0.8,0.4,2.4,0.9,3.4
       c-0.8,1-2.8,3.1-2.5,3.8c0,0.5,3.3,5.8,3.7,5.9c0.2,0.1,0.4,0,0.6,0c0.3-0.2,6.2-7.4,6.7-8.3c0.3-0.5,0.8-2.7,3.5-15.2
       c1.7-8,3.3-15,3.4-15.5c0.2-0.9,0.2-0.9,1.2-1.8c3.7-3.4,7-9.1,8.5-14.4c1.3-0.9,2.9-2.5,3.9-3.4c0,0,0.2,1.5,0.3,3.3
       c0.2,2.8,0.3,3.3,0.6,3.9c0.3,0.5,2.5,1.9,10.9,6.7c9.2,5.3,10.6,6.1,11,5.8c0.4-0.2,1.5-2.2,9.2-15.4c4.8-8.4,8.9-15.4,9-15.8
       c0.1-0.3,0.2-0.7,0.2-0.9c0-0.3-2.7-1.9-10.3-6.3c-5.6-3.3-10.5-6-10.9-6.1c-0.4-0.1-0.8-0.1-1.2,0c-0.3-0.1-12.4,5.7-12.6,5.8
       c-0.2,0.1-0.4,0-0.4-0.2C637.6,157.8,631.8,158.6,627.5,161.8L627.5,161.8z M630.4,162.8c2.8-1.2,5.7-0.4,6.8,2.2
       c0.1,0.3,0,0.4-0.6,1c-3.1,3.4-3.8,5.9-3.2,11.2c0.1,1.2,0.2,2.3,0.2,2.5c0,0.5-2,2.5-2.9,3.2c0.9-5.3-0.9-12.1-7.1-12
       c-1.1,0-1.2,0-0.9-0.4C624.3,167.4,627.3,164,630.4,162.8L630.4,162.8z M618.5,175.5c-0.3,0.9-0.3,2.4-1,3c-1.8,1.7-4,7.1-1.4,8.5
       c4.4,2.2,10.2-9.6,5-10.3c-0.4,0-0.6-0.1-0.6-0.2c0-0.3,0.4-2,0.5-2.3c0.2-0.4,2.2-0.5,3.4-0.1c1.7,0.5,3.2,2.3,3.8,4.5
       c0.3,1,0.4,4.2,0.2,5.2c-0.1,0.5-0.1,0.5-0.9,0.8c-1,0.4-2.4,0.6-3.4,0.4c-0.7-0.1-0.9-0.1-1.3,0.2c-0.8,0.6-1.2,1.9-0.8,2.5
       c0.3,0.5,2.9,0.6,4.3,0.1c0.4-0.1,0.8-0.2,0.9-0.3c0.3-0.1-0.6,2.1-1.5,4c-1.6,3-3.4,5.4-5.6,7.4c-0.6,0.5-1.3,1.2-1.4,1.4
       c-0.2,0.3-1.4,5.9-3.6,16.1c-1.9,8.6-3.4,15.7-3.5,15.8c-0.3,0.5-4.2,5.3-4.3,5.3c-0.2-0.2-1.7-2.5-2.1-3.1
       c0.9-1.1,2.8-3.3,2.5-3.9c0.1-0.4-1.1-2.3-1.1-2.6c0-0.1,0.5-0.7,1-1.4c2.5-3,1.4-3.1,0.4-5.3c0-0.1,0.4-0.6,0.9-1.3
       c1.9-2.5,2-2.8,1-4.8c-0.4-0.7-0.7-1.4-0.6-1.6c-0.1,0,2.4-12.1,2.2-12c-0.1-0.1-0.6-0.6-1.2-1c-2.4-1.6-3-4.1-2.9-7.3
       c0.2-7.4,5.3-15.3,11.5-18.4L618.5,175.5L618.5,175.5z M645.1,164.1c4.2-2,6.6-3.1,7-3.1c0.5-0.2,16.6,9.3,20.2,11.3
       c-3.9,6.7-11.7,20.2-15.6,26.9c-3.5-2.1-19.7-11.3-19.9-11.8c0-0.2-0.4-3.7-0.7-7.8c-0.7-8.2-0.7-8.2,0.1-9.8
       c0.6-1.2,1.2-1.9,1.9-2.3C638.4,167.3,641.5,165.8,645.1,164.1L645.1,164.1z M620.2,180c1.3,0.4,0.3,3.4-1.1,4.1
       c-1.1,0.7-1.8,0.2-1.8-1.1c0-1,0.8-2.3,1.7-2.8C619.5,179.8,619.7,179.8,620.2,180z M652.7,172.1c-0.3,0.4-1.8,2.9-3.3,5.6
       c-2.5,4.3-2.7,4.8-2.7,5.3c0,1.1,0.8,1.2,1.7,0.3c0.2-0.3,1.7-2.8,3.3-5.6c2.7-4.8,2.9-5.2,2.9-5.7c0-0.4-0.1-0.6-0.4-0.8
       C653.6,171,653.4,171.2,652.7,172.1L652.7,172.1z M656.5,180.8c-1.7,3-3.2,5.6-3.2,5.9c-0.2,1.1,0.8,1.4,1.6,0.5
       c0.2-0.2,1.8-2.8,3.4-5.7c3.3-5.8,3.4-5.9,2.6-6.4C660.1,174.7,660,174.8,656.5,180.8z"
          />
          <path
            fill="#41FFFF"
            stroke="#41FFFF"
            strokeWidth="0.558"
            d="M627.5,161.8c-3.1,2.3-6.1,6.3-7.5,9.6
       c-8.2,3.5-15.4,14.9-15.2,23.9c-0.1,3.8,1.1,7,4,8.7c-0.4,2.2-2.2,10.8-2.3,11.5c0,0.2,1.1,2.4,1.1,2.6c0,0.2-2.4,3.4-2.4,3.6
       c-0.2,0.6-0.1,1.1,0.5,2.2c0.3,0.6,0.6,1.1,0.5,1.2c-0.1,0.2-2.3,3-2.4,3.2c-0.5,0.8,0.4,2.4,0.9,3.4c-0.8,1-2.8,3.1-2.5,3.8
       c0,0.5,3.3,5.8,3.7,5.9c0.2,0.1,0.4,0,0.6,0c0.3-0.2,6.2-7.4,6.7-8.3c0.3-0.5,0.8-2.7,3.5-15.2c1.7-8,3.3-15,3.4-15.5
       c0.2-0.9,0.2-0.9,1.2-1.8c3.7-3.4,7-9.1,8.5-14.4c1.3-0.9,2.9-2.5,3.9-3.4c0,0,0.2,1.5,0.3,3.3c0.2,2.8,0.3,3.3,0.6,3.9
       c0.3,0.5,2.5,1.9,10.9,6.7c9.2,5.3,10.6,6.1,11,5.8c0.4-0.2,1.5-2.2,9.2-15.4c4.8-8.4,8.9-15.4,9-15.8c0.1-0.3,0.2-0.7,0.2-0.9
       c0-0.3-2.7-1.9-10.3-6.3c-5.6-3.3-10.5-6-10.9-6.1c-0.4-0.1-0.8-0.1-1.2,0c-0.3-0.1-12.4,5.7-12.6,5.8c-0.2,0.1-0.4,0-0.4-0.2
       C637.6,157.8,631.8,158.6,627.5,161.8L627.5,161.8z M630.4,162.8c2.8-1.2,5.7-0.4,6.8,2.2c0.1,0.3,0,0.4-0.6,1
       c-3.1,3.4-3.8,5.9-3.2,11.2c0.1,1.2,0.2,2.3,0.2,2.5c0,0.5-2,2.5-2.9,3.2c0.9-5.3-0.9-12.1-7.1-12c-1.1,0-1.2,0-0.9-0.4
       C624.3,167.4,627.3,164,630.4,162.8L630.4,162.8z M618.5,175.5c-0.3,0.9-0.3,2.4-1,3c-1.8,1.7-4,7.1-1.4,8.5
       c4.4,2.2,10.2-9.6,5-10.3c-0.4,0-0.6-0.1-0.6-0.2c0-0.3,0.4-2,0.5-2.3c0.2-0.4,2.2-0.5,3.4-0.1c1.7,0.5,3.2,2.3,3.8,4.5
       c0.3,1,0.4,4.2,0.2,5.2c-0.1,0.5-0.1,0.5-0.9,0.8c-1,0.4-2.4,0.6-3.4,0.4c-0.7-0.1-0.9-0.1-1.3,0.2c-0.8,0.6-1.2,1.9-0.8,2.5
       c0.3,0.5,2.9,0.6,4.3,0.1c0.4-0.1,0.8-0.2,0.9-0.3c0.3-0.1-0.6,2.1-1.5,4c-1.6,3-3.4,5.4-5.6,7.4c-0.6,0.5-1.3,1.2-1.4,1.4
       c-0.2,0.3-1.4,5.9-3.6,16.1c-1.9,8.6-3.4,15.7-3.5,15.8c-0.3,0.5-4.2,5.3-4.3,5.3c-0.2-0.2-1.7-2.5-2.1-3.1
       c0.9-1.1,2.8-3.3,2.5-3.9c0.1-0.4-1.1-2.3-1.1-2.6c0-0.1,0.5-0.7,1-1.4c2.5-3,1.4-3.1,0.4-5.3c0-0.1,0.4-0.6,0.9-1.3
       c1.9-2.5,2-2.8,1-4.8c-0.4-0.7-0.7-1.4-0.6-1.6c-0.1,0,2.4-12.1,2.2-12c-0.1-0.1-0.6-0.6-1.2-1c-2.4-1.6-3-4.1-2.9-7.3
       c0.2-7.4,5.3-15.3,11.5-18.4L618.5,175.5L618.5,175.5z M645.1,164.1c4.2-2,6.6-3.1,7-3.1c0.5-0.2,16.6,9.3,20.2,11.3
       c-3.9,6.7-11.7,20.2-15.6,26.9c-3.5-2.1-19.7-11.3-19.9-11.8c0-0.2-0.4-3.7-0.7-7.8c-0.7-8.2-0.7-8.2,0.1-9.8
       c0.6-1.2,1.2-1.9,1.9-2.3C638.4,167.3,641.5,165.8,645.1,164.1L645.1,164.1z M620.2,180c1.3,0.4,0.3,3.4-1.1,4.1
       c-1.1,0.7-1.8,0.2-1.8-1.1c0-1,0.8-2.3,1.7-2.8C619.5,179.8,619.7,179.8,620.2,180z M652.7,172.1c-0.3,0.4-1.8,2.9-3.3,5.6
       c-2.5,4.3-2.7,4.8-2.7,5.3c0,1.1,0.8,1.2,1.7,0.3c0.2-0.3,1.7-2.8,3.3-5.6c2.7-4.8,2.9-5.2,2.9-5.7c0-0.4-0.1-0.6-0.4-0.8
       C653.6,171,653.4,171.2,652.7,172.1L652.7,172.1z M656.5,180.8c-1.7,3-3.2,5.6-3.2,5.9c-0.2,1.1,0.8,1.4,1.6,0.5
       c0.2-0.2,1.8-2.8,3.4-5.7c3.3-5.8,3.4-5.9,2.6-6.4C660.1,174.7,660,174.8,656.5,180.8z"
          />
        </g>
      </g>
      <g id="quests">
        <linearGradient
          id="SVGID_00000158708689114918980980000015036727999269848479_"
          gradientUnits="userSpaceOnUse"
          x1="552.362"
          y1="1328.874"
          x2="476.91"
          y2="1328.874"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000158708689114918980980000015036727999269848479_)"
          d="M482.7,221.2l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
     v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2h-2.4c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
     l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C477.6,227,479.9,222.8,482.7,221.2L482.7,221.2z M484.9,320.8l76.7-43.1
     c0.6-0.4,1.2-1.3,1.2-2.2V184l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L484.9,320.8L484.9,320.8z"
        />
        <path
          opacity="0.6"
          fill="#0F054C"
          enableBackground="new    "
          d="M479.2,225l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
     c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C477.6,228.8,478.3,226.7,479.2,225L479.2,225z"
        />

        <linearGradient
          id="SVGID_00000077295330393773322150000007870788299544327072_"
          gradientUnits="userSpaceOnUse"
          x1="572.623"
          y1="1327.219"
          x2="482.778"
          y2="1327.219"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000077295330393773322150000007870788299544327072_)"
          d="M487.9,224.1l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C482.8,230,485.1,225.7,487.9,224.1L487.9,224.1z
      M487.4,323.6c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
     c-0.6,0.4-1.2,1.3-1.2,2.2C487.4,231.1,487.4,323.6,487.4,323.6z"
        />

        <linearGradient
          id="SVGID_00000070119100825389528790000010002223399100886193_"
          gradientUnits="userSpaceOnUse"
          x1="585.033"
          y1="1327.219"
          x2="422.933"
          y2="1327.219"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#706EC4" />
          <stop offset="2.200000e-02" stopColor="#6D6BC2" />
          <stop offset="0.251" stopColor="#5651AC" />
          <stop offset="0.486" stopColor="#463F9D" />
          <stop offset="0.731" stopColor="#3C3494" />
          <stop offset="1" stopColor="#393091" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000070119100825389528790000010002223399100886193_)"
          d="M487.9,224.1l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C482.8,230,485.1,225.7,487.9,224.1L487.9,224.1z
      M487.4,323.6c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
     c-0.6,0.4-1.2,1.3-1.2,2.2C487.4,231.1,487.4,323.6,487.4,323.6z"
        />
        <path
          fill="#251C72"
          d="M561.6,277.7c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
     l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L561.6,277.7L561.6,277.7z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M487.4,323.6c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
     c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2L487.4,323.6L487.4,323.6z"
        />
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#41FFFF"
            stroke="#41FFFF"
            strokeWidth="0.558"
            d="M506.6,232
       c-1,0.9-1.8,1.8-2.5,3.2c-2.5,4.3-2.4,9.4,2,9.2v8.1c0,5,0,8.4,0.1,9.1c0.7,5.5,4.2,8.4,9.1,7.7c0.6-0.1,0.9-0.1,0.9,0.1
       c-0.4,1.5-0.6,4,0.2,5.2c0.8,1.4,2.6,1.7,4.2,1c0,1.8,0,5.5,0.1,7.3c-2.8,1.4-5.5,4.7-6.6,7.9c-0.4,1.2-1.9,7-1.9,7.5
       c0,0.7,0.4,1.2,1,1.2c0.5,0,0.7-0.1,12.9-7.2c12.3-7.1,12.5-7.2,12.9-7.8c0.5-0.6,1-1.7,1-2.3c0-0.6-1.5-4.7-1.9-5.5
       c-0.5-0.8-1.8-1.5-2.8-1.5c-1.1,0-2.7,0.6-3.7,1.3c0-1.8,0-5.5,0.1-7.3c3.2-2.3,5.7-7.7,4.4-11.3c0-0.1,0.3-0.5,0.9-1.1
       c4-3.9,7.2-9.6,8.5-14.9c0.7-2.7,0.7-3.5,0.7-12.4v-8.1c1.6-1.6,3.1-4.2,3.5-6.4c0.8-3.8-1.2-6.2-4.2-5.2
       C544.3,210,507.4,231.3,506.6,232L506.6,232z M545,214.1c1.7,0.3,0.8,2.7,0,3.7c-0.4,0.5-1,0.9-19,11.2l-18.5,10.7
       c-1.7,0.1-1.9-1.8-0.5-3.6c0,0,0.5-0.6,0.5-0.6l18.5-10.7C544.4,214.2,544.6,214.1,545,214.1L545,214.1z M542.3,232.1l0,8.4
       c-1.1,5.7-4,10.9-8.5,14.7c-3.9,2.2-11.7,6.8-15.6,9c-4.6,1.3-7.3-0.3-8.5-4.9c0-4.1-0.1-12.5-0.1-16.6
       c8.1-4.7,24.5-14.2,32.7-18.9L542.3,232.1z M525.2,238.2c-0.4,0.5-0.7,1.2-2.3,5.2c-2.2,5.5-2.3,5.7-2.3,6.2c0,0.6,0,0.6,2.3,3.6
       c1.6,2.2,1.9,2.5,2.3,2.5c0.6,0,1.1-0.3,1.7-1c0.4-0.5,0.7-1.1,2.3-5.2c2.2-5.5,2.3-5.7,2.3-6.2s0-0.6-2.3-3.6
       c-1.6-2.2-1.9-2.5-2.3-2.5C526.3,237.2,525.7,237.5,525.2,238.2L525.2,238.2z M514.3,247.3c-0.3,0.4-0.5,0.8-0.7,1.2
       c-0.2,0.7-0.2,1-0.2,5.3c0,4.4,0,4.6,0.2,5c1.1,1.3,2.7-0.6,3.1-1.8c0.2-0.7,0.2-1,0.2-5.3c0-4.4,0-4.6-0.2-5
       C516.3,245.9,515.2,246.2,514.3,247.3L514.3,247.3z M536,234.7c-0.3,0.4-0.5,0.8-0.7,1.2c-0.2,0.7-0.2,1-0.2,5.3
       c0,4.4,0,4.6,0.2,5c1.1,1.3,2.7-0.6,3.1-1.8c0.2-0.7,0.2-1,0.2-5.3s0-4.6-0.2-5C538,233.3,537,233.6,536,234.7z M526.8,244.6
       c0.4,0.5,0.7,1,0.7,1.1c0,0.2-1.4,3.6-1.5,3.6c-0.1,0-1.5-1.8-1.5-2c0-0.2,1.4-3.6,1.5-3.6C526.1,243.6,526.4,244.1,526.8,244.6
       L526.8,244.6z M531.7,260.9c1.7,0.3,0.8,2.7,0,3.7c-0.4,0.5-0.8,0.7-5.7,3.5c-5.2,3-5.2,3-5.7,3c-1.2-0.1-1.2-2,0-3.5l0.5-0.6
       l5.2-3C531,261,531.3,260.9,531.7,260.9L531.7,260.9z M527.8,274.9v3.6c-0.9,0.5-2.7,1.6-3.6,2.1v-7.3c0.9-0.5,2.7-1.6,3.6-2.1
       C527.8,271.3,527.8,274.9,527.8,274.9z M533.2,279.8c0.6-0.1,1.3,0.1,1.6,0.5c0.2,0.2,0.7,1.7,0.8,2c0,0.1-1.9,1.3-9.5,5.7
       c-7.6,4.4-9.6,5.5-9.5,5.3c0.3-1.1,0.8-3.3,1.5-4.1c0.9-1.3,0.8-1.2,8.1-5.4C531.3,280.7,532.8,279.9,533.2,279.8L533.2,279.8z"
          />
        </g>
      </g>
      <g id="loans">
        <linearGradient
          id="SVGID_00000127013280432862352410000012105402242504881563_"
          gradientUnits="userSpaceOnUse"
          x1="442.8976"
          y1="1266.8951"
          x2="367.4456"
          y2="1266.8951"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000127013280432862352410000012105402242504881563_)"
          d="M373.3,283.2l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
     v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2H377c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
     l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C368.2,289,370.5,284.8,373.3,283.2L373.3,283.2z M375.5,382.7l76.7-43.1
     c0.6-0.4,1.2-1.3,1.2-2.2V246l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L375.5,382.7z"
        />
        <path
          opacity="0.6"
          fill="#0F054C"
          enableBackground="new    "
          d="M369.8,286.9l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
     c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C368.2,290.8,368.8,288.7,369.8,286.9L369.8,286.9z
     "
        />

        <linearGradient
          id="SVGID_00000132071360534964247380000008242228802192506280_"
          gradientUnits="userSpaceOnUse"
          x1="463.1595"
          y1="1265.2397"
          x2="373.3135"
          y2="1265.2397"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#BCBEFF" />
          <stop offset="0.166" stopColor="#B6B8FC" />
          <stop offset="0.396" stopColor="#A4A8F5" />
          <stop offset="0.662" stopColor="#868DEA" />
          <stop offset="0.955" stopColor="#5E67DA" />
          <stop offset="1" stopColor="#5761D7" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000132071360534964247380000008242228802192506280_)"
          d="M378.4,286.1l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C373.3,291.9,375.6,287.7,378.4,286.1z M378,385.6
     c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2
     C378,293.1,378,385.6,378,385.6z"
        />

        <linearGradient
          id="SVGID_00000078021760757570962820000008959799668551506565_"
          gradientUnits="userSpaceOnUse"
          x1="475.5685"
          y1="1265.2397"
          x2="313.4686"
          y2="1265.2397"
          gradientTransform="matrix(1 0 0 -1 0 1582)"
        >
          <stop offset="0" stopColor="#706EC4" />
          <stop offset="2.200000e-02" stopColor="#6D6BC2" />
          <stop offset="0.251" stopColor="#5651AC" />
          <stop offset="0.486" stopColor="#463F9D" />
          <stop offset="0.731" stopColor="#3C3494" />
          <stop offset="1" stopColor="#393091" />
        </linearGradient>
        <path
          fill="url(#SVGID_00000078021760757570962820000008959799668551506565_)"
          d="M378.4,286.1l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
     v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C373.3,291.9,375.6,287.7,378.4,286.1z M378,385.6
     c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2
     C378,293.1,378,385.6,378,385.6z"
        />
        <path
          fill="#251C72"
          d="M452.2,339.7c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
     l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L452.2,339.7z"
        />
        <path
          opacity="0.4"
          fill="#42E8E0"
          enableBackground="new    "
          d="M378,385.6c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
     c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2C378,293.1,378,385.6,378,385.6z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#41FFFF"
          stroke="#41FFFF"
          strokeWidth="0.558"
          d="M411.9,283
     c-0.9,1-2.3,3.4-3.4,3.9c-0.4,0.2-1.1,1.3-1.1,1.8c0.1,0.6,3.9,7.1,4.9,8.8l-0.7,1.2c-1,1.7-1.2,3.4-0.7,4.4
     c0.1,0.3,0.2,0.5,0.2,0.6c-7.9,7.2-14,17.9-16,28.4c-0.6,2.9-0.6,3.7-0.6,16.9c0,12.1,0,12.7,0.2,13.4c0.6,1.8,2.1,2.5,4.1,1.8
     c0.5-0.2,6.2-3.4,20.8-11.9c19.2-11.1,20-11.6,20.6-12.2c4.6-5.9,3.4-4.6,3.6-20.2c0-14.4,0-13.9-0.8-16.6
     c-2.2-7.8-8.5-10.8-15.8-9c0-0.3,0.3-1,0.5-1.1c0.1-0.1,0.7-0.1,1.2-0.1c2.4,0,4.3-1.5,6-4.7c0.7-1.3,0.9-1.7,1.5-2.2
     c0.8-0.7,1.4-1,2.3-0.8c0.9,0.1,2.5-0.4,3.1-1c0.2-0.2,0.2-0.3,0-1.2c-0.1-0.6-0.2-1-0.2-1c-0.4,0.1-1.6,0.5-2.1,0.4
     c-0.8-0.1-2,0.2-2.9,0.8c-1.3,1-2,1.7-3.1,3.8c-0.9,1.6-1.2,2-1.7,2.4c-0.8,0.7-1,0.6-0.3-0.1c1.3-1.4,2.3-3.6,2.5-5.5
     c0.4-2.4,0.8-3.3,3-4.7c1.4-0.8,2.4-1.9,3-2.9c0-0.2-1-0.9-1.3-1.1c-0.6,0.8-0.7,0.9-2.1,1.8c-2.8,1.8-4.2,4.1-4.7,7.4
     c-0.3,2.1-1.1,3.3-2.7,4.3c-0.5,0.3-1.1,0.7-1.4,1c-0.5,0.4-0.5,0.4-1.2,0.1l-0.6-0.3c0.9-2.7,4.8-13.6,4.9-14.5
     c0-0.5-0.7-0.8-1.2-0.5c-0.6,0.4-1.2,0.4-2,0.1c-1.2-0.4-1.8-0.3-3.2,0.5c-1.5,0.9-2.1,1.4-3,2.8c-1.8,2.7-3,3.5-4.7,2.9
     C415.9,280.1,412.8,281.9,411.9,283L411.9,283z M414.7,283.5c0.2,0,0.8,0,1.1,0.1c0.5,0.1,1,0.2,1.4,0.2c1.1,0,3.1-1.3,3.8-2.2
     c1.4-1.6,3.2-5,5.1-4.3c0.6,0.2,1.5,0.3,1.9,0.4c0,0,0,0,0,0c0.5-0.6-3.7,11-4.2,12.6c-2.4,1.4-7.1,4.1-9.4,5.5
     c-0.8-1.4-4.2-7.2-4.3-7.6c0.4-0.5,1.1-1.4,1.6-2.2C412.9,284.4,413.8,283.7,414.7,283.5L414.7,283.5z M425.4,292.5
     c0.6,0.4,0.2,1.4-0.2,2.1c-2.9,1.7-8.9,5.1-11.8,6.8c-0.8-0.5-0.6-1.6,0.2-2.4c0.1-0.2,2.8-1.7,5.9-3.5l5.6-3.2L425.4,292.5
     L425.4,292.5z M424.8,297.7c7.7-2.9,14.1,0,16.2,7.4c0.8,2.7,0.8,3.2,0.7,17c0,11.6-0.1,12.5-0.3,13.1c-0.4,1.1-1.2,2.4-2,3.3
     c-10.1,5.8-30.3,17.5-40.4,23.3c-0.8,0-1.7-0.2-2-0.9c-0.2-0.4-0.2-1.2-0.3-12.7c0-8.5,0-12.8,0.1-13.9c1-11.1,8.4-24,17.7-30.9
     C415,303.1,425,297.3,424.8,297.7L424.8,297.7z"
        />
        <path
          fill="#41FFFF"
          stroke="#41FFFF"
          strokeWidth="0.558"
          d="M409.5,325.7c-0.2-2.7,0.5-5.5,2.3-7.6c1.6-1.9,5.7-5,7.5-2.3
     c0.6,0.9,0.6,2.7,0.6,3.9c0,2.2-0.9,4.4-2.3,6.1c-1.6,1.9-5.6,5-7.6,2.3C409.7,327.5,409.5,326.7,409.5,325.7L409.5,325.7z
      M413,322.2c0.1,0.9-0.3,2.6,0.8,2.9c0.7,0.1,1.5-0.6,1.9-1.1c0.2-0.4,0.4-0.7,0.5-1.1c0.3-0.7,0.2-1.9,0.2-2.6
     c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.4-0.6-0.5c-0.6-0.1-1.6,0.6-1.9,1.1C413.2,320.6,413,321.4,413,322.2L413,322.2z M420.6,334.5
     c-0.2-2.7,0.5-5.5,2.3-7.6c1.6-1.9,5.7-5,7.5-2.3c0.6,0.9,0.6,2.7,0.6,3.9c0,2.2-0.9,4.4-2.3,6.1c-1.6,1.9-5.6,5-7.6,2.4
     C420.8,336.3,420.6,335.5,420.6,334.5L420.6,334.5z M424.1,331c0,0.6-0.1,1.9,0.2,2.4c0.1,0.2,0.4,0.4,0.6,0.4
     c1.7,0,2.7-1.9,2.6-3.4c-0.1-0.8,0.3-2.6-0.8-2.9c-0.6-0.1-1.5,0.6-1.9,1.1C424.4,329.4,424.1,330.2,424.1,331L424.1,331z
      M427.2,312.7l-11.5,27.8l-2.5,0l11.5-27.8L427.2,312.7z"
        />
      </g>
      <g id="playables">
        <g>
          <linearGradient
            id="SVGID_00000129183724460392334910000005646081743265046718_"
            gradientUnits="userSpaceOnUse"
            x1="201.6717"
            y1="645.2319"
            x2="126.2207"
            y2="645.2319"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#BCBEFF" />
            <stop offset="0.166" stopColor="#B6B8FC" />
            <stop offset="0.396" stopColor="#A4A8F5" />
            <stop offset="0.662" stopColor="#868DEA" />
            <stop offset="0.955" stopColor="#5E67DA" />
            <stop offset="1" stopColor="#5761D7" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000129183724460392334910000005646081743265046718_)"
            d="M132,904.8l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2v0
       l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2h-2.4c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
       l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C126.9,910.7,129.2,906.4,132,904.8L132,904.8z M134.2,1004.4l76.7-43.1
       c0.6-0.4,1.2-1.3,1.2-2.2v-91.5l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L134.2,1004.4L134.2,1004.4z"
          />
          <path
            opacity="0.6"
            fill="#0F054C"
            enableBackground="new    "
            d="M128.6,908.6l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
       c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C126.9,912.5,127.6,910.4,128.6,908.6L128.6,908.6
       z"
          />

          <linearGradient
            id="SVGID_00000104697196321999729390000004268453675301079461_"
            gradientUnits="userSpaceOnUse"
            x1="221.9337"
            y1="643.576"
            x2="132.0887"
            y2="643.576"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#BCBEFF" />
            <stop offset="0.166" stopColor="#B6B8FC" />
            <stop offset="0.396" stopColor="#A4A8F5" />
            <stop offset="0.662" stopColor="#868DEA" />
            <stop offset="0.955" stopColor="#5E67DA" />
            <stop offset="1" stopColor="#5761D7" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000104697196321999729390000004268453675301079461_)"
            d="M137.2,907.7l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
       v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C132.1,913.6,134.4,909.3,137.2,907.7L137.2,907.7z
        M136.8,1007.3c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
       c-0.6,0.4-1.2,1.3-1.2,2.2V1007.3L136.8,1007.3z"
          />

          <linearGradient
            id="SVGID_00000026847870200401861120000004831513845437812128_"
            gradientUnits="userSpaceOnUse"
            x1="234.3427"
            y1="643.576"
            x2="72.2437"
            y2="643.576"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#706EC4" />
            <stop offset="2.200000e-02" stopColor="#6D6BC2" />
            <stop offset="0.251" stopColor="#5651AC" />
            <stop offset="0.486" stopColor="#463F9D" />
            <stop offset="0.731" stopColor="#3C3494" />
            <stop offset="1" stopColor="#393091" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000026847870200401861120000004831513845437812128_)"
            d="M137.2,907.7l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
       v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C132.1,913.6,134.4,909.3,137.2,907.7L137.2,907.7z
        M136.8,1007.3c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
       c-0.6,0.4-1.2,1.3-1.2,2.2V1007.3L136.8,1007.3z"
          />
          <path
            fill="#251C72"
            d="M211,961.4c0.6-0.4,1.2-1.3,1.2-2.2V871l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
       l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L211,961.4L211,961.4z"
          />
          <path
            opacity="0.4"
            fill="#42E8E0"
            enableBackground="new    "
            d="M136.8,1007.3c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
       c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V1007.3L136.8,1007.3z"
          />
        </g>
        <g>
          <path
            fill="none"
            stroke="#41FFFF"
            strokeWidth="3.717"
            strokeLinecap="round"
            d="M152,916.6l45.6-26.3c0.9-0.5,1.6-0.1,1.6,0.9
       V956c0,1-0.7,2.3-1.6,2.8L152,985c-0.9,0.5-1.6,0.1-1.6-0.9v-64.7C150.4,918.3,151.1,917.1,152,916.6z"
          />
          <path
            fill="none"
            stroke="#41FFFF"
            strokeWidth="3.717"
            strokeLinecap="round"
            d="M158,930.5l32.8-18.9 M165.4,918.2l18-10.4
        M158,938.4l32.8-18.9 M158,946.3l32.8-18.9 M158,954.2l32.8-18.9"
          />

          <ellipse
            transform="matrix(0.5 -0.866 0.866 0.5 -730.7487 636.7463)"
            fill="none"
            stroke="#41FFFF"
            strokeWidth="3.717"
            cx="186.1"
            cy="951.2"
            rx="6.6"
            ry="3.8"
          />
        </g>
      </g>
      <g id="land">
        <g>
          <linearGradient
            id="SVGID_00000095323912612821500270000014938849671419604389_"
            gradientUnits="userSpaceOnUse"
            x1="310.072"
            y1="704.3221"
            x2="234.621"
            y2="704.3221"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#BCBEFF" />
            <stop offset="0.166" stopColor="#B6B8FC" />
            <stop offset="0.396" stopColor="#A4A8F5" />
            <stop offset="0.662" stopColor="#868DEA" />
            <stop offset="0.955" stopColor="#5E67DA" />
            <stop offset="1" stopColor="#5761D7" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000095323912612821500270000014938849671419604389_)"
            d="M240.4,845.7l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
       v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2h-2.4c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
       l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C235.3,851.6,237.6,847.3,240.4,845.7L240.4,845.7z M242.6,945.3l76.7-43.1
       c0.6-0.4,1.2-1.3,1.2-2.2v-91.5l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L242.6,945.3L242.6,945.3z"
          />
          <path
            opacity="0.6"
            fill="#0F054C"
            enableBackground="new    "
            d="M237,849.5l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
       c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1v-92.8C235.3,853.4,236,851.3,237,849.5L237,849.5z"
          />

          <linearGradient
            id="SVGID_00000168824221903384300410000013699634492203739534_"
            gradientUnits="userSpaceOnUse"
            x1="330.334"
            y1="702.6662"
            x2="240.489"
            y2="702.6662"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#BCBEFF" />
            <stop offset="0.166" stopColor="#B6B8FC" />
            <stop offset="0.396" stopColor="#A4A8F5" />
            <stop offset="0.662" stopColor="#868DEA" />
            <stop offset="0.955" stopColor="#5E67DA" />
            <stop offset="1" stopColor="#5761D7" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000168824221903384300410000013699634492203739534_)"
            d="M245.6,848.6l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
       v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C240.5,854.5,242.8,850.2,245.6,848.6L245.6,848.6z
        M245.2,948.2c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
       c-0.6,0.4-1.2,1.3-1.2,2.2V948.2L245.2,948.2z"
          />

          <linearGradient
            id="SVGID_00000167366300921208442130000007229631995239894454_"
            gradientUnits="userSpaceOnUse"
            x1="342.743"
            y1="702.6662"
            x2="180.644"
            y2="702.6662"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#706EC4" />
            <stop offset="2.200000e-02" stopColor="#6D6BC2" />
            <stop offset="0.251" stopColor="#5651AC" />
            <stop offset="0.486" stopColor="#463F9D" />
            <stop offset="0.731" stopColor="#3C3494" />
            <stop offset="1" stopColor="#393091" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000167366300921208442130000007229631995239894454_)"
            d="M245.6,848.6l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
       v92.8c0,3.7-2.3,8-5.1,9.6l-79.6,44.7c-2.8,1.6-5.1-0.1-5.1-3.8v-92.8C240.5,854.5,242.8,850.2,245.6,848.6L245.6,848.6z
        M245.2,948.2c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9
       c-0.6,0.4-1.2,1.3-1.2,2.2V948.2L245.2,948.2z"
          />
          <path
            fill="#251C72"
            d="M319.4,902.3c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9V903c0,0.8-0.5,1.8-1.2,2.2
       L246.3,949c-0.6,0.4-1.2,0-1.2-0.9v-4.3L319.4,902.3L319.4,902.3z"
          />
          <path
            opacity="0.4"
            fill="#42E8E0"
            enableBackground="new    "
            d="M245.2,948.2c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
       c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V948.2L245.2,948.2z"
          />
        </g>
        <g>
          <ellipse
            transform="matrix(0.5 -0.866 0.866 0.5 -584.4412 679.7859)"
            fill="none"
            stroke="#41FFFF"
            strokeWidth="3.252"
            cx="296.5"
            cy="846"
            rx="9.5"
            ry="5.5"
          />
          <path
            fill="#41FFFF"
            stroke="#41FFFF"
            strokeWidth="0.558"
            d="M261.4,898.5c-0.1,0-8-6.4-8-6.4c0,0-2.1-1.7-2.1-1.7
       c0.7-1,1.8-2.4,3.3-3.9c9.3-9.6,20.3-11.8,28-14.3c7.5-2.4,17.6-7,28.9-16.4l0,0l0.7,0l-0.1,0.3l0.1-0.3c0.8,0,1.6,0.5,2,1.3
       c0.4,0.7,0.4,2.3,0.2,3.3c-0.1,0.5-0.3,1.1-0.8,2c-0.6,1.3-3.6,6.4-6.6,11.4l-0.1-0.1l0.1,0.1c-2.3,3.9-4.6,7.9-7.1,11.7
       c-0.6,0.7-1.8,1.5-2.6,1.4c-0.3-0.1-1.3-0.6-1.8-0.8c-1,3.7-3.7,13.1-4.2,15c-0.3,1.1-0.7,1.7-2.9,5.4c-2,3.2-2.2,4-3.9,5.7
       c-0.3,0.3-0.6,0.5-1,0.7c-0.7,0.4-1.1,0.6-1.8,0.6l0.1-0.3l-0.1,0.3c-0.4-0.1-0.8-0.2-1.2-0.3C274,908.4,267.7,903.5,261.4,898.5z
       "
          />
        </g>
      </g>
      <g id="items">
        <g>
          <linearGradient
            id="SVGID_00000119808783492251532230000002884148527675457204_"
            gradientUnits="userSpaceOnUse"
            x1="421.4796"
            y1="766.5595"
            x2="346.0286"
            y2="766.5595"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#BCBEFF" />
            <stop offset="0.166" stopColor="#B6B8FC" />
            <stop offset="0.396" stopColor="#A4A8F5" />
            <stop offset="0.662" stopColor="#868DEA" />
            <stop offset="0.955" stopColor="#5E67DA" />
            <stop offset="1" stopColor="#5761D7" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000119808783492251532230000002884148527675457204_)"
            d="M351.9,783.5l79.6-44.7c1.3-0.7,2.5-0.8,3.4-0.2
       v0l4.9,2.8l-3.2,2.3v2.5l1.8,0.7l-0.1,95.2l-5.4,5.1c-12.2,7.1-61.7,34-75,41.2h-2.4c-0.1,0-0.2-0.3-0.4-0.7l-2.4,1.4l0.8,3.6
       l-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1V793C346.8,789.4,349,785.1,351.9,783.5L351.9,783.5z M354,883.1l76.7-43.1
       c0.6-0.4,1.2-1.3,1.2-2.2v-91.5l-16.3,10.3l-59,34.1l-1.7,2.6l-1,41.5L354,883.1L354,883.1z"
          />
          <path
            opacity="0.6"
            fill="#0F054C"
            enableBackground="new    "
            d="M348.4,787.3l7.6,4.3l-1.1,1.7l-1,41.5l0.1,48.3l1.4-0.8
       c0,1.5-1.9,8.9-1.9,10.4c-0.7-0.4-4.4-2.5-5-2.8h0c-1.1-0.6-1.8-2-1.8-4.1V793C346.8,791.1,347.4,789,348.4,787.3L348.4,787.3z"
          />

          <linearGradient
            id="SVGID_00000042728422588119266520000006396259165889569667_"
            gradientUnits="userSpaceOnUse"
            x1="441.7416"
            y1="764.9036"
            x2="351.8966"
            y2="764.9036"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#BCBEFF" />
            <stop offset="0.166" stopColor="#B6B8FC" />
            <stop offset="0.396" stopColor="#A4A8F5" />
            <stop offset="0.662" stopColor="#868DEA" />
            <stop offset="0.955" stopColor="#5E67DA" />
            <stop offset="1" stopColor="#5761D7" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000042728422588119266520000006396259165889569667_)"
            d="M357,786.4l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
       v92.8c0,3.7-2.3,8-5.1,9.6L357,892.5c-2.8,1.6-5.1-0.1-5.1-3.8V796C351.9,792.3,354.2,788,357,786.4L357,786.4z M356.6,885.9
       c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2
       V885.9L356.6,885.9z"
          />

          <linearGradient
            id="SVGID_00000080923933875259178770000001941596122151448758_"
            gradientUnits="userSpaceOnUse"
            x1="454.1506"
            y1="764.9036"
            x2="292.0516"
            y2="764.9036"
            gradientTransform="matrix(1 0 0 -1 0 1582)"
          >
            <stop offset="0" stopColor="#706EC4" />
            <stop offset="2.200000e-02" stopColor="#6D6BC2" />
            <stop offset="0.251" stopColor="#5651AC" />
            <stop offset="0.486" stopColor="#463F9D" />
            <stop offset="0.731" stopColor="#3C3494" />
            <stop offset="1" stopColor="#393091" />
          </linearGradient>
          <path
            fill="url(#SVGID_00000080923933875259178770000001941596122151448758_)"
            d="M357,786.4l79.6-44.7c2.8-1.6,5.1,0.1,5.1,3.8
       v92.8c0,3.7-2.3,8-5.1,9.6L357,892.5c-2.8,1.6-5.1-0.1-5.1-3.8V796C351.9,792.3,354.2,788,357,786.4L357,786.4z M356.6,885.9
       c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2
       V885.9L356.6,885.9z"
          />
          <path
            fill="#251C72"
            d="M430.8,840c0.6-0.4,1.2-1.3,1.2-2.2v-88.2l4-2.3c0.6-0.4,1.2,0,1.2,0.9v92.5c0,0.8-0.5,1.8-1.2,2.2
       l-78.2,43.9c-0.6,0.4-1.2,0-1.2-0.9v-4.3L430.8,840L430.8,840z"
          />
          <path
            opacity="0.4"
            fill="#42E8E0"
            enableBackground="new    "
            d="M356.6,885.9c0,0.8,0.5,1.2,1.2,0.9l78.2-43.9
       c0.6-0.4,1.2-1.3,1.2-2.2v-92.5c0-0.8-0.5-1.2-1.2-0.9l-78.2,43.9c-0.6,0.4-1.2,1.3-1.2,2.2V885.9L356.6,885.9z"
          />
        </g>
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#41FFFF"
            fillOpacity="0.8"
            d="M392.8,781.9c-13.8,9.2-25.6,28.2-27.5,46.1
       c-0.2,1.8-0.2,7.1,0,8.7c3,22.2,23.2,20.8,37.9,7.1c10.9-9.8,19.3-25.2,21.3-39.2c1.8-12.5-1.2-22-8.3-26.1
       C409.4,774.3,400,777.1,392.8,781.9z M397.4,783.3c1.3-0.7,5.2-2,6-2c0,0.1-0.3,1.3-1.2,4.3c0,0.1-0.4,0.3-1,0.4
       c-2.1,0.5-3.5,1.1-6.2,2.7c-2.7,1.6-4.1,2.6-6.2,4.5c-0.6,0.6-1,0.8-1,0.8c-0.9-2-1.2-2.8-1.2-2.9
       C389.1,788.4,393.8,785,397.4,783.3L397.4,783.3z M384,796.1c0.8,2,0.7,1.2-0.6,3c-3.2,4.1-6.2,9.2-8.1,14.1
       c-0.3,0.8-0.6,1.6-0.6,1.7c0,0.2-2.9,0.6-3.2,0.4c2-6.7,7.1-15.4,11.8-20.6C383.3,794.6,383.6,795.3,384,796.1L384,796.1z
        M407.8,781c4.2,0.2,8.1,2.5,10.4,6c0.3,0.4,0.5,0.8,0.4,0.9c0.1,0-3.2,3.5-3.2,3.2c-1.9-3.3-6-5.7-10-5.7c0,0,0.4-1.4,1.1-3.7
       c0.1-0.4,0.2-0.7,0.3-0.7S407.3,781,407.8,781L407.8,781z M397.1,791.6c11.4-5.2,19.3,2.8,16.9,17.1
       c-1.9,13.9-15.9,31.9-27.9,31.4c-7.1-0.2-11.3-6.6-10.4-16.3C376.8,810.9,386.5,796.4,397.1,791.6z M393,798.1
       c-10.1,6.9-17.1,24.8-12.4,33.2c2.2,4.3,7,5.3,11.4,3.7c8.2-3.3,14.2-11.3,17.3-19.8c1.3-3.5,2-8.8,1.4-12.4
       C408.8,792.9,399.8,792.9,393,798.1z M398.1,799.5c4.3-1.3,7.9,0.8,9,5.2c0.5,1.5,0.4,5.5,0,7.1c-1.7,7.8-7.2,16.4-15.1,19
       c-5.7,1.6-9.6-2.7-9.2-8.5C382.6,813.4,389.7,802.1,398.1,799.5L398.1,799.5z M371.5,819.6l1.6-0.2c0.1,0,0,0.4-0.2,1.3
       c-0.6,2.7-0.8,4.4-0.8,7.6c0,3.1,0.2,4.6,0.8,6.7c0.2,0.6,0.2,1,0.2,1.1c-2.2,2.3-3,3.2-3.1,3.1c-0.2-0.1-0.9-3-1.2-5
       c-0.2-1.7-0.2-6.4,0.1-8.5c0.3-2.3,1-5.8,1.2-6C370,819.8,370.7,819.7,371.5,819.6L371.5,819.6z M420.2,791.2
       c1.2,3.2,1.5,9,1.1,12.7c-0.3,2.3-0.9,5.9-1.2,6.3c-0.1,0.1-0.9,0.3-3.1,0.5c-0.1,0,0-0.4,0.2-1.3c1-4.6,1.2-11-0.3-15.2
       c0.7-0.7,1.8-1.9,2.4-2.6C420.1,790.8,420.1,790.8,420.2,791.2L420.2,791.2z M374.8,839.3c1.2,2,3.9,4.2,6.4,4.9
       c1,0.3,2.9,0.6,3.3,0.5c0.1,0-1,4-1.2,4.4c-0.1,0.1-0.5,0.2-1,0.1c-4.4-0.2-9.1-2.9-10.9-6.9c0.1-0.2,2.9-3.2,3.1-3.3
       C374.5,839,374.7,839.1,374.8,839.3L374.8,839.3z M417,815.1c0.8-0.1,1.5-0.1,1.6-0.1c-0.2,2.1-4.8,11.3-7,14.3
       c-1.9,2.8-4.7,6.4-4.9,6.2c-0.2-0.1-1.3-2.8-1.2-3c3.5-3.9,8-11.7,9.7-16.6c0.1-0.3,0.2-0.6,0.3-0.7
       C415.6,815.3,416.2,815.2,417,815.1L417,815.1z M391.1,843.5c3-1.1,7.6-4,10-6.4c0.6-0.6,1-0.8,1-0.8c0.9,1.9,1.2,2.8,1.2,2.9
       c-0.1,0.2-2.4,2.3-3.6,3.2c-3.9,3.1-8.9,5.8-13.1,6.4c-0.1,0,0.2-1.2,1.2-4.3c0-0.1,0.4-0.3,1-0.4
       C389.6,844,390.4,843.7,391.1,843.5L391.1,843.5z"
          />
        </g>
      </g>
    </StyledSVG>
  );
}
