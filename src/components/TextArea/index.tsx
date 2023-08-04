import { TextareaHTMLAttributes } from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({
  className = "",
  children,
  cols = 25,
  rows = 4,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      {...props}
      cols={cols}
      rows={rows}
      className={`border rounded-sm p-2 border-blueGray-400 text-black ${className}`}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
