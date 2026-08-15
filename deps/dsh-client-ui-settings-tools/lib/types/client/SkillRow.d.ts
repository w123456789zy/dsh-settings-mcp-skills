/**
 * One skill row: name on the left, status slider + detail on the right.
 */
import type { ReactNode } from 'react';
import type { SkillRow } from './store.ts';
import type { en } from './locales.ts';
export interface SkillRowProps {
    row: SkillRow;
    children?: ReactNode;
    t: (key: keyof typeof en) => string;
}
export declare function SkillRow({ row, children, t }: SkillRowProps): ReactNode;
//# sourceMappingURL=SkillRow.d.ts.map