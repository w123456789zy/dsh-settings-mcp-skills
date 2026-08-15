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

Install into your `web` profile. This plugin is published to npm, so the
simplest path is the package name (no `github:` needed):

```sh
dsh plugin --profile web add dsh-settings-mcp-skills
```

On install pnpm runs a small `postinstall` script that ships with the bundle.
It does **no compilation and reaches no network** — it only extracts the two
pre-built official packages (bundled as tarballs under `deps/`) into your
profile's `node_modules` so the settings pages can load.

pnpm (≥10) blocks build scripts (`postinstall`/`prepare`) until they are
allowlisted — for **both** npm and git installs. On the first run, pnpm prints
the exact package key and the file to edit. Set that key to `true` under
`allowBuilds` in your profile's `$DSH_HOME/profiles/web/pnpm-workspace.yaml`,
then re-run the same `add` command. You only do this once.

**pnpm 11 release-age gate:** for ~10 days after a new version ships, pnpm may
silently install an older version instead (e.g. `add` resolves `0.1.0` while
`latest` is `0.1.1`). If `dsh plugin ... add` reports `+1` but you do not see
`postinstall` run (or the settings pages still do not appear), add the version
to your profile's `pnpm-workspace.yaml` and re-add:

```yaml
minimumReleaseAgeExclude:
  - dsh-settings-mcp-skills@0.1.1
```

Then `dsh plugin --profile web add dsh-settings-mcp-skills@0.1.1`.

Once installed, boot and the two new pages appear under **Settings**:

```sh
dsh --profile web
```

To uninstall:

```sh
dsh plugin --profile web remove dsh-settings-mcp-skills
```

**Pin a version** for repeatability: `dsh-settings-mcp-skills@0.1.0`.

You can also install from the GitHub repository or a local clone/tarball:

```sh
dsh plugin --profile web add github:w123456789zy/dsh-settings-mcp-skills
dsh plugin --profile web add ./dsh-settings-mcp-skills
# or
dsh plugin --profile web add ./dsh-settings-mcp-skills-0.1.0.tgz
```

The `allowBuilds` step applies to these too (pnpm gates `postinstall`
regardless of source). Pin a git commit for repeatability:
`github:w123456789zy/dsh-settings-mcp-skills#<sha>`.

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
They ship as bundled tarballs under `deps/`, and each tarball carries its own
unchanged MIT `LICENSE`. [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
records the attribution. This re-distribution is permitted by their MIT license.

## Building / packaging

No build step is needed for users — the dependencies ship pre-built. To package
your own tarball before publishing:

```sh
pnpm pack
```
