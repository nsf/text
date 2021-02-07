import { Icon, IconType } from "components/Icon";
import React from "react";
import classnames from "classnames";

interface IconPickerProps {
  value: IconType;
  onChange: (v: IconType) => void;
  label: string;
}

export const IconPicker = (props: IconPickerProps) => {
  const renderIcon = (icon: IconType) => (
    <div
      key={icon}
      className={classnames("p-1 ml-2 mb-2", {
        "ring dark:ring-gray-600 ring-gray-400": props.value === icon,
      })}
      onClick={() => {
        props.onChange(icon);
      }}
    >
      <Icon value={icon} />
    </div>
  );
  return (
    <div className="w-full">
      <label>
        {props.label}
        <div className="flex flex-wrap -ml-2 -mb-2">
          {renderIcon("default")}
          {renderIcon("email")}
          {renderIcon("phone")}
          {renderIcon("globe")}
          {renderIcon("briefcase")}
          {renderIcon("creditcard")}
          {renderIcon("id")}
          {renderIcon("key")}
          {renderIcon("location")}
          {renderIcon("mail")}
          {renderIcon("qrcode")}
          {renderIcon("cart")}
          {renderIcon("user")}
          {renderIcon("wifi")}
        </div>
      </label>
    </div>
  );
};
