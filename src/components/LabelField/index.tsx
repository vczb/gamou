import { LabelHTMLAttributes, ReactNode } from "react";

export type LabelFieldProps = {
  children: ReactNode;
  htmlFor: string;
  label: string | ReactNode;
  sublabel?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

const LabelField = ({
  label,
  sublabel,
  children,
  htmlFor,
  className,
  ...props
}: LabelFieldProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex flex-col text-black ${className}`}
      {...props}
    >
      {label}
      {sublabel && (
        <span className="text-xs text-blueGray-800 font-normal">
          {sublabel}
        </span>
      )}
      {children}
    </label>
  );
};

export default LabelField;
