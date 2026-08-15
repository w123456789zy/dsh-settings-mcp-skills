/**
 * Contract types for the two settings sections this plugin registers: the
 * MCP page and the skills page. Shared by both section components.
 */
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { IApiClient } from '@deepseek-ai/dsh-api-remotes/client';
import type { SnapshotSelectorHook } from '@deepseek-ai/dsh-client-web-react';
import type { ToolsSettingsState, ToolsSettingsStore } from './store.ts';
import type { en } from './locales.ts';
/** Injected dependencies shared by both settings sections. */
export interface ToolsSectionInjected {
    controller: ToolsSettingsStore;
    useSnapshot: SnapshotSelectorHook<ToolsSettingsState>;
    api: Pick<IApiClient, 'settings'>;
    t: (key: keyof typeof en) => string;
}
export type McpSectionProps = PropsRuntime<'settings.section'> & Partial<ToolsSectionInjected>;
export type SkillSectionProps = PropsRuntime<'settings.section'> & Partial<ToolsSectionInjected>;
//# sourceMappingURL=shell-contract.d.ts.map