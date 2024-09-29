import Minus from "../../icons/Minus";
import Plus from "../../icons/Plus";
import { useCallback, useRef } from "react";

export type NumberFieldProps = {
  id?: string;
  name?: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
  required?: boolean;
};

const NumberField = ({
  defaultValue = 0,
  minusDisabled = false,
  plusDisabled = false,
  required = false,
  id,
  name,
  onChange,
}: NumberFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(
    (type: "increment" | "decrement") => {
      let value = Number(inputRef?.current?.value || 0);

      if (type === "increment") {
        value += 1;
      } else {
        value -= 1;
      }
      if (value >= 0) {
        // @ts-expect-error
        inputRef.current.value = value;
        if (onChange) {
          onChange(value);
        }
      }
    },
    [onChange]
  );

  return (
    <div className="flex w-fit items-center">
      <button
        className={`rounded-full border-2 border-blueGray-800 w-6 h-6 bg-primary-400 hover:bg-primary-500 duration-200 focus:shadow-lg ${
          minusDisabled ? "opacity-50" : ""
        }`}
        onClick={() => handleClick("decrement")}
        disabled={minusDisabled}
        type="button"
      >
        <Minus className="w-full h-full text-blueGray-800" />
      </button>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        min={0}
        disabled
        id={id}
        required={required}
        name={name}
        className="rounded-lg p-2 text-black w-10 h-9 text-center number-field"
      />
      <button
        className={`rounded-full border-2 border-blueGray-800 w-6 h-6 bg-primary-400 hover:bg-primary-500 duration-200 focus:shadow-lg ${
          plusDisabled ? "opacity-50" : ""
        }`}
        onClick={() => handleClick("increment")}
        disabled={plusDisabled}
        type="button"
      >
        <Plus className="w-full h-full text-blueGray-800" />
      </button>
    </div>
  );
};

export default NumberField;
