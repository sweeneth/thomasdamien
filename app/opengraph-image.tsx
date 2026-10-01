import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { about, site } from "@/lib/content";

export const alt = `${site.name}. ${about.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse cannot fetch `/public` URLs. Read the hero once at module
// scope; this route runs on the Node.js runtime (`fs` is unavailable on Edge).
export const runtime = "nodejs";

const heroSrc = `data:image/jpeg;base64,${await readFile(
  join(process.cwd(), "public", site.heroImage.src.replace(/^\//, "")),
  "base64",
)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#14243A",
        }}
      >
        <img
          alt=""
          src={heroSrc}
          width={size.width}
          height={size.height}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 180,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 48px 40px",
            backgroundImage:
              "linear-gradient(to top, rgba(20,36,58,0.55), rgba(20,36,58,0))",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#F4F1EA",
              fontSize: 40,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
