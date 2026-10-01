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
          justifyContent: "space-between",
          background: "#F4F1EA",
          color: "#14243A",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#C8461B" }}>01 — Currently</span>
          <span style={{ color: "#5A6270" }}>34.05° N · 118.24° W</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1, letterSpacing: "-0.02em" }}>
            Thomas Sweeney
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              marginTop: 28,
              background: "#D9D3C5",
            }}
          />
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#3A4556" }}>
            Head of Growth at Watt
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.12em", color: "#5A6270" }}>
          LOS ANGELES
        </div>
      </div>
    ),
    { ...size },
  );
}
