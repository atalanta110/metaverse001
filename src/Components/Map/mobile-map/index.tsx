import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import {
  IMAGE_URL_PREFIX,
  FILTER_TYPE_OF_STATUS,
  MAP_WIDTH,
  MAP_HEIGHT,
  INITIAL_X,
  INITIAL_Y,
} from "../constant";
import {
  IShapes,
  IOwnerLand,
  IlandCard,
  IFilterHandleRef,
  IFilterSize,
  IFilterStatus,
} from "../interface/map-interface";
import { LandCard, ActiveRect } from "../components";
import {
  handleLandApi,
  createCanvasRect,
  clickOnCanvasMap,
  isIOS,
} from "../tools";
import { MobileFilterMenu } from "../mobile-filter-menu";
import { getMapSectionApi } from "../../../services";
import styles from "./styles.module.css";
import heroImg from "../../../assets/images/home/Character.webp";

const RESIZE_CANVAS = isIOS() ? 4 : 2.2;
const X_Y_SIZE = 1.3 / RESIZE_CANVAS; // 1.3 ;
const W_H_SIZE = 2.6 / RESIZE_CANVAS; // 2.6 ;
const cacheData: IShapes[] = [];
const cacheImages: IShapes[] = [];
const cacheFilter: IShapes[] = [];
let isRectOnMapExicted = false;

export default function MobileMap() {
  const mapWrapper = useRef<ReactZoomPanPinchRef>(null);
  const mapRef = useRef<HTMLCanvasElement>(null);
  const mapFilterRef = useRef<HTMLCanvasElement>(null);
  const loadingtextRef = useRef<HTMLDivElement>(null);
  const loadingBoxRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const filterHandleRef = useRef<IFilterHandleRef>({
    sizes: undefined,
    status: undefined,
    draw: drawFilter,
    toggleLoading: undefined,
  });

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
      handleLandApi(i, (data: IlandCard) => {
        setLandCard(data);
      });
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
        "mobile"
      );
    }
  }

  function drawFilter() {
    const filterCtx = mapFilterRef.current!.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    filterCtx.clearRect(
      0,
      0,
      MAP_WIDTH / RESIZE_CANVAS,
      MAP_HEIGHT / RESIZE_CANVAS
    );
    const sizes = filterHandleRef.current.sizes;
    const status = filterHandleRef.current.status;

    if (!sizes?.length && !status?.length) {
      mapRef.current!.style.opacity = "1";
      mapFilterRef.current!.style.display = "none";
    } else if (sizes?.length && status?.length) {
      drawFilterMap(({ q, t }) => {
        return sizes.includes(q) && status.includes(t);
      });
    } else if (sizes?.length) {
      drawFilterMap(({ q }) => {
        return sizes.includes(q);
      });
    } else if (status?.length) {
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
    const ctx = mapRef.current!.getContext("2d") as CanvasRenderingContext2D;

    function draw(data: IShapes[]) {
      data.forEach(
        (
          { x, y, h, w, i, o, l, n, t, s, q, image, thumb }: IShapes,
          num: number
        ) => {
          // draw stroke
          ctx.fillStyle = "#27294b";
          ctx.fillRect(x, y, w, h);

          if (image?.name || thumb?.name) {
            cacheImages.push({
              x,
              y,
              w,
              h,
              i,
              o,
              l,
              n,
              t,
              s,
              q,
              image,
              thumb,
            });

            ctx.fillStyle = "black";
            ctx.fillRect(
              x + X_Y_SIZE,
              y + X_Y_SIZE,
              w - W_H_SIZE,
              h - W_H_SIZE
            );
          } else {
            // draw rect
            const typeStatus = t ?? "empty";
            ctx.fillStyle = FILTER_TYPE_OF_STATUS[typeStatus];
            ctx.fillRect(
              x + X_Y_SIZE,
              y + X_Y_SIZE,
              w - W_H_SIZE,
              h - W_H_SIZE
            );
          }

          // remove loading after draw all rect
          loadingBoxRef.current!.style.display = "none";

          // put image in canvas after draw last rect

          if (data.length - 1 === num) {
            setTimeout(() => {
              cacheImages.forEach(({ x, y, h, w, image, thumb }) => {
                const img = new Image();
                img.src = IMAGE_URL_PREFIX + (image ?? thumb)!.name;
                img.onload = function () {
                  ctx.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    x + X_Y_SIZE,
                    y + X_Y_SIZE,
                    w - W_H_SIZE,
                    h - W_H_SIZE
                  );
                };
              });
            }, 500);
          }
        }
      );
    }

    const handleApi = (number: number) => {
      getMapSectionApi(number)
        .then((result) => {
          const data = result.data.map((vals: IShapes) => ({
            ...vals,
            x: vals.x / RESIZE_CANVAS,
            y: vals.y / RESIZE_CANVAS,
            w: vals.w / RESIZE_CANVAS,
            h: vals.h / RESIZE_CANVAS,
          }));

          cacheData.push(...data);
          loadingtextRef.current!.innerHTML = "Run Arivaman Run";

          setTimeout(() => {
            draw(data);
          }, 400);
        })
        .catch(() => {
          setTimeout(() => {
            handleApi(number);
          }, 15000);
        });
    };

    handleApi(2);
  }, []);

  return (
    <div className={clsx(styles.mobile_map_root)}>
      <div
        ref={loadingBoxRef}
        className={clsx(
          "flex flex-col items-center w-full h-full",
          styles.loadingBox
        )}
      >
        <img src={heroImg} className={styles.loadingImg} alt="loading" />
        <div ref={loadingtextRef} className={"text-white"}>
          0/1 loading...
        </div>
      </div>
      <MobileFilterMenu filterHandleRef={filterHandleRef} display={"flex"} />
      <TransformWrapper
        ref={mapWrapper}
        initialScale={RESIZE_CANVAS}
        minScale={RESIZE_CANVAS}
        maxScale={RESIZE_CANVAS}
        initialPositionX={INITIAL_X}
        initialPositionY={INITIAL_Y}
        doubleClick={{ disabled: true }}
        onPanning={({ state }) => {
          console.log(state.positionX, state.positionY);
        }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: 700,
          }}
        >
          <ActiveRect
            ref={rectRef}
            className={styles.rectElement as string}
            rectInfo={landInformation}
          ></ActiveRect>
          <canvas
            ref={mapRef}
            width={MAP_WIDTH / RESIZE_CANVAS}
            height={MAP_HEIGHT / RESIZE_CANVAS}
            style={{ border: "1px solid red" }}
            onPointerUp={clickOnCanvasMap({
              mapWrapper,
              cacheData,
              clickOnRect,
            })}
          ></canvas>
          <canvas
            ref={mapFilterRef}
            onPointerUp={clickOnCanvasMap({
              mapWrapper,
              cacheData: cacheFilter,
              clickOnRect,
            })}
            id="map-filter"
            width={MAP_WIDTH / RESIZE_CANVAS}
            height={MAP_HEIGHT / RESIZE_CANVAS}
            style={{ position: "absolute", display: "none" }}
          ></canvas>
        </TransformComponent>
      </TransformWrapper>
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
