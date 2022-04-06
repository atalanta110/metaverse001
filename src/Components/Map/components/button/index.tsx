import React from "react";
import clsx from "clsx";

import { IButtonProps } from "./types";
import styles from "./styles.module.css";

type IRef = any;

export const Button = React.forwardRef(
  (
    { className, onClick, type = "button", ariaLabel, children }: IButtonProps,
    ref: IRef
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.button, className)}
        onClick={onClick}
        type={type}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }
);
