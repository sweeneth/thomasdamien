export function HeroSea() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="voyage-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d7c2a4" />
            <stop offset="0.45" stopColor="#9aafb0" />
            <stop offset="1" stopColor="#6f948f" />
          </linearGradient>
          <linearGradient id="voyage-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f7d78" />
            <stop offset="0.28" stopColor="#1e5563" />
            <stop offset="0.62" stopColor="#16364c" />
            <stop offset="1" stopColor="#101e30" />
          </linearGradient>
        </defs>

        <rect width="1600" height="1000" fill="url(#voyage-sea)" />
        <path d="M0 0h1600v210H0z" fill="url(#voyage-sky)" />
        <path d="M0 168c180 28 320-18 520 8 210 28 340-36 560-8 160 20 340 8 520-16v70H0z" fill="#2f6d6c" opacity="0.85" />

        <g className="hero-swell">
          <ellipse cx="420" cy="430" rx="340" ry="70" fill="#2e5b4b" opacity="0.28" />
          <ellipse cx="1180" cy="560" rx="380" ry="84" fill="#14243a" opacity="0.28" />
          <ellipse cx="760" cy="700" rx="460" ry="90" fill="#1a4a55" opacity="0.35" />
        </g>
        <g className="hero-swell-b">
          <ellipse cx="980" cy="390" rx="260" ry="48" fill="#f4f1ea" opacity="0.08" />
          <ellipse cx="300" cy="640" rx="240" ry="56" fill="#4e8a84" opacity="0.18" />
          <ellipse cx="1320" cy="780" rx="280" ry="60" fill="#2e5b4b" opacity="0.2" />
        </g>

        <path
          d="M-40 460c120-18 180 16 300 4 140-14 190 22 320 6 150-18 210 20 340 2"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.18"
        />
        <path
          d="M80 610c90 16 150-20 250-6 120 16 170-18 280-4 130 16 200-10 310 6"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.14"
        />
        <path
          d="M640 820c70-12 120 14 190 2 80-14 130 16 210 0"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.16"
        />
        <path
          d="M1040 500c40-8 70 10 110 2"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path
          d="M220 360c30 8 48-6 78 2"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.22"
        />

        <ellipse cx="1120" cy="640" rx="220" ry="70" fill="#f4f1ea" opacity="0.06" />
        <path d="M150 120c40 18 70 8 100-6 20 16 36 28 20 36-40 8-90 4-120-30z" fill="#f4f1ea" opacity="0.16" />
        <path d="M1280 90c50 10 90 0 120-18 16 20 10 36-16 42-46 8-90 0-104-24z" fill="#f7f3ea" opacity="0.14" />
      </svg>
      <div className="voyage-grain absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent via-45% to-[#101e30]/80" />
    </div>
  );
}
