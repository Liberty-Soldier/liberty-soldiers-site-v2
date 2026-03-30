'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  websiteId: string;          // from Hyvor Talk Console
  pageId?: string;            // stable id for this page (recommended)
  pageUrl?: string;           // canonical URL
};

export default function HyvorComments({ websiteId, pageId, pageUrl }: Props) {
  const pathname = usePathname();
  const id = pageId ?? pathname;

  useEffect(() => {
    // load embed script once
    if (!document.querySelector('script[data-hyvor-talk]')) {
      const s = document.createElement('script');
      s.src = 'https://talk.hyvor.com/embed/embed.js';
      s.type = 'module';
      s.setAttribute('data-hyvor-talk', '1');
      document.head.appendChild(s);
    }
  }, []);

  return (
    <hyvor-talk-comments
      website-id={websiteId}
      page-id={id}
      page-url={pageUrl}
      style={{ display: 'block' }}
    />
  );
}
