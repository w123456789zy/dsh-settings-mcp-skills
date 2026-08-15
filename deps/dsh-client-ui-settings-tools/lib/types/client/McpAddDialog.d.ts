import type { ReactNode } from 'react';
import type { McpServerEntry } from './store.ts';
import type { en } from './locales.ts';
export interface McpAddDialogProps {
    /** Pre-filled values for edit mode; absent for add mode. */
    initial?: McpServerEntry;
    /** Every existing server name — a duplicate is refused before submit. */
    existingNames: readonly string[];
    onSave: (server: McpServerEntry) => Promise<void>;
    onClose: () => void;
    t: (key: keyof typeof en) => string;
}
export declare function McpAddDialog({ initial, existingNames, onSave, onClose, t }: McpAddDialogProps): ReactNode;
//# sourceMappingURL=McpAddDialog.d.ts.map