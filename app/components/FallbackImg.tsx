"use client";

import { useEffect, useState } from "react";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallback: string; // ✅ REQUIRED
};

export default function FallbackImg({
  src,
  alt = "",
  className,
  loading = "lazy",
  fallback,
}: Props) {
  const clean = (src || "").trim();
  const [currentSrc, setCurrentSrc] = useState<string>(clean || fallback);

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
        setCurrentSrc((cur) => (cur === fallback ? cur : fallback));
      }}
    />
  );
}
