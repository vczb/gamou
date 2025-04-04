import { SVGAttributes } from "react";

type QrCodeProps = SVGAttributes<HTMLOrSVGElement>;

const QrCode = ({ ...props }: QrCodeProps) => {
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
      <rect width="6" height="6" x="3" y="3" rx="1" />
      <rect width="6" height="6" x="15" y="3" rx="1" />
      <rect width="6" height="6" x="3" y="15" rx="1" />
      <rect width="3" height="3" x="15" y="15" />
      <rect width="3" height="3" x="18" y="18" />
      <rect width="3" height="3" x="18" y="15" />
      <rect width="3" height="3" x="15" y="18" />
    </svg>
  );
};

export default QrCode;
