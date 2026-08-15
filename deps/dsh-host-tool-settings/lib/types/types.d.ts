/**
 * Schema and types for the tool-settings settings namespaces.
 * @module
 */
import z from '@deepseek-ai/schemastery';
/** One MCP server definition the settings page stores. */
export interface McpServerEntry {
    /** Unique local namespace for this server's model-facing tool names. */
    serverName: string;
    /** Transport protocol. */
    transport: 'stdio' | 'streamable-http';
    /** Command to spawn (stdio transport). */
    command: string;
    /** Arguments for the command (stdio). */
    args: string[];
    /** Environment variables for the child process (stdio). */
    env: Record<string, string>;
    /** URL endpoint (streamable-http transport). */
    url: string;
    /** Additional HTTP headers (streamable-http). */
    headers: Record<string, string>;
    /** Per-tool-call timeout in milliseconds. */
    toolCallTimeoutMs: number;
    /** Reject activation when the initial connection or tool sync fails. */
    failOnStartupError: boolean;
    /** Reconnect policy after a lost connection. */
    reconnect?: {
        enabled?: boolean;
        initialDelayMs?: number;
        maxDelayMs?: number;
        maxAttempts?: number;
    };
}
export declare const McpServerSchema: z<McpServerEntry>;
/** Runtime-resolved MCP servers config (the settings namespace value). */
export interface McpServersConfig {
    servers: McpServerEntry[];
}
export declare const McpServersSchema: z<McpServersConfig>;
/** One inline skill definition the settings page stores. */
export interface SkillEntry {
    /** Skill name (also the bundle directory name). */
    name: string;
    /** The SKILL.md file content. */
    content: string;
}
export declare const SkillEntrySchema: z<SkillEntry>;
/** Runtime-resolved skill sources config (the settings namespace value). */
export interface SkillSourcesConfig {
    /** Inline skill definitions written to $DSH_HOME/skills/<name>/SKILL.md. */
    skills: SkillEntry[];
    /** Additional local directories scanned by the filesystem skill provider. */
    customDirs: string[];
}
export declare const SkillSourcesSchema: z<SkillSourcesConfig>;
//# sourceMappingURL=types.d.ts.map