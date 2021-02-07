import React from "react";
import classnames from "classnames";

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

const REM = 0.25;

export const Toggle = (props: ToggleProps) => (
  <div className="flex items-center space-x-4">
    <div
      className="inline-flex rounded-full shadow-inner bg-gradient-to-r dark:from-gray-500 dark:to-gray-600 from-gray-200 to-gray-100 h-8 w-16 relative cursor-pointer"
      onClick={() => {
        props.onChange(!props.value);
      }}
    >
      <div
        className={classnames(
          "transition-transform absolute rounded-full h-6 w-6 bg-white dark:bg-gray-400 top-1 left-1",
          {
            "bg-blue-500 border-2 border-blue-300 dark:bg-blue-500 dark:border-blue-900": props.value,
          }
        )}
        style={{
          transform: `translateX(${props.value ? `${(16 - 6 - 1 - 1) * REM}rem` : "0"})`,
        }}
      />
    </div>
    <div>{props.label}</div>
  </div>
);
