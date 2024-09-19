import React, { SelectHTMLAttributes } from "react";

type SelectProps = {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

function Select({ name, options, ...props }: SelectProps) {
  const { defaultValue } = props;
  return (
    <div className="w-full max-w-xs">
      <select
        {...props}
        name={name}
        defaultValue={defaultValue}
        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            // selected={option.value === defaultValue}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
