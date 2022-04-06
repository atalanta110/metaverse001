import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IGuideCard {
  text: string;
  color: string;
}

export function GuideCard({ text, color }: IGuideCard) {
  return (
    <div className={"flex items-center text-white"}>
      <span
        className={clsx("block", styles.square)}
        style={{ marginRight: 6, backgroundColor: color }}
      ></span>
      <span className={"block text-xs leading-4 w-12"}>{text}</span>
    </div>
  );
}
