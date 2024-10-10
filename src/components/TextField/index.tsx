import { InputHTMLAttributes, useMemo } from "react";

export type TextFieldProps = {
  helperText?: string;
  helperVariant?: "alert" | "success";
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  className = "",
  helperText,
  helperVariant = "alert",
  ...props
}: TextFieldProps) => {
  const helperStyle = useMemo(() => {
    switch (helperVariant) {
      case "alert":
        return "text-red-500";
      case "success":
        return "text-emerald-600";
      default:
        return "text-black";
    }
  }, [helperVariant]);

  return (
    <>
      <input
        {...props}
        className={`border rounded-sm p-2 border-blueGray-400 text-black ${
          helperText ? "peer" : ""
        } ${className}`}
      />
      {helperText && (
        <span
          className={`mt-2 hidden text-sm ${helperStyle} peer-[&:not(:placeholder-shown):not(:focus):invalid]:block`}
        >
          {helperText}
        </span>
      )}
    </>
  );
};

export default TextField;
