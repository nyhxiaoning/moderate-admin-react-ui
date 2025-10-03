# admin-antd
## 暂无解决方案：
1.当前的后端路由这里的实现，有问题，暂时使用前端默认路由查看这里的ruoyi菜单。
未来，这里antd的内容，全部进行调整，保证前端和后端的路由配置可以对应起来。

这里的前端代码，动态实现，暂时先不修改，暂时用前端vue2+vue3的，这里的路由未来可以参考一下，分支：antd：实现：https://github.com/DLand-Team/moderate-react-admin.git

如果不想自己本地启动，可以看部署完成的内容：
http://111.229.110.163/HomePage/SysPage/RolePage



## 2.这里的内容暂时修改一下UI，参考当前的分支内容：

这里的接口对应：如果用ruoyi-java框架：对应：  https://gitee.com/overseas_lessons/yudao-cloud.git 

### java项目对应启动：
https://doc.iocoder.cn/quick-start/#_3-%E5%88%9D%E5%A7%8B%E5%8C%96-mysql
1.复制配置sql到docker执行
docker cp /local/path/file.sql mysql-container:/tmp/file.sql
执行
docker cp /Users/henryning/Documents/code/personCode/github-10-1/yudao-cloud/sql/mysql/ruoyi-vue-pro.sql docker-mysql8:/tmp/file2.sql
2.进入bash
docker exec -it docker-mysql8 bash



3.生效sql,注意执行sql，这里进入sql命令行下后，执行source才会生效
 source /tmp/file.sql;

4.java项目启动后：访问swagger测试
http://127.0.0.1:48080/swagger-ui/index.html



# 项目说明：antd和dev-server关系
## dev-server 与 admin-antd 的关系

dev-server 和 admin-antd 之间存在一种开发辅助关系，主要体现在以下几个方面：

1. **WebSocket 通信**：admin-antd 项目中的 DevHelper 类通过 Socket.IO 建立与 dev-server 的 WebSocket 连接（连接到 localhost:666 端口）。这使得两个项目可以实时通信。

2. **插件管理功能**：
   - admin-antd 项目在开发环境下会监听 dev-server 发送的事件，如 "addPluginSuccessed"
   - 当插件添加成功时，admin-antd 会更新其加载状态并显示成功消息

3. **代码生成与模板**：
   - dev-server 提供了丰富的代码生成功能，包括路由、API、页面和组件模板
   - 这些功能可以帮助 admin-antd 项目快速生成标准化的代码结构

4. **开发工具集成**：
   - admin-antd 项目的首页中有对 "DevServer Eazy" 的介绍，描述其为"基于Koa+Ts打造的开发工具，运用NodeJs能力为开发提供助力"
   - 提到的功能包括：约定式路由、生成代码、插件系统、快捷设置等

5. **仅用于开发环境**：
   - 从代码中可以看出，DevHelper 的 Socket 连接仅在 process.env.NODE_ENV === "development" 时建立
   - 首页介绍中也提到 dev-server 是"打包剔除，仅开发"的工具

总结来说，dev-server 是一个专为 admin-antd 等前端项目提供开发辅助功能的服务器。它通过 WebSocket 与前端项目通信，提供代码生成、插件管理、路由配置等功能，大大提高了开发效率。在生产环境中，admin-antd 不依赖 dev-server 运行，dev-server 仅作为开发阶段的辅助工具存在。





本项目是一个基于 Ant Design 的 React 管理后台子项目，属于多项目仓库（monorepo）中的一部分。主要用于实现后台管理系统的前端界面，提供用户管理、权限控制、数据展示等功能。项目采用现代前端技术栈，便于与主项目及其他子项目协同开发和维护。

## 技术栈

- React
- Ant Design
- TypeScript
- 状态管理：Redux Toolkit
- 路由管理：React Router

## 主要功能

- 用户管理
- 权限控制
- 数据可视化
- 角色与菜单管理
- 审计日志

## 适用场景

- 企业级管理后台
- 数据管理平台

## 运行方式

1. 安装依赖：

   ```bash
   pnpm install
   ```

2. 启动开发服务器：

   ```bash
   pnpm dev
   ```

3. 构建生产环境代码：

   ```bash
   pnpm build
   ```

## 项目结构设计

```
admin-antd/
├── public/               # 静态资源
├── src/
│   ├── api/              # 接口请求封装
│   ├── assets/           # 图片、样式等资源
│   ├── components/       # 通用组件
│   ├── features/         # 业务模块（Redux slices）
│   ├── layouts/          # 页面布局
│   ├── pages/            # 路由页面
│   ├── routes/           # 路由配置
│   ├── store/            # Redux store 配置
│   ├── utils/            # 工具函数
│   └── App.tsx           # 应用入口
├── package.json
└── README.md
```

## 状态管理方案

项目采用 Redux Toolkit 进行全局状态管理，结合 React-Redux 实现组件间的数据共享。每个业务模块在 `features/` 目录下维护独立的 slice，便于模块化开发和维护。

## MVC 分层设计

- **Model（模型）**：数据结构和接口请求逻辑，主要集中在 `api/` 和 `features/` 目录。
- **View（视图）**：页面和组件，分布在 `pages/`、`components/` 和 `layouts/` 目录。
- **Controller（控制器）**：业务逻辑和状态管理，主要通过 Redux slices 和异步 action 实现，位于 `features/` 和 `store/` 目录。

如需了解更多，请参考主项目文档或相关子项目说明。
