import axios from "axios";

const handleError = (error: any) => {
  return Promise.reject(error);
};

const api = axios.create({
  // baseURL: "http://18.190.8.236/api/v1",
  baseURL: "https://api.ariva.game/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
}, handleError);

export default api;
