import { InputHTMLAttributes } from "react";

export type CheckboxProps = {
  label: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ label, className = "", ...props }: CheckboxProps) => {
  return (
    <label className="cursor-pointer">
      <input {...props} type="checkbox" className="accent-primary-600" />
      <span className={`text-blueGray-600 text-medium ml-1 ${className}`}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
