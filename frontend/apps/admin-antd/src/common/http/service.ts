import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { getAccessToken, getTenantId, getVisitTenantId } from "./auth";
import { config } from "./config";
import errorCode from "./errorCode";

import { message, Modal } from "antd";
import { t } from "i18next";
import { storageHelper } from "../utils";

const tenantEnable = "true";
const { result_code, request_timeout } = config;

// 忽略的提示信息
const ignoreMsgs = ["无效的刷新令牌", "刷新令牌已过期"];

// 是否显示重新登录弹窗
export const isRelogin = { show: false };

// 请求白名单（不带 token 的接口）
const whiteList: string[] = [
  "/login",
  "/system/menu",
  // 注意这里的路由的拦截实现白名单，使用：/admin-api/system/dept/simple-list
  "/admin-api/system/role/simple-list",
  "/admin-api/system/dept/simple-list",
  "/admin-api/system/user/page",
];

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  timeout: request_timeout,
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params, { allowDots: true }),
});

// request 拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let isToken = (config.headers || {}).isToken === false;
    debugger;
    // 白名单接口不带 token
    whiteList.some((v) => {
      console.log(v, "vvvvvvvvvvvv");
      console.log(config.url,'config.url');
      if (config.url && config.url.indexOf(v) > -1) {
        return (isToken = true);
      }
    });

    console.log(getAccessToken(), "getAccessToken--------");
    // 设置 Authorization
    if (getAccessToken()) {
      const rawToken = sessionStorage.getItem("token") || "";
      const token = rawToken.trim(); // 去掉首尾空格/换行
      console.log(`Bearer ${token}`);
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config,'config')
      console.log(config,'config')
      console.log(config, "config");
    }

    // 设置租户
    // if (tenantEnable === "true") {
    //   const tenantId = getTenantId();
    //   if (tenantId) config.headers["tenant-id"] = tenantId;

    //   const visitTenantId = getVisitTenantId();
    //   if (config.headers.Authorization && visitTenantId) {
    //     config.headers["visit-tenant-id"] = visitTenantId;
    //   }
    // }

    // 防止 GET 请求缓存
    if (config.method?.toUpperCase() === "GET") {
      config.headers["Cache-Control"] = "no-cache";
      config.headers["Pragma"] = "no-cache";
    }

    // x-www-form-urlencoded 序列化
    if (config.method?.toUpperCase() === "POST") {
      const contentType =
        config.headers["Content-Type"] || config.headers["content-type"];
      if (contentType === "application/x-www-form-urlencoded") {
        if (config.data && typeof config.data !== "string") {
          config.data = qs.stringify(config.data);
        }
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// response 拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    let { data } = response;

    if (!data) throw new Error();

    // 处理二进制响应
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      if (response.data.type !== "application/json") {
        return response.data;
      }
      data = await new Response(response.data).json();
    }

    const code = data.code || result_code;
    const msg =
      data.msg ||
      errorCode[code as keyof typeof errorCode] ||
      errorCode["default"];

    // 忽略的提示
    if (ignoreMsgs.includes(msg)) {
      return Promise.reject(msg);
    }

    // 401 直接跳转登录（单 token 无刷新逻辑）
    if (code === 401) {
      return handleAuthorized();
    } else if (code === 500) {
      message.error(t("sys.api.errMsg500"));
      return Promise.reject(new Error(msg));
    } else if (code === 901) {
      message.error({
        content:
          `<div>${t("sys.api.errMsg901")}</div>` +
          "<div>参考 https://doc.iocoder.cn/ 教程</div>" +
          "<div>5 分钟搭建本地环境</div>",
      });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      message.error({ content: msg });
      return Promise.reject("error");
    } else {
      return data;
    }
  },
  (error: AxiosError) => {
    let { message: _message } = error;
    if (_message === "Network Error") {
      _message = t("sys.api.errorMessage");
    } else if (_message.includes("timeout")) {
      _message = t("sys.api.apiTimeoutMessage");
    } else if (_message.includes("Request failed with status code")) {
      _message =
        t("sys.api.apiRequestFailed") + _message.substr(_message.length - 3);
    }
    message.error(_message);
    return Promise.reject(error);
  },
);

// 未授权处理
const handleAuthorized = () => {
  if (!isRelogin.show) {
    if (!window.location.href.includes("login")) {
      isRelogin.show = true;
      Modal.confirm({
        content: t("common:confirmTitle"),
        onOk: () => {
          isRelogin.show = false;
          storageHelper.clear("local");
          storageHelper.clear("session");
          window.location.href = window.location.href;
        },
      });
    }
  }
  return Promise.reject(t("sys.api.timeoutMessage"));
};

export { service };
