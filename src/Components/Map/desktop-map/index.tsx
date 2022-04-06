import React, { useRef, useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import clsx from "clsx";

import {
  IShapes,
  IOwnerLand,
  IZoomRef,
  ITooltipRef,
  IlandCard,
  IFilterHandleRef,
  IFilterSize,
  IFilterStatus,
} from "../interface/map-interface";
import { ActiveRect, LandCard } from "../components";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  MINI_MAP_BASE_SCALE,
  MINI_MAP_ZONE_INITIAL_SIZE,
  MAP_AREA_BOX_WIDTH,
  MAP_AREA_BOX_HEIGHT,
  MAP_WRAPPER_WIDTH,
  MAP_WRAPPER_HEIGHT,
  IMAGE_URL_PREFIX,
  FILTER_TYPE_OF_STATUS,
} from "../constant";
import {
  setSizeToMiniMapZone,
  createCanvasRect,
  findRectByClick,
} from "../tools";
import styles from "./styles.module.css";
import { MiniMap } from "../mini-map-lg";
import {
  getMapSectionApi,
  getLandDataApi,
  getPreMapApi,
} from "../../../services";
import heroImg from "../../../assets/images/home/Character.webp";

const INITIAL_SCALE_POSITION_X = 6500;
const INITIAL_SCALE_POSITION_Y = 4200;

let cacheData: IShapes[] = [];
let cacheFilter: IShapes[] = [];
let cacheImages: IShapes[] = [];
let isFilterMode = false;
let isRectOnMapExicted = false;
let mapSectionLoading = 7;

