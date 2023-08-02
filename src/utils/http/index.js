import axios from "axios";
import ProjectSettings from "@/config/project";
import { ResponseCode } from "@/config/global-settings";
import { ElMessage } from "element-plus";
import { AxiosCanceler } from "./axiosCancel";
import { useUserStore } from "@/store/user";

const Codes = ResponseCode;
const TokenKey = ProjectSettings.tokenKey;
const requestMethods = ["put", "post", "patch"];

// 递归过滤空值数据，其中空字符串需要特殊处理
function filterNull(params) {
  if (params) {
    for (const key in params) {
      if (
        // params[key] === '' ||
        params[key] === undefined
      ) {
        delete params[key];
      }
      if (params[key] instanceof Object) {
        filterNull(params[key]);
      }
    }
  }
}
const axiosCanceler = new AxiosCanceler();
const request = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: api_source.url,
  timeout: ProjectSettings.requestTimeout,
});
request.interceptors.request.use(
  (config) => {
    if (config.ignoreCancel) {
      axiosCanceler.removePending(config);
      axiosCanceler.addPending(config);
    }
    if (config.method === "get") {
      filterNull(config.params);
    }
    if (requestMethods.includes(config.method)) {
      filterNull(config.data);
    }
    const headers = config.headers || {};
    const user = useUserStore();
    const token = user.token;
    if (token !== undefined) {
      headers[TokenKey] = token;
    } else {
      headers[TokenKey] = "Bearer token";
    }

    if (config.fileBaseUrl) {
      config.baseURL = config.fileBaseUrl;
    }
    config.headers = headers;
    return config;
  },
  (error) => {
    console.log("erro1 :>> ", error);
    return Promise.reject(error);
  }
);

const redirectLoginCode = [
  Codes.noPermission,
  Codes.appFreeze,
  Codes.tokenExpire,
  Codes.accountAbnormal,
  Codes.tokenNotExist,
];

request.interceptors.response.use(
  (response) => {
    const user = useUserStore();
    response && axiosCanceler.removePending(response.config);
    // 判断已经弹出的错误弹框数量是否为0
    const noErrorInfo =
      document.getElementsByClassName("el-message--error").length === 0;
    let info = response.data || {};
    if (response.status === Codes.httpSuccess) {
      const { code, message, data } = info;
      // 如果返回200或者203，都是请求成功，301代表新增时名称重复，401代表视频取流失败
      // 10045是设备批量控制，存在失败的设备，也判断成功
      if (
        code === 301 ||
        code === 0 ||
        code === Codes.success ||
        code === Codes.noData ||
        code === 401
      ) {
        return Promise.resolve(data);
      } else {
        // 存在下面异常情况时，统一1.5s后跳转到登录页
        if (redirectLoginCode.includes(code)) {
          noErrorInfo &&
            ElMessage({
              message,
              type: "error",
              duration: 1500,
              onClose: () => {
                user.resetToken();
              },
            });
        } else if (code === Codes.serveError) {
          // 业务层500错误时，统一报错提示
          // 多条接口报错时，只弹出一个弹框
          noErrorInfo && ElMessage.error("服务器异常，请稍后再试!");
        } else {
          // 其它异常code弹出后端返回的错误提示
          noErrorInfo && ElMessage.error(message);
        }
        return Promise.reject({ message, data });
      }
    } else {
      const message = "服务器异常，请稍后再试!";
      noErrorInfo && ElMessage.error(message);
      return Promise.reject({ message, data: info });
    }
  },
  (error) => {
    axiosCanceler.removePending(error.config || {});
    // 如果请求被取消了不做操作
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      if (document.getElementsByClassName("el-message--error").length === 0) {
        ElMessage.error("网络异常，请稍后再试!");
      }
      return Promise.reject({ message: error.message, data: error });
    }
  }
);

export default request;
