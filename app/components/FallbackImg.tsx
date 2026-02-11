"use client";

import { useEffect, useState } from "react";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallback?: string;
};

export default function FallbackImg({
  src,
  alt = "",
  className,
  loading = "lazy",
  fallback = "/og-default.jpg",
}: Props) {
  const clean = (src || "").trim();
  const [currentSrc, setCurrentSrc] = useState<string>(clean || fallback);

  // If src changes (new headline), update.
  useEffect(() => {
    const next = (src || "").trim();
    setCurrentSrc(next || fallback);
  }, [src, fallback]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
}
