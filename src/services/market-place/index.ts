import axios from "../api";

export const getMarketApi = (page: number) =>
  axios.get("/get/products?page=" + page);

export const getMarketItemApi = (page: string) =>
  axios.get("/get/product/" + page);
