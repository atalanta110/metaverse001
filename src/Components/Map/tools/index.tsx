import React from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { getLandDataApi } from "../../../services";

import { MINI_MAP_BASE_SCALE } from "../constant";
import {
  IRect,
  IToFinedRect,
  IShapes,
  IOwnerLand,
  IlandCard,
  IRectSize,
} from "../interface/map-interface";

export const isIOS = function () {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
    /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
  );
};

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

// ? bttom function automatically scales the canvas to the current window.devicePixelRatio!
// https://talk.observablehq.com/t/dom-context2d-vs-dom-canvas-what-am-i-doing-wrong/3836

export function GenerateCanvasAndContextByDevicePixelRatio(
  width: number,
  height: number,
  dpi: number | null
) {
  if (dpi == null) dpi = devicePixelRatio;

  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";

  const context = canvas.getContext("2d");
  context!.scale(dpi, dpi);

  return context as CanvasRenderingContext2D;
}

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

/*
  ? devicePixelRatio(window.devicePixelRatio):
  A double-precision floating-point value indicating the ratio of the display's resolution
  in physical pixels to the resolution in CSS pixels. A value of 1 indicates
  a classic 96 DPI (76 DPI on some platforms) display, while a value of 2 is expected
  for HiDPI/Retina displays. Other values may be returned as well in the case of unusually
  low resolution displays or, more often, when a screen has a higher pixel depth than double
  the standard resolution of 96 or 76 DPI.
  * https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
*/
export function setContextSizeByDevicePixelRatio(
  width: number,
  height: number,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const dpi = window.devicePixelRatio;

  canvasRef.current!.width = width * dpi;
  canvasRef.current!.height = height * dpi;
  canvasRef.current!.style.width = width + "px";

  const context = canvasRef.current!.getContext("2d");
  context!.scale(dpi, dpi);

  return context as CanvasRenderingContext2D;
}

/*-------------------   ----------------   ----------------   ----------------   --------------------*/

// set size to minimap area after zoomIn or zoomOut in map or minimap box
export const computeScaleForMiniMapArea = (
  scale: number,
  width: number,
  height: number
) => {
  const realScale = scale - 1;

  return [width * realScale, height * realScale];
};

// set size for map zone after change scale in map and minimap:
export const setSizeForMapZone = (
  elm: React.RefObject<HTMLDivElement>,
  size: number,
  scale: number
) => {
  elm.current!.style.minWidth = size / scale + "px";
  elm.current!.style.minHeight = size / scale + "px";
  elm.current!.style.maxWidth = size / scale + "px";
  elm.current!.style.maxHeight = size / scale + "px";
};

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

// set size for minimap areaZone according to the big mapZone area sizes(width, height)
export const setSizeToMiniMapZone = (
  miniMapZone: React.RefObject<HTMLDivElement>,
  width: number,
  height: number,
  scale: number
) => {
  const currentScale = MINI_MAP_BASE_SCALE * scale;
  const currentWidth = width / currentScale + "px";
  const currentHeight = height / currentScale + "px";

  miniMapZone.current!.style.width = currentWidth;
  miniMapZone.current!.style.height = currentHeight;
  miniMapZone.current!.style.minWidth = currentWidth;
  miniMapZone.current!.style.minHeight = currentHeight;
  miniMapZone.current!.style.maxWidth = currentWidth;
  miniMapZone.current!.style.maxHeight = currentHeight;
};

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

export function createCanvasRect(
  rectDiv: React.RefObject<HTMLDivElement>,
  { x, y, w, h, image }: IRect & { image: null | { name: string } },
  type: "mobile" | "desktop"
) {
  // set inside border:
  const size = {
    // 240
    240: {
      position: 2.4,
      size: 4,
    },
    109: {
      position: 2.3,
      size: 3.5,
      // position: 3,
      // size: 4,
    },
    // 120
    120: {
      position: 2.4,
      size: 4,
    },
    55: {
      position: 2.4,
      size: 2,
      // position: 3,
      // size: 4,
    },
    // 60
    60: {
      position: 2.4,
      size: 4,
    },
    27: {
      position: 3,
      size: 4,
    },
    // 30
    30: {
      position: 1,
      size: 2.5,
    },
    14: {
      position: 2.3,
      size: 2.5,
    },
    // 10
    10: {
      position: 1,
      size: 2.2,
    },
    5: {
      position: 2,
      size: 2.2,
    },
  };
  const currentSize = size[w.toFixed(0) as IRectSize];

  rectDiv.current!.style.left = x + currentSize.position + "px";
  rectDiv.current!.style.top = y + currentSize.position + "px";
  rectDiv.current!.style.width = w - currentSize.size + "px";
  rectDiv.current!.style.height = h - currentSize.size + "px";
  rectDiv.current!.style.backgroundColor = image?.name
    ? "transparent"
    : "white";
  rectDiv.current!.style.display = "block";
}

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

export function clearReact(
  canvas: React.RefObject<HTMLCanvasElement>,
  { x, y, w, h }: IRect
) {
  const ctx = canvas.current!.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(x + 1.4, y + 1.4, w - 2.5, h - 2.5);
}

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

