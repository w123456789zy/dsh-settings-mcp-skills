/**
 * @module @deepseek-ai/dsh-host-tool-settings
 */
import { Service, type Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import { McpServersSchema, SkillSourcesSchema } from './types.ts';
export declare const name = "host-tool-settings";
export declare const inject: readonly string[];
export { McpServersSchema, SkillSourcesSchema };
export type { McpServersConfig, SkillSourcesConfig, McpServerEntry, SkillEntry } from './types.ts';
export interface Config {
    dshHome: string;
}
export declare const Config: z<Config>;
/**
 * Host-side plugin that owns the settings namespaces for MCP server
 * management and inline skill definitions. On every committed change to
 * `skill-sources` it writes the declared skill files to
 * `$DSH_HOME/skills/<name>/SKILL.md` so the filesystem skill provider
 * discovers them.
 */
export declare class ToolSettingsService extends Service {
    static inject: string[];
    static Config: z<Config>;
    constructor(ctx: Context, config: Config);
}
//# sourceMappingURL=index.d.ts.map