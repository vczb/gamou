import { SVGAttributes } from "react";

type DiamondProps = SVGAttributes<HTMLOrSVGElement>;

const Diamond = ({ ...props }: DiamondProps) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m160.221 142.598 84.086-83.987 37.342 83.987H160.221ZM383.555 71.679l-81.117 81.041-36.046-81.041h117.163ZM69.614 251.477l84.063 37.308V167.468l-84.063 84.009ZM145.458 309.559l-81.115-36.013v117.057l81.115-81.044ZM176.01 279.035l95.877-95.789H176.01v95.789ZM399.344 378.063l-87.257-203.431 87.257-87.178v290.609ZM378.082 385.135l-83.014-193.5-110.661 110.56 193.675 82.94ZM167.389 319.199l203.614 87.178H80.132l87.257-87.178Z"
      fill="currentColor"
    />
  </svg>
);

export default Diamond;
