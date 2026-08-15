/**
 * Tools settings plugin, browser half. Registers two settings sections —
 * MCP servers (order 5) and skills (order 6) — each with its own store,
 * inject face, and pushed-invalidation listener. The settings namespace
 * contract stays behind the standard wire API.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import { type ToolsKey } from './locales.ts';
export type { ToolsKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** The MCP + skills settings pages copy. */
        'settings.tools': ToolsKey;
    }
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map