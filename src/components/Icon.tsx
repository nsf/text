import {
  BriefcaseIcon,
  CreditCardIcon,
  DocumentIcon,
  EmailIcon,
  GlobeIcon,
  IDIcon,
  KeyIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  QRCodeIcon,
  ShoppingCartIcon,
  UserIcon,
  WifiIcon,
} from "components/icons/itemIcons";
import React from "react";

export type IconType =
  | "default"
  | "email"
  | "phone"
  | "globe"
  | "briefcase"
  | "creditcard"
  | "id"
  | "key"
  | "location"
  | "mail"
  | "qrcode"
  | "cart"
  | "user"
  | "wifi";

interface IconProps {
  value: IconType;
}

export const Icon = (props: IconProps) =>
  props.value === "default" ? (
    <DocumentIcon size={26} />
  ) : props.value === "email" ? (
    <EmailIcon size={26} />
  ) : props.value === "globe" ? (
    <GlobeIcon size={26} />
  ) : props.value === "briefcase" ? (
    <BriefcaseIcon size={26} />
  ) : props.value === "creditcard" ? (
    <CreditCardIcon size={26} />
  ) : props.value === "id" ? (
    <IDIcon size={26} />
  ) : props.value === "key" ? (
    <KeyIcon size={26} />
  ) : props.value === "location" ? (
    <LocationIcon size={26} />
  ) : props.value === "mail" ? (
    <MailIcon size={26} />
  ) : props.value === "qrcode" ? (
    <QRCodeIcon size={26} />
  ) : props.value === "cart" ? (
    <ShoppingCartIcon size={26} />
  ) : props.value === "user" ? (
    <UserIcon size={26} />
  ) : props.value === "wifi" ? (
    <WifiIcon size={26} />
  ) : (
    <PhoneIcon size={26} />
  );
