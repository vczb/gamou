import { ButtonHTMLAttributes, useMemo } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const variantStyle = useMemo(() => {
    if (variant === "primary") {
      return "text-white bg-primary-500 hover:bg-primary-600";
    }
    return "text-black bg-secondary-500 hover:bg-secondary-600";
  }, [variant]);

  return (
    <button
      {...props}
      className={`cursor-pointer font-bold uppercase rounded shadow hover:shadow-md ease-linear transition-all text-sm base py-1 px-2 duration-15 ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
