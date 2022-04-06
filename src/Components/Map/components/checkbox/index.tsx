import React from "react";

import styles from "./styles.module.scss";

interface ICheckbox {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
  text: string;
  style?: React.CSSProperties;
}

export function Checkbox({ onClick, isActive, text, style }: ICheckbox) {
  return (
    <div className={styles.checkboxRoot}>
      <div className={styles.checkbox} onClick={onClick} style={style}>
        <div
          className={styles.activeCheckbox}
          style={{ display: isActive ? "block" : "none" }}
        ></div>
      </div>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
