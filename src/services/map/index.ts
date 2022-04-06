import axios from "../api";

export const getPreMapApi = () => axios.get(`/get/pre-lands`);

export const getMapSectionApi = (i: number /** start from 1 - 7 */) =>
  axios.get(`/get/lands?i=${i}`);

export const getAllMapApi = () => axios.get("/get/all-lands");

export const getLandDataApi = (id: string) => axios.get(`/get/land/${id}`);
