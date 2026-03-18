// WebGLFallback.tsx
// Pure CSS/Canvas fallback — no WebGL required.
// Shows a living city scene with animated rain, glowing windows,
// a driving car silhouette, and a styled "enable WebGL" message.

import { useEffect, useRef, useState } from "react";

// ─── CSS injected once ────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

  @keyframes wgl-rain {
    from { transform: translateY(-100%) }
    to   { transform: translateY(110vh)  }
  }
  @keyframes wgl-car {
    0%   { transform: translateX(-180px) }
    100% { transform: translateX(110vw)  }
  }
  @keyframes wgl-flicker {
    0%,100% { opacity:1 }
    92%     { opacity:1 }
    93%     { opacity:0.55 }
    94%     { opacity:1 }
    96%     { opacity:0.8 }
    97%     { opacity:1 }
  }
  @keyframes wgl-blink {
    0%,49% { opacity:1 }
    50%,100% { opacity:0 }
  }
  @keyframes wgl-pulse {
    0%,100% { box-shadow: 0 0 18px 4px rgba(225,29,72,0.35) }
    50%     { box-shadow: 0 0 32px 10px rgba(225,29,72,0.55) }
  }
  @keyframes wgl-float {
    0%,100% { transform: translateY(0px) }
    50%     { transform: translateY(-8px) }
  }
  @keyframes wgl-scanline {
    from { background-position: 0 0 }
    to   { background-position: 0 100px }
  }
  @keyframes wgl-glow {
    0%,100% { text-shadow: 0 0 20px rgba(225,29,72,0.6), 0 0 40px rgba(225,29,72,0.2) }
    50%     { text-shadow: 0 0 35px rgba(225,29,72,0.9), 0 0 70px rgba(225,29,72,0.4) }
  }
  @keyframes wgl-slide-up {
    from { opacity:0; transform: translateY(24px) }
    to   { opacity:1; transform: translateY(0) }
  }
  .wgl-root {
    position: fixed; inset: 0;
    background: #02040a;
    overflow: hidden;
    font-family: 'Share Tech Mono', monospace;
    animation: wgl-flicker 12s infinite;
  }
  .wgl-stars {
    position: absolute; inset: 0;
    background:
      radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 25% 8%,  rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 40% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 55% 5%,  rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 12%, rgba(255,255,255,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 82% 18%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 7%,  rgba(255,255,255,0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 25%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 35% 35%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(2px 2px at 78% 28%, rgba(255,255,255,0.8) 0%, transparent 100%),
      radial-gradient(2px 2px at 48% 10%, rgba(255,255,255,0.7) 0%, transparent 100%);
  }
  .wgl-scanlines {
    position: absolute; inset: 0; z-index: 50; pointer-events: none;
    background-image: repeating-linear-gradient(
      0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px,
      transparent 1px, transparent 3px
    );
    animation: wgl-scanline 2.5s linear infinite;
  }
  .wgl-vignette {
    position: absolute; inset: 0; z-index: 40; pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.82) 100%);
  }
  /* Ground / road */
  .wgl-ground {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 22%;
    background: linear-gradient(to bottom, #060c14 0%, #040810 60%, #020508 100%);
    border-top: 1px solid rgba(59,130,246,0.2);
    z-index: 10;
  }
  .wgl-road-line {
    position: absolute; top: 38%; left: -10%; right: -10%; height: 2px;
    background: repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 40px,
      transparent 40px, transparent 80px
    );
  }
  /* Road reflection glow */
  .wgl-road-glow {
    position: absolute; bottom: 20%; left: 20%; right: 20%; height: 40px;
    background: radial-gradient(ellipse, rgba(225,29,72,0.08) 0%, transparent 70%);
    filter: blur(8px);
    z-index: 11;
  }
  /* City layers */
  .wgl-city {
    position: absolute; bottom: 22%; left: 0; right: 0;
    z-index: 5;
    display: flex; align-items: flex-end;
  }
  .wgl-building {
    position: relative; flex-shrink: 0;
    background: #070d18;
    border-left: 1px solid rgba(59,130,246,0.08);
    border-top: 1px solid rgba(59,130,246,0.12);
  }
  .wgl-window {
    position: absolute;
    width: 5px; height: 7px;
    border-radius: 1px;
  }
  .wgl-window.on { background: rgba(255,240,180,0.85); }
  .wgl-window.blue { background: rgba(147,197,253,0.7); }
  .wgl-window.off { background: rgba(30,40,60,0.5); }
  /* Antenna */
  .wgl-antenna {
    position: absolute; top: -18px; left: 50%; transform: translateX(-50%);
    width: 1px; height: 18px; background: rgba(100,140,200,0.4);
  }
  .wgl-antenna-light {
    position: absolute; top: -2px; left: 50%; transform: translateX(-50%);
    width: 3px; height: 3px; border-radius: 50%;
    background: #ef4444;
    animation: wgl-blink 1.4s step-start infinite;
    box-shadow: 0 0 4px #ef4444;
  }
  /* Car silhouette */
  .wgl-car {
    position: absolute; bottom: calc(22% + 1px); left: 0;
    z-index: 15;
    animation: wgl-car 9s linear infinite;
  }
  /* Rain canvas */
  .wgl-rain-canvas {
    position: absolute; inset: 0; z-index: 20; pointer-events: none; opacity: 0.35;
  }
  /* Content card */
  .wgl-card {
    position: absolute; inset: 0; z-index: 60;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 1rem;
    animation: wgl-slide-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }
