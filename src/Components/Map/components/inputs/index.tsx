import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IInput {
  className?: string;
  value: undefined | string | number;
  type?: string;
  name: string;
  onChange: () => void;
  placeholder: string;
}

export function Input({
  className,
  type = "text",
  value,
  name,
  onChange,
  placeholder,
}: IInput) {
  return (
    <input
      className={clsx(styles.inputRoot, className)}
      value={value}
      type={type}
      name={name}
      id={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
