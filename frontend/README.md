# monorepo单体仓库
## 项目说明：利用turborepo特性
因为默认：
使用turbo run dev会扫描当前的所有的dev的命令启动脚本；
### 解决vue2的nodejs和系统项目不一致的问题
那么解决方案：单独修改admin-elementui的dev为serve
第二个方式：
通过每次切换当前的版本来解决问题
因为ruoyi的 前端项目，确实是重点，但是UI部分：
核心在于：更好实现的功能，和一些页面的标准化。


## 优势
### 1.项目管理方面
（1）统一代码规范
所有应用和包都在同一个仓库，可以直接在根目录配置 ESLint、Prettier、Husky、CI/CD 流程，做到“一处修改，全局生效”。

比如：在根目录加一个 eslint.config.js，apps 和 packages 自动继承，减少重复维护。

（2）统一版本管理
当某个库需要升级（例如 React、TypeScript），只需在根目录升级一次，不需要在多个仓库重复升级。

（3）更容易做全局重构
如果 API 设计发生变化（例如 utils 里一个函数修改了签名），可以在一个 PR 中同时修改 utils 和所有依赖它的项目，保证代码一直能跑。

### 2.代码复用方面和依赖管理
（1）共享组件库/基础库
比如 packages/ui 放通用组件，packages/utils 放工具方法，apps/web 和 apps/mobile 都能直接依赖，开发体验接近本地文件引用。

（2）提升一致性
比如三个子项目，使用统一的react和react-dom都是18.2版本管理

（3）依赖共享
借助工具（pnpm/yarn/npm workspaces），React、TypeScript 这些通用依赖只装一份在根目录，节省磁盘空间和 CI 构建时间。

### 3.协作与CI/CD
（1）一次CI/CD配置，多应用共享
可以使用Turborepo，Nx这种工具，只跑受到影响的包和应用，CI时间显著降低。

## monorepo问题
单体仓库有很多优势，但是难以拓展，每一个工作区都有自己的测试套件，代码检查工具，构建工具等。

（1）仓库庞大，新人初次 clone 会下载很多不相关的代码。

（2）需要理解 workspace、构建工具（pnpm workspace / Turborepo / Nx）的机制，学习成本稍高。

（3）一般而言，根目录统一当前的通用版本和代码规范




# Turbo 用法简介

[Turbo](https://turbo.build/) 是一个高性能的构建系统和任务运行器，常用于管理 monorepo 项目。以下是 Turbo 的基本用法：





## 安装

```bash
npm install turbo --save-dev
```

或使用 `pnpm`/`yarn` 安装。

## 配置

在项目根目录下创建 `turbo.json` 文件：

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "lint": {},
    "test": {}
  }
}
```

## 常用命令

- **运行任务**

  ```bash
  npx turbo run build
  ```

  运行所有包的 `build` 脚本，并自动处理依赖关系。

- **并行执行**  
   Turbo 会自动并行执行无依赖的任务，加快构建速度。

- **缓存**  
   Turbo 支持智能缓存，跳过未变更的任务，提升效率。

## 适用场景

- 管理 monorepo 多包项目
- 优化 CI/CD 流程
- 提升本地开发和构建速度

更多详细用法请参考 [官方文档](https://turbo.build/docs)。



# 当前的项目结构说明
 Turborepo 项目架构中，apps 目录和 packages 目录是组织代码的核心结构，体现了“单体仓库（Monorepo）”的最佳实践。


## apps 目录
apps 目录用于存放独立可运行的应用程序（如前端 Web 应用、后端服务、移动端应用、CLI 工具等）。

- `apps/`：主应用目录，所有前端项目（如 admin-antd、admin-shadcn-nextjs）均在此文件夹下。
- `apps/admin-antd`：基于 Ant Design 的管理后台项目。
- `apps/admin-shadcn-nextjs`：基于 Shadcn UI 和 Next.js 的管理后台项目。
- `apps/web`：前端项目，包含 React 项目。
- `apps/mobile`：移动端项目，包含 React Native 项目。
- `apps/backend`：后端项目，包含 Spring Boot 项目。
- `apps/frontend`：前端项目，包含 Vue 项目。
- `apps/api`：API 项目，包含 Node.js 项目。
- `apps/desktop`：桌面端项目，包含 Electron 项目。

## packages 目录
packages 目录用于存放可被多个应用共享的代码模块。
包括：UI 组件库、工具函数、类型定义、API 客户端、配置、设计系统、公共 Hooks 等。
本质是内部 npm 包，通过 npm link 或 Yarn/NPM Workspaces 在 apps 中引用


- `packages/`：共享包目录，存放通用组件库、工具库、配置文件等。
- `packages/ui`：通用组件库，包含可复用的 UI 组件。
- `packages/utils`：工具库，包含通用的工具函数。
- `packages/config`：配置文件，包含项目的全局配置。
- `packages/theme`：主题库，包含项目的主题配置。
- `packages/typings`：类型声明文件，包含项目的类型定义。
- `packages/eslint-config`：ESLint 配置文件，包含项目的 ESLint 配置。


