import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const apps = [
  // "admin-antd",
  "admin-elementui",
  // "admin-shadcn-nextjs",
  // "nest-admin",
];

// 核心修复：精准处理路径中的重复apps
function normalizePath(basePath) {
  // 分割路径为数组（兼容不同操作系统的路径分隔符）
  const segments = basePath.split(path.sep);

  // 过滤掉重复的末尾apps（只保留一个）
  if (segments.length > 0 && segments[segments.length - 1] === "apps") {
    // 检查倒数第二个是否也是apps
    if (segments.length > 1 && segments[segments.length - 2] === "apps") {
      // 移除最后一个apps
      segments.pop();
    }
  }

  // 重新拼接路径
  return segments.join(path.sep);
}

// 获取标准化后的根目录
const rootDir = normalizePath(process.cwd());
// 构建正确的apps目录路径（确保只包含一个apps）
const appsDir = path.join(rootDir, "apps");

// 再次标准化appsDir，确保万无一失
const normalizedAppsDir = normalizePath(appsDir);

// NVM 路径配置
const nvmDir = process.env.NVM_DIR || `${process.env.HOME}/.nvm`;
const nvmScript = `${nvmDir}/nvm.sh`;

// apps.forEach((appName) => {
// 构建应用完整路径
const appPath = path.join(normalizedAppsDir, apps[0]);
console.log(`应用目录路径: ${appPath}`);

// 检查.nvmrc文件
const nvmrcPath = path.join(appPath, ".nvmrc");
console.log(`检测.nvmrc路径: ${nvmrcPath}`);

if (!fs.existsSync(nvmrcPath)) {
  console.error(`⚠️  ${apps[0]} 缺少 .nvmrc 文件（路径：${nvmrcPath}`);
  // return 0;
}

// 读取并启动应用
const version = fs.readFileSync(nvmrcPath, "utf-8").trim();
console.log(`🚀 启动 ${apps[0]} (Node ${version})`);

const command = `source ${nvmScript} && nvm exec ${version} npm run serve`;
const child = spawn("bash", ["-c", command], {
  stdio: "inherit",
  cwd:  normalizePath(appPath),
  env: { ...process.env, NVM_DIR: nvmDir },
});

child.on("close", (code) => {
  if (code !== 0) {
    console.error(`❌ ${apps[0]} 退出，错误码 ${code}`);
  }
});
// });
