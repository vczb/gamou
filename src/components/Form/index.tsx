import { FormHTMLAttributes, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  id: string;
} & FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, className = "", ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={`shadow-lg border-sold border-2  bg-white border-b-blueGray-200 p-6 flex flex-col mx-auto  gap-2 w-full max-w-lg ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
