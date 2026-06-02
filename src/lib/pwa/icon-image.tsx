import type { ReactElement } from "react";

const BRAND_BG = "#1a1a1a";
const BRAND_FG = "#fafafa";

export function renderPwaIcon(size: number, compact = false): ReactElement {
  if (compact || size <= 48) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_BG,
          color: BRAND_FG,
          fontSize: Math.round(size * 0.55),
          fontWeight: 600,
        }}
      >
        V
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND_BG,
        color: BRAND_FG,
        gap: Math.round(size * 0.04),
      }}
    >
      <div
        style={{
          fontSize: Math.round(size * 0.16),
          fontWeight: 600,
          letterSpacing: Math.round(size * 0.06),
        }}
      >
        VALLNA
      </div>
    </div>
  );
}
