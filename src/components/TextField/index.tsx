import { InputHTMLAttributes } from "react";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ className = "", ...props }: TextFieldProps) => {
  return (
    <input
      {...props}
      className={`border rounded-sm p-2 border-blueGray-400 text-black ${className}`}
    />
  );
};

export default TextField;
