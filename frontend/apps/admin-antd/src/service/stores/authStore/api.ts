import http from "src/common/http";
import { getRefreshToken } from "src/common/http/auth";
import {
  GetIdByNameApiReq,
  GetMenuDataApiReq,
  GetUserInfoParams,
  LoginApiReq,
  LoginApiRes,
  MenuItemData,
  MenuPermissionItem,
  UpdateMenuApiReq,
} from "./model";

const baseUrl = "/admin-api/system";

const api = {
  /**
   * token刷新，这里nestjs后台没有对接
   * @returns
   * @description 刷新token
   */
  refreshToken() {
    return http.post<{
      refreshToken: string;
      accessToken: string;
    }>({
      url:
        "/admin-api/system/auth/refresh-token?refreshToken=" +
        getRefreshToken(),
    });
  },
  /**
   * nestjs中，路由放入白名单监听一下
   * @returns
   * @description 获取滑块验证码
   */
  captchaApi() {
    debugger;
    // TODO: 先返回成功，后端还没做好，后端完成后注释掉这行代码
    return Promise.resolve({
      repCode: "0000",
      repMsg: null,
      repData: {
        captchaId: null,
        projectCode: null,
        captchaType: null,
        captchaOriginalPath: null,
        captchaFontType: null,
        captchaFontSize: null,
        secretKey: "H4ih3Zwdo8um7Rya",
        originalImageBase64: "",
        point: null,
        jigsawImageBase64: "",
        wordList: null,
        pointList: null,
        pointJson: null,
        token: "3f0cf376462942539485249b1e704e2a",
        result: false,
        captchaVerification: null,
        clientUid: null,
        ts: null,
        browserInfo: null,
      },
      success: true,
    });

    return http.post<any>({
      // url: "/admin-api/system/captcha/get",
      url: "/admin-api/system/captcha/get",
      data: {
        captchaType: "blockPuzzle",
      },
    });
  },
  /**
   * 查询当前所属的tenant租户，这个可以暂时不调用
   * @param data
   * @returns
   */
  getIdByNameApi(data: GetIdByNameApiReq) {
    return http.get<any>({
      url: "/admin-api/system/tenant/get-id-by-name?name=" + data.tenantName,
    });
  },
  async loginApi(data: LoginApiReq) {
    return await http.post<LoginApiRes>({
      url: "/admin-api/login",
      // url: "/admin-api/auth/login",
      data,
    });
  },
  // 获取权限
  getPermissionInfoApi() {
    return http.get<LoginApiRes>({
      url: "/admin-api/system/auth/get-permission-info",
    });
  },
  // 获取getRouters权限
  getRouters() {
    return http.get({
      url: "/admin-api/getRouters",
    });
  },
  fetchUserPermissions() {
    return http.get<{ permissions: any; menus: MenuPermissionItem[] }>({
      url: baseUrl + "/auth/get-permission-info",
    });
  },

  getMenuListApi() {
    return http.get<MenuItemData[]>({
      url: "/admin-api/system/menu/list",
    });
  },

  //获取滑块图片
  getImageUrlApi() {
    return http.post({
      url: baseUrl + "/auth/imageUrl",
    });
  },

  //获取活块验证成功标志
  getCaptchaApi() {
    return http.post({
      url: baseUrl + "/auth/captcha",
    });
  },

  //获取邮箱验证码
  getLoginCodeApi(params: any = {}) {
    return http.post({
      url: baseUrl + "/captcha/getUc",
      data: params,
    });
  },
  getUserInfoApi(params: GetUserInfoParams) {
    return http.get<{
      data: { deptId: string };
    }>({
      url: "/admin-api/system/user/get",
      params,
    });
  },
  updateMenuApi(data: Partial<UpdateMenuApiReq>) {
    return http.put({
      url: "/admin-api/system/menu/update",
      data: {
        ...data,
      },
    });
  },
  /**
   * 创建菜单
   * @param data
   * @returns
   */
  createMenuApi(data: Partial<UpdateMenuApiReq>) {
    return http.post({
      url: "/admin-api/system/menu",
      data: {
        ...data,
      },
    });
  },
  getMenuDataApi(params: GetMenuDataApiReq) {
    return http.get<MenuItemData>({
      url: "/admin-api/system/menu/get",
      params,
    });
  },
  deleteMenuApi(params: GetMenuDataApiReq) {
    return http.delete<MenuItemData>({
      url: "/admin-api/system/menu/delete",
      params,
    });
  },
};

export default api;
