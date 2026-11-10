import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06070A",
          padding: 64,
          position: "relative",
          color: "#EDE8DF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -140,
            width: 720,
            height: 720,
            borderRadius: 720,
            background:
              "radial-gradient(circle, rgba(255,106,0,0.34), rgba(255,59,31,0.10) 45%, rgba(6,7,10,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #39424F",
              background: "linear-gradient(135deg,#1C222B,#0A0C11)",
              color: "#FFB020",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 20, letterSpacing: 8, fontWeight: 700 }}>
              NIKAAS
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: 6,
                color: "#98A1AE",
                marginTop: 4,
              }}
            >
              LAUNCHER
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #39424F",
              padding: "8px 14px",
              fontSize: 14,
              letterSpacing: 3,
              color: "#FFB020",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#FF6A00",
                display: "flex",
              }}
            />
            WINDOWS · COMING SOON
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -2.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Heavy modpacks.</span>
            <span style={{ color: "#FF6A00" }}>Clean pressure.</span>
          </div>
          <div
            style={{
              width: 220,
              height: 3,
              background: "#FF6A00",
              marginTop: 28,
              display: "flex",
            }}
          />
          <div
            style={{
              marginTop: 24,
              fontSize: 22,
              color: "#9AA3B0",
              display: "flex",
              maxWidth: 820,
            }}
          >
            Isolated chambers · live exhaust · one Release button
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            fontSize: 16,
            letterSpacing: 3,
            color: "#98A1AE",
          }}
        >
          <span>VANILLA</span>
          <span>FABRIC</span>
          <span>FORGE</span>
          <span>NEOFORGE</span>
          <span style={{ color: "#FFB020" }}>MODRINTH CATALOG</span>
        </div>
      </div>
    ),
    size,
  );
}