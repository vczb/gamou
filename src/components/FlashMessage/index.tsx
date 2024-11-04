import { ReactNode, useId, useMemo } from "react";

export type FlashMessageProps = {
  variant: "alert" | "success";
  message: string | ReactNode;
};

const FlashMessage = ({ variant, message }: FlashMessageProps) => {
  const bgColor = useMemo(
    () => (variant === "alert" ? "bg-red-500" : "bg-emerald-400"),
    [variant]
  );

  const id = useId();

  return (
    <div>
      <input type="checkbox" className="flash-banner hidden peer" id={id} />
      <label
        className={`flash-banner w-full fixed top-0 z-[100] cursor-pointer flex items-center justify-between p-2 ${bgColor} shadow text-white peer-checked:hidden`}
        title="Close"
        htmlFor={id}
      >
        {message}
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </label>
    </div>
  );
};

export default FlashMessage;
