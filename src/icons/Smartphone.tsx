import { SVGAttributes } from "react";

type SmartphoneProps = SVGAttributes<HTMLOrSVGElement>;

const Smartphone = ({ ...props }: SmartphoneProps) => {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <line x1="12" x2="12" y1="18" y2="18.01" />
    </svg>
  );
};

export default Smartphone;
