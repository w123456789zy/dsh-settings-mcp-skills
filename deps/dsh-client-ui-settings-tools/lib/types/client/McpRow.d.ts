/**
 * One MCP server row: name on the left, status slider + detail on the right.
 */
import type { ReactNode } from 'react';
import type { McpRow } from './store.ts';
import type { en } from './locales.ts';
export interface McpRowProps {
    row: McpRow;
    children?: ReactNode;
    t: (key: keyof typeof en) => string;
}
export declare function McpRow({ row, children, t }: McpRowProps): ReactNode;
//# sourceMappingURL=McpRow.d.ts.map