import { ButtonHTMLAttributes, useMemo } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "emerald" | "light";
  size?: "small" | "medium" | "large";
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
    if (variant === "emerald") {
      return "text-black bg-emerald-500 hover:bg-emerald-600";
    }

    return "bg-white text-gray-800";
  }, [variant]);

  const variantSize = useMemo(() => {
    if (size === "small") {
      return "py-1 px-2 text-xs";
    }

    if (size === "medium") {
      return "py-1 px-2 text-sm";
    }

    return "py-2 px-4 text-lg";
  }, [size]);

  const btnClassNames = useMemo(() => {
    return ` font-bold uppercase rounded shadow hover:shadow-md ease-linear transition-all base duration-15 ${variantSize} ${variantStyle} ${
      disabled ? "opacity-50 cursor-default" : "cursor-pointer"
    } ${className}`;
  }, [variantSize, variantStyle, disabled, className]);

  return (
    <button {...props} disabled={disabled} className={btnClassNames}>
      {children}
    </button>
  );
};

export default Button;
