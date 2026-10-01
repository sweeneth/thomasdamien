import { BoatArt, Dog, Man } from "@/components/voyage/boat-art";

export function Landfall() {
  return (
    <div
      data-voyage-shore
      className="voyage-shore"
      role="img"
      aria-label="The sailboat reaches shore. A man and a dog step onto land."
    >
      <svg viewBox="0 0 1440 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id="voyage-shore-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a4c58" />
            <stop offset="1" stopColor="#14243a" />
          </linearGradient>
          <linearGradient id="voyage-shore-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9c4a0" />
            <stop offset="0.45" stopColor="#ead8b8" />
            <stop offset="1" stopColor="#e7dcc4" />
          </linearGradient>
        </defs>
        <path
          d="M0 34c70-20 120 16 200 4 90-14 130 22 220 8 100-16 150 18 250 4 110-16 160 20 260 6 90-12 150 16 230 4 90-14 140 10 280 8v160H0z"
          fill="url(#voyage-shore-water)"
        />
        <path
          d="M0 168c80 18 140-16 230 6 100 24 150-20 260 4 120 26 170-22 290 6 110 24 180-10 270 8 80 16 140-8 210 6 50 10 90 4 180 10v40H0z"
          fill="#1c4150"
        />
        <path
          d="M0 214c90-28 150 20 250 2 110-20 160 26 270 6 120-22 180 24 300 4 130-22 180 18 280 2 90-14 150 16 340 8v360H0z"
          fill="url(#voyage-shore-sand)"
        />
        <path
          d="M0 228c70 10 120-16 190-4 80 14 120-18 200-2 90 18 140-14 230 2"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M700 220c60 12 100-14 170-2 80 14 120-16 190 0"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path d="M180 300c40-6 70 8 40 14-28 4-60-2-40-14z" fill="#cbb892" />
        <ellipse cx="860" cy="340" rx="10" ry="6" fill="#c4ae86" />
        <ellipse cx="1088" cy="390" rx="14" ry="8" fill="#b7a078" />
        <ellipse cx="420" cy="410" rx="8" ry="5" fill="#d5c29a" />
        <path d="M640 360c30-8 70-4 92 8-28 6-70 4-92-8z" fill="#7a5136" opacity="0.8" />
        <g fill="#2e5b4b">
          <path d="M120 470c8-28 14-28 18 0-8-10-14-10-18 0z" />
          <path d="M150 482c6-22 12-22 16 0-6-8-12-8-16 0z" />
          <path d="M210 468c10-34 16-34 20 0-8-12-16-12-20 0z" />
          <path d="M980 488c8-26 14-26 16 0-6-8-12-8-16 0z" />
          <path d="M1020 476c10-32 16-32 18 0-8-10-14-10-18 0z" />
          <path d="M1240 490c7-24 12-24 14 0-6-8-10-8-14 0z" />
          <path d="M1320 470c12-36 18-36 22 0-10-12-16-12-22 0z" />
        </g>
        <path d="M0 500c200-20 400 16 640 0 220-16 480 18 800 4v56H0z" fill="#2e5b4b" opacity="0.55" />
      </svg>

      <span data-voyage-waterline aria-hidden="true" className="voyage-mark voyage-mark-water" />
      <span data-voyage-stand="man" aria-hidden="true" className="voyage-mark voyage-mark-man" />
      <span data-voyage-stand="dog" aria-hidden="true" className="voyage-mark voyage-mark-dog" />

      <div className="voyage-still" aria-hidden="true">
        <div className="voyage-still-boat">
          <BoatArt />
        </div>
        <div className="voyage-still-man">
          <Man />
        </div>
        <div className="voyage-still-dog">
          <Dog />
        </div>
      </div>
    </div>
  );
}