export function findRectByClick(
  {
    xPoint, // start of rect x cordinate
    yPoint, // start of rect y cordinate
    // cacheData, []
    scale,
  }: IToFinedRect,
  cacheData: IShapes[]
) {
  let isRectNotFound = true;
  let counter = 0;
  let rect: undefined | IOwnerLand;

  // loop to search in all rects
  while (isRectNotFound && cacheData.length) {
    // const rectData = (mapJSON as IShapes[])[counter]!;
    const rectData = (cacheData as IShapes[])[counter]!;
    const xStart = rectData.x * scale;
    const yStart = rectData.y * scale;
    const xEnd = (rectData.x + rectData.w) * scale;
    const yEnd = (rectData.y + rectData.h) * scale;

    // console.log("counter:", counter, '\n', );
    if (
      // search in start and end of rect x cordinates
      xPoint >= xStart &&
      xPoint <= xEnd &&
      // search in start and end of rect y cordinates
      yPoint >= yStart &&
      yPoint <= yEnd
    ) {
      rect = {
        x: rectData.x,
        y: rectData.y,
        w: rectData.w,
        h: rectData.h,
        n: rectData.n,
        image: rectData.image,
        i: rectData.i,
        t: rectData.t,
      };

      isRectNotFound = false;
    } else if (
      // (mapJSON as IShapes[]).length - 1 ===
      cacheData.length - 1 ===
      counter
    ) {
      isRectNotFound = false;
    }

    ++counter;
  }

  return rect;
}

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

//* export function getPointerPositionToFindRect() {}

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

export const clickOnCanvasMap =
  ({
    mapWrapper,
    cacheData,
    clickOnRect,
  }: // deviceScale
  {
    mapWrapper: React.RefObject<ReactZoomPanPinchRef>;
    cacheData: IShapes[];
    clickOnRect: (data: IOwnerLand | undefined) => void;
  }) =>
  ({
    clientX,
    clientY,
    currentTarget,
  }: React.PointerEvent<HTMLCanvasElement>) => {
    // to get currnet pointer position
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const rect = findRectByClick(
      {
        xPoint: x,
        yPoint: y,
        scale: mapWrapper.current!.state.scale,
      },
      cacheData
    );

    clickOnRect(rect);
  };

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

export function handleLandApi(
  id: string,
  setLandCard: (data: IlandCard) => void
) {
  getLandDataApi(id)
    .then((res: any) => {
      const { n, a, image, q, x, y, detail, p, thumb, t } = res.data;

      const data = {
        name: n,
        address: a,
        location: `X: ${x} , Y: ${y}`,
        size: `${q} x ${q} (${q} parcel)`,
        detail: detail,
        image: image?.name ?? thumb?.name,
        picture: p,
        galaxy: getGalaxy(p)+' Galaxy',
        buy: isBuy(t)!,
      };
      setLandCard({ ...data, isVisible: true });
    })
    .catch((err: any) => {
      console.log(err);
    });
}

const getGalaxy = (p: any) => {
  if(p < 8)
    return 'Acrux';
  if(p < 15)
    return 'Bellatrix';
  if(p < 22)
    return 'Dynomia';
  if(p < 29)
    return 'Regulus';
  if(p < 36)
    return 'Garnet';
  if(p < 43)
    return 'Electra';
   if(p < 50)
    return 'Zaurak';
}
const isBuy = (t:any) => {
  if(t==="a")
    return false;
}
/*--------------------   ----------------   ----------------   ----------------   --------------------*/

/*--------------------   ----------------   ----------------   ----------------   --------------------*/

/*
function drawFilter({
  mapRef,
  mapFilterRef,
  sizesRef,
  filterHandleRef,
  isFilterMode,
}) {
  const filterCtx = mapFilterRef.current!.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  filterCtx.clearRect(0, 0, sizesRef.current.width, sizesRef.current.height);
  const sizes = filterHandleRef.current.sizes;
  const status = filterHandleRef.current.status;

  if (!sizes?.length && !status?.length) {
    mapRef.current!.style.opacity = "1";
    mapFilterRef.current!.style.display = "none";
    isFilterMode = false;
  } else if (sizes?.length && status?.length) {
    isFilterMode = true;
    drawFilterMap(({ q, t }) => {
      return sizes.includes(q) && status.includes(t);
    });
  } else if (sizes?.length) {
    isFilterMode = true;
    drawFilterMap(({ q }) => {
      return sizes.includes(q);
    });
  } else if (status?.length) {
    isFilterMode = true;
    drawFilterMap(({ t }) => {
      return status.includes(t);
    });
  }
*/
/*--------------------   ----------------   ----------------   ----------------   --------------------*/
/*
  function drawFilterMap(
    isExict: (data: { t: IFilterStatus; q: IFilterSize }) => boolean
  ) {
    mapRef.current!.style.opacity = "0.5";
    // clean every filters data on every cache
    cacheFilter.length = 0;

    cacheData.forEach(({ x, y, h, w, t, q, ...rest }: IShapes) => {
      // start to loading on filter button
      if (filterHandleRef.current.toggleLoading) {
        filterHandleRef.current.toggleLoading();
      }

      if (isExict({ q, t })) {
        // cache shapes if exicted in filter
        cacheFilter.push({
          x,
          y,
          h,
          w,
          t,
          q,
          ...rest,
        });
        // draw border or stroke
        filterCtx.fillStyle = "#27294b";
        filterCtx.fillRect(x, y, w, h);

        const statusType = t ?? "empty";
        // draw rect
        filterCtx.fillStyle = FILTER_TYPE_OF_STATUS[statusType];
        filterCtx.fillRect(x + 1.3, y + 1.3, w - 2.6, h - 2.6);
      }

      // end to loading on filter button
      if (filterHandleRef.current.toggleLoading) {
        filterHandleRef.current.toggleLoading();
      }
    });

    mapFilterRef.current!.style.display = "block";
  }
}
*/
