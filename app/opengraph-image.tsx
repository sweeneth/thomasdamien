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
          justifyContent: "center",
          background: "#f7f6f3",
          color: "#1a1917",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#8f4630" }}>
          thomasdamien.com
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Thomas Sweeney
        </div>
        <div
          style={{
            display: "flex",
            width: 64,
            height: 3,
            marginTop: 28,
            background: "#8f4630",
          }}
        />
        <div style={{ display: "flex", marginTop: 28, fontSize: 32 }}>
          Head of Growth at Watt
        </div>
      </div>
    ),
    { ...size },
  );
}
