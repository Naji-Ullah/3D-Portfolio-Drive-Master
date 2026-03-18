import { useEffect, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { Zone } from "../GameScene";

interface PortfolioPanelProps {
  zone: Zone;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 700);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 700);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:           "#09090b",
  bgPanel:      "rgba(9,9,11,0.97)",
  bgCard:       "rgba(255,255,255,0.04)",
  bgCardHover:  "rgba(255,255,255,0.07)",
  border:       "rgba(255,255,255,0.09)",
  borderBright: "rgba(255,255,255,0.18)",
  accent:       "#e11d48",          // vivid rose — pops on near-black
  accentDim:    "rgba(225,29,72,0.15)",
  accentGlow:   "rgba(225,29,72,0.08)",
  text:         "#ffffff",
  textSub:      "#e8e8ea",
  textMuted:    "#c0c0c6",
  mono:         "'Share Tech Mono', 'Courier New', monospace",
  sans:         "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  radius:       "8px",
  radiusSm:     "4px",
};

// ─── Inject Inter font once ───────────────────────────────────────────────────
const styleEl = document.createElement("style");
styleEl.textContent = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.pf-scrollbar::-webkit-scrollbar { width: 3px; }
.pf-scrollbar::-webkit-scrollbar-track { background: transparent; }
.pf-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 99px; }
.pf-tag { transition: background 0.2s, border-color 0.2s; }
.pf-tag:hover { background: rgba(225,29,72,0.1) !important; border-color: rgba(225,29,72,0.3) !important; color: #f4f4f5 !important; }
.pf-card { transition: background 0.2s; }
.pf-card:hover { background: rgba(255,255,255,0.07) !important; }
.pf-link { transition: color 0.2s; }
.pf-link:hover { color: #f4f4f5 !important; }
`;
if (!document.head.querySelector("[data-pf-style]")) {
  styleEl.setAttribute("data-pf-style", "1");
  document.head.appendChild(styleEl);
}

// ─── Primitives ───────────────────────────────────────────────────────────────
const Divider = ({ tight }: { tight?: boolean }) => (
  <div style={{ height: "1px", background: T.border, margin: tight ? "0.6rem 0" : "1rem 0" }} />
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontFamily: T.mono,
    fontSize: "0.6rem",
    letterSpacing: "0.22em",
    color: T.accent,
    textTransform: "uppercase",
    marginBottom: "0.7rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }}>
    <span style={{ display: "inline-block", width: 14, height: "1px", background: T.accent, opacity: 0.6 }} />
    {children}
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="pf-tag" style={{
    fontFamily: T.mono,
    fontSize: "0.62rem",
    padding: "4px 9px",
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${T.border}`,
    borderRadius: "99px",
    color: T.text,
    letterSpacing: "0.04em",
    display: "inline-block",
  }}>
    {children}
  </span>
);

// ─── Zone accent strip ────────────────────────────────────────────────────────
const ZONE_ICONS: Record<string, string> = {
  about: "◈", projects: "⬡", skills: "⟐", contact: "◎",
};

