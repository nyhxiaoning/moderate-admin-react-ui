import http from "src/common/http";
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
import { getRefreshToken } from "src/common/http/auth";

const baseUrl = "/admin-api/system";

const api = {
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
  captchaApi() {
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
      url: "/admin-api/system/captcha/get",
      // url: "/admin-api/system/captcha",
      data: {
        captchaType: "blockPuzzle",
      },
    });
  },
  getIdByNameApi(data: GetIdByNameApiReq) {
    return http.get<any>({
      url: "/admin-api/system/tenant/get-id-by-name?name=" + data.tenantName,
    });
  },
  loginApi(data: LoginApiReq) {
    debugger
    return http.post<LoginApiRes>({
      url: "/admin-api/system/auth/login",
      data,
    });
  },
  // 获取权限
  getPermissionInfoApi() {
    return http.get<LoginApiRes>({
      url: "/admin-api/system/auth/get-permission-info",
    });
  },
  fetchUserPermissions() {
    return http.get<{ permissions: any; menus: MenuPermissionItem[] }>({
      url: baseUrl + "/auth/get-permission-info",
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
  createMenuApi(data: Partial<UpdateMenuApiReq>) {
    return http.post({
      url: "/admin-api/system/menu/create",
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
