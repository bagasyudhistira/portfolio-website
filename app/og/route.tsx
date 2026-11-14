import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07080a",
          color: "#e8ebf0",
          fontFamily: "sans-serif",
          borderLeft: "16px solid #5b8cff",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#939ca9", marginBottom: 28 }}>
          ENTERPRISE BACK-END · FINANCE &amp; GOVERNMENT
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          Bagas Yudhistira Fauzi
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#5b8cff", marginTop: 24 }}>
          Back-end Developer
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#939ca9", marginTop: 40 }}>
          Java · Spring · PostgreSQL
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
