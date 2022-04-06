import React, { useState, useEffect } from "react";
import { faFilter, faBars } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { IZoomRef, IFilterHandleRef } from "../interface/map-interface";
import { Icon, Checkbox, Input } from "../components";
import { STATUS_STYLE } from "../constant";
import styles from "./styles.module.css";

interface IMiniMapMenu {
  filterHandleRef: React.RefObject<IFilterHandleRef>;
  display: "flex" | "none";
}
type filterStatusKey = "f" | "p" | "o";
type filterSizesKey = "1" | "3" | "6" | "12" | "24";

export function MobileFilterMenu({ filterHandleRef, display }: IMiniMapMenu) {
  // { map, zoomHandle, filterHandleRef }: IMiniMap
  const [showMenu, setShowMenu] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState({
    f: false, // forSale
    p: false, // permium
    o: false, // onOpenSea
  });
  const [filterSizes, setFilterSizes] = useState({
    1: false,
    3: false,
    6: false,
    12: false,
    24: false,
  });
  const [coordinatesFilter, setCoordinatesFilter] = useState({
    x: undefined,
    y: undefined,
  });

  // handlers
  const HandleFilterStatusClick = function (key: filterStatusKey) {
    return () => {
      setFilterStatus((data) => {
        const updataData = { ...data, [key]: !data[key] };
        let exicetedData = [
          updataData.f ? ("f" as const) : null,
          updataData.p ? ("p" as const) : null,
          updataData.o ? ("o" as const) : null,
        ].filter(Boolean);

        filterHandleRef.current!.status = exicetedData.length
          ? exicetedData
          : undefined;

        filterHandleRef.current?.draw();

        return updataData;
      });
    };
  };
  const HandleFilterSizesClick = function (key: filterSizesKey) {
    return () => {
      setFilterSizes((data) => {
        const updataData = { ...data, [key]: !data[key] };
        let exicetedData = [
          updataData["1"] ? (1 as const) : null,
          updataData["3"] ? (3 as const) : null,
          updataData["6"] ? (6 as const) : null,
          updataData["12"] ? (12 as const) : null,
          updataData["24"] ? (24 as const) : null,
        ].filter(Boolean);

        filterHandleRef.current!.sizes = exicetedData.length
          ? exicetedData
          : undefined;

        filterHandleRef.current?.draw();

        return updataData;
      });
    };
  };
  const handleMenuClick = (number: number) => () => {
    setShowMenu(showMenu === number ? 0 : number);
  };

  useEffect(() => {
    filterHandleRef.current!.toggleLoading = function () {
      setLoading((data) => !data);
    };
  }, []);

  return (
    <div
      className={clsx(
        `
          justify-between
          absolute top-16 right-16
          text-white
        `,
        styles.rootMiniMap
      )}
      style={{
        display,
        // transform: `translateX(${showMenu ? 0 : 214}px)`,
        width: showMenu ? 286 : 72,
        transition: ".3s",
      }}
    >
      <div>
        <div className={styles.btnBox}>
          <span
            className={clsx(
              "flex justify-center items-center cursor-pointer",
              styles.buttonIcon,
              showMenu === 1 && styles.activeButtonIcon
            )}
            onClick={handleMenuClick(1)}
          >
            <Icon icon={faBars} fontSize={15} />
          </span>
          <span
            className={clsx(
              "flex justify-center items-center cursor-pointer",
              styles.buttonIcon,
              showMenu === 2 && styles.activeButtonIcon
            )}
            onClick={handleMenuClick(2)}
          >
            <Icon icon={faFilter} fontSize={13} />
          </span>
        </div>
        <div className={clsx("flex flex-col", styles.zoomBox)}>
          <span
            className={clsx(
              "flex items-center justify-center cursor-pointer",
              styles.zoomBtn
            )}
          >
            +
          </span>
          <span
            className={clsx(
              "flex items-center justify-center cursor-pointer",
              styles.zoomBtn
            )}
          >
            -
          </span>
        </div>
      </div>

      <div
        className={styles.drawerRightBox}
        style={{
          display: showMenu ? "block" : "none",
        }}
      >
        <div className={clsx(styles.filterWrapper)}>
          <div className={styles.filterSections}>
            <h4>Status</h4>
            <Checkbox
              isActive={filterStatus.f}
              text="For sale"
              onClick={HandleFilterStatusClick("f")}
              style={STATUS_STYLE}
            />
            <Checkbox
              isActive={filterStatus.p}
              text="Premium"
              onClick={HandleFilterStatusClick("p")}
              style={STATUS_STYLE}
            />
            <Checkbox
              isActive={filterStatus.o}
              text="on OpenSea"
              onClick={HandleFilterStatusClick("o")}
              style={STATUS_STYLE}
            />
          </div>
          <div className={styles.filterSections}>
            <h4>Size</h4>
            <Checkbox
              isActive={filterSizes["1"]}
              text="1x1"
              onClick={HandleFilterSizesClick("1")}
            />
            <Checkbox
              isActive={filterSizes["3"]}
              text="3x3"
              onClick={HandleFilterSizesClick("3")}
            />
            <Checkbox
              isActive={filterSizes["6"]}
              text="6x6"
              onClick={HandleFilterSizesClick("6")}
            />
            <Checkbox
              isActive={filterSizes["12"]}
              text="12x12"
              onClick={HandleFilterSizesClick("12")}
            />
            <Checkbox
              isActive={filterSizes["24"]}
              text="24x24"
              onClick={HandleFilterSizesClick("24")}
            />
          </div>
          {/* <div>
            <button
              style={{
                color: "white ",
                width: 150,
                background: "black",
                marginTop: 15,
                padding: "6px 0",
                borderRadius: 5,
              }}
              onClick={() => {
                if (!loading) {
                  filterHandleRef.current?.draw();
                }
              }}
            >
              {loading ? "filter loading..." : "filter"}
            </button>
          </div> */}
          {/*           
          <div className={styles.filterSections}>
            <h4>Coordinates</h4>
            <div
              className={clsx(
                `
                  flex
                `,
                styles.coordinatesBox
              )}
            >
              <div>
                <Input
                  name="x"
                  value={coordinatesFilter.x}
                  onChange={() => {}}
                  placeholder="X"
                />
              </div>
              <div>
                <Input
                  name="y"
                  value={coordinatesFilter.x}
                  onChange={() => {}}
                  placeholder="Y"
                />
              </div>
            </div>
          </div>
          <div className={styles.filterSections}>
            <h4>Wallet</h4>
            <Input
              name="wallet"
              value={undefined}
              onChange={() => {}}
              placeholder="0xcd316f57d8c76d049..."
            />
          </div>
          <div className={styles.filterSections}>
            <h4>Partners</h4>
            <Input
              name="partners"
              value={undefined}
              onChange={() => {}}
              placeholder="Search a name"
            />
            <Checkbox isActive={false} text="Atari" onClick={() => {}} />
            <Checkbox isActive={false} text="Care Bears" onClick={() => {}} />
            <Checkbox isActive={false} text="The Smurf" onClick={() => {}} />
            <Checkbox isActive={false} text="Binance" onClick={() => {}} />
            <Checkbox
              isActive={false}
              text="CoinMarketCap"
              onClick={() => {}}
            />
            <Checkbox isActive={false} text="The Smurf" onClick={() => {}} />
            <Checkbox isActive={false} text="Binance" onClick={() => {}} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
