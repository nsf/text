import React from "react";

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
}

export const TextInput = (props: TextInputProps) => (
  <div className="w-full">
    <label>
      {props.label}
      <input
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        type="text"
        className="text-xl w-full rounded border border-gray-200 dark:border-gray-600 focus:outline-none bg-gray-100 dark:bg-gray-600  p-2"
      />
    </label>
  </div>
);