export default function Map() {
  const [landInformation, setLandInformation] = useState({
    owner: "",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    scale: 0.5,
  });
  const [landCard, setLandCard] = useState<IlandCard>({
    isVisible: false,
    name: "",
    address: "",
    location: "",
    galaxy: "",
    size: "",
    detail: null,
    image: undefined,
    picture: 0,
    buy: true,
  });

  const deviceScale = useRef(1);
  const sizesRef = useRef({
    width: MAP_WIDTH / deviceScale.current,
    height: MAP_HEIGHT / deviceScale.current,
  });
  const loadingTextRef = useRef<HTMLDivElement>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapWrapper = useRef<ReactZoomPanPinchRef>(null);
  const mapRef = useRef<HTMLCanvasElement>(null);
  const mapFilterRef = useRef<HTMLCanvasElement>(null);
  const miniMapRef = useRef<HTMLImageElement>(null);
  const mapAreaBox = useRef<HTMLDivElement>(null);
  const mapArea = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<IZoomRef>({
    zoomBarHandle: undefined,
    zoom: () => {
      zoomRef.current.zoomBarHandle?.(mapWrapper.current!.state.scale);
    },
  });
  const toolTipRef = useRef<ITooltipRef>({
    setPosition: undefined,
  });
  const filterHandleRef = useRef<IFilterHandleRef>({
    sizes: undefined,
    status: undefined,
    draw: drawFilter,
    toggleLoading: undefined,
  });

  const areaMoveInfo = useRef({ isPointerDown: false });
  const mapAreaPosition = useRef({
    lastX: 0,
    lastY: 0,
    allowedX: MAP_AREA_BOX_WIDTH - MINI_MAP_ZONE_INITIAL_SIZE,
    allowedY: MAP_AREA_BOX_HEIGHT - MINI_MAP_ZONE_INITIAL_SIZE,
  });
  const initialMapSize = useRef({
    // first width and height of window is use
    // for maps zone after Map component rendering
    width: 0,
    height: 0,
  });

  // map and minimap interction for moving from diffrent scales
  function handleMapMove(
    x: number,
    y: number,
    handler: "minimap" | "map",
    intialHandle?: boolean
  ) {
    if (areaMoveInfo.current.isPointerDown || intialHandle) {
      if (handler === "minimap") {
        mapAreaPosition.current.lastX += x;
        mapAreaPosition.current.lastY += y;
      } else {
        if (intialHandle) {
          const currentScale = MINI_MAP_BASE_SCALE * 1;
          mapAreaPosition.current.lastX = x / currentScale;
          mapAreaPosition.current.lastY = y / currentScale;
        } else {
          const currentScale =
            MINI_MAP_BASE_SCALE * mapWrapper.current!.state.scale;
          mapAreaPosition.current.lastX = x / currentScale;
          mapAreaPosition.current.lastY = y / currentScale;
        }
      }

      if (mapAreaPosition.current.lastX > 0) {
        mapAreaPosition.current.lastX = 0;
      } else if (
        mapAreaPosition.current.lastX <= -mapAreaPosition.current.allowedX
      ) {
        mapAreaPosition.current.lastX = -mapAreaPosition.current.allowedX;
      }
      if (mapAreaPosition.current.lastY > 0) {
        mapAreaPosition.current.lastY = 0;
      } else if (
        mapAreaPosition.current.lastY <= -mapAreaPosition.current.allowedY
      ) {
        mapAreaPosition.current.lastY = -mapAreaPosition.current.allowedY;
      }

      mapArea.current!.style.top = -mapAreaPosition.current.lastY + "px";
      mapArea.current!.style.left = -mapAreaPosition.current.lastX + "px";

      // move by minimap pointer moving
      if (handler === "minimap") {
        mapWrapper.current?.setTransform(
          mapAreaPosition.current.lastX *
            MINI_MAP_BASE_SCALE *
            mapWrapper.current?.state.scale,
          mapAreaPosition.current.lastY *
            MINI_MAP_BASE_SCALE *
            mapWrapper.current?.state.scale,
          mapWrapper.current?.state.scale,
          50
        );
      }
    }
  }

  // this function get current width and height of mapZone after zoom action
  function getSizeOfMapZone() {
    const { width, height } = mapArea.current!.getBoundingClientRect();
    mapAreaPosition.current.allowedX = MAP_AREA_BOX_WIDTH - width;
    mapAreaPosition.current.allowedY = MAP_AREA_BOX_HEIGHT - height;
  }

  /**
   * this function first clean current rect
   * then set new color for rect
   * save last rect to use later
   */

  function clickOnRect(currentRect: IOwnerLand | undefined) {
    // remove rect on cavas when there isnt any rect after click
    function removeActiveRect() {
      if (isRectOnMapExicted) {
        isRectOnMapExicted = false;
        rectRef.current!.style.display = "none";
      }
    }
    if (!currentRect) {
      removeActiveRect();
    } else if (!currentRect.t) {
      removeActiveRect();
    } else {
      const { x, y, w, h, n, image, i } = currentRect;
      setLandInformation({
        owner: n,
        x,
        y,
        w,
        h,
        scale: mapWrapper.current!.state.scale,
      });
      /*
      show tooltip
      if (toolTipRef.current.setPosition) {
        toolTipRef.current.setPosition({
          x,
          y,
          w,
          h,
        });
      }
      */
      handleLandApi(i);
      isRectOnMapExicted = true;
      createCanvasRect(
        rectRef,
        {
          x,
          y,
          w,
          h,
          image,
        },
        "desktop"
      );
    }
  }

  function clickOnCanvasMap({
    clientX,
    clientY,
    currentTarget,
  }: React.PointerEvent<HTMLCanvasElement>) {
    // to get currnet pointer position
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // if (window.Worker) {
    //   const testWorker = new Worker(
    //     new URL("../web-worker/pointer-place.worker.ts", import.meta.url),
    //     {
    //       name: "test",
    //       type: "module",
    //     }
    //   );
    //   testWorker.onmessage = function (event) {
    //     clickOnRect(event.data);
    //   };
    //   testWorker.postMessage({
    //     coordinates: {
    //       xPoint: x,
    //       yPoint: y,
    //       scale: mapWrapper.current!.state.scale,
    //     },
    //     cacheData: isFilterMode ? cacheFilter : cacheData,
    //   });
    // } else {
    const rect = findRectByClick(
      {
        xPoint: x,
        yPoint: y,
        scale: mapWrapper.current!.state.scale,
      },
      isFilterMode ? cacheFilter : cacheData
    );
    clickOnRect(rect);
    // }
  }
  const getGalaxy = (p: any) => {
    if (p < 8) return "Acrux";
    if (p < 15) return "Bellatrix";
    if (p < 22) return "Dynomia";
    if (p < 29) return "Regulus";
    if (p < 36) return "Garnet";
    if (p < 43) return "Electra";
    if (p < 50) return "Zaurak";
  };
  const isBuy = (t: any) => {
    if (t === "a") return false;
  };
  function handleLandApi(id: string) {
    getLandDataApi(id)
      .then((res: any) => {
        const { n, a, image, thumb, q, x, y, detail, p, t } = res.data;

        const data = {
          name: n,
          address: a,
          location: `X: ${x} , Y: ${y}`,
          galaxy: getGalaxy(p) + " Galaxy",
          buy: isBuy(t)!,
          size: `${q} x ${q} (${q} parcel)`,
          detail: detail,
          image: image?.name ?? thumb?.name,
          picture: p,
        };
        setLandCard({ ...data, isVisible: true });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  function drawFilter() {
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

    function drawFilterMap(
      isExict: (data: { t: IFilterStatus; q: IFilterSize }) => boolean
    ) {
      mapRef.current!.style.opacity = "0.2";
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
          filterCtx.fillStyle = t === "a" ? "transparent" : "#27294b";
          filterCtx.fillRect(x, y, w, h);

          const statusType = t ?? "empty";
          // draw rect
          filterCtx.fillStyle =
            t === "a" ? "transparent" : FILTER_TYPE_OF_STATUS[statusType];
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

  useEffect(() => {
    // cloneInitialMapElement = document.createElement("canvas");
    // select big canvas for draw an map
    loadingTextRef.current!.innerText = "Loading...";
    const context = mapRef.current!.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    // set initial position to minimap
    handleMapMove(
      -INITIAL_SCALE_POSITION_X,
      -INITIAL_SCALE_POSITION_Y,
      "map",
      true
    );

    // select big map wrapper and get width and height
    // this useful to change minimapZone after change scale on bigmap zooms!
    const bigMapWrapperElement = document.querySelector(
      ".react-transform-wrapper"
    )!;
    const { width, height } = bigMapWrapperElement.getBoundingClientRect();
    initialMapSize.current.width = width;
    initialMapSize.current.height = height;

    setSizeToMiniMapZone(
      mapArea,
      width,
      height,
      mapWrapper.current?.state.scale || 0.5
    );

    function draw(data: IShapes[]) {
      data.forEach(({ x, y, h, w, i, o, l, n, t, s, q, image }: IShapes) => {
        const coord = {
          x: x / deviceScale.current,
          y: y / deviceScale.current,
          w: w / deviceScale.current,
          h: h / deviceScale.current,
          x_y: 1.3 / deviceScale.current,
          w_h: 2.6 / deviceScale.current,
        };
        // draw stroke
        context.fillStyle = "#27294b";
        context.fillRect(coord.x, coord.y, coord.w, coord.h);

        if (image) {
          cacheImages.push({
            x: coord.x,
            y: coord.y,
            w: coord.w,
            h: coord.h,
            i,
            o,
            l,
            n,
            t,
            s,
            q,
            image,
          });

          context.fillStyle = "black";
          context.fillRect(
            coord.x + coord.x_y,
            coord.y + coord.x_y,
            coord.w - coord.w_h,
            coord.h - coord.w_h
          );
        } else {
          // draw rect
          const typeStatus = t ?? "empty";
          context.fillStyle = FILTER_TYPE_OF_STATUS[typeStatus];
          context.fillRect(
            coord.x + coord.x_y,
            coord.y + coord.x_y,
            coord.w - coord.w_h,
            coord.h - coord.w_h
          );
        }
      });

      // context.drawImage(dummyCanvas, 0, 0);
      loadingRef.current!.style.display = "none";
      const dataURL = mapRef.current?.toDataURL() as string;
      miniMapRef.current!.src = dataURL;
      miniMapRef.current!.style.display = "block";
    }

    const handleMapApi = (section: number) => {
      getMapSectionApi(section)
        .then((res: any) => {
          cacheData.push(...res.data);
          --mapSectionLoading;
          loadingTextRef.current!.innerText =
            7 - mapSectionLoading + "/7 Loading...";

          if (!mapSectionLoading) {
            loadingTextRef.current!.innerText = "Run Arivaman Run";

            setTimeout(() => {
              draw(cacheData);

              setTimeout(() => {
                loadingRef.current!.style.display = "none";
                cacheImages.forEach(({ x, y, h, w, image }) => {
                  const img = new Image();
                  img.src = IMAGE_URL_PREFIX + image!.name;
                  img.onload = function () {
                    const x_y = 1.3 / deviceScale.current;
                    const w_h = 2.6 / deviceScale.current;
                    context.drawImage(
                      img,
                      0,
                      0,
                      img.width,
                      img.height,
                      x + x_y,
                      y + x_y,
                      w - w_h,
                      h - w_h
                    ); // Or at whatever offset you like
                  };
                });
              }, 500);
            }, 300);
          }
        })
        .catch((e: any) => {
          setTimeout(() => {
            handleMapApi(section);
          }, 15000);
        });
    };

    function preDraw(data: IShapes[]) {
      draw(data);
      [...new Array(mapSectionLoading)].forEach((_, i) => {
        handleMapApi(i + 1);
      });
    }

    function handlePreDraw() {
      getPreMapApi()
        .then((res) => {
          cacheData.push(...res.data);
          preDraw(res.data as IShapes[]);
        })
        .catch((e) => {
          console.log(e);
          setTimeout(() => {
            handlePreDraw();
          }, 5000);
        });
    }

    handlePreDraw();
  }, []);

  return (
    <div className={styles.mapRoot} ref={mapContainer}>
      <div
        ref={loadingRef}
        className={clsx("flex flex-col items-center w-full ", styles.loading)}
      >
        <img className={styles.loadingImg} src={heroImg} alt="map-loading" />
        <div ref={loadingTextRef} className={"text-white"}></div>
      </div>
      <MiniMap
        zoomHandle={zoomRef}
        mapWrapper={mapWrapper}
        filterHandleRef={filterHandleRef}
        map={
          <div
            ref={mapAreaBox}
            className={styles.mapArea}
            style={{
              width: MAP_AREA_BOX_WIDTH,
              height: MAP_AREA_BOX_HEIGHT,
            }}
            onPointerMove={({ movementX: x, movementY: y }) => {
              handleMapMove(x, y, "minimap");
            }}
            onPointerDown={() => {
              areaMoveInfo.current.isPointerDown = true;
            }}
            onPointerCancel={() => {
              areaMoveInfo.current.isPointerDown = false;
            }}
            onPointerLeave={() => {
              areaMoveInfo.current.isPointerDown = false;
            }}
            onPointerUp={() => {
              areaMoveInfo.current.isPointerDown = false;
            }}
            onWheel={(event) => {
              // const layout = document.querySelector(".layout");
              // layout!.scrollTo
              // const isZoomIn = event.deltaY < 0;
            }}
          >
            <div
              ref={mapArea}
              style={{
                outline: "1000px solid #f7f7f73b",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            ></div>
            <img
              ref={miniMapRef}
              id="mini-map"
              alt="mini-map"
              draggable={false}
              style={{
                minWidth: MAP_AREA_BOX_WIDTH,
                minHeight: MAP_AREA_BOX_HEIGHT,
                maxWidth: MAP_AREA_BOX_WIDTH,
                maxHeight: MAP_AREA_BOX_HEIGHT,
                display: "none",
              }}
              onDrag={() => false}
            />
          </div>
        }
      />
      <div
        className={styles.bigMapContainer}
        style={{
          width: MAP_WRAPPER_WIDTH,
          minHeight: MAP_WRAPPER_HEIGHT,
          maxHeight: MAP_WRAPPER_HEIGHT,
          height: MAP_WRAPPER_HEIGHT,
        }}
      >
        <TransformWrapper
          ref={mapWrapper}
          initialScale={1}
          minScale={0.25}
          maxScale={2.5}
          wheel={{
            step: 0.5,
          }}
          pinch={{ step: 12 }}
          centerZoomedOut={true}
          initialPositionX={-INITIAL_SCALE_POSITION_X}
          initialPositionY={-INITIAL_SCALE_POSITION_Y}
          doubleClick={{ disabled: true }}
          onPanning={({ state }) => {
            areaMoveInfo.current.isPointerDown = true;
            handleMapMove(state.positionX, state.positionY, "map");
          }}
          onPanningStop={() => {
            areaMoveInfo.current.isPointerDown = false;
          }}
          onWheel={({ state }) => {
            getSizeOfMapZone();
            setSizeToMiniMapZone(
              mapArea,
              initialMapSize.current.width,
              initialMapSize.current.height,
              state.scale
            );
          }}
        >
          <TransformComponent
            wrapperStyle={{
              width: MAP_WRAPPER_WIDTH,
              height: MAP_WRAPPER_HEIGHT,
              minHeight: MAP_WRAPPER_HEIGHT,
            }}
          >
            <ActiveRect
              ref={rectRef}
              className={styles.rectElement as string}
              rectInfo={landInformation}
              toolTipRef={toolTipRef}
            ></ActiveRect>

            <canvas
              ref={mapRef}
              id="map"
              width={sizesRef.current.width}
              height={sizesRef.current.height}
              onPointerUp={clickOnCanvasMap}
            ></canvas>
            <canvas
              ref={mapFilterRef}
              onPointerUp={clickOnCanvasMap}
              id="map-filter"
              width={sizesRef.current.width}
              height={sizesRef.current.height}
              style={{ position: "absolute", display: "none" }}
            ></canvas>
          </TransformComponent>
        </TransformWrapper>
      </div>
      {landCard.isVisible && (
        <LandCard
          className={styles.landCard}
          name={landCard.name}
          location={landCard.location}
          galaxy={landCard.galaxy}
          size={landCard.size}
          address={landCard.address}
          image={landCard.image}
          detail={landCard?.detail?.description}
          picture={landCard.picture}
          buy={landCard.buy}
          onClose={() => {
            setLandCard((data) => ({ ...data, isVisible: false }));
          }}
        />
      )}
    </div>
  );
}