`;

// ─── Rain canvas ──────────────────────────────────────────────────────────────
function RainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Drop = { x: number; y: number; len: number; speed: number; opacity: number };
    const drops: Drop[] = Array.from({ length: 120 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      len:     8  + Math.random() * 18,
      speed:   6  + Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach(d => {
        ctx.strokeStyle = `rgba(147,197,253,${d.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.15, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        d.x += d.speed * 0.15;
        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }
      });
      frame.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="wgl-rain-canvas" />;
}

// ─── Building generator ───────────────────────────────────────────────────────
type BuildingDef = {
  width: number; height: number; windows: { left: number; top: number; type: "on"|"blue"|"off" }[];
  antenna: boolean;
};

function generateBuildings(count: number, maxH: number): BuildingDef[] {
  return Array.from({ length: count }, () => {
    const w = 28 + Math.floor(Math.random() * 52);
    const h = 60 + Math.floor(Math.random() * maxH);
    const cols = Math.floor((w - 8) / 10);
    const rows = Math.floor((h - 10) / 14);
    const windows = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rng = Math.random();
        windows.push({
          left: 4 + c * 10,
          top:  8 + r * 14,
          type: rng > 0.45 ? (rng > 0.7 ? "blue" : "on") : "off",
        } as const);
      }
    }
    return { width: w, height: h, windows, antenna: Math.random() > 0.6 };
  });
}

