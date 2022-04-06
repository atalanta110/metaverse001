export interface IMap {
  isMobile: boolean;
}
export type IFilterSize = null | 1 | 3 | 6 | 12 | 24;
export type IFilterStatus = "f" | "p" | "o" | "a" | null; //"forSale" | "permium" | "onOpenSea";
export interface IShapes {
  x: number; // x
  y: number; // y
  h: number; // height
  w: number; // width
  i: string; // id
  o: string | null; // owner or wallet
  l: string | null; // logo
  n: string; // name
  t: IFilterStatus; // type of status => f: for sale, p: premium, o: on OpenSea
  s: string; // status => f: for sale, p: premium, s: Purchased, m: My lands, b: Booked
  q: IFilterSize; // 1 3 6 12 24
  image: null | { name: string };
  thumb?: null | { name: string };
}

export interface IToFinedRect {
  xPoint: number;
  yPoint: number;
  scale: number;
}

export interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IOwnerLand {
  x: number;
  y: number;
  w: number;
  h: number;
  n: string; // owner or wallet
  i: string;
  t: null | "f" | "o" | "p" | "terminal" | "a";
  image: null | { name: string };
}

export interface IZoomRef {
  zoomBarHandle: undefined | ((number: number) => void);
  zoom: (type: "in" | "out") => void;
}

export interface ITooltipRef {
  setPosition:
    | undefined
    | ((data: { x: number; y: number; w: number; h: number }) => void);
}

export interface IlandCard {
  isVisible: boolean;
  name: string;
  location: string;
  galaxy: string;
  size: string;
  address: string;
  picture: number;
  buy: boolean;
  detail: {
    description: string;
    i: string;
    url: string;
  } | null;
  image: string | undefined;
}

export interface IFilterHandleRef {
  sizes: null | undefined | IFilterSize[];
  status: null | undefined | IFilterStatus[];
  draw: () => void;
  toggleLoading: undefined | (() => void);
}

export type IRectSize =
  | "5"
  | "14"
  | "27"
  | "55"
  | "109"
  | 10
  | 30
  | 60
  | 120
  | 240;
