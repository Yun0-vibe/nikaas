import { ImageResponse } from "next/og";

export const alt =
  "Nikaas — Minecraft Java Edition launcher for Windows with isolated modpack chambers";
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
          background: "#070C09",
          padding: 64,
          position: "relative",
          color: "#EAF2E7",
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
              "radial-gradient(circle, rgba(95,207,74,0.33), rgba(69,227,207,0.08) 45%, rgba(7,12,9,0) 70%)",
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
              border: "1px solid #364C3F",
              background: "linear-gradient(135deg,#17231B,#0B110D)",
              color: "#FFC94A",
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
                color: "#93A79A",
                marginTop: 4,
              }}
            >
              MC LAUNCHER
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #364C3F",
              padding: "8px 14px",
              fontSize: 14,
              letterSpacing: 3,
              color: "#FFC94A",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#5FCF4A",
                display: "flex",
              }}
            />
            MINECRAFT: JAVA EDITION
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
            <span>Minecraft launcher.</span>
            <span style={{ color: "#6FD64E" }}>Clean pressure.</span>
          </div>
          <div
            style={{
              width: 220,
              height: 3,
              background: "linear-gradient(90deg,#5FCF4A,#FFC94A)",
              marginTop: 28,
              display: "flex",
            }}
          />
          <div
            style={{
              marginTop: 24,
              fontSize: 22,
              color: "#A9BCAD",
              display: "flex",
              maxWidth: 820,
            }}
          >
            A Windows launcher for heavy modpacks · isolated chambers · one Release
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            fontSize: 16,
            letterSpacing: 3,
            color: "#93A79A",
          }}
        >
          <span style={{ color: "#86E85A" }}>JAVA EDITION</span>
          <span>FABRIC</span>
          <span>FORGE</span>
          <span>NEOFORGE</span>
          <span style={{ color: "#FFC94A" }}>MODRINTH CATALOG</span>
        </div>
      </div>
    ),
    size,
  );
}