// ─── City layer ───────────────────────────────────────────────────────────────
function CityLayer({ buildings, scale = 1, opacity = 1 }: {
  buildings: BuildingDef[]; scale?: number; opacity?: number;
}) {
  return (
    <div className="wgl-city" style={{ opacity, transform: `scaleX(${scale})`, transformOrigin: "bottom center" }}>
      {buildings.map((b, i) => (
        <div key={i} className="wgl-building" style={{ width: b.width, height: b.height, marginRight: 2 }}>
          {b.antenna && (
            <>
              <div className="wgl-antenna" />
              <div className="wgl-antenna-light" />
            </>
          )}
          {b.windows.map((w, j) => (
            <div key={j} className="wgl-window" style={{ left: w.left, top: w.top }} data-type={w.type}>
              <div className={`wgl-window ${w.type}`} style={{ position: "static", width: "100%", height: "100%" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Car SVG silhouette ───────────────────────────────────────────────────────
function CarSilhouette() {
  return (
    <div className="wgl-car">
      <svg width="140" height="52" viewBox="0 0 140 52" fill="none">
        {/* Body */}
        <rect x="10" y="28" width="120" height="16" rx="3" fill="#0a0a12" />
        {/* Cabin */}
        <path d="M35 28 L48 12 L90 12 L108 28Z" fill="#0a0a12" />
        {/* Windows */}
        <path d="M52 27 L57 14 L86 14 L94 27Z" fill="rgba(147,197,253,0.15)" />
        {/* Headlights */}
        <rect x="124" y="30" width="8" height="4" rx="1" fill="#fef3c7" opacity="0.9" />
        {/* Tail lights */}
        <rect x="8" y="30" width="6" height="4" rx="1" fill="#ef4444" opacity="0.9" />
        {/* Wheels */}
        <circle cx="38" cy="44" r="8" fill="#111" stroke="#333" strokeWidth="1.5" />
        <circle cx="38" cy="44" r="4" fill="#222" stroke="#555" strokeWidth="1" />
        <circle cx="100" cy="44" r="8" fill="#111" stroke="#333" strokeWidth="1.5" />
        <circle cx="100" cy="44" r="4" fill="#222" stroke="#555" strokeWidth="1" />
        {/* Underglow */}
        <ellipse cx="70" cy="52" rx="55" ry="4" fill="rgba(225,29,72,0.18)" />
        {/* Headlight beam */}
        <path d="M132 32 L160 26 L160 38 Z" fill="rgba(254,243,199,0.06)" />
      </svg>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function WebGLFallback() {
  const [bgsBuildings]  = useState(() => generateBuildings(28, 220));
  const [fgBuildings]   = useState(() => generateBuildings(22, 160));
  const [cursorVisible, setCursorVisible] = useState(true);

  // Inject CSS once
  useEffect(() => {
    if (document.head.querySelector("[data-wgl-css]")) return;
    const el = document.createElement("style");
    el.setAttribute("data-wgl-css", "1");
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);

  // Cursor blink for terminal feel
  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="wgl-root">
      {/* Stars */}
      <div className="wgl-stars" />

      {/* Background city layer (distant, dimmer) */}
      <div style={{ position: "absolute", bottom: "22%", left: 0, right: 0, zIndex: 3, opacity: 0.45, transform: "scaleY(0.75)", transformOrigin: "bottom" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {bgsBuildings.map((b, i) => (
            <div key={i} className="wgl-building" style={{
              width: b.width * 0.8,
              height: b.height,
              marginRight: 1,
              opacity: 0.6,
              background: "#040a10",
            }} />
          ))}
        </div>
      </div>

      {/* Foreground city */}
      <div style={{ position: "absolute", bottom: "22%", left: 0, right: 0, zIndex: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {fgBuildings.map((b, i) => (
            <div key={i} className="wgl-building" style={{ width: b.width, height: b.height, marginRight: 2, position: "relative" }}>
              {b.antenna && (
                <>
                  <div className="wgl-antenna" />
                  <div className="wgl-antenna-light" />
                </>
              )}
              {b.windows.map((w, j) => (
                <div key={j} className={`wgl-window ${w.type}`} style={{ left: w.left, top: w.top }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Horizon glow */}
      <div style={{
        position: "absolute", bottom: "22%", left: 0, right: 0,
        height: 60, zIndex: 7, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(225,29,72,0.04) 0%, transparent 100%)",
      }} />

      {/* Ground */}
      <div className="wgl-ground">
        <div className="wgl-road-line" />
      </div>
      <div className="wgl-road-glow" />

      {/* Driving car */}
      <CarSilhouette />

      {/* Rain */}
      <RainCanvas />

      {/* Scanlines */}
      <div className="wgl-scanlines" />

      {/* Vignette */}
      <div className="wgl-vignette" />

      {/* ── Content card ── */}
      <div className="wgl-card">
        <div style={{
          maxWidth: 440,
          width: "100%",
          background: "rgba(6,8,14,0.92)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
          animation: "wgl-float 4s ease-in-out infinite",
        }}>
          {/* Header stripe */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, #e11d48, #9f1239, transparent)",
          }} />

          <div style={{ padding: "1.75rem 2rem 2rem" }}>
            {/* Icon */}
            <div style={{
              width: 48, height: 48,
              background: "rgba(225,29,72,0.12)",
              border: "1px solid rgba(225,29,72,0.25)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1.25rem",
              animation: "wgl-pulse 2.5s ease-in-out infinite",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              color: "#ffffff",
              letterSpacing: "0.06em",
              lineHeight: 1,
              marginBottom: "0.3rem",
              animation: "wgl-glow 3s ease-in-out infinite",
            }}>
              NAJI ULLAH
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              color: "#e11d48",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              Full Stack Engineer
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "1.25rem" }} />

            {/* Error status */}
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "0.75rem",
              background: "rgba(225,29,72,0.07)",
              border: "1px solid rgba(225,29,72,0.2)",
              borderRadius: 6,
              padding: "0.85rem 1rem",
              marginBottom: "1.25rem",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#e11d48",
                boxShadow: "0 0 6px #e11d48",
                marginTop: 4, flexShrink: 0,
              }} />
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#fca5a5", letterSpacing: "0.06em", marginBottom: 4 }}>
                  WEBGL_NOT_DETECTED
                </div>
                <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: "0.78rem", color: "#e2e8f0", lineHeight: 1.6 }}>
                  This portfolio runs a live 3D city you can drive through. Your browser or device doesn't support WebGL — enable it for the full experience.
                </div>
              </div>
            </div>

            {/* Terminal-style instructions */}
            <div style={{
              background: "#020408",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 6,
              padding: "0.85rem 1rem",
              marginBottom: "1.5rem",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.65rem",
            }}>
              <div style={{ color: "#52525b", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
                // HOW TO ENABLE WEBGL
              </div>
              {[
                { label: "Chrome",  cmd: "chrome://flags → Search 'WebGL' → Enable" },
                { label: "Firefox", cmd: "about:config → webgl.disabled → false"   },
                { label: "Safari",  cmd: "Preferences → Advanced → WebGL"          },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span style={{ color: "#e11d48", minWidth: 56 }}>{item.label}</span>
                  <span style={{ color: "#a1a1aa" }}>{item.cmd}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.6rem", color: "#3f3f46", fontSize: "0.58rem" }}>
                $ awaiting_webgl_context{cursorVisible ? "█" : " "}
              </div>
            </div>

            {/* Refresh CTA */}
            <button
              onClick={() => window.location.reload()}
              style={{
                width: "100%",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#ffffff",
                background: "rgba(225,29,72,0.15)",
                border: "1px solid rgba(225,29,72,0.45)",
                borderRadius: 4,
                padding: "11px 0",
                cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(225,29,72,0.28)";
                e.currentTarget.style.borderColor = "rgba(225,29,72,0.75)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(225,29,72,0.15)";
                e.currentTarget.style.borderColor = "rgba(225,29,72,0.45)";
              }}
            >
              [ RETRY — RELOAD PAGE ]
            </button>
          </div>
        </div>

        <div style={{
          marginTop: "1rem",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.52rem",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          PORTFOLIO · SYSTEMS · NAJI ULLAH
        </div>
      </div>
    </div>
  );
}