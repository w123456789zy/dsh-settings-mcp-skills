/**
 * Tools settings page store: loads the `mcp-servers` and `skill-sources`
 * settings namespaces, tracks MCP connection status through `mcp/status`
 * events, and exposes write helpers for add/edit/delete of both server
 * types. The host is the single fact source — every mutation writes through
 * the settings wire API and the page re-renders from the next describe.
 */
import type { IApiClient } from '@deepseek-ai/dsh-api-remotes/client';
import type { SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client';
/** One MCP server config the page stores. Mirrors the `mcp-servers` namespace schema. */
export interface McpServerEntry {
    serverName: string;
    transport: 'stdio' | 'streamable-http';
    command: string;
    args: string[];
    env: Record<string, string>;
    url: string;
    headers: Record<string, string>;
    toolCallTimeoutMs: number;
    failOnStartupError: boolean;
    reconnect?: {
        enabled?: boolean;
        initialDelayMs?: number;
        maxDelayMs?: number;
        maxAttempts?: number;
    };
}
/** One inline skill definition the page stores. Mirrors the `skill-sources` namespace schema. */
export interface SkillEntry {
    name: string;
    content: string;
}
/** Connection status for one MCP server, driven by forwarded `mcp/status` events. */
export interface McpConnectionStatus {
    status: 'connected' | 'disconnected' | 'reconnecting' | 'failed';
    tools?: number | undefined;
    error?: string | undefined;
}
/** One server row the page renders, joined with its live connection status. */
export interface McpRow {
    config: McpServerEntry;
    status: McpConnectionStatus | undefined;
}
/** One skill row the page renders. */
export interface SkillRow {
    config: SkillEntry;
    status: 'loaded' | 'error';
}
/** Page snapshot. */
export interface ToolsSettingsState {
    mcpServers: readonly McpServerEntry[];
    mcpStatus: ReadonlyMap<string, McpConnectionStatus>;
    skills: readonly SkillEntry[];
    writable: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'ready' | 'error';
}
/** The page controller (one per settings surface). */
export declare class ToolsSettingsStore {
    private readonly api;
    readonly store: SnapshotStore<ToolsSettingsState>;
    private generation;
    constructor(api: Pick<IApiClient, 'settings'>);
    load(): Promise<void>;
    saveMcpServer(server: McpServerEntry): Promise<void>;
    removeMcpServer(serverName: string): Promise<void>;
    saveSkill(skill: SkillEntry): Promise<void>;
    removeSkill(name: string): Promise<void>;
    applyMcpStatus(status: {
        serverName: string;
        status: 'connected' | 'disconnected' | 'reconnecting' | 'failed';
        tools?: number | undefined;
        error?: string | undefined;
    }): void;
}
export declare function messageOf(error: unknown): string;
//# sourceMappingURL=store.d.ts.map