import Api from "../api";

// 用户
class HomeApi extends Api {
  constructor() {
    super();
    this.scope = "/system";
  }

  resolvePath(path) {
    return this.scope + path;
  }
}

export default HomeApi;
