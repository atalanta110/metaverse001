import React from "react";
import SimpleBar from "simplebar-react";

import styles from "./styles.module.css";

interface IMiniMapBox {
  map: React.ReactNode;
}

export function MiniMapBox({ map }: IMiniMapBox) {
  return (
    <div className={styles.root}>
      <SimpleBar style={{ maxHeight: 212 }}>{map}</SimpleBar>
    </div>
  );
}
