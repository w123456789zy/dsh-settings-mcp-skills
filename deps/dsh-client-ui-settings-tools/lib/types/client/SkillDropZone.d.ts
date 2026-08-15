import type { ReactNode } from 'react';
import type { SkillEntry } from './store.ts';
import type { en } from './locales.ts';
export interface SkillDropZoneProps {
    onUpload: (skill: SkillEntry) => Promise<void>;
    t: (key: keyof typeof en) => string;
}
export declare function SkillDropZone({ onUpload, t }: SkillDropZoneProps): ReactNode;
//# sourceMappingURL=SkillDropZone.d.ts.map