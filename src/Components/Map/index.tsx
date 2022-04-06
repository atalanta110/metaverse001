import React, { lazy, Suspense } from "react";
import clsx from "clsx";
import "simplebar/dist/simplebar.min.css";

import "./style/index.css";
import styles from "./style/styles.module.css";

export default function MapScreen() {
  const MyComponent = lazy(
    () => import(`./${window.innerWidth <= 600 ? "mobile-map" : "desktop-map"}`)
  );

  return (
    <div className={clsx(`relative`, styles.mapContainer)}>
      <Suspense fallback={<div></div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}
