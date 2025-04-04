import { SVGAttributes } from "react";

type StoreProps = SVGAttributes<HTMLOrSVGElement>;

const Store = ({ ...props }: StoreProps) => {
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
      <path d="M2 3h20v4H2z" />
      <path d="M20 7v14H4V7" />
      <path d="M12 7v14" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
};

export default Store;
