import axios from "axios";
import { isFunction } from "lodash-es";

export class AxiosCanceler {
  static pendingMap = new Map();

  getPendingUrl(config) {
    return [config.method, config.url].join("&");
  }

  /**
   * 添加请求标识
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = this.getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!AxiosCanceler.pendingMap.has(url)) {
          // 没有请求标识则添加
          AxiosCanceler.pendingMap.set(url, cancel);
        }
      });
  }

  //  清除所有的请求
  removeAllPending() {
    AxiosCanceler.pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    AxiosCanceler.pendingMap.clear();
  }

  /**
   * 清除重复请求
   * @param {Object} config
   */
  removePending(config) {
    const url = this.getPendingUrl(config);

    if (AxiosCanceler.pendingMap.has(url)) {
      // 如果当前请求标识符处于待处理状态;
      // 当前请求需要被取消和移除
      const cancel = AxiosCanceler.pendingMap.get(url);
      cancel && cancel(url);
      AxiosCanceler.pendingMap.delete(url);
    }
  }

  /**
   * @description:
   */
  reset() {
    AxiosCanceler.pendingMap = new Map();
  }
}
