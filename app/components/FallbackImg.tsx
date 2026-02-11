"use client";

import { useEffect, useMemo, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  fallback?: string; // category OG card
  finalFallback?: string; // ultimate fallback (default-og)
};

export default function FallbackImg({
  src,
  fallback,
  finalFallback = "/default-og.jpg",
  ...rest
}: Props) {
  const primary = (src || "").trim();
  const fb = (fallback || "").trim();
  const last = (finalFallback || "").trim();

  // Build a deterministic fallback chain: primary -> fallback -> finalFallback
  const chain = useMemo(() => {
    const uniq: string[] = [];
    for (const u of [primary, fb, last]) {
      if (!u) continue;
      if (!uniq.includes(u)) uniq.push(u);
    }
    return uniq;
  }, [primary, fb, last]);

  const [idx, setIdx] = useState(0);

  // If the src/fallback changes, restart at the primary
  useEffect(() => {
    setIdx(0);
  }, [primary, fb, last]);

  const current = chain[idx] || last;

  return (
    <img
      {...rest}
      src={current}
      onError={(e) => {
        // If we can advance in the chain, do it.
        if (idx < chain.length - 1) {
          setIdx((n) => Math.min(n + 1, chain.length - 1));
          return;
        }

        // Prevent infinite error loops if even final fallback fails
        const img = e.currentTarget;
        img.onerror = null;
      }}
    />
  );
}
