export const ResponseCode = {
  // http状态
  httpSuccess: 200, // 请求成功
  // 业务层
  success: 200, // 请求成功
  noData: 203, // 请求成功但无数据
  noPermission: 401, // 请求未授权，无权限
  appFreeze: 402, // 当前应用（子系统）被冻结或移除
  serveError: 500, // 服务端错误
  tokenExpire: 1204, // token过期或无效
  accountAbnormal: 1205, // 账号，部门，职务 被冻结
  tokenNotExist: 1206, // 权限变更导致的token清除
};

export const ENV = {
  IS_DEV: process.env.NODE_ENV === "development",
  IS_TEST: process.env.NODE_ENV === "test",
  IS_PROD: process.env.NODE_ENV === "production",
};

// 分页组件配置项
export const PaginationOption = {
  PAGE_SIZES: [10, 20, 30, 40, 50],
  LAYOUT: "total, sizes, prev, pager, next, jumper",
  PAGE: 1,
  PAGE_SIZE: 10,
};
