'use client';

import { SiteHeader } from '@/components/layout';
import type { ReactNode } from 'react';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <div className="pt-20">{children}</div>
    </div>
  );
}