// ─── Panel sections ───────────────────────────────────────────────────────────
function AboutPanel() {
  return (
    <div>
      {/* Hero block */}
      <div style={{
        background: T.bgCard,
        border: `1px solid ${T.border}`,
        borderRadius: T.radius,
        padding: "1rem 1.1rem",
        marginBottom: "1rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Accent glow top-left */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 80, height: 80,
          background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ fontFamily: T.sans, fontSize: "1.25rem", fontWeight: 700, color: T.text, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {portfolioData.name}
        </div>
        <div style={{ fontFamily: T.mono, fontSize: "0.6rem", color: T.accent, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: "5px" }}>
          {portfolioData.title}
        </div>
      </div>

      <p style={{ fontFamily: T.sans, margin: "0 0 1rem", fontSize: "0.82rem", lineHeight: 1.75, color: T.text, fontWeight: 400 }}>
        {portfolioData.about}
      </p>

      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {portfolioData.experience.map((exp, i) => (
          <div key={i} className="pf-card" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.6rem 0.75rem",
            borderRadius: T.radiusSm,
            background: "transparent",
            borderBottom: i < portfolioData.experience.length - 1 ? `1px solid ${T.border}` : "none",
          }}>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: "0.82rem", fontWeight: 600, color: T.text }}>{exp.role}</div>
              <div style={{ fontFamily: T.sans, fontSize: "0.72rem", color: T.textMuted, marginTop: "1px" }}>{exp.company}</div>
            </div>
            <div style={{
              fontFamily: T.mono, fontSize: "0.58rem", color: T.textSub,
              background: T.bgCard, border: `1px solid ${T.border}`,
              borderRadius: "99px", padding: "2px 9px", whiteSpace: "nowrap", marginLeft: "0.75rem",
            }}>
              {exp.years}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div style={{
        fontFamily: T.sans, fontSize: "0.76rem", color: T.text,
        display: "flex", alignItems: "center", gap: "0.5rem",
      }}>
        <span style={{ color: T.accent, fontSize: "0.7rem" }}>◎</span>
        {portfolioData.education}
      </div>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
      {portfolioData.projects.map((project) => (
        <div key={project.id} className="pf-card" style={{
          padding: "0.9rem 1rem",
          background: T.bgCard,
          border: `1px solid ${T.border}`,
          borderRadius: T.radius,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Left accent bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "2px",
            background: `linear-gradient(to bottom, ${T.accent}, transparent)`,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
            <div style={{ fontFamily: T.sans, fontSize: "0.9rem", fontWeight: 700, color: T.text }}>
              {project.title}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: "0.54rem", color: T.accent, letterSpacing: "0.1em", flexShrink: 0, marginLeft: "0.5rem" }}>
              {project.role}
            </div>
          </div>
          <p style={{ fontFamily: T.sans, margin: "0 0 0.65rem", fontSize: "0.76rem", color: T.text, lineHeight: 1.65 }}>
            {project.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {project.tech.map((t) => <Pill key={t}>{t}</Pill>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
      {portfolioData.skillGroups.map((group) => (
        <div key={group.category}>
          <SectionLabel>{group.category}</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {group.items.map((item) => <Pill key={item}>{item}</Pill>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactPanel() {
  const items = [
    { label: "Email",    value: portfolioData.contact.email,    href: `mailto:${portfolioData.contact.email}` },
    { label: "Phone",    value: portfolioData.contact.phone },
    { label: "GitHub",   value: portfolioData.contact.github,   href: portfolioData.contact.github },
    { label: "LinkedIn", value: portfolioData.contact.linkedin, href: portfolioData.contact.linkedin },
  ];

  return (
    <div>
      <p style={{ fontFamily: T.sans, margin: "0 0 1.1rem", fontSize: "0.82rem", color: T.text, lineHeight: 1.7 }}>
        Open to new opportunities. Let's build something great together.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item, i) => (
          <div key={i} className="pf-card" style={{
            display: "flex", alignItems: "center", gap: "0.85rem",
            padding: "0.75rem 0.9rem",
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: T.radius,
          }}>
            <div style={{
              fontFamily: T.mono, fontSize: "0.54rem", color: T.accent,
              letterSpacing: "0.14em", textTransform: "uppercase",
              minWidth: 58, flexShrink: 0,
            }}>
              {item.label}
            </div>
            <div style={{ width: "1px", height: 24, background: T.border, flexShrink: 0 }} />
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="pf-link"
                style={{
                  fontFamily: T.sans, fontSize: "0.78rem", color: T.text,
                  fontWeight: 500, textDecoration: "none",
                  wordBreak: "break-all", lineHeight: 1.4, minWidth: 0,
                }}
              >
                {item.value}
              </a>
            ) : (
              <div style={{ fontFamily: T.sans, fontSize: "0.78rem", color: T.text, fontWeight: 500 }}>
                {item.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Panel header ─────────────────────────────────────────────────────────────
function PanelHeader({ zone, onClose }: { zone: Zone; onClose?: () => void }) {
  const icon = ZONE_ICONS[zone as string] ?? "◈";
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 1,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.85rem 1.1rem",
      background: T.bgPanel,
      borderBottom: `1px solid ${T.border}`,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
        {/* Accent icon badge */}
        <div style={{
          width: 32, height: 32,
          background: T.accentDim,
          border: `1px solid rgba(225,29,72,0.25)`,
          borderRadius: T.radiusSm,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.85rem", color: T.accent,
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: "0.5rem", color: T.textSub, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            zone
          </div>
          <div style={{ fontFamily: T.sans, fontSize: "0.9rem", fontWeight: 700, color: T.text, letterSpacing: "-0.01em", lineHeight: 1.2, textTransform: "capitalize" }}>
            {zone}
          </div>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 28, height: 28,
            borderRadius: T.radiusSm,
            border: `1px solid ${T.border}`,
            background: T.bgCard,
            color: T.textMuted,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.18s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = T.borderBright;
            e.currentTarget.style.color = T.text;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.color = T.textMuted;
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

function PanelBody({ zone }: { zone: Zone }) {
  return (
    <div style={{ padding: "1rem 1.1rem 1.5rem" }}>
      {zone === "about"    && <AboutPanel />}
      {zone === "projects" && <ProjectsPanel />}
      {zone === "skills"   && <SkillsPanel />}
      {zone === "contact"  && <ContactPanel />}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function PortfolioPanel({ zone }: PortfolioPanelProps) {
  const [visible, setVisible]             = useState(false);
  const [animIn, setAnimIn]               = useState(false);
  const [dismissedZone, setDismissedZone] = useState<Zone>("none");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (zone !== dismissedZone) setDismissedZone("none");
  }, [zone, dismissedZone]);

  useEffect(() => {
    if (zone !== "none") {
      setVisible(true);
      requestAnimationFrame(() => setAnimIn(true));
      return;
    }
    setAnimIn(false);
    const t = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(t);
  }, [zone]);

  if (!visible) return null;

  const isDismissed = zone !== "none" && dismissedZone === zone;

  // ── Dismissed pill ──
  if (isDismissed) {
    return (
      <button
        onClick={() => setDismissedZone("none")}
        style={{
          position: "absolute",
          right: "1rem",
          top: isMobile ? "4.2rem" : "50%",
          transform: isMobile ? "none" : "translateY(-50%)",
          zIndex: 120,
          border: `1px solid ${T.border}`,
          background: T.bgPanel,
          color: T.text,
          borderRadius: T.radiusSm,
          padding: "7px 14px",
          fontFamily: T.mono,
          fontSize: "0.55rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <span style={{ color: T.accent }}>◈</span> show info
      </button>
    );
  }

  const sharedPanelStyle: React.CSSProperties = {
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    overflowY: "auto",
    overflowX: "hidden",
    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease",
    opacity: animIn ? 1 : 0,
    boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
  };

  // ── Mobile: slides from top ──
  if (isMobile) {
    return (
      <div
        className="pf-scrollbar"
        style={{
          ...sharedPanelStyle,
          position: "absolute",
          top: "3.9rem", left: 0, right: 0,
          transform: `translateY(${animIn ? "0" : "-108%"})`,
          maxHeight: "52vh",
          borderRadius: `0 0 ${T.radius} ${T.radius}`,
          borderTop: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          overscrollBehavior: "contain",
          pointerEvents: "auto",
          zIndex: 110,
        }}
      >
        <PanelHeader zone={zone} onClose={() => setDismissedZone(zone)} />
        <PanelBody zone={zone} />
      </div>
    );
  }

  // ── Desktop: slides from right ──
  return (
    <div
      className="pf-scrollbar"
      style={{
        ...sharedPanelStyle,
        position: "absolute",
        top: "50%", right: "1.75rem",
        transform: `translateY(-50%) translateX(${animIn ? "0" : "115%"})`,
        width: "360px",
        maxHeight: "84vh",
        zIndex: 100,
      }}
    >
      <PanelHeader zone={zone} />
      <PanelBody zone={zone} />
    </div>
  );
}