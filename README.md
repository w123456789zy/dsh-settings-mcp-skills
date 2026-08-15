# dsh-settings-mcp-skills

English | [中文](README.zh.md)

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) **bundle**
plugin that adds the **MCP Servers** and **Skills** settings pages to the dsh
web UI.

DeepSeek's npm-shipped `dsh` (`npm install -g @deepseek-ai/dsh`) ships an older
`web-app` bundle that omits these two settings pages. This plugin backports
them into your `web` profile with one command — you keep every other part of
your dsh install untouched.

- **MCP Servers page** — list, add, edit, and delete external MCP servers. Each
  row shows a live connection-status slider (connected / disconnected /
  reconnecting / failed); the add dialog collects transport, server name, and
  transport-specific fields (command/args/env for stdio, url/headers for HTTP).
- **Skills page** — drag-and-drop upload of a folder containing `SKILL.md`. The
  host writes uploaded skills to `$DSH_HOME/skills/<name>/SKILL.md`, where the
  built-in filesystem skill provider auto-discovers them.

The underlying MCP client, skill loader, settings seam, and connection status
are all provided by dsh itself — this plugin contributes **only the settings
UI pages**. It does not re-implement or replace any of dsh's MCP or skill
mechanisms.

## Install

Install into your `web` profile straight from this GitHub repository:

```sh
dsh plugin --profile web add github:w123456789zy/dsh-settings-mcp-skills
```

This is a sources install, so on the first run pnpm will build nothing (the
bundled packages are already pre-built) and the profile is ready. Boot and the
two new pages appear under **Settings**:

```sh
dsh --profile web
```

To uninstall:

```sh
dsh plugin --profile web remove dsh-settings-mcp-skills
```

You can also install from a local clone or a tarball:

```sh
dsh plugin --profile web add ./dsh-settings-mcp-skills
# or
dsh plugin --profile web add ./dsh-settings-mcp-skills-0.1.0.tgz
```

Pin a commit for repeatability: `github:w123456789zy/dsh-settings-mcp-skills#<sha>`.

## What it installs

The bundle inserts two plugin rows into the web profile and ships the two
packages they reference, so they resolve locally without needing npm:

| Row id | Package | Role |
|---|---|---|
| `ui-settings-tools` | `@deepseek-ai/dsh-client-ui-settings-tools` | Browser settings pages (MCP + Skills), registered as `settings.section` slots |
| `host-tool-settings` | `@deepseek-ai/dsh-host-tool-settings` | Host service owning `mcp-servers` / `skill-sources` namespaces + disk projection |

The `cordis.patch.yml` layer is applied after `web-app`, so it only adds rows
that the npm-shipped web-app leaves out and never overrides your own profile
or home-level `cordis.patch.yml`.

## License and attribution

This bundle itself is MIT. It re-distributes two DeepSeek Harness packages
(`@deepseek-ai/dsh-client-ui-settings-tools` and `@deepseek-ai/dsh-host-tool-settings`),
which are DeepSeek components licensed **MIT, Copyright (c) 2026 DeepSeek**.
Each ships its own unchanged `LICENSE` under `deps/<name>/`, and
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) records the attribution. This
re-distribution is permitted by their MIT license.

## Building / packaging

No build step is needed for users — the dependencies ship pre-built. To package
your own tarball before publishing:

```sh
pnpm pack
```
