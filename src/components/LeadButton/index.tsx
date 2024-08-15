"use client";

import React from "react";

type ButtonProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "white" | "gradient";
  gradient?: boolean;
};

const LeadButton = ({
  id,
  className,
  children,
  variant = "white",
  gradient = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "mx-auto lg:mx-0 hover:underline font-bold rounded-full py-4 px-8 shadow transition-all";
  const variantClasses =
    variant === "white" ? "bg-white text-gray-800" : "gradient text-white";
  const additionalClasses = "";
  gradient || variant !== "white" ? "shadow-lg" : "";
  const zIndexClass = gradient ? "z-10" : "";

  return (
    <button
      id={id}
      className={`${baseClasses} ${variantClasses} ${additionalClasses} ${zIndexClass} ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default LeadButton;
