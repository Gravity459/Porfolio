import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const steps = ["Architecture", "Backend", "AI workflows", "Infrastructure", "Deployment"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafaf8",
          color: "#0b0b0c",
          backgroundImage:
            "linear-gradient(to right, rgba(11,11,12,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,12,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 2, color: "#64646a" }}>
          <span style={{ color: "#0b0b0c" }}>{site.name.toUpperCase()}</span>
          <span style={{ width: 32, height: 1, background: "#cdcdc6" }} />
          <span>{site.title.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95, maxWidth: 900 }}>
          I build AI systems that actually ship<span style={{ color: "#2f5bff" }}>.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#64646a" }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ border: "1px solid #cdcdc6", padding: "8px 14px", borderRadius: 6, color: "#0b0b0c" }}>{s}</span>
              {i < steps.length - 1 ? <span style={{ color: "#2f5bff" }}>→</span> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
