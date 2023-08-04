import { InputHTMLAttributes } from "react";

export type RadioProps = {
  label: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ label, className = "", ...props }: RadioProps) => {
  return (
    <label className="cursor-pointer">
      <input {...props} type="radio" className="accent-primary-600" />
      <span className={`text-blueGray-600 text-medium ml-1 ${className}`}>
        {label}
      </span>
    </label>
  );
};

export default Radio;
