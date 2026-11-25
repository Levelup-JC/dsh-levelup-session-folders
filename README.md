# dsh-levelup-session-folders

把会话按「文件夹」分组显示在 DeepSeek Harness 右侧栏。会话分组的颜色、拖拽排序、两级嵌套、运行状态和时间显示都在一个独立面板里，不修改 DSH 宿主代码，随 DSH 升级不受影响。

对应你在 Claude Code VS Code 插件里用的那套会话分组补丁（[claude-code-vscode-sidebar-patch](../claude-code-vscode-sidebar-patch/)），功能按 DSH 的能力重新实现。

## 已实现

| 功能 | 说明 |
| --- | --- |
| 分组文件夹 | 新建、重命名、删除分组，分组有 7 种颜色 |
| 会话拖入 | 会话可以拖到分组标题或分组内任意位置，也可以拖回「未分组」 |
| 分组拖拽排序 | 拖到另一分组标题上/下 30% 区域排序 |
| 两级分组 | 拖到另一分组标题中部即成为子分组；有子分组的分组不能再被嵌套 |
| 运行状态 | 运行中的会话行显示绿色脉冲圆点 |
| 绝对时间 | 今天显示 `HH:mm`，今年显示 `MM-DD HH:mm`，跨年显示 `YYYY-MM-DD HH:mm` |
| 隐藏归档 | 归档会话不显示 |
| 收起/展开 | 单个分组点击标题收起；工具栏可全部收起/展开 |
| 持久化 | 分组与归属存在 localStorage，按浏览器/DSH profile 隔离 |
| 打开会话 | 点击会话行调用 `ctx.uiWorkspace.openSession` |

## 未实现（DSH 侧限制或待做）

- **未读提示**：DSH 的未读/完成提醒是进程内 UI 策略，客户端没有稳定的公开读口；先用运行状态代替。
- **按会话的模型**：DSH 本身按会话选择模型，不需要本插件重复实现。
- **上下文过半提示**：DSH 自带压缩策略，面板不读 token 用量。
- 分组目前是全局的，不按 Workspace 隔离。

## 安装

**从插件索引安装（推荐）**

在 DSH 的「插件」页打开「发现」，点「添加索引源」，填入：

```
https://raw.githubusercontent.com/Levelup-JC/dsh-levelup-session-folders/main/market/index.json
```

然后搜索「会话分组」，点安装，重开 DSH。

**从 Git 仓库直接安装**

```sh
dsh plugin --profile desktop add "git+https://github.com/Levelup-JC/dsh-levelup-session-folders.git#v0.1.1"
```

**本地开发**

```sh
dsh plugin --profile desktop add /path/to/dsh-session-groups
```

装完重开 DSH。右侧栏的引导页里会出现「会话分组」，点开即可。

## 开发

```sh
npm install
npm run build   # esbuild -> lib/client.js（包在 __ModuleLoader__.load 工厂里）
```

- `src/client/index.tsx`：注册右侧栏 tab 类型与 `sidebar.right.pane.tab` 正文席位。
- `src/client/panel.tsx`：面板组件，数据来自框架标准 hook `useSessions` / `useWorkspaces`。
- `src/client/state.ts`：分组模型与 localStorage 持久化。
- `lib/index.js`：宿主半侧空插件，只提供挂载行。

## 目录

```
src/client/index.tsx   插件入口与槽位注册
src/client/panel.tsx   面板 UI 与拖拽交互
src/client/state.ts    分组数据模型
src/client/styles.ts   面板样式（统一 dsg- 前缀）
src/client/i18n.ts     中英文案
scripts/build.mjs      构建脚本
cordis.patch.yml       bundle 挂载声明
```

## 已知限制

- 只实现了右侧栏独立面板，不修改 DSH 原生左侧会话列表。
- 拖拽使用 HTML5 DnD，触屏设备上不可用。
- 依赖 DSH 0.2.x 的 `sidebarRightTabs` 与 `sidebar.right.pane.tab` 席位；DSH 大版本升级时需要重新验证。

## License

MIT
