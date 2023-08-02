import Api from "../api";

// 用户
class UserApi extends Api {
  constructor() {
    super();
    this.scope = "/user";
  }

  resolvePath(path) {
    return this.scope + path;
  }

  login(data) {
    const path = this.resolvePath("/login");
    return this.post(path, data);
  }

  changePassword(data) {
    const path = this.resolvePath("/change-password");
    return this.post(path, data);
  }

  logout() {
    const path = this.resolvePath("/logout");
    return this.get(path);
  }

  loadInfo(params) {
    const path = this.resolvePath("/bytoken/select");
    return this.get(path, params);
  }
}

export default UserApi;
