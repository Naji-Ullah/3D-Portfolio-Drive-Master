import { portfolioData } from "../data/portfolio";
export function WebGLFallback() {
    return (<div style={{
            width: "100vw",
            height: "100vh",
            background: "radial-gradient(ellipse at center, #0f1f3d 0%, #020817 70%)",
            color: "#f0f9ff",
            fontFamily: "'Inter', sans-serif",
            overflow: "auto",
            padding: "2rem",
            boxSizing: "border-box",
        }}>
      
      <div style={{ textAlign: "center", marginBottom: "3rem", paddingTop: "2rem" }}>
        <h1 style={{
            fontSize: "3rem",
            fontWeight: 900,
            margin: "0 0 0.5rem",
            background: "linear-gradient(135deg, #ef4444, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        }}>
          {portfolioData.name}
        </h1>
        <p style={{ color: "#f87171", fontSize: "1.1rem", margin: "0 0 0.5rem" }}>
          {portfolioData.title}
        </p>
        <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
          3D Drive Portfolio (WebGL required for interactive mode)
        </p>
      </div>

      
      <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
        }}>
        
        <div style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: "16px",
            padding: "1.5rem",
        }}>
          <h2 style={{ color: "#3b82f6", marginTop: 0, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            About Me
          </h2>
          <p style={{ color: "#bfdbfe", lineHeight: 1.7, fontSize: "0.9rem" }}>
            {portfolioData.about}
          </p>
          <h3 style={{ color: "#60a5fa", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Experience
          </h3>
          {portfolioData.experience.map((e, i) => (<div key={i} style={{ marginBottom: "0.5rem" }}>
              <div style={{ color: "#e0f2fe", fontSize: "0.85rem", fontWeight: 600 }}>{e.role}</div>
              <div style={{ color: "#7dd3fc", fontSize: "0.75rem" }}>{e.company} &middot; {e.years}</div>
            </div>))}
        </div>

        
        <div style={{
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "16px",
            padding: "1.5rem",
        }}>
          <h2 style={{ color: "#8b5cf6", marginTop: 0, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Projects
          </h2>
          {portfolioData.projects.map((p) => (<div key={p.id} style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                background: `${p.color}15`,
                border: `1px solid ${p.color}44`,
                borderRadius: "8px",
            }}>
              <div style={{ color: p.color, fontWeight: 700, fontSize: "0.9rem" }}>{p.title}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.78rem", lineHeight: 1.5 }}>{p.description}</div>
            </div>))}
        </div>

        
        <div style={{
            background: "rgba(6,182,212,0.08)",
            border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: "16px",
            padding: "1.5rem",
        }}>
          <h2 style={{ color: "#06b6d4", marginTop: 0, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Skills
          </h2>
          {portfolioData.skillGroups.map((group) => (<div key={group.category} style={{ marginBottom: "0.9rem" }}>
              <h3 style={{ color: group.color, fontSize: "0.74rem", letterSpacing: "0.1em", margin: "0 0 0.45rem", textTransform: "uppercase" }}>
                {group.category}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.items.map((item) => (<span key={item} style={{
                    fontSize: "0.72rem",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: `${group.color}22`,
                    border: `1px solid ${group.color}55`,
                    color: "#dbeafe",
                    fontWeight: 700,
                }}>
                    {item}
                  </span>))}
              </div>
            </div>))}
        </div>

        
        <div style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "16px",
            padding: "1.5rem",
        }}>
          <h2 style={{ color: "#10b981", marginTop: 0, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Contact
          </h2>
          {[
            { icon: "✉️", label: "Email", value: portfolioData.contact.email },
            { icon: "📞", label: "Phone", value: portfolioData.contact.phone },
            { icon: "🐙", label: "GitHub", value: portfolioData.contact.github, href: portfolioData.contact.github },
            { icon: "💼", label: "LinkedIn", value: portfolioData.contact.linkedin, href: portfolioData.contact.linkedin },
        ].map((c, i) => (<div key={i} style={{
                display: "flex", gap: "10px", alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 3 ? "1px solid rgba(16,185,129,0.15)" : "none",
            }}>
              <span>{c.icon}</span>
              <div>
                <div style={{ color: "#6ee7b7", fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700 }}>{c.label}</div>
                {c.href ? (<a href={c.href} target="_blank" rel="noreferrer noopener" style={{
                display: "block",
                maxWidth: "100%",
                color: "#94a3b8",
                fontSize: "0.82rem",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                whiteSpace: "normal",
                lineHeight: 1.35,
                textDecoration: "underline",
                textUnderlineOffset: "2px",
            }}>
                    {c.value}
                  </a>) : (<div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{c.value}</div>)}
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
