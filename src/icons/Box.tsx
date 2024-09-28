import { SVGAttributes } from "react";

type BoxProps = SVGAttributes<HTMLOrSVGElement>;

const Box = ({ ...props }: BoxProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path d="M50.7 58.5 0 160h208V32H93.7c-18.2 0-34.8 10.3-43 26.5zM240 160h208L397.3 58.5c-8.2-16.2-24.8-26.5-43-26.5H240v128zm208 32H0v224c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V192z" />
    </svg>
  );
};

export default Box;
