# @deepseek-ai/dsh-client-ui-settings-tools

English | [中文](README.zh.md)

MCP and skills settings pages. One client Cordis plugin registers two settings sections side by side: the **MCP** page (order 5) lists configured MCP servers with live connection status sliders and an add/edit form; the **Skills** page (order 6) shows configured inline skills with a drag-drop upload zone that accepts a folder containing SKILL.md.

The MCP page joins the `mcp-servers` settings namespace with the forwarded `mcp/status` event stream: each row shows a slider whose track color and thumb position signal connection state (green right = connected, red left = failed/disconnected, amber = reconnecting). The add dialog collects transport, server name, and transport-specific fields (command/args/env for stdio, url/headers for HTTP).

The Skills page reads and writes the `skill-sources` settings namespace. Dragging a folder reads its SKILL.md via the File API and stores the parsed `{ name, content }` pair through `settings.update`; the host-side plugin writes `$DSH_HOME/skills/<name>/SKILL.md` on every committed change, so the filesystem skill provider auto-discovers it. Each row shows a green slider when loaded, a red one on error.

## Model Experience

None, as the section renders a browser configuration UI; nothing here reaches a model request.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **MCP status is reactive only** — the page does not initiate connections; it observes the `mcp/status` events the mcp-client supervisor emits. A server that never attempted a connection shows no status until it does.
- **Skill upload is inline only** — the drag-drop writes the SKILL.md content to a settings namespace, which the host projects to disk. External files are not read; only the dropped folder's SKILL.md content is stored.
- **No edit dialog for skills** — skills are deleted and re-uploaded to change; a full edit form is deferred.
- **Transport select is uncontrolled** — switching transport in the add dialog does not clear the other transport's fields; the user is responsible for leaving them empty.
