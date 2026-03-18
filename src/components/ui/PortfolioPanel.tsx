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
export function PortfolioPanel({ zone }: PortfolioPanelProps) {
    const [visible, setVisible] = useState(false);
    const [animIn, setAnimIn] = useState(false);
    const [dismissedZone, setDismissedZone] = useState<Zone>("none");
    const isMobile = useIsMobile();
    useEffect(() => {
        if (zone !== dismissedZone) {
            setDismissedZone("none");
        }
    }, [zone, dismissedZone]);
    useEffect(() => {
        if (zone !== "none") {
            setVisible(true);
            requestAnimationFrame(() => setAnimIn(true));
            return;
        }
        setAnimIn(false);
        const t = setTimeout(() => setVisible(false), 400);
        return () => { clearTimeout(t); };
    }, [zone]);
    if (!visible)
        return null;
    const isDismissed = zone !== "none" && dismissedZone === zone;
    if (isMobile) {
        if (isDismissed) {
            return (<button onClick={() => setDismissedZone("none")} style={{
                    position: "absolute",
                    right: "0.9rem",
                    top: "4.1rem",
                    zIndex: 120,
                    border: "1px solid rgba(99,179,237,0.5)",
                    background: "rgba(10,15,30,0.92)",
                    color: "#bfdbfe",
                    borderRadius: "999px",
                    padding: "8px 12px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                }}>
          Show info
        </button>);
        }
        return (<div style={{
                position: "absolute",
                top: "3.9rem",
                left: 0,
                right: 0,
                transform: `translateY(${animIn ? "0" : "-110%"})`,
                transition: "transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.3s ease",
                opacity: animIn ? 1 : 0,
                maxHeight: "50vh",
                overflowX: "hidden",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
                overscrollBehavior: "contain",
                pointerEvents: "auto",
                zIndex: 110,
                borderRadius: "0 0 16px 16px",
            }} className="portfolio-card">
        <div style={{
                position: "sticky",
                top: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.65rem 0.95rem 0.5rem",
                background: "rgba(8,13,26,0.92)",
                borderBottom: "1px solid rgba(99,179,237,0.22)",
                backdropFilter: "blur(14px)",
                zIndex: 1,
            }}>
          <div>
            <div style={{ fontSize: "0.58rem", color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Zone details
            </div>
            <div style={{ fontSize: "0.86rem", color: "#e2e8f0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {zone}
            </div>
          </div>
          <button onClick={() => setDismissedZone(zone)} style={{
                width: 30,
                height: 30,
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.35)",
                background: "rgba(15,23,42,0.9)",
                color: "#cbd5e1",
                fontSize: "1rem",
                lineHeight: 1,
            }} aria-label="Hide panel">
            ×
          </button>
        </div>
        <div style={{ padding: "0.75rem 1rem 0.9rem" }}>
          {zone === "about" && <AboutPanel />}
          {zone === "projects" && <ProjectsPanel />}
          {zone === "skills" && <SkillsPanel />}
          {zone === "contact" && <ContactPanel />}
        </div>
      </div>);
    }
    return (<div style={{
            position: "absolute",
            top: "50%",
            right: "2rem",
            transform: `translateY(-50%) translateX(${animIn ? "0" : "120%"})`,
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
            opacity: animIn ? 1 : 0,
            width: "380px",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: 100,
        }} className="portfolio-card">
      <div style={{
            position: "sticky",
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem 0.55rem",
            background: "rgba(8,13,26,0.9)",
            borderBottom: "1px solid rgba(99,179,237,0.2)",
            backdropFilter: "blur(12px)",
            zIndex: 1,
        }}>
        <div>
          <div style={{ fontSize: "0.58rem", color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Zone details
          </div>
          <div style={{ fontSize: "0.86rem", color: "#e2e8f0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {zone}
          </div>
        </div>
      </div>
      <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
        {zone === "about" && <AboutPanel />}
        {zone === "projects" && <ProjectsPanel />}
        {zone === "skills" && <SkillsPanel />}
        {zone === "contact" && <ContactPanel />}
      </div>
    </div>);
}
function AboutPanel() {
    return (<div>
      <div style={{ marginBottom: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#f0f9ff" }}>
          {portfolioData.name}
        </h2>
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#60a5fa" }}>
          {portfolioData.title}
        </p>
      </div>

      <div style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: "8px",
            padding: "10px 12px",
            marginBottom: "0.75rem",
        }}>
        <p style={{ margin: 0, fontSize: "0.82rem", lineHeight: 1.6, color: "#bfdbfe" }}>
          {portfolioData.about}
        </p>
      </div>

      <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#60a5fa" }}>
        Experience
      </h3>
      {portfolioData.experience.map((exp, i) => (<div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "7px 0",
                borderBottom: i < portfolioData.experience.length - 1 ? "1px solid rgba(59,130,246,0.15)" : "none",
            }}>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e0f2fe" }}>{exp.role}</div>
            <div style={{ fontSize: "0.72rem", color: "#7dd3fc" }}>{exp.company}</div>
          </div>
          <div style={{ fontSize: "0.72rem", color: "#475569", alignSelf: "center" }}>{exp.years}</div>
        </div>))}

      <div style={{
            marginTop: "0.6rem",
            padding: "7px 10px",
            background: "rgba(59,130,246,0.08)",
            borderRadius: "6px",
            fontSize: "0.75rem",
            color: "#7dd3fc",
        }}>
        🎓 {portfolioData.education}
      </div>
    </div>);
}
function ProjectsPanel() {
    return (<div>
      {portfolioData.projects.map((project) => (<div key={project.id} style={{
                marginBottom: "0.6rem",
                padding: "10px 12px",
                background: `rgba(${colorRGB(project.color)}, 0.1)`,
                border: `1px solid ${project.color}44`,
                borderRadius: "8px",
            }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px" }}>
            <h3 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: project.color }}>
              {project.title}
            </h3>
            <span style={{ fontSize: "0.6rem", color: project.color, opacity: 0.8, marginLeft: "6px", whiteSpace: "nowrap", fontWeight: 600 }}>
              {project.role}
            </span>
          </div>
          <p style={{ margin: "0 0 7px", fontSize: "0.76rem", color: "#94a3b8", lineHeight: 1.5 }}>
            {project.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
            {project.tech.map((t) => (<span key={t} style={{
                    fontSize: "0.62rem",
                    padding: "2px 7px",
                    background: `${project.color}22`,
                    border: `1px solid ${project.color}55`,
                    borderRadius: "4px",
                    color: project.color,
                    fontWeight: 600,
                }}>{t}</span>))}
          </div>
        </div>))}
    </div>);
}
function SkillsPanel() {
    return (<div>
      <h2 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 700, color: "#f0f9ff" }}>
        Skills
      </h2>
      {portfolioData.skillGroups.map((group) => (<div key={group.category} style={{ marginBottom: "0.8rem" }}>
          <h3 style={{
                margin: "0 0 0.45rem",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: group.color,
                fontWeight: 800,
            }}>
            {group.category}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {group.items.map((item) => (<span key={item} style={{
                    fontSize: "0.72rem",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: `${group.color}1A`,
                    border: `1px solid ${group.color}55`,
                    color: "#dbeafe",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                }}>
                {item}
              </span>))}
          </div>
        </div>))}
    </div>);
}
function ContactPanel() {
    const items = [
        { icon: "✉️", label: "Email", value: portfolioData.contact.email, color: "#3b82f6" },
        { icon: "📞", label: "Phone", value: portfolioData.contact.phone, color: "#10b981" },
    { icon: "🐙", label: "GitHub", value: portfolioData.contact.github, color: "#8b5cf6", href: portfolioData.contact.github },
    { icon: "💼", label: "LinkedIn", value: portfolioData.contact.linkedin, color: "#06b6d4", href: portfolioData.contact.linkedin },
    ];
    return (<div>
      <h2 style={{ margin: "0 0 0.5rem", fontSize: "1rem", fontWeight: 700, color: "#f0f9ff" }}>
        Get In Touch
      </h2>
      <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5 }}>
        Ready to build something amazing together?
      </p>
      {items.map((item, i) => (<div key={i} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 11px",
                marginBottom: "7px",
                background: `${item.color}18`,
                border: `1px solid ${item.color}44`,
                borderRadius: "8px",
            }}>
          <span style={{ fontSize: "1rem" }}>{item.icon}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: item.color, fontWeight: 700 }}>
              {item.label}
            </div>
            {item.href ? (<a href={item.href} target="_blank" rel="noreferrer noopener" style={{
              display: "block",
                fontSize: "0.78rem",
                color: "#cbd5e1",
                fontWeight: 600,
              maxWidth: "100%",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              whiteSpace: "normal",
              lineHeight: 1.35,
                textDecoration: "underline",
                textDecorationColor: `${item.color}AA`,
                textUnderlineOffset: "2px",
            }}>
                {item.value}
              </a>) : (<div style={{ fontSize: "0.78rem", color: "#cbd5e1", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.value}
              </div>)}
          </div>
        </div>))}
    </div>);
}
function colorRGB(hex: string): string {
    const map: Record<string, string> = {
        "#3b82f6": "59,130,246",
        "#8b5cf6": "139,92,246",
        "#06b6d4": "6,182,212",
        "#10b981": "16,185,129",
    };
    return map[hex] ?? "59,130,246";
}
