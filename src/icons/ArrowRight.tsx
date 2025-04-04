import { SVGAttributes } from "react";

type ArrowRightProps = SVGAttributes<HTMLOrSVGElement>;

const ArrowRight = ({ ...props }: ArrowRightProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
};

export default ArrowRight;
