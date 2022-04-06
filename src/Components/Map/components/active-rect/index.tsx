import React, { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";

import { ACTIVE_RECT_STYLE } from "../../constant";
import styles from "./styles.module.scss";
import { ITooltipRef } from "../../interface/map-interface";

interface IActiveRect {
  className: string;
  toolTipRef?: React.RefObject<ITooltipRef>;
}
interface IToolTip {
  rectInfo: {
    owner: string;
    x: number;
    y: number;
    w: number;
    h: number;
    scale: number;
  };
  toolTipRef?: React.RefObject<ITooltipRef>;
}
interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
}
type IactiveRectComponent = IActiveRect & IToolTip;

function ToolTip({ rectInfo, toolTipRef }: IToolTip) {
  const toolTip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toolTipRef?.current) {
      // ! disable tooltip
      /*
    function setCoordinates({
      top,
      right,
      bottom,
      left,
    }: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    }) {
      toolTip.current!.style.top = top;
      toolTip.current!.style.right = right;
      toolTip.current!.style.bottom = bottom;
      toolTip.current!.style.left = left;
    }
    */
      toolTipRef.current!.setPosition = ({ x, y, w, h }: IRect) => {
        // ! disable tooltip
        /*
      // left top map section
      if (x < 7810 && y < 5385) {
        setCoordinates({
          top: h + 4 + "px",
          right: "unset",
          bottom: "unset",
          left: w + 4 + "px",
        });
      }
      // right top map section
      else if (x >= 7810 && y < 5385) {
        setCoordinates({
          top: h + 4 + "px",
          right: w + 4 + "px",
          bottom: "unset",
          left: "unset",
        });
      }
      // left bottom map section
      else if (x < 7810 && y >= 5385) {
        setCoordinates({
          top: "unset",
          right: "unset",
          bottom: 4 + "px",
          left: 4 + "px",
        });
      }
      // right bottom map section
      else {
        setCoordinates({
          top: "unset",
          right: 4 + "px",
          bottom: 4 + "px",
          left: "unset",
        });
      }
      */
      };
      // toolTipRef.current!.setFontSize;
    }
  }, []);

  return (
    <div
      className={styles.toolTipRoot}
      style={{
        // ! disable tooltip
        display: "none",
      }}
    >
      <div ref={toolTip} className={styles.toolTip}>
        {rectInfo.owner}
      </div>
    </div>
  );
}

export const ActiveRect = forwardRef<HTMLDivElement, IactiveRectComponent>(
  ({ className, rectInfo, toolTipRef }, ref) => {
    return (
      <div
        className={clsx(className, styles.ativeRectRoot)}
        ref={ref}
        style={ACTIVE_RECT_STYLE}
      >
        <ToolTip rectInfo={rectInfo} toolTipRef={toolTipRef} />
      </div>
    );
  }
);
