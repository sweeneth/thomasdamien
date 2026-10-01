import { ImageResponse } from "next/og";

export const alt = "Thomas Sweeney, Head of Growth at Watt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#14243A",
          color: "#F4F1EA",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.12em", color: "#A9B1BC" }}>
          THOMASDAMIEN.COM
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 84,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
          }}
        >
          Thomas Sweeney
        </div>
        <div
          style={{
            display: "flex",
            width: 48,
            height: 4,
            marginTop: 28,
            background: "#C8461B",
          }}
        />
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#F4F1EA" }}>
          Head of Growth, Watt
        </div>
      </div>
    ),
    { ...size },
  );
}
