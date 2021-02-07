import { IconProps } from "components/icons/common";
import React from "react";

export const BackIcon = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
