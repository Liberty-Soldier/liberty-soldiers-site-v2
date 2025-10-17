'use client';
import { useEffect } from 'react';

export default function ClearSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations?.().then(regs =>
        regs.forEach(r => r.unregister())
      );
      if (window.caches?.keys) {
        caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
      }
    }
  }, []);
  return null;
}
