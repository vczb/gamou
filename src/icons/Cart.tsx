import { SVGAttributes } from "react";

type CartProps = SVGAttributes<HTMLOrSVGElement>;

const Cart = ({ ...props }: CartProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="currentColor"
    {...props}
  >
    <path d="M21 48A5 5 0 1021 58 5 5 0 1021 48zM47 48A5 5 0 1047 58 5 5 0 1047 48zM12.489 14.095l-.998-4.24C10.96 7.596 8.945 6 6.625 6H1l1 4h4.625c.464 0 .867.319.973.771l7.093 30.146C15.117 42.731 16.718 44 18.584 44h31.734c1.95 0 3.607-1.395 3.94-3.314l4.093-23.533L12.489 14.095z" />
  </svg>
);

export default Cart;
