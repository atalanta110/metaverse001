import React from "react";
import clsx from "clsx";

import { Icon } from "..";
import styles from "./styles.module.css";

interface IMenuItem {
  text: string;
  icon: any;
  className?: string;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | (() => void);
  fontSize: string;
}

export function MenuItem({
  className,
  text,
  icon,
  isActive,
  onClick,
  fontSize,
}: IMenuItem) {
  return (
    <div
      className={clsx(
        `
          flex flex-1 flex-col items-center justify-between
          pb-0.5
          text-black cursor-pointer
        `,
        styles.itemRoot,
        isActive && styles.itemRootActive,
        className
      )}
      onClick={onClick}
    >
      <Icon icon={icon} fontSize={fontSize} color="black" />
      <span className="block mt-1.5">{text}</span>
    </div>
  );
}
