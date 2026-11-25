# 计划与进度

## 目标

在 DeepSeek Harness 桌面端复刻 Claude Code VS Code 插件侧边栏的「会话分组文件夹」体验，并以可上架的形式发布：右侧栏独立面板 + 11 项功能 + 官方市场与自建索引双线。

## 决策记录

- 形态：右侧栏独立面板（`sidebarRightTabs` + `sidebar.right.pane.tab`），不改宿主。原生左侧会话列表没有分组扩展缝，打补丁无法上架且升级失效。
- 插件形态：npm bundle（`dsh.bundle.patch` + `dsh.client`），客户端半侧用 `__ModuleLoader__.load` 工厂加载。
- 数据：分组是视图状态，存 localStorage；会话数据走框架标准 hook `useSessions` / `useWorkspaces`，不碰会话日志。
- 上架：先发 npm，再用 `apps/plugin-market-generator` 生成索引；官方索引是否收录由 DeepSeek 决定，同时托管自建索引。

## 已完成

- 2026-11-25：项目骨架、包清单、cordis patch、构建脚本。
- 2026-11-25：面板 v1（分组 CRUD、颜色、拖拽会话/分组、两级、运行状态、时间、归档过滤、持久化、中英文案）。
- 2026-11-25：在隔离 DSH_HOME（`/tmp/dshhome`）里安装并启动 `dsh web` 验证：客户端模块被载入，`apply` 执行无报错。

## 待办

1. 在真实 desktop profile 安装，重启 DSH，人工验收：引导页入口、面板渲染、拖拽、重开后的持久化。
2. 未读提示：确认 `ui-session` 是否暴露可订阅的完成提醒；没有就向 DSH 提 slot/服务需求。
3. 分组按 Workspace 隔离（当前全局）。
4. 触屏拖拽降级（触屏下提供「移入分组」菜单）。
5. 打包上架：
   - `npm publish`
   - 用 plugin-market-generator 生成 `index.json`
   - 官方索引提交通道确认（`harness.deepseek.com` / 仓库 issue）
   - 自建索引托管（GitHub Pages / 对象存储）

## 验证记录

- `dsh plugin --profile web add <本地目录>` 安装成功，配置树中出现 `dsh-levelup-session-folders` 行。
- `dsh web` 客户端模块清单包含 `dsh-levelup-session-folders/client.js`。
- 浏览器控制台：`[dsh-levelup-session-folders] client loaded`，无 pageerror。

## 上架记录（Git 路线）

- 2026-11-25：公开仓库 https://github.com/Levelup-JC/dsh-levelup-session-folders，tag `v0.1.0`、`v0.1.1`。
- 市场索引：`market/index.json`，来源为 git + commit，已用官方 `parseMarketIndex` 校验通过。
- 索引地址：https://raw.githubusercontent.com/Levelup-JC/dsh-levelup-session-folders/main/market/index.json
- 已验证 `git+https://...#<commit>` 安装成功，客户端模块加载。
- npm 发布待账号：`dsh-levelup-session-folders` 名字可用，需 `npm login`（GitHub OAuth 可免密码建号）。
