import Minus from "../../icons/Minus";
import Plus from "../../icons/Plus";

import { useCallback, useRef } from "react";

export type NumberFieldProps = {
  defaultValue?: number;
};

const NumberField = ({ defaultValue = 0 }: NumberFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback((type: "increment" | "decrement") => {
    let value = Number(inputRef?.current?.value || 0);

    if (type === "increment") {
      value += 1;
    } else {
      value -= 1;
    }
    if (value >= 0) {
      // @ts-expect-error
      inputRef.current.value = value;
    }
  }, []);

  return (
    <div className="flex w-fit items-center">
      <button
        className="rounded-full border-2 border-blueGray-800 w-6 h-6 bg-primary-400 hover:bg-primary-500 duration-200 focus:shadow-lg"
        onClick={() => handleClick("decrement")}
      >
        <Minus className="w-full h-full text-blueGray-800" />
      </button>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        min={0}
        disabled
        className={`rounded-lg p-2  text-black w-10 h-9 text-center number-field`}
      />
      <button
        className="rounded-full border-2 border-blueGray-800 w-6 h-6 bg-primary-400 hover:bg-primary-500 duration-200 focus:shadow-lg"
        onClick={() => handleClick("increment")}
      >
        <Plus className="w- h-full text-blueGray-800" />
      </button>
    </div>
  );
};

export default NumberField;
