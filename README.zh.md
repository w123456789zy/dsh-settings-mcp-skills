# dsh-settings-mcp-skills

English | [中文](README.zh.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的
**bundle 插件**，把 **MCP 服务器** 和 **技能（Skills）** 两个配置页面加到
dsh 的 Web UI 设置里。

DeepSeek 通过 npm 分发的 `dsh`（`npm install -g @deepseek-ai/dsh`）自带的是
较旧版本的 `web-app` bundle，缺少这两个配置页面。本插件用一条命令把它们装进
你的 `web` profile，其余部分完全不动。

- **MCP 服务器页面** — 列出、添加、编辑和删除外部 MCP 服务器。每一行显示一个
  实时连接状态滑块（已连接 / 未连接 / 重连中 / 失败）；添加对话框收集传输方式、
  服务器名称，以及传输方式相关字段（stdio 的 command/args/env，HTTP 的 url/headers）。
- **技能页面** — 拖拽上传一个包含 `SKILL.md` 的文件夹。host 会把上传的技能写入
  `$DSH_HOME/skills/<name>/SKILL.md`，内置的文件系统技能提供器会自动发现它。

底层的 MCP 客户端、技能加载、settings 机制和连接状态全部由 dsh 自身提供——本
插件**只贡献这两个设置页面**，不重新实现、也不替代 dsh 的 MCP 或技能机制。

## 安装

装到 `web` profile。本插件已发布到 npm，最简单的用法直接用包名（无需 `github:`）：

```sh
dsh plugin --profile web add dsh-settings-mcp-skills
```

安装时 pnpm 会运行一个随 bundle 自带的小型 `postinstall` 脚本。它**不做编译、
也不联网**，只是把两个已预构建的官方包（以 tarball 形式放在 `deps/` 下）解压到
你的 profile 的 `node_modules`，这样设置页面才能加载。

pnpm（≥10）会拦截构建脚本（`postinstall`/`prepare`），直到放行为止——**无论
npm 还是 git 安装都一样**。第一次运行时 pnpm 会打印出确切的包 key 和要编辑的
文件。把该 key 设为 `true`，放进你的 profile 的
`$DSH_HOME/profiles/web/pnpm-workspace.yaml` 里的 `allowBuilds` 下，然后重跑
同一条 `add` 命令即可。这一步只需做一次。

**pnpm 11 release-age 门禁**：新版本发布后约 10 天内，pnpm 可能静默装回更旧
的版本（例如 `add` 解析成 `0.1.0`，而 `latest` 已是 `0.1.1`）。如果
`dsh plugin ... add` 显示 `+1` 却没有运行 `postinstall`（或设置页仍不出现），
把版本号加进 profile 的 `pnpm-workspace.yaml` 再重装：

```yaml
minimumReleaseAgeExclude:
  - dsh-settings-mcp-skills@0.1.1
```

然后 `dsh plugin --profile web add dsh-settings-mcp-skills@0.1.1`。

安装完成后启动，设置里会出现两个新页面：

```sh
dsh --profile web
```

卸载：

```sh
dsh plugin --profile web remove dsh-settings-mcp-skills
```

固定版本以保证可复现：`dsh-settings-mcp-skills@0.1.0`。

也可以从 GitHub 仓库或本地克隆 / tarball 安装：

```sh
dsh plugin --profile web add github:w123456789zy/dsh-settings-mcp-skills
dsh plugin --profile web add ./dsh-settings-mcp-skills
# 或
dsh plugin --profile web add ./dsh-settings-mcp-skills-0.1.0.tgz
```

这些来源同样需要 `allowBuilds`（pnpm 对 `postinstall` 的拦截与来源无关）。
固定 git commit 以保证可复现：`github:w123456789zy/dsh-settings-mcp-skills#<sha>`。

## 它会装什么

该 bundle 向 web profile 插入两个插件行，并随包携带它们引用的两个依赖，因此
无需 npm 即可本地解析：

| 行 id | 包 | 作用 |
|---|---|---|
| `ui-settings-tools` | `@deepseek-ai/dsh-client-ui-settings-tools` | 浏览器设置页面（MCP + Skills），注册为 `settings.section` slots |
| `host-tool-settings` | `@deepseek-ai/dsh-host-tool-settings` | 拥有 `mcp-servers` / `skill-sources` 命名空间的服务，以及磁盘投影 |

`cordis.patch.yml` 层在 `web-app` 之后应用，所以它只添加 npm 版 web-app 未包含
的行，永远不会覆盖你自己的 profile 或 home 级 `cordis.patch.yml`。

## 许可证与署名

本 bundle 自身采用 MIT 许可证。它再分发了两个 DeepSeek Harness 包
（`@deepseek-ai/dsh-client-ui-settings-tools` 和 `@deepseek-ai/dsh-host-tool-settings`），
它们是 DeepSeek 的组件，采用 **MIT、Copyright (c) 2026 DeepSeek**。
它们以 bundled tarball 的形式放在 `deps/` 下，每个 tarball 内都附带其未改动的
MIT `LICENSE`。[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 记录了署名。
这种再分发是它们的 MIT 许可证所允许的。

## 构建 / 打包

用户无需任何构建步骤——依赖包已预构建。如需打包自己的 tarball 发布：

```sh
pnpm pack
```
