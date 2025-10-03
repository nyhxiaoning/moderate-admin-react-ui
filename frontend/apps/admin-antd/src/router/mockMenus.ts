

// Mock 菜单数据
export const mockMenuPermissions: any = {
  id: 1,
  parentId: 0,
  name: "系统管理",
  path: "/system",
  component: "Layout",
  componentName: "SystemLayout", // ROUTE_ID_KEY 类型值
  icon: "SettingOutlined",
  visible: true,
  keepAlive: true,
  alwaysShow: true,
  children: [
    {
      id: 11,
      parentId: 1,
      name: "用户管理",
      path: "/system/user",
      component: "system/user/index",
      componentName: "UserPage",
      icon: "UserOutlined",
      visible: true,
      keepAlive: false,
      alwaysShow: false,
      children: [],
    },
    {
      id: 12,
      parentId: 1,
      name: "角色管理",
      path: "/system/role",
      component: "system/role/index",
      componentName: "RolePage",
      icon: "TeamOutlined",
      visible: true,
      keepAlive: false,
      alwaysShow: false,
      children: [],
    },
    {
      id: 13,
      parentId: 1,
      name: "菜单管理",
      path: "/system/menu",
      component: "system/menu/index",
      componentName: "MenuPage",
      icon: "MenuOutlined",
      visible: true,
      keepAlive: false,
      alwaysShow: false,
      children: [],
    },
  ],
};

// Mock 菜单平铺数据（数据库式）
export const mockMenuListData: any[] = [
  {
    id: 1,
    key: "1",
    parentId: 0,
    name: "系统管理",
    component: "Layout",
    componentName: "SystemLayout",
    icon: "SettingOutlined",
    alwaysShow: true,
    keepAlive: true,
    visible: true,
    permission: "system:root",
    path: "/system",
    sort: 1,
    status: 0,
    type: 1, // 1目录 2菜单 3按钮
    createTime: Date.now(),
  },
  {
    id: 11,
    key: "11",
    parentId: 1,
    name: "用户管理",
    component: "system/user/index",
    componentName: "UserPage",
    icon: "UserOutlined",
    alwaysShow: false,
    keepAlive: false,
    visible: true,
    permission: "system:user",
    path: "/system/user",
    sort: 1,
    status: 0,
    type: 2,
    createTime: Date.now(),
  },
  {
    id: 12,
    key: "12",
    parentId: 1,
    name: "角色管理",
    component: "system/role/index",
    componentName: "RolePage",
    icon: "TeamOutlined",
    alwaysShow: false,
    keepAlive: false,
    visible: true,
    permission: "system:role",
    path: "/system/role",
    sort: 2,
    status: 0,
    type: 2,
    createTime: Date.now(),
  },
];

// Mock 用户权限响应
export const mockUserPermissions: FetchUserPermissinsRes = {
  permissions: ["system:user:add", "system:user:edit", "system:role:view"],
  menus: mockMenuPermissions,
};

// Mock StoreState
export const mockStoreState: StoreState = {
  userName: "admin",
  token: "mock_access_token_123",
  qiniuToken: "mock_qiniu_token",
  permissions: ["SystemLayout", "UserPage", "RolePage"], // ROUTE_ID_KEY[]
  menuPermissions: mockMenuPermissions,
  routesPermissions: ["SystemLayout", "UserPage", "RolePage", "MenuPage"],
  locale: "zh-CN",
  btnCon: "save",
  btnTime: Date.now(),
  imgUrl: "https://dummyimage.com/200x100/000/fff.png&text=Demo",
  captcha: "1234",
  codeImg: "data:image/png;base64,...",
  captchaVerification: "mock_captcha_verification",
  demoData: {
    url: "http://localhost:3000",
    sname: "mock_user",
    spswd: "mock_password",
    userType: "admin",
    officeType: "IT",
  },
  userId: 1,
  menuTreeData: mockMenuListData, // 用 handleTree 可转成树形
  menuListData: mockMenuListData,
  modalType: "",
  currentEditMenuData: null,
};
