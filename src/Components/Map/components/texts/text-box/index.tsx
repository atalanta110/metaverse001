import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

interface ITextBox {
  className?: string;
  title: string;
  text: string | JSX.Element | JSX.Element[];
  element?: React.ReactNode;
  icon?: React.ReactNode;
}

export function TextBox({ className, title, text, element, icon }: ITextBox) {
  return (
    <div
      className={clsx(
        `
          grid gap-1.5
          font-bold text-sm text-white
        `,
        styles.textBoxRoot,
        className
      )}
    >
      <span
        className={`
          font-bold text-sm
        `}
      >
        {title}
      </span>
      {element}
      <div
        className={clsx(
          `
          flex items-center
        `,
          styles.text
        )}
      >
        <span
          className={`
            mr-1
            font-normal text-sm
          `}
        >
          {text}
        </span>
        {icon}
      </div>
    </div>
  );
}
