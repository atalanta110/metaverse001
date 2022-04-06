import React, { useState } from "react";
import clsx from "clsx";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { IZoomRef, IFilterHandleRef } from "../interface/map-interface";
import { ZoomBar, MiniMapBox, MiniMapMenu, Icon } from "../components";
import styles from "./styles.module.css";

interface IMiniMap {
  map: React.ReactNode;
  zoomHandle: React.RefObject<IZoomRef>;
  filterHandleRef: React.RefObject<IFilterHandleRef>;
  mapWrapper: React.RefObject<ReactZoomPanPinchRef>;
}

export function MiniMap({
  map,
  zoomHandle,
  filterHandleRef,
  mapWrapper,
}: IMiniMap) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleIsOpen = () => {
    setIsOpen((data) => !data);
  };

  return (
    <>
      <div
        className={clsx(
          `
            absolute top-16 
          `,
          styles.hiddenBox
        )}
        style={{ display: isOpen ? "none" : "block" }}
      >
        <div
          className="w-full h-full relative flex flex-col justify-center items-center cursor-pointer"
          onClick={toggleIsOpen}
        >
          <Icon icon={faAngleLeft} fontSize="16px" color="black" />
          <span>Show map</span>
        </div>
      </div>
      <div
        className={clsx(
          `
            justify-between
            absolute top-16 right-16
            text-color
          `,
          styles.miniMapBOx
        )}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <ZoomBar zoomHandle={zoomHandle} mapWrapper={mapWrapper} />
        <div
          className={clsx(
            styles.box,
            `
              p-0.5
              bg-black
            `
          )}
        >
          <MiniMapBox map={map} />
          <MiniMapMenu
            filterHandleRef={filterHandleRef}
            toggleIsOpen={toggleIsOpen}
          />
        </div>
      </div>
    </>
  );
}
