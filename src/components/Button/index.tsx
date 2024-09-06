import { ButtonHTMLAttributes, useMemo } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "emeraldMint" | "light";
  size?: "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className = "",
  variant = "primary",
  disabled = false,
  size = "medium",
  ...props
}: ButtonProps) => {
  const variantStyle = useMemo(() => {
    if (variant === "primary") {
      return "text-white bg-primary-500 hover:bg-primary-600";
    }
    if (variant === "secondary") {
      return "text-black bg-secondary-500 hover:bg-secondary-600";
    }
    if (variant === "emeraldMint") {
      return "text-white bg-emeraldMint-500 hover:bg-emeraldMint-600";
    }

    return "bg-white text-gray-800";
  }, [variant]);

  const variantSize = useMemo(() => {
    if (size === "medium") {
      return "py-1 px-2 text-sm";
    }

    return "py-2 px-4 text-lg";
  }, [size]);

  return (
    <button
      {...props}
      className={`cursor-pointer font-bold uppercase rounded shadow hover:shadow-md ease-linear transition-all base duration-15 ${variantSize} ${variantStyle} ${
        disabled ? "opacity-50 cursor-default" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
