import { convertArrToTreeData } from "src/common/utils";
import { createThunks, dpChain } from "src/service";
import api from "./api";
import {
  AssignUserRoleApiReq,
  MenuItem,
  QueryRoleApiReq,
  QueryRoleListApiReq,
  QueryRoleMenuPermissionsApiReq,
  QueryUserListApiReq,
  Role,
  User,
} from "./model";
import { notification } from "antd";

// 校验权限
const checkPermission = () => {
  // 开发模式可以
  //   if (import.meta.env.DEV) return true;
  notification.error({
    message: "当前是演示环境, 无权限操作",
  });
  return false;
};

const thunks = createThunks("sysStore", {
  async queryUserListAct(req: Partial<QueryUserListApiReq>, store) {
    const { userPagination, currentDeptId } = store.getState().sysStore;
    const { data: { list = [], total = 0 } = {} } = await api.queryUserListApi({
      ...userPagination,
      deptId: currentDeptId!,
      ...req,
    });

    dpChain("sysStore").setUserList({
      list: list,
      total,
    });
  },
  /**
   * 获取角色权限role菜单
   * @param payload
   */
  async queryRoleListAct(payload: Partial<QueryRoleListApiReq>) {
    debugger;
    // const { data: { list = [], total = 0 } = {} } =
      // await api.queryRoleListApi(payload);
    // const { data: { list = [], total = 0 } = {} } = {
    //   data: {
    //     list: [
    //       {
    //         id: 101,
    //         name: "测试账号",
    //         code: "test",
    //         sort: 0,
    //         status: 0,
    //         type: 2,
    //         remark: "123",
    //         dataScope: 1,
    //         dataScopeDeptIds: [],
    //         createTime: 1609912175000,
    //       },
    //       {
    //         id: 1,
    //         name: "超级管理员",
    //         code: "super_admin",
    //         sort: 1,
    //         status: 0,
    //         type: 1,
    //         remark: "超级管理员",
    //         dataScope: 1,
    //         dataScopeDeptIds: null,
    //         createTime: 1609837428000,
    //       },
    //       {
    //         id: 2,
    //         name: "普通角色",
    //         code: "common",
    //         sort: 2,
    //         status: 0,
    //         type: 1,
    //         remark: "普通角色",
    //         dataScope: 2,
    //         dataScopeDeptIds: null,
    //         createTime: 1609837428000,
    //       },
    //       {
    //         id: 3,
    //         name: "CRM 管理员",
    //         code: "crm_admin",
    //         sort: 2,
    //         status: 0,
    //         type: 1,
    //         remark: "CRM 专属角色",
    //         dataScope: 1,
    //         dataScopeDeptIds: null,
    //         createTime: 1708743073000,
    //       },
    //       {
    //         id: 155,
    //         name: "测试数据权限",
    //         code: "test-dp",
    //         sort: 3,
    //         status: 0,
    //         type: 2,
    //         remark: "",
    //         dataScope: 2,
    //         dataScopeDeptIds: [100, 102, 103, 104, 105, 108],
    //         createTime: 1743404286000,
    //       },
    //       {
    //         id: 158,
    //         name: "2",
    //         code: "3",
    //         sort: 4,
    //         status: 0,
    //         type: 2,
    //         remark: null,
    //         dataScope: 1,
    //         dataScopeDeptIds: null,
    //         createTime: 1744891688000,
    //       },
    //     ],
    //     total: 6,
    //   },
    // };
    debugger;
    // dpChain("sysStore").setRoleList({
    //   list: list,
    //   total,
    // });
  },
  async queryRoleAct(payload: QueryRoleApiReq) {
    const { data } = await api.queryRoleApi(payload);
    dpChain("sysStore").setCurrentRole(data);
  },
  async updateRoleAct(data: Partial<Role>) {
    debugger;
    notification.error({
      message: "当前是演示环境, 无权限操作",
    });
    if (!checkPermission()) return;
    await api.updateRoleApi(data);
  },
  async createRoleAct(data: Partial<Role>) {
    await api.createRoleApi(data);
  },
  /**
   * 获取部门列表内容
   */
  async queryDeptListAct() {
    debugger;
    const { data } = await api.queryDeptListApi();
    dpChain("sysStore").setDeptList(data);
  },
  async queryUserAct(data: { id: number }) {
    const { data: userData } = await api.queryUserApi(data);
    dpChain("sysStore").setCurrentUser(userData);
  },
  async updateUserAct(data: Partial<User>) {
    if (!checkPermission()) return;
    await api.updateUserApi(data);
  },
  async createUserAct(data: Partial<User>) {
    await api.createUserApi(data);
  },
  async queryPostListAct() {
    const { data } = await api.queryPostListApi();
    dpChain("sysStore").setPostList(data);
  },
  async deleteUserAct(data: { id: number }) {
    if (!checkPermission()) return;
    await api.deleteUserApi(data);
  },
  async updateUserPasswordAct(data: { id: number; password: string }) {
    await api.updateUserPasswordApi(data);
  },
  async deleteRoleAct(data: { id: number }) {
    if (!checkPermission()) return;
    await api.deleteRoleApi(data);
  },
  async queryMenuListAct() {
    const { data } = await api.queryMenuListApi();
    dpChain("sysStore").setActivedMenuList(data);
    const tree = convertArrToTreeData<MenuItem>(data);
    dpChain("sysStore").setActivedMenuTree(tree);
  },
  async queryRoleMenuPermissionsAct(params: QueryRoleMenuPermissionsApiReq) {
    const { data } = await api.queryRoleMenuPermissionsApi(params);
    dpChain("sysStore").setRoleMenuPermissions(data);
  },
  async assignRoleMenuAct(data: { roleId: number; menuIds: number[] }) {
    if (!checkPermission()) return;
    await api.assignRoleMenuApi(data);
  },
  async listUserRoleAct(data: { userId: number }) {
    const { data: roleData } = await api.listUserRoleApi(data);
    dpChain("sysStore").setCurrentUserRole(roleData);
  },
  async listRoleAct() {
    const { data } = await api.listRoleApi();
    dpChain("sysStore").setUserRoleList(data);
  },
  async assignUserRoleAct(data: AssignUserRoleApiReq) {
    if (!checkPermission()) return;
    await api.assignUserRoleApi(data);
  },
  async listUserRolesAct(data: { userId: number }) {
    const { data: roleData } = await api.listUserRolesApi(data);
    dpChain("sysStore").setCurrentUserRoles(roleData);
  },
});
export default thunks;
