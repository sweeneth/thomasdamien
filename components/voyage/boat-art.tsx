import { useId } from "react";

type ArtProps = { className?: string };

export function BoatArt({ className }: ArtProps) {
  const id = useId().replace(/:/g, "");
  const wood = `${id}-wood`;
  const deck = `${id}-deck`;
  const sail = `${id}-sail`;

  return (
    <svg viewBox="0 0 200 200" className={className ?? "h-full w-full"} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={wood} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a5a3c" />
          <stop offset="0.55" stopColor="#6b4330" />
          <stop offset="1" stopColor="#3e291c" />
        </linearGradient>
        <linearGradient id={deck} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7d3b4" />
          <stop offset="1" stopColor="#c4a27a" />
        </linearGradient>
        <linearGradient id={sail} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf7f0" />
          <stop offset="0.7" stopColor="#f4f1ea" />
          <stop offset="1" stopColor="#ddd2c2" />
        </linearGradient>
      </defs>

      <g className="voyage-wake">
        <path d="M74 158c-8 14-22 24-38 30" fill="none" stroke="#f4f1ea" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        <path d="M126 158c8 14 22 24 40 30" fill="none" stroke="#f4f1ea" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        <path d="M88 164c8 8 16 8 24-2" fill="none" stroke="#f4f1ea" strokeWidth="2.2" strokeLinecap="round" opacity="0.4" />
      </g>

      <ellipse cx="100" cy="124" rx="34" ry="16" fill="#14243a" opacity="0.18" />

      <path
        d="M100 36c16 18 31 46 32 82 1 22-8 40-22 48-6 3-14 4-10 2 2-16 6-28 6-46 0-30-10-58-6-86z"
        fill={`url(#${wood})`}
      />
      <path
        d="M100 36c-17 20-33 50-32 84-1 24 10 42 24 48 5 2 12 2 8-2-4-14-8-30-8-48 0-28 8-56 8-82z"
        fill="#5c3b2a"
      />
      <path
        d="M100 50c12 14 20 36 20 64 0 18-6 32-14 38-4 2-10 2-6-2 1-12 4-24 4-40 0-24-6-46-4-60z"
        fill={`url(#${deck})`}
      />
      <path
        d="M100 52c-11 16-18 36-18 62 0 16 4 28 10 36 3 3 8 2 5-2-2-12-4-24-4-38 0-22 5-42 7-58z"
        fill="#d7bc96"
        opacity="0.85"
      />
      <ellipse cx="100" cy="118" rx="9" ry="16" fill="#14243a" opacity="0.28" />
      <path d="M96 108h8l-2 22h-4z" fill="#2e5b4b" opacity="0.85" />

      <path d="M100 64c22 10 36 36 28 62-10-6-20-28-22-48-1-8-2-12-6-14z" fill={`url(#${sail})`} />
      <path d="M100 70c10 12 16 28 14 46" fill="none" stroke="#d9d3c5" strokeWidth="1.2" />
      <path d="M100 108c16 6 28 14 32 22" fill="none" stroke="#6b4330" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 58v62" stroke="#14243a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M100 52l7 8h-7z" fill="#c8461b" />
      <path d="M92 156c4 6 12 6 16 0" fill="none" stroke="#3e291c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Man({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 104" className={className ?? "h-full w-full"} aria-hidden="true" focusable="false">
      <ellipse cx="40" cy="92" rx="16" ry="5.5" fill="#14243a" opacity="0.16" />
      <path d="M30 62c-2 12-8 18-12 24" fill="none" stroke="#24352c" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 62c4 10 12 14 16 22" fill="none" stroke="#1d3329" strokeWidth="5" strokeLinecap="round" />
      <path d="M26 48c-8 6-12 12-8 16" fill="none" stroke="#2e5b4b" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M54 48c9 3 13 10 9 16" fill="none" stroke="#2e5b4b" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M27 44c-1 16 2 26 6 30h14c5-4 8-14 6-30-3-8-20-8-26 0z" fill="#2e5b4b" />
      <path d="M34 46c2 12 1 20 0 26" fill="none" stroke="#244a3c" strokeWidth="1.4" opacity="0.7" />
      <path d="M36 40h8v8h-8z" fill="#e4c2a6" />
      <circle cx="40" cy="30" r="11" fill="#e8c6aa" />
      <path d="M29 28c1-12 7-18 11-18s10 6 11 18c-2-5-7-8-11-8s-9 3-11 8z" fill="#14243a" />
      <circle cx="36" cy="31" r="1" fill="#14243a" />
      <circle cx="44" cy="31" r="1" fill="#14243a" />
    </svg>
  );
}

export function Dog({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 96 72" className={className ?? "h-full w-full"} aria-hidden="true" focusable="false">
      <ellipse cx="48" cy="64" rx="20" ry="5" fill="#14243a" opacity="0.15" />
      <g className="voyage-tail">
        <path d="M68 36c12-1 18-12 16-20" fill="none" stroke="#8a5430" strokeWidth="4" strokeLinecap="round" />
      </g>
      <ellipse cx="46" cy="40" rx="22" ry="14" fill="#a56b3c" />
      <ellipse cx="42" cy="42" rx="11" ry="7" fill="#f0d2b0" opacity="0.9" />
      <ellipse cx="24" cy="36" rx="13" ry="11" fill="#8d552f" />
      <ellipse cx="14" cy="26" rx="5" ry="8" fill="#6d4124" transform="rotate(-24 14 26)" />
      <ellipse cx="30" cy="24" rx="4.5" ry="7.5" fill="#6d4124" transform="rotate(16 30 24)" />
      <ellipse cx="12" cy="38" rx="2.4" ry="1.7" fill="#14243a" />
      <ellipse cx="30" cy="52" rx="3.4" ry="5" fill="#6d4124" />
      <ellipse cx="42" cy="54" rx="3.4" ry="5" fill="#6d4124" />
      <ellipse cx="56" cy="50" rx="3.1" ry="4.6" fill="#6d4124" />
      <ellipse cx="64" cy="44" rx="2.8" ry="4.2" fill="#6d4124" />
    </svg>
  );
}
