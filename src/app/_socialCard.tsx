const BRAND_COLORS = {
  accent: "#0047AB",
  accentDepth: "#003380",
  deep: "#0F172A",
  headline: "#FFFFFF",
  supporting: "#BFDBFE",
  muted: "#78716C",
};

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

const baseFontFamily =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";

export function renderPremiumSocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #003380 0%, #0047AB 47%, #0F172A 100%)",
        fontFamily: baseFontFamily,
        color: BRAND_COLORS.headline,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1200px 520px at 12% 8%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 58%), radial-gradient(700px 520px at 86% 110%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.58) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 6,
          backgroundColor: BRAND_COLORS.accent,
          opacity: 0.95,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 26,
          right: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(191,219,254,0.35)",
          backgroundColor: "rgba(10,25,47,0.35)",
          color: "#E2E8F0",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 15,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        [AVAILABLE FOR WORK]
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          zIndex: 1,
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 74,
            lineHeight: 1.02,
            fontWeight: 800,
            color: BRAND_COLORS.headline,
            letterSpacing: "-0.02em",
            maxWidth: "80%",
          }}
        >
          Colby Nelsen
        </div>

        <div
          style={{
            fontSize: 38,
            lineHeight: 1.2,
            fontWeight: 600,
            color: "#E2E8F0",
            maxWidth: "86%",
          }}
        >
          Full-Stack Developer • SaaS Builder
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 30,
            lineHeight: 1.3,
            fontWeight: 500,
            color: BRAND_COLORS.supporting,
            maxWidth: "88%",
          }}
        >
          Fast MVPs. Polished UI. Production-ready delivery.
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: BRAND_COLORS.muted,
            letterSpacing: "0.02em",
          }}
        >
          colbynelsen.com
        </div>
      </div>
    </div>
  );
}

export const hudSocialPalette = {
  background: "#0C0C0C",
  glowPrimary: "#33FF33",
  glowSecondary: "#22CC22",
};
