import React from "react";
import clsx from "clsx";

import { Icon } from "..";

interface IClasses {
  root: string;
  text: string;
  icon: string;
  iconBox: string;
}
interface ITextIcon {
  classes?: Partial<IClasses>;
  text: React.ReactNode;
  icon: React.ReactNode;
  size: string;
  color: string;
  style: React.CSSProperties;
}

export function TextIcon({
  classes,
  text,
  icon,
  size,
  color,
  style,
}: ITextIcon) {
  return (
    <div
      className={clsx(
        ` 
          flex items-center
        `,
        classes?.root
      )}
    >
      <div
        className={clsx(
          `
            flex justify-center items-center
          `,
          classes?.iconBox
        )}
      >
        <Icon
          className={clsx(``, classes?.icon)}
          size={size}
          color={color}
          icon={icon}
        />
      </div>
      <span
        className={clsx(
          `
            block
          `,
          classes?.text
        )}
        style={style}
      >
        {text}
      </span>
    </div>
  );
}
