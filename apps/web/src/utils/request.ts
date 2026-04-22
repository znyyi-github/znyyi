import axios from "axios";
import { i18n } from "./i18n";
import type { ResponseData } from "@znyyi/shared";
import { eventBus } from "./event-bus";
const HEADER_X_ACCESS_TOKEN = "x-access-token";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
instance.interceptors.response.use(
  function (response) {
    const data = response.data as ResponseData;
    if (data.code == "1") {
      ElMessage({
        message: i18n.global.t(data.message),
        type: "error",
        duration: 1000,
      });
      return Promise.reject(data);
    } else {
      const accessToken = response.headers[HEADER_X_ACCESS_TOKEN];
      if (accessToken) {
        // 前端将access_token存入localStorage
        localStorage.setItem("access_token", accessToken);
      }
    }
    return response;
  },
  function (err) {
    if (err.response.status === 401) {
      eventBus.emit("http401");
      ElMessage({
        message: i18n.global.t("error.401"),
        type: "error",
        duration: 1000,
      });
    }
    return Promise.reject(err);
  },
);
