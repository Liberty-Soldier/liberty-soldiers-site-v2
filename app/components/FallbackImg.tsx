"use client";

type Props = {
  src: string;
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
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={(e) => {
        const img = e.currentTarget;
        if (!img.src.includes(fallback)) img.src = fallback;
      }}
    />
  );
}
