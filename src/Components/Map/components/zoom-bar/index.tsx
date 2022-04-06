import React, { useState, useEffect } from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import Slider from "rc-slider";
import clsx from "clsx";
import "rc-slider/assets/index.css";

import { Button } from "..";
import { IZoomRef } from "../../interface/map-interface";
import styles from "./styles.module.css";

interface IZoomBar {
  zoomHandle: React.RefObject<IZoomRef>;
  mapWrapper: React.RefObject<ReactZoomPanPinchRef>;
}

export function ZoomBar({ zoomHandle, mapWrapper }: IZoomBar) {
  // const [zomomIndex, setZoomIndex] = useState(zoomHandle.current!.stepNumber);
  const [zomomIndex] = useState(1);

  // const onChange = (data: number) => {
  //   if (data > zoom.current) {
  //     zoomIn();
  //   } else if (data < zoom.current) {
  //     zoomOut();
  //   }
  // };

  useEffect(() => {
    zoomHandle.current!.zoomBarHandle = (stepNumber: number) => {
      console.log("eeeeeeeee", stepNumber);

      // setZoomIndex(stepNumber);
    };
  }, []);

  return (
    <div
      className={clsx(
        styles.sliderWrapper,
        `
          flex flex-col justify-between items-center
        text-black py-1
        `
      )}
    >
      <Button
        className="zoom-in-btn"
        onClick={() => {
          mapWrapper.current?.zoomIn(0.25);
          // zoomHandle.current!.zoomIn();
        }}
      >
        +
      </Button>
      {/* <div className="zoom-bar-box">
        <Slider
          min={1}
          max={12}
          value={zomomIndex}
          onChange={() => {
            // console.log("channge:", data);
            // zoomHandle.current!.zoom(
            //   data < zoomHandle.current!.stepNumber ? "in" : "out"
            // );
          }}
          vertical={true}
        />
      </div> */}
      <Button
        className="zoom-out-btn"
        onClick={() => {
          mapWrapper.current?.zoomOut(0.25);
          // zoomHandle.current!.zoomOut();
        }}
      >
        -
      </Button>
    </div>
  );
}
