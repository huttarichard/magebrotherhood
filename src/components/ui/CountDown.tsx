import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const CountDown = styled.div<{ small: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .countdown-item {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 10px;
    position: relative;
    font-size: ${(props) => (props.small ? "25px" : "35px")};
    line-height: ${(props) => (props.small ? "20px" : "30px")};
    padding-top: ${(props) => (props.small ? "3px" : "5px")};
    width: ${(props) => (props.small ? "70px" : "100px")};
    height: ${(props) => (props.small ? "70px" : "100px")};

    &:last-of-type {
      margin-right: 0;
    }
  }

  .countdown-item span {
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
  }

  .countdown-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.small ? "70px" : "100px")};
    height: ${(props) => (props.small ? "70px" : "100px")};
  }
`;

export interface CountdownProps {
  countDownDate: Date;
  small: boolean;
}

export default function Countdown({ countDownDate, small }: CountdownProps) {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate.getTime() - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setState({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const daysRadius = mapNumber(state.days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(state.hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(state.minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(state.seconds, 60, 0, 0, 360);

  return (
    <CountDown small={small}>
      {state.days && (
        <div className="countdown-item">
          <SVGCircle radius={daysRadius} small={small} />
          {state.days}
          <span>days</span>
        </div>
      )}
      {state.hours && (
        <div className="countdown-item">
          <SVGCircle radius={hoursRadius} small={small} />
          {state.hours}
          <span>hours</span>
        </div>
      )}
      {state.minutes && (
        <div className="countdown-item">
          <SVGCircle radius={minutesRadius} small={small} />
          {state.minutes}
          <span>minutes</span>
        </div>
      )}
      {state.seconds && (
        <div className="countdown-item">
          <SVGCircle radius={secondsRadius} small={small} />
          {state.seconds}
          <span>seconds</span>
        </div>
      )}
    </CountDown>
  );
}

const SVGCircle = ({ radius, small }: { radius: number; small: boolean }) => {
  return (
    <svg className="countdown-svg">
      <path
        fill="none"
        stroke="#ec12f9"
        strokeWidth="4"
        d={describeArc(small ? 35 : 50, small ? 35 : 50, small ? 32 : 48, 0, radius)}
      />
    </svg>
  );
};

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

  return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number: number, in_min: number, in_max: number, out_min: number, out_max: number) {
  return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
