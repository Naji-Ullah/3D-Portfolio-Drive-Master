import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Zone } from "../GameScene";
import { mobileKeys } from "../../hooks/mobileInput";
const ZONE_NAMES: Record<Zone, string> = {
    none: "",
    about: "ABOUT ME",
    projects: "PROJECTS",
    skills: "SKILLS",
    contact: "CONTACT",
};
const ZONE_COLORS: Record<Zone, string> = {
    none: "#3b82f6",
    about: "#3b82f6",
    projects: "#8b5cf6",
    skills: "#06b6d4",
    contact: "#10b981",
};
interface HUDProps {
    zone: Zone;
    speed: number;
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
export function HUD({ zone, speed }: HUDProps) {
    const color = ZONE_COLORS[zone];
    const isMobile = useIsMobile();
    return (<>
      
      <div style={{
            position: "absolute",
            top: isMobile ? "0.75rem" : "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 50,
            whiteSpace: "nowrap",
        }}>
        <h1 style={{
            margin: 0,
            fontSize: isMobile ? "1rem" : "1.5rem",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#f0f9ff",
            textShadow: "0 0 20px rgba(99,179,237,0.6)",
            textTransform: "uppercase",
        }}>
          Drive to Explore
        </h1>
      </div>

      
      {zone !== "none" && (<div style={{
                position: "absolute",
                top: isMobile ? "0.75rem" : "1.5rem",
                left: isMobile ? "0.6rem" : "1.5rem",
                zIndex: 50,
                pointerEvents: "none",
            }}>
          <div className="hud-panel" style={{ padding: isMobile ? "6px 10px" : "10px 16px" }}>
            <div style={{
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "#64748b",
                marginBottom: "1px",
            }}>ZONE</div>
            <div style={{
                fontSize: isMobile ? "0.75rem" : "1rem",
                fontWeight: 800,
                color,
                letterSpacing: "0.08em",
                textShadow: `0 0 10px ${color}88`,
            }}>
              {ZONE_NAMES[zone]}
            </div>
          </div>
        </div>)}

      
      <div style={{
            position: "absolute",
            bottom: isMobile ? "auto" : "1.5rem",
            top: isMobile ? "0.75rem" : "auto",
            right: isMobile ? "0.6rem" : "auto",
            left: isMobile ? "auto" : "1.5rem",
            zIndex: 50,
            pointerEvents: "none",
        }}>
        <div className="hud-panel" style={{
            padding: isMobile ? "4px 8px" : "10px 16px",
            minWidth: isMobile ? "54px" : "90px",
            textAlign: "center",
        }}>
          <div style={{
            fontSize: isMobile ? "1rem" : "1.6rem",
            fontWeight: 900,
            color: "#60a5fa",
            lineHeight: 1,
            textShadow: "0 0 10px rgba(96,165,250,0.6)",
        }}>
            {Math.abs(Math.round(speed * 3.6))}
          </div>
          <div style={{ fontSize: "0.5rem", color: "#475569", letterSpacing: "0.08em", marginTop: "1px" }}>
            KM/H
          </div>
        </div>
      </div>

      
      {!isMobile && <Minimap zone={zone}/>}

      
      {isMobile ? <MobileControls /> : <ControlsHint />}
    </>);
}
function Minimap({ zone }: {
    zone: Zone;
}) {
    const zones = [
        { id: "about", x: 25, y: 25, color: "#3b82f6", label: "A" },
        { id: "projects", x: 75, y: 25, color: "#8b5cf6", label: "P" },
        { id: "skills", x: 25, y: 75, color: "#06b6d4", label: "S" },
        { id: "contact", x: 75, y: 75, color: "#10b981", label: "C" },
    ];
    return (<div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", zIndex: 50, pointerEvents: "none" }}>
      <div className="hud-panel" style={{ padding: "10px", width: "120px" }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "#475569", marginBottom: "6px", textAlign: "center" }}>
          MINIMAP
        </div>
        <div style={{
            position: "relative", width: "100px", height: "100px",
            background: "rgba(0,0,0,0.4)", border: "1px solid rgba(99,179,237,0.2)", borderRadius: "4px",
        }}>
          <div style={{ position: "absolute", top: "47%", left: "5%", width: "90%", height: "6%", background: "rgba(59,130,246,0.2)" }}/>
          <div style={{ position: "absolute", left: "47%", top: "5%", width: "6%", height: "90%", background: "rgba(59,130,246,0.2)" }}/>
          {zones.map((z) => (<div key={z.id} style={{
                position: "absolute",
                left: `${z.x - 8}%`, top: `${z.y - 8}%`,
                width: "16%", height: "16%",
                background: z.id === zone ? z.color : `${z.color}55`,
                borderRadius: "50%",
                border: `1px solid ${z.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.45rem", fontWeight: 700, color: "#fff",
                transition: "background 0.3s",
                boxShadow: z.id === zone ? `0 0 8px ${z.color}` : "none",
            }}>{z.label}</div>))}
        </div>
      </div>
    </div>);
}
function ControlsHint() {
    return (<div style={{
            position: "absolute", bottom: "1.5rem", left: "50%",
            transform: "translateX(-50%)", zIndex: 50, pointerEvents: "none",
            display: "flex", gap: "12px", alignItems: "center",
        }}>
      <div className="hud-panel" style={{ padding: "6px 12px", display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          <span className="key-badge">W</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <span className="key-badge">A</span>
            <span className="key-badge">S</span>
            <span className="key-badge">D</span>
          </div>
        </div>
        <span style={{ fontSize: "0.65rem", color: "#475569" }}>or</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          <span className="key-badge">↑</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <span className="key-badge">←</span>
            <span className="key-badge">↓</span>
            <span className="key-badge">→</span>
          </div>
        </div>
        <span style={{ fontSize: "0.65rem", color: "#475569" }}>Drive to explore</span>
      </div>
    </div>);
}
type DKey = "w" | "a" | "s" | "d";
function MobileControls() {
    const activePointers = useRef(new Map<number, DKey>());
    const syncMobileKeys = () => {
        mobileKeys.w = false;
        mobileKeys.a = false;
        mobileKeys.s = false;
        mobileKeys.d = false;
        activePointers.current.forEach((key) => {
            mobileKeys[key] = true;
        });
    };
    const onPress = (key: DKey, e: PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        activePointers.current.set(e.pointerId, key);
        syncMobileKeys();
    };
    const onRelease = (e: PointerEvent<HTMLButtonElement>) => {
        activePointers.current.delete(e.pointerId);
        syncMobileKeys();
    };
    useEffect(() => {
        const clearKeys = () => {
            activePointers.current.clear();
            mobileKeys.w = false;
            mobileKeys.a = false;
            mobileKeys.s = false;
            mobileKeys.d = false;
        };
        window.addEventListener("blur", clearKeys);
        return () => {
            window.removeEventListener("blur", clearKeys);
            clearKeys();
        };
    }, []);
    return (<>
      <div style={{
            position: "absolute",
            left: "0.9rem",
            bottom: "calc(max(env(safe-area-inset-bottom, 0px), 10px) + 1.1rem)",
            zIndex: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            pointerEvents: "auto",
        }}>
        <button style={{
            width: 56,
            height: 56,
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(96,165,250,0.35)",
            borderRadius: "10px",
            color: "#93c5fd",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            flexShrink: 0,
        }} onPointerDown={(e) => onPress("w", e)} onPointerUp={onRelease} onPointerCancel={onRelease} onPointerLeave={onRelease}>
          ▲
        </button>
        <button style={{
            width: 56,
            height: 56,
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(96,165,250,0.35)",
            borderRadius: "10px",
            color: "#93c5fd",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            flexShrink: 0,
        }} onPointerDown={(e) => onPress("s", e)} onPointerUp={onRelease} onPointerCancel={onRelease} onPointerLeave={onRelease}>
          ▼
        </button>
      </div>

      <div style={{
            position: "absolute",
            right: "0.9rem",
            bottom: "calc(max(env(safe-area-inset-bottom, 0px), 10px) + 1.1rem)",
            zIndex: 140,
            pointerEvents: "auto",
            display: "flex",
            gap: 5,
        }}>
        <button style={{
            width: 56,
            height: 56,
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(96,165,250,0.35)",
            borderRadius: "10px",
            color: "#93c5fd",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            flexShrink: 0,
        }} onPointerDown={(e) => onPress("a", e)} onPointerUp={onRelease} onPointerCancel={onRelease} onPointerLeave={onRelease}>
          ◀
        </button>
        <button style={{
            width: 56,
            height: 56,
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(96,165,250,0.35)",
            borderRadius: "10px",
            color: "#93c5fd",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            flexShrink: 0,
        }} onPointerDown={(e) => onPress("d", e)} onPointerUp={onRelease} onPointerCancel={onRelease} onPointerLeave={onRelease}>
          ▶
        </button>
      </div>
    </>);
}
