export interface Props extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const DEFAULTS = { color: "#AE55A0" };

export default function BrotherhoodCoinLogo(props: Props = DEFAULTS) {
  const { color, ...rest } = props;
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 612 608.3"
      enableBackground="new 0 0 612 608.3"
      xmlSpace="preserve"
      {...rest}
    >
      <g opacity="0.8">
        <path
          fill={color}
          d="M1.7,301.8C10.7,168,86.3,55.4,216.5,17.2C327.6-17.7,429.9,6.3,514.7,87.1
		C693,249.2,608.2,549.6,375.4,604.7l-2.6-16.8c-21.6-2.1-43.1-2.7-63.9-6.4C167.8,556.6,74.1,403.8,117.1,269.5
		c35.6-111,161.6-172.3,263.4-128.1c68.9,29.9,107.6,111.2,87.4,183.6c-30.2,108.4-197.8,121.8-205.2-1.7
		c-1-28.7,14.6-50.1,46.6-61.6c14.1-5.1,18-12.2,17.1-26.1c-1.1-17.1-0.2-34.4-0.2-52.6c-28.2-5.7-52.3,2.5-74.6,16.8
		c-88.7,57.1-88.4,190.8-0.8,253.7c100.4,72,241.4,17.9,281.9-96.4C580.2,222.7,487.5,74,346.1,56.5C40.1,26-70.3,424.5,183,584.1
		C69.8,534.9,12.2,435.7,1.7,314.4L1.7,301.8L1.7,301.8z"
        />
      </g>
    </svg>
  );
}
