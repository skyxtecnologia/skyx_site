'use client';

import type { ReactNode } from 'react';
import { SiteHeader } from './layout';

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <div className="pt-20">{children}</div>
    </div>
  );
}
