import styled from "@emotion/styled";

const Checkmark = styled.div<{ size: string | number; color: string }>`
  padding: 10px;

  svg {
    display: block;
    height: ${(props) => props.size};
    width: ${(props) => props.size};
    color: ${(props) => props.color}; /* SVG path use currentColor to inherit this */

    * {
      stroke-width: 1px;
    }
  }

  .circle {
    stroke-dasharray: 76;
    stroke-dashoffset: 76;
    animation: draw 1s forwards;
  }

  .tick {
    stroke-dasharray: 18;
    stroke-dashoffset: 18;
    animation: draw 1s forwards 1s;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export interface Props extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: string | number;
}

export default function SuccessCheckmark({
  size = "120px",
  color = "#ec12f9",
  children,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <Checkmark size={size} color={color}>
      <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <g
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="circle"
            d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
          />
          <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
        </g>
      </svg>
      {children}
    </Checkmark>
  );
}
