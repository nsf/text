import React from "react";
import classnames from "classnames";

interface MainButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const MainButton = (props: MainButtonProps) => (
  <button
    type="button"
    className={classnames("rounded-lg border-2 py-2 border-current text-xl w-full", props.className)}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
