window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-settings-tools",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_web_react = require("@deepseek-ai/dsh-client-web-react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region lib/types/client/McpAddDialog.js
		/**
		* Add/edit dialog for one MCP server: transport select, server name, and
		* transport-specific fields (command/args/env for stdio, url/headers for http).
		*/
		function McpAddDialog({ initial, existingNames, onSave, onClose, t }) {
			const [transport, setTransport] = (0, react.useState)(initial?.transport ?? "stdio");
			const [serverName, setServerName] = (0, react.useState)(initial?.serverName ?? "");
			const [command, setCommand] = (0, react.useState)(initial?.command ?? "npx");
			const [args, setArgs] = (0, react.useState)(initial?.args?.join(", ") ?? "");
			const [envRaw, setEnvRaw] = (0, react.useState)(initial?.env !== void 0 ? Object.entries(initial.env).map(([k, v]) => `${k}=${v}`).join("\n") : "");
			const [url, setUrl] = (0, react.useState)(initial?.url ?? "");
			const [headersRaw, setHeadersRaw] = (0, react.useState)(initial?.headers !== void 0 ? Object.entries(initial.headers).map(([k, v]) => `${k}=${v}`).join("\n") : "");
			const [timeout, setTimeout_] = (0, react.useState)(initial?.toolCallTimeoutMs ?? 6e4);
			const [failOnStartup, setFailOnStartup] = (0, react.useState)(initial?.failOnStartupError ?? false);
			const [saving, setSaving] = (0, react.useState)(false);
			const [errors, setErrors] = (0, react.useState)({});
			const parseKv = (raw) => {
				const result = {};
				for (const line of raw.split("\n")) {
					const trimmed = line.trim();
					if (trimmed.length === 0 || trimmed.startsWith("#")) continue;
					const eq = trimmed.indexOf("=");
					if (eq < 0) continue;
					result[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
				}
				return result;
			};
			const validate = () => {
				const errs = {};
				if (serverName.length === 0 || !/^[A-Za-z0-9_-]{1,32}$/.test(serverName)) errs.serverName = t("mcpServerNameInvalid");
				else if (existingNames.some((n) => n !== initial?.serverName && n === serverName)) errs.serverName = t("mcpServerNameTaken");
				if (transport === "stdio" && command.length === 0) errs.command = t("mcpCommand");
				if (transport === "streamable-http" && url.length === 0) errs.url = t("mcpUrl");
				setErrors(errs);
				return Object.keys(errs).length === 0;
			};
			const handleSubmit = async (e) => {
				e.preventDefault();
				if (!validate()) return;
				setSaving(true);
				try {
					await onSave({
						serverName,
						transport,
						command,
						args: args.split(",").map((s) => s.trim()).filter(Boolean),
						env: parseKv(envRaw),
						url,
						headers: parseKv(headersRaw),
						toolCallTimeoutMs: timeout,
						failOnStartupError: failOnStartup
					});
					onClose();
				} catch (error) {
					setErrors({ submit: error instanceof Error ? error.message : String(error) });
				} finally {
					setSaving(false);
				}
			};
			return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				title: initial ? t("mcpServerName") : t("mcpAdd"),
				onClose,
				children: (0, react_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "12px"
					},
					children: [
						(0, react_jsx_runtime.jsxs)("label", { children: [
							(0, react_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "12px",
									marginBottom: "4px"
								},
								children: t("mcpServerName")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: serverName,
								onChange: (e) => setServerName(e.target.value),
								placeholder: "my-server"
							}),
							errors.serverName && (0, react_jsx_runtime.jsx)("span", {
								style: {
									color: "var(--dsw-error)",
									fontSize: "12px"
								},
								children: errors.serverName
							})
						] }),
						(0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "12px",
								marginBottom: "4px"
							},
							children: t("mcpTransport")
						}), (0, react_jsx_runtime.jsxs)("select", {
							value: transport,
							onChange: (e) => setTransport(e.target.value),
							style: {
								width: "100%",
								padding: "8px 10px",
								borderRadius: "var(--dsw-radius-sm)",
								border: "1px solid var(--dsw-border)",
								backgroundColor: "var(--dsw-bg)",
								color: "var(--dsw-text)",
								fontSize: "14px"
							},
							children: [(0, react_jsx_runtime.jsx)("option", {
								value: "stdio",
								children: t("mcpTransportStdio")
							}), (0, react_jsx_runtime.jsx)("option", {
								value: "streamable-http",
								children: t("mcpTransportHttp")
							})]
						})] }),
						transport === "stdio" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							(0, react_jsx_runtime.jsxs)("label", { children: [
								(0, react_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "12px",
										marginBottom: "4px"
									},
									children: t("mcpCommand")
								}),
								(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
									value: command,
									onChange: (e) => setCommand(e.target.value)
								}),
								errors.command && (0, react_jsx_runtime.jsx)("span", {
									style: {
										color: "var(--dsw-error)",
										fontSize: "12px"
									},
									children: errors.command
								})
							] }),
							(0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "12px",
									marginBottom: "4px"
								},
								children: t("mcpArgs")
							}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: args,
								onChange: (e) => setArgs(e.target.value),
								placeholder: "arg1, arg2"
							})] }),
							(0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "12px",
									marginBottom: "4px"
								},
								children: t("mcpEnv")
							}), (0, react_jsx_runtime.jsx)("textarea", {
								value: envRaw,
								onChange: (e) => setEnvRaw(e.target.value),
								rows: 3,
								style: {
									width: "100%",
									padding: "8px 10px",
									borderRadius: "var(--dsw-radius-sm)",
									border: "1px solid var(--dsw-border)",
									backgroundColor: "var(--dsw-bg)",
									color: "var(--dsw-text)",
									fontSize: "13px",
									fontFamily: "var(--dsw-mono)",
									resize: "vertical"
								}
							})] })
						] }),
						transport === "streamable-http" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("label", { children: [
							(0, react_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "12px",
									marginBottom: "4px"
								},
								children: t("mcpUrl")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								value: url,
								onChange: (e) => setUrl(e.target.value)
							}),
							errors.url && (0, react_jsx_runtime.jsx)("span", {
								style: {
									color: "var(--dsw-error)",
									fontSize: "12px"
								},
								children: errors.url
							})
						] }), (0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "12px",
								marginBottom: "4px"
							},
							children: t("mcpHeaders")
						}), (0, react_jsx_runtime.jsx)("textarea", {
							value: headersRaw,
							onChange: (e) => setHeadersRaw(e.target.value),
							rows: 3,
							style: {
								width: "100%",
								padding: "8px 10px",
								borderRadius: "var(--dsw-radius-sm)",
								border: "1px solid var(--dsw-border)",
								backgroundColor: "var(--dsw-bg)",
								color: "var(--dsw-text)",
								fontSize: "13px",
								fontFamily: "var(--dsw-mono)",
								resize: "vertical"
							}
						})] })] }),
						(0, react_jsx_runtime.jsxs)("label", { children: [(0, react_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "12px",
								marginBottom: "4px"
							},
							children: t("mcpTimeout")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
							type: "number",
							value: timeout,
							onChange: (e) => setTimeout_(Number(e.target.value))
						})] }),
						(0, react_jsx_runtime.jsxs)("label", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "8px"
							},
							children: [(0, react_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: failOnStartup,
								onChange: (e) => setFailOnStartup(e.target.checked)
							}), (0, react_jsx_runtime.jsx)("span", {
								style: { fontSize: "14px" },
								children: t("mcpFailOnStartup")
							})]
						}),
						errors.submit && (0, react_jsx_runtime.jsx)("span", {
							style: {
								color: "var(--dsw-error)",
								fontSize: "13px"
							},
							children: errors.submit
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "flex-end",
								gap: "8px",
								marginTop: "8px"
							},
							children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: onClose,
								type: "button",
								children: t("skillsDelete")
							}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								type: "submit",
								disabled: saving,
								children: saving ? t("mcpSaveOk") : t("mcpSave")
							})]
						})
					]
				})
			});
		}
		//#endregion
		//#region \0dsh-css:F:\Downloads\deepseek-harness\packages\client\ui-settings-tools\src\client\row-shared.module.css.mjs
		const css$2 = ".w6exxG_row{border:1px solid var(--dsw-border);border-radius:var(--dsw-radius-md);background:var(--dsw-bg);align-items:center;gap:16px;padding:14px 16px;display:flex}.w6exxG_rowName{min-width:0;color:var(--dsw-text);white-space:nowrap;text-overflow:ellipsis;flex:1;font-size:14px;font-weight:500;overflow:hidden}.w6exxG_rowMeta{text-align:right;flex-direction:column;flex:none;gap:4px;min-width:140px;display:flex}.w6exxG_rowDetail{color:var(--dsw-text-secondary);font-size:12px}.w6exxG_rowActions{flex:none;gap:4px;display:flex}.w6exxG_slider{background:var(--dsw-border);border-radius:2px;flex:none;width:64px;height:4px;position:relative;overflow:hidden}.w6exxG_sliderTrack{border-radius:2px;transition:background-color .2s;position:absolute;inset:0}.w6exxG_sliderTrackConnected{background:var(--dsw-ok)}.w6exxG_sliderTrackDisconnected{background:var(--dsw-warning)}.w6exxG_sliderTrackReconnecting{background:var(--dsw-accent)}.w6exxG_sliderTrackFailed{background:var(--dsw-error)}.w6exxG_sliderTrackLoaded{background:var(--dsw-ok)}.w6exxG_sliderTrackError{background:var(--dsw-error)}.w6exxG_sliderThumb{background:currentColor;border-radius:50%;width:10px;height:10px;transition:left .3s cubic-bezier(.4,0,.2,1);position:absolute;top:50%;transform:translateY(-50%)}.w6exxG_sliderThumbConnected{color:var(--dsw-ok);left:calc(100% - 10px)}.w6exxG_sliderThumbDisconnected{color:var(--dsw-warning);left:0}.w6exxG_sliderThumbReconnecting{color:var(--dsw-accent);left:30px}.w6exxG_sliderThumbFailed{color:var(--dsw-error);left:0}.w6exxG_sliderThumbLoaded{color:var(--dsw-ok);left:calc(100% - 10px)}.w6exxG_sliderThumbError{color:var(--dsw-error);left:0}";
		const tagId$2 = "@deepseek-ai/dsh-client-ui-settings-tools/row-shared.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-tools";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var row_shared_module_css_default = {
			"rowActions": "w6exxG_rowActions",
			"sliderThumbFailed": "w6exxG_sliderThumbFailed",
			"rowName": "w6exxG_rowName",
			"rowDetail": "w6exxG_rowDetail",
			"sliderTrackConnected": "w6exxG_sliderTrackConnected",
			"row": "w6exxG_row",
			"rowMeta": "w6exxG_rowMeta",
			"sliderTrackFailed": "w6exxG_sliderTrackFailed",
			"sliderThumbConnected": "w6exxG_sliderThumbConnected",
			"sliderTrackError": "w6exxG_sliderTrackError",
			"sliderThumbReconnecting": "w6exxG_sliderThumbReconnecting",
			"sliderThumbDisconnected": "w6exxG_sliderThumbDisconnected",
			"sliderTrackReconnecting": "w6exxG_sliderTrackReconnecting",
			"sliderTrackDisconnected": "w6exxG_sliderTrackDisconnected",
			"slider": "w6exxG_slider",
			"sliderTrackLoaded": "w6exxG_sliderTrackLoaded",
			"sliderThumb": "w6exxG_sliderThumb",
			"sliderThumbLoaded": "w6exxG_sliderThumbLoaded",
			"sliderThumbError": "w6exxG_sliderThumbError",
			"sliderTrack": "w6exxG_sliderTrack"
		};
		//#endregion
		//#region lib/types/client/McpRow.js
		function McpRow({ row, children, t }) {
			const status = row.status;
			const trackClass = status ? row_shared_module_css_default.sliderTrack + " " + (status.status === "connected" ? row_shared_module_css_default.sliderTrackConnected : status.status === "disconnected" ? row_shared_module_css_default.sliderTrackDisconnected : status.status === "reconnecting" ? row_shared_module_css_default.sliderTrackReconnecting : row_shared_module_css_default.sliderTrackFailed) : row_shared_module_css_default.sliderTrack;
			const thumbClass = status ? row_shared_module_css_default.sliderThumb + " " + (status.status === "connected" ? row_shared_module_css_default.sliderThumbConnected : status.status === "disconnected" ? row_shared_module_css_default.sliderThumbDisconnected : status.status === "reconnecting" ? row_shared_module_css_default.sliderThumbReconnecting : row_shared_module_css_default.sliderThumbFailed) : row_shared_module_css_default.sliderThumb + " " + row_shared_module_css_default.sliderThumbDisconnected;
			const labelText = status ? status.status === "connected" && status.tools ? t("mcpConnectedWithTools").replace("{count}", String(status.tools)) : status.status === "connected" ? t("mcpConnected") : status.status === "disconnected" ? t("mcpDisconnected") : status.status === "reconnecting" ? t("mcpReconnecting") : status.error ? t("mcpError").replace("{message}", status.error) : t("mcpFailed") : t("mcpConnecting");
			return (0, react_jsx_runtime.jsxs)("div", {
				className: row_shared_module_css_default.row,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: row_shared_module_css_default.rowName,
						children: row.config.serverName
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: row_shared_module_css_default.rowMeta,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: row_shared_module_css_default.rowDetail,
							children: labelText
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: row_shared_module_css_default.slider,
							children: [(0, react_jsx_runtime.jsx)("div", { className: trackClass }), (0, react_jsx_runtime.jsx)("div", { className: thumbClass })]
						})]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: row_shared_module_css_default.rowActions,
						children
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:F:\Downloads\deepseek-harness\packages\client\ui-settings-tools\src\client\McpSection.module.css.mjs
		const css$1 = ".jr2GNW_section{padding:0 24px}.jr2GNW_header{border-bottom:1px solid var(--dsw-border);justify-content:space-between;align-items:center;padding:24px 0 16px;display:flex}.jr2GNW_headerTitle{color:var(--dsw-text);font-size:16px;font-weight:600}.jr2GNW_headerIntro{color:var(--dsw-text-secondary);margin:12px 0 20px;font-size:14px;line-height:1.5}.jr2GNW_empty{text-align:center;color:var(--dsw-text-secondary);padding:48px 0;font-size:14px}.jr2GNW_error{color:var(--dsw-error);padding:24px 0;font-size:14px}.jr2GNW_list{flex-direction:column;gap:8px;display:flex}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-settings-tools/McpSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-tools";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var McpSection_module_css_default = {
			"section": "jr2GNW_section",
			"headerTitle": "jr2GNW_headerTitle",
			"headerIntro": "jr2GNW_headerIntro",
			"header": "jr2GNW_header",
			"empty": "jr2GNW_empty",
			"list": "jr2GNW_list",
			"error": "jr2GNW_error"
		};
		//#endregion
		//#region lib/types/client/McpSection.js
		/**
		* MCP settings section: a list of configured servers with status sliders,
		* plus an add button that opens the add/edit dialog. Loads on mount,
		* refreshes on pushed settings invalidations; connection state rides the
		* forwarded `mcp/status` event stream.
		*/
		function McpSection({ controller, useSnapshot, t }) {
			const ctl = controller;
			const ts = t;
			const state = useSnapshot((s) => s);
			const [openAdd, setOpenAdd] = (0, react.useState)(false);
			const [deletingName, setDeletingName] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				if (state.status === "idle") ctl.load();
			}, [ctl, state.status]);
			const handleSave = (0, react.useCallback)(async (server) => {
				await ctl.saveMcpServer(server);
			}, [ctl]);
			const handleDelete = (0, react.useCallback)(async (name) => {
				if (!confirm(ts("mcpDeleteConfirm") + "\n" + ts("mcpDeleteDesc"))) return;
				await ctl.removeMcpServer(name);
				setDeletingName(null);
			}, [ctl, ts]);
			const rows = state.mcpServers.map((server) => ({
				config: server,
				status: state.mcpStatus.get(server.serverName)
			}));
			if (state.status === "loading") return (0, react_jsx_runtime.jsx)("div", {
				className: McpSection_module_css_default.section,
				children: (0, react_jsx_runtime.jsx)("span", { children: ts("mcpConnecting") })
			});
			if (state.status === "error") return (0, react_jsx_runtime.jsx)("div", {
				className: McpSection_module_css_default.section,
				children: (0, react_jsx_runtime.jsx)("div", {
					className: McpSection_module_css_default.error,
					children: state.error
				})
			});
			return (0, react_jsx_runtime.jsxs)("div", {
				className: McpSection_module_css_default.section,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: McpSection_module_css_default.header,
						children: [(0, react_jsx_runtime.jsx)("h2", {
							className: McpSection_module_css_default.headerTitle,
							children: ts("mcpTitle")
						}), (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							onClick: () => setOpenAdd(true),
							children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutline16, {}), ts("mcpAdd")]
						})]
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: McpSection_module_css_default.headerIntro,
						children: ts("mcpIntro")
					}),
					rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
						className: McpSection_module_css_default.empty,
						children: ts("mcpEmpty")
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: McpSection_module_css_default.list,
						children: rows.map((row) => (0, react_jsx_runtime.jsx)(McpRow, {
							row,
							t: ts,
							children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								onClick: () => setDeletingName(row.config.serverName),
								children: ts("mcpDelete")
							})
						}, row.config.serverName))
					}),
					openAdd && (0, react_jsx_runtime.jsx)(McpAddDialog, {
						existingNames: state.mcpServers.map((s) => s.serverName),
						onSave: handleSave,
						onClose: () => setOpenAdd(false),
						t: ts
					}),
					deletingName && (0, react_jsx_runtime.jsx)(McpAddDialog, {
						...state.mcpServers.find((s) => s.serverName === deletingName) !== void 0 ? { initial: state.mcpServers.find((s) => s.serverName === deletingName) } : {},
						existingNames: state.mcpServers.map((s) => s.serverName),
						onSave: async () => {
							await handleDelete(deletingName);
							setOpenAdd(false);
						},
						onClose: () => setDeletingName(null),
						t: ts
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:F:\Downloads\deepseek-harness\packages\client\ui-settings-tools\src\client\SkillSection.module.css.mjs
		const css = ".WYwj-q_section{padding:0 24px}.WYwj-q_header{border-bottom:1px solid var(--dsw-border);padding:24px 0 16px}.WYwj-q_headerTitle{color:var(--dsw-text);font-size:16px;font-weight:600}.WYwj-q_headerIntro{color:var(--dsw-text-secondary);margin:12px 0 20px;font-size:14px;line-height:1.5}.WYwj-q_dropZone{border:2px dashed var(--dsw-border);border-radius:var(--dsw-radius-md);text-align:center;color:var(--dsw-text-secondary);margin-bottom:20px;padding:32px 16px;font-size:14px;transition:border-color .15s,background-color .15s}.WYwj-q_dropZoneDragging{border-color:var(--dsw-accent);background-color:var(--dsw-bg-soft);color:var(--dsw-text)}.WYwj-q_dropZoneError{border-color:var(--dsw-error);color:var(--dsw-error)}.WYwj-q_empty{text-align:center;color:var(--dsw-text-secondary);padding:48px 0;font-size:14px}.WYwj-q_error{color:var(--dsw-error);padding:24px 0;font-size:14px}.WYwj-q_list{flex-direction:column;gap:8px;display:flex}";
		const tagId = "@deepseek-ai/dsh-client-ui-settings-tools/SkillSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-settings-tools";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var SkillSection_module_css_default = {
			"section": "WYwj-q_section",
			"headerTitle": "WYwj-q_headerTitle",
			"empty": "WYwj-q_empty",
			"error": "WYwj-q_error",
			"header": "WYwj-q_header",
			"dropZoneDragging": "WYwj-q_dropZoneDragging",
			"headerIntro": "WYwj-q_headerIntro",
			"list": "WYwj-q_list",
			"dropZone": "WYwj-q_dropZone",
			"dropZoneError": "WYwj-q_dropZoneError"
		};
		//#endregion
		//#region lib/types/client/SkillDropZone.js
		/**
		* Drag-and-drop zone for skill upload. Accepts a folder (DataTransferItem
		* of kind "file" with a FileSystemDirectoryEntry); reads its SKILL.md via
		* the File API, then resolves with the parsed skill entry.
		*/
		function SkillDropZone({ onUpload, t }) {
			const [dragging, setDragging] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const pendingRef = (0, react.useRef)(null);
			const handleDrop = (0, react.useCallback)(async (e) => {
				e.preventDefault();
				setDragging(false);
				setError(null);
				const items = [...e.dataTransfer.items].filter((item) => item.kind === "file").map((item) => item.webkitGetAsEntry()).filter((entry) => entry !== null);
				if (items.length === 0) {
					setError(t("skillsDropError"));
					return;
				}
				const dirEntry = items.find((entry) => entry.isDirectory);
				if (dirEntry === void 0) {
					setError(t("skillsDropError"));
					return;
				}
				const reader = dirEntry.createReader();
				const skillFile = (await new Promise((resolve) => {
					reader.readEntries((result) => {
						resolve(result);
					});
				})).find((entry) => entry.isFile && entry.name === "SKILL.md");
				if (skillFile === void 0) {
					setError(t("skillsDropError"));
					return;
				}
				const content = await (await new Promise((resolve) => {
					skillFile.file(resolve);
				})).text();
				pendingRef.current = onUpload({
					name: dirEntry.name,
					content
				});
				await pendingRef.current;
				pendingRef.current = null;
			}, [onUpload, t]);
			return (0, react_jsx_runtime.jsx)("div", {
				className: SkillSection_module_css_default.dropZone + (dragging ? " " + SkillSection_module_css_default.dropZoneDragging : "") + (error ? " " + SkillSection_module_css_default.dropZoneError : ""),
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: handleDrop,
				children: error ?? (dragging ? t("skillsDropHintActive") : t("skillsDropHint"))
			});
		}
		//#endregion
		//#region lib/types/client/SkillRow.js
		function SkillRow({ row, children, t }) {
			const isLoaded = row.status === "loaded";
			const trackClass = row_shared_module_css_default.sliderTrack + " " + (isLoaded ? row_shared_module_css_default.sliderTrackLoaded : row_shared_module_css_default.sliderTrackError);
			const thumbClass = row_shared_module_css_default.sliderThumb + " " + (isLoaded ? row_shared_module_css_default.sliderThumbLoaded : row_shared_module_css_default.sliderThumbError);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: row_shared_module_css_default.row,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						className: row_shared_module_css_default.rowName,
						children: row.config.name
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: row_shared_module_css_default.rowMeta,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: row_shared_module_css_default.rowDetail,
							children: isLoaded ? t("skillsLoaded") : t("skillsError")
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: row_shared_module_css_default.slider,
							children: [(0, react_jsx_runtime.jsx)("div", { className: trackClass }), (0, react_jsx_runtime.jsx)("div", { className: thumbClass })]
						})]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: row_shared_module_css_default.rowActions,
						children
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/SkillSection.js
		/**
		* Skills settings section: a drag-drop upload zone at the top, followed by
		* a list of configured skills with status sliders. Skills are stored as
		* inline definitions in the `skill-sources` settings namespace; the host
		* writes them to `$DSH_HOME/skills/<name>/SKILL.md` on every update.
		*/
		function SkillSection({ controller, useSnapshot, t }) {
			const ctl = controller;
			const ts = t;
			const state = useSnapshot((s) => s);
			const [uploadingName, setUploadingName] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				if (state.status === "idle") ctl.load();
			}, [ctl, state.status]);
			const handleUpload = (0, react.useCallback)(async (skill) => {
				setUploadingName(skill.name);
				try {
					await ctl.saveSkill(skill);
				} finally {
					setUploadingName(null);
				}
			}, [ctl]);
			const handleDelete = (0, react.useCallback)(async (name) => {
				if (!confirm(ts("skillsDeleteConfirm") + "\n" + ts("skillsDeleteDesc"))) return;
				await ctl.removeSkill(name);
			}, [ctl, ts]);
			if (state.status === "loading") return (0, react_jsx_runtime.jsx)("div", {
				className: SkillSection_module_css_default.section,
				children: (0, react_jsx_runtime.jsx)("span", { children: ts("skillsLoading") })
			});
			if (state.status === "error") return (0, react_jsx_runtime.jsx)("div", {
				className: SkillSection_module_css_default.section,
				children: (0, react_jsx_runtime.jsx)("div", {
					className: SkillSection_module_css_default.error,
					children: state.error
				})
			});
			return (0, react_jsx_runtime.jsxs)("div", {
				className: SkillSection_module_css_default.section,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: SkillSection_module_css_default.header,
						children: (0, react_jsx_runtime.jsx)("h2", {
							className: SkillSection_module_css_default.headerTitle,
							children: ts("skillsTitle")
						})
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: SkillSection_module_css_default.headerIntro,
						children: ts("skillsIntro")
					}),
					(0, react_jsx_runtime.jsx)(SkillDropZone, {
						onUpload: handleUpload,
						t: ts
					}),
					state.skills.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
						className: SkillSection_module_css_default.empty,
						children: ts("skillsEmpty")
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: SkillSection_module_css_default.list,
						children: state.skills.map((skill) => (0, react_jsx_runtime.jsx)(SkillRow, {
							row: {
								config: skill,
								status: "loaded"
							},
							t: ts,
							children: (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleDelete(skill.name),
								disabled: uploadingName === skill.name,
								style: {
									background: "none",
									border: "none",
									color: "var(--dsw-text-secondary)",
									cursor: "pointer",
									fontSize: "13px",
									padding: "4px 8px",
									borderRadius: "var(--dsw-radius-sm)"
								},
								children: ts("skillsDelete")
							})
						}, skill.name))
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/store.js
		/**
		* Tools settings page store: loads the `mcp-servers` and `skill-sources`
		* settings namespaces, tracks MCP connection status through `mcp/status`
		* events, and exposes write helpers for add/edit/delete of both server
		* types. The host is the single fact source — every mutation writes through
		* the settings wire API and the page re-renders from the next describe.
		*/
		/** The page controller (one per settings surface). */
		var ToolsSettingsStore = class {
			api;
			store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)({
				status: "idle",
				error: null,
				writable: false,
				mcpServers: [],
				mcpStatus: /* @__PURE__ */ new Map(),
				skills: []
			});
			generation = 0;
			constructor(api) {
				this.api = api;
			}
			async load() {
				const generation = ++this.generation;
				this.store.update((s) => {
					s.status = "loading";
					s.error = null;
				});
				try {
					const resp = await this.api.settings.describe({});
					if (!resp.result.ok) throw new Error(resp.result.error.message);
					const { namespaces, writable } = resp.result.value;
					if (generation !== this.generation) return;
					const mcpServers = namespaces.find((ns) => ns.ns === "mcp-servers")?.value?.servers ?? [];
					const skills = namespaces.find((ns) => ns.ns === "skill-sources")?.value?.skills ?? [];
					this.store.update((s) => {
						s.status = "ready";
						s.writable = writable;
						s.mcpServers = mcpServers;
						s.skills = skills;
					});
				} catch (error) {
					if (generation !== this.generation) return;
					this.store.update((s) => {
						s.status = "error";
						s.error = error instanceof Error ? error.message : String(error);
					});
				}
			}
			async saveMcpServer(server) {
				const existing = this.store.getSnapshot().mcpServers.filter((s) => s.serverName !== server.serverName);
				await this.api.settings.update({
					ns: "mcp-servers",
					patch: { servers: [...existing, server] }
				});
				this.load();
			}
			async removeMcpServer(serverName) {
				const remaining = this.store.getSnapshot().mcpServers.filter((s) => s.serverName !== serverName);
				await this.api.settings.update({
					ns: "mcp-servers",
					patch: { servers: remaining }
				});
				this.load();
			}
			async saveSkill(skill) {
				const existing = this.store.getSnapshot().skills.filter((s) => s.name !== skill.name);
				await this.api.settings.update({
					ns: "skill-sources",
					patch: { skills: [...existing, skill] }
				});
				this.load();
			}
			async removeSkill(name) {
				const remaining = this.store.getSnapshot().skills.filter((s) => s.name !== name);
				await this.api.settings.update({
					ns: "skill-sources",
					patch: { skills: remaining }
				});
				this.load();
			}
			applyMcpStatus(status) {
				this.store.update((s) => {
					const map = new Map(s.mcpStatus);
					map.set(status.serverName, {
						status: status.status,
						tools: status.tools,
						error: status.error
					});
					s.mcpStatus = map;
				});
			}
		};
		//#endregion
		//#region lib/types/client/locales.js
		/** Copy dictionaries for the MCP and skills settings pages. */
		/** English strings (the key-set source of truth for this pair). */
		const en = {
			mcpNav: "MCP",
			mcpTitle: "MCP Servers",
			mcpIntro: "Manage external MCP servers. Each server connects and registers its tools under its own namespace.",
			mcpAdd: "Add MCP server",
			mcpTransport: "Transport",
			mcpTransportStdio: "Stdio (spawn process)",
			mcpTransportHttp: "Streamable HTTP",
			mcpServerName: "Server name",
			mcpServerNameHint: "Unique lowercase identifier for tool names",
			mcpServerNameInvalid: "Start with a letter; use lowercase letters, digits, and dashes only.",
			mcpServerNameTaken: "A server with this name already exists.",
			mcpCommand: "Command",
			mcpCommandHint: "Executable to spawn for stdio transport",
			mcpArgs: "Arguments",
			mcpArgsHint: "Comma-separated arguments",
			mcpEnv: "Environment",
			mcpEnvHint: "Key=value pairs, one per line",
			mcpUrl: "URL",
			mcpUrlHint: "MCP endpoint URL",
			mcpHeaders: "Headers",
			mcpHeadersHint: "Key=value pairs, one per line",
			mcpTimeout: "Tool call timeout (ms)",
			mcpTimeoutHint: "Per-invocation timeout in milliseconds",
			mcpFailOnStartup: "Fail on startup error",
			mcpFailOnStartupHint: "Reject activation when initial connection fails",
			mcpSave: "Save",
			mcpSaveOk: "Saved.",
			mcpDelete: "Delete",
			mcpDeleteConfirm: "Delete this server?",
			mcpDeleteDesc: "Deleting a server removes its configuration and disconnects it.",
			mcpDeleteOk: "Deleted.",
			mcpConnecting: "Connecting…",
			mcpConnected: "Connected",
			mcpConnectedWithTools: "Connected · {count} tools",
			mcpDisconnected: "Disconnected",
			mcpReconnecting: "Reconnecting…",
			mcpFailed: "Failed",
			mcpEmpty: "No MCP servers configured. Add one to get started.",
			mcpError: "Error: {message}",
			skillsNav: "Skills",
			skillsTitle: "Skills",
			skillsIntro: "Manage skills. Drag a folder containing SKILL.md to add one.",
			skillsDropHint: "Drag a folder containing SKILL.md here",
			skillsDropHintActive: "Release to upload",
			skillsDropError: "The dropped item is not a folder containing SKILL.md",
			skillsEmpty: "No skills configured.",
			skillsLoaded: "Loaded",
			skillsLoading: "Loading…",
			skillsError: "Error",
			skillsPath: "Path: {path}",
			skillsDelete: "Delete",
			skillsDeleteConfirm: "Delete this skill?",
			skillsDeleteDesc: "Deleting removes the skill file from disk.",
			skillsDeleteOk: "Deleted.",
			skillsUploadOk: "Uploaded.",
			skillsUploadError: "Upload failed: {message}"
		};
		const zh = {
			mcpNav: "MCP",
			mcpTitle: "MCP 服务器",
			mcpIntro: "管理外部 MCP 服务器。每个服务器连接后注册其工具。",
			mcpAdd: "添加 MCP 服务器",
			mcpTransport: "传输方式",
			mcpTransportStdio: "Stdio（子进程）",
			mcpTransportHttp: "Streamable HTTP",
			mcpServerName: "服务器名称",
			mcpServerNameHint: "唯一的工具名称标识符",
			mcpServerNameInvalid: "以字母开头，仅使用小写字母、数字和短横线。",
			mcpServerNameTaken: "已存在该名称的服务器。",
			mcpCommand: "命令",
			mcpCommandHint: "启动命令",
			mcpArgs: "参数",
			mcpArgsHint: "逗号分隔",
			mcpEnv: "环境变量",
			mcpEnvHint: "每行一个 key=value",
			mcpUrl: "URL",
			mcpUrlHint: "MCP 端点地址",
			mcpHeaders: "请求头",
			mcpHeadersHint: "每行一个 key=value",
			mcpTimeout: "工具调用超时（毫秒）",
			mcpTimeoutHint: "每次调用的超时时间",
			mcpFailOnStartup: "启动失败时终止",
			mcpFailOnStartupHint: "初始连接失败时拒绝激活",
			mcpSave: "保存",
			mcpSaveOk: "已保存。",
			mcpDelete: "删除",
			mcpDeleteConfirm: "删除此服务器？",
			mcpDeleteDesc: "删除会移除配置并断开连接。",
			mcpDeleteOk: "已删除。",
			mcpConnecting: "连接中…",
			mcpConnected: "已连接",
			mcpConnectedWithTools: "已连接 · {count} 个工具",
			mcpDisconnected: "未连接",
			mcpReconnecting: "重连中…",
			mcpFailed: "失败",
			mcpEmpty: "未配置 MCP 服务器。",
			mcpError: "错误: {message}",
			skillsNav: "技能",
			skillsTitle: "技能",
			skillsIntro: "管理技能。拖拽包含 SKILL.md 的文件夹即可添加。",
			skillsDropHint: "拖拽包含 SKILL.md 的文件夹到此",
			skillsDropHintActive: "释放以上传",
			skillsDropError: "拖入的不是包含 SKILL.md 的文件夹",
			skillsEmpty: "未配置技能。",
			skillsLoaded: "已加载",
			skillsLoading: "加载中…",
			skillsError: "错误",
			skillsPath: "路径: {path}",
			skillsDelete: "删除",
			skillsDeleteConfirm: "删除此技能？",
			skillsDeleteDesc: "删除会从磁盘移除该技能文件。",
			skillsDeleteOk: "已删除。",
			skillsUploadOk: "已上传。",
			skillsUploadError: "上传失败: {message}"
		};
		//#endregion
		//#region lib/types/client/index.js
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.tools";
		const inject = [
			"slots",
			"locale",
			"connection",
			"remote"
		];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-settings-tools: dictionaries");
			const api = ctx.get("connection").api;
			const t = ctx.locale.bind(NS);
			const controller = new ToolsSettingsStore(api);
			const useSnapshot = (0, _deepseek_ai_dsh_client_web_react.bindSnapshotSelector)(controller.store);
			const injected = () => ({
				controller,
				useSnapshot,
				api,
				t
			});
			ctx.effect(() => {
				const refresh = () => {
					controller.load();
				};
				const disposers = [
					ctx.remote.$on("settings/document-updated", (ns) => {
						if (ns === "mcp-servers" || ns === "skill-sources") refresh();
					}),
					ctx.remote.$on("mcp/status", (status) => {
						controller.applyMcpStatus(status);
					}),
					ctx.on("connection/reset", refresh)
				];
				return () => {
					for (const dispose of disposers) dispose();
				};
			}, "ui-settings-tools: pushed invalidations");
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "mcp",
				order: 5,
				label: () => t("mcpNav"),
				inject: injected
			}, McpSection));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "skills",
				order: 6,
				label: () => t("skillsNav"),
				inject: injected
			}, SkillSection));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map