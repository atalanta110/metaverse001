import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IIconProps } from "./types";

export function Icon({
  className,
  icon,
  width,
  height,
  color,
  fontSize,
  size,
  onClick,
}: Partial<IIconProps>) {
  return (
    <FontAwesomeIcon
      className={className}
      width={width || size}
      height={height || size}
      icon={icon}
      color={color}
      style={{ fontSize }}
      onClick={onClick}
    />
  );
}
