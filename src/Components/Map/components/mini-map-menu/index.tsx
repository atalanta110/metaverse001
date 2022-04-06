import React, { useState, useEffect } from "react";
import {
  faFilter,
  faBars,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { IFilterHandleRef, IFilterStatus } from "../../interface/map-interface";
import { STATUS_STYLE } from "../../constant";
import { MenuItem, Checkbox, GuideCard } from "..";
import styles from "./styles.module.css";

type filterStatusKey = "f" | "p" | "o";
type filterSizesKey = "1" | "3" | "6" | "12" | "24";

interface IMiniMapMenu {
  filterHandleRef: React.RefObject<IFilterHandleRef>;
  toggleIsOpen: () => void;
}

export function MiniMapMenu({ filterHandleRef, toggleIsOpen }: IMiniMapMenu) {
  const [tabIndex, setTabIndex] = useState(4);
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

  const handleIsActive = (number: number) => tabIndex === number;
  const changeItemIndex = (number: number) => () => {
    if (number === tabIndex) {
      setTabIndex(4);
    } else {
      setTabIndex(number);
    }
    // else setTabIndex(4);
    console.log(number, "hi");
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
          p-1
        `,
        styles.root
      )}
    >
      <div
        className={`
          flex
        `}
      >
        <MenuItem
          className="pt-2.5"
          icon={faFilter}
          text="Filters"
          isActive={handleIsActive(0)}
          onClick={changeItemIndex(0)}
          fontSize="14px"
        />
        <MenuItem
          className="pt-2"
          icon={faBars}
          text="Guide"
          isActive={handleIsActive(1)}
          onClick={changeItemIndex(1)}
          fontSize="16px"
        />
        <MenuItem
          className="pt-1.5"
          icon={faAngleRight}
          text="Hide"
          isActive={false}
          onClick={toggleIsOpen}
          fontSize="22px"
        />
      </div>
      {tabIndex !== 4 && (
        <div className={clsx(styles.dropDown)}>
          {tabIndex === 0 && (
            <div className={styles.filters}>
              <div>
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
              <div>
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
              {/*
              <section>
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
              </section>
                */}
            </div>
          )}
          {tabIndex === 1 && (
            <div className={styles.filters}>
              <div>
                <h4>Status of each land piece</h4>
              </div>
              <div className={"grid gap-6"}>
                <GuideCard color="#f2e18c" text="For sale" />
                <GuideCard color="#f56200" text="Premium" />
                <GuideCard color="#ccc" text="Opensea" />
                {/* <GuideCard color="#A281F4" text="My lands" /> */}
                {/* <GuideCard color="#D4667E" text="Booked" /> */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
