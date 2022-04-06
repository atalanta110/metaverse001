import React from "react";
// big map wrapper size
export const MAP_WRAPPER_WIDTH = "100%";
export const MAP_WRAPPER_HEIGHT = "100%";

// big map size (width and height)
export const MAP_WIDTH = 15620;
export const MAP_HEIGHT = 10770;

export const INITIAL_X = -7500; // to set canvas center
export const INITIAL_Y = -4200; // to set canvas center

// minimap size
export const MAP_AREA_BOX_WIDTH = 300;
export const MAP_AREA_BOX_HEIGHT = 206.85019206145967;

// MINI_MAP_BASE_SCALE(mini map) is times smaller than big map
export const MINI_MAP_BASE_SCALE = 52.06666666666667;
export const MINI_MAP_ZONE_INITIAL_SIZE = 17.28553137003841;

// map image prefix url
export const IMAGE_URL_PREFIX = "https://d16rw3fwb124e0.cloudfront.net/images/";

export const ACTIVE_RECT_STYLE = {
  display: "none",
  position: "absolute",
  background: "#f1f2ff",
} as React.CSSProperties;

// lands filter
export const FILTER_TYPE_OF_STATUS = {
  f: "#f2e18c", // f: for sale
  p: "#f56200", // p: premium
  o: "#FFF", // o: on OpenSea
  empty: "#739574",
  s: "#6CC7C1", // s: Purchased,
  m: "#A281F4", // m: My lands
  b: "#D4667E", // b: Booked
  a: "#f56200",
};
export const FILTER_STATUS = {
  f: "#CBFA34", // f: for sale
  p: "#D4667E", // p: premium
  s: "#6CC7C1", // s: Purchased,
  m: "#A281F4", // m: My lands
  b: "#D4667E", // b: Booked
};

export const WHEEL_ZOOM_IN = {
  0.25: 1,
  0.313: 2,
  0.391: 3,
  0.489: 4,
  0.611: 5,
  0.764: 6,
  0.955: 7,
  1.194: 8,
  1.492: 9,
  1.865: 10,
  2.331: 11,
  2.5: 12,
};
export const WHEEL_ZOOM_OUT = {
  2.5: 12,
  1.875: 9,
  1.406: 8,
  1.054: 7,
  0.79: 6,
  0.593: 5,
  0.445: 4,
  0.334: 3,
  0.251: 2,
  0.25: 1,
};
export const WHEEL_ZOOM = {
  ...WHEEL_ZOOM_IN,
  ...WHEEL_ZOOM_OUT,
};

export const STATUS_STYLE = {
  minWidth: 20.5,
  maxWidth: 20.5,
  borderRight: "8px solid #A281F4",
  borderRadius: "2px",
};
