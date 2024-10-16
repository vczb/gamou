import Minus from "../../icons/Minus";
import Plus from "../../icons/Plus";
import { useCallback, useRef, useState } from "react";

export type NumberFieldProps = {
  id?: string;
  name?: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
  required?: boolean;
  inputDisabled?: boolean;
  minValue?: number;
};

const NumberField = ({
  defaultValue = 0,
  minusDisabled = false,
  plusDisabled = false,
  required = false,
  inputDisabled = true,
  minValue = 0,
  id,
  name,
  onChange,
}: NumberFieldProps) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleClick = useCallback(
    (type: "increment" | "decrement") => {
      let newValue = value;
      if (type === "increment") {
        newValue += 1;
      } else {
        newValue -= 1;
      }
      if (newValue >= 0) {
        setValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }
    },
    [value, onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      setValue(inputValue);
      if (onChange) {
        onChange(inputValue);
      }
    }
  };

  return (
    <div className="flex w-fit items-center">
      <button
        className={`rounded-full border-2 border-blueGray-800 w-6 h-6 bg-primary-400 hover:bg-primary-500 duration-200 focus:shadow-lg ${
          minusDisabled || minValue == value ? "opacity-50" : ""
        }`}
        onClick={() => handleClick("decrement")}
        disabled={minusDisabled}
        type="button"
      >
        <Minus className="w-full h-full text-blueGray-800" />
      </button>
      <input
        defaultValue={defaultValue}
        value={value}
        onChange={handleInputChange}
        min={minValue}
        disabled={inputDisabled}
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
