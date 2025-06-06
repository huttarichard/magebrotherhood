export interface Props extends React.SVGProps<SVGSVGElement> {
  color?: string;
  lightone?: string;
}

const DEFAULTS = { color: "#343434", lightone: "#8C8C8C" };

export default function EthereumLogo(props: Props = DEFAULTS) {
  const { lightone, color, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      version="1.1"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 784.37 1277.39"
      {...rest}
    >
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer" />
        <g id="_1421394342400">
          <g>
            <polygon
              fill={color}
              fillRule="nonzero"
              points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
            />
            <polygon fill={lightone} fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 " />
            <polygon
              fill={color}
              fillRule="nonzero"
              points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
            />
            <polygon fill={lightone} fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 " />
            <polygon fill={color} fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 " />
            <polygon fill={color} fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 " />
          </g>
        </g>
      </g>
    </svg>
  );
}
