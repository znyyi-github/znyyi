import axios from "axios";
import { i18n } from "./i18n";
import type { ResponseData } from "@znyyi/shared";

export const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use();
instance.interceptors.response.use(
  function (response) {
    const data = response.data as ResponseData;
    if (data.code == "1") {
      ElMessage({
        message: i18n.global.t(data.message),
        type: "error",
        duration: 1000,
      });
    }
    return response;
  },
  function (err) {
    return Promise.reject(err);
  },
);
