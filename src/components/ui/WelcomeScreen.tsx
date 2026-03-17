import { useState, useEffect, useRef, useCallback, useMemo, type ReactNode } from "react";
const TITLE = "NAJI ULLAH";
const SUBTITLE = "Full Stack Engineer";
const BOOT_SEQUENCE = [
    "INITIALIZING PORTFOLIO_OS v2.1.0 ...",
    "LOADING CORE MODULES .............. OK",
    "MOUNTING /dev/skills .............. OK",
    "MOUNTING /dev/projects ............ OK",
    "SCANNING NEURAL MESH .............. OK",
    "ENTITY IDENTIFIED: NAJI ULLAH",
    "ROLE: FULL STACK ENGINEER",
    "ACCESS GRANTED ▌",
] as const;
const ZONES = [
    { label: "About", color: "#60b820", tag: "ORIGIN" },
    { label: "Projects", color: "#88d030", tag: "BUILD" },
    { label: "Skills", color: "#a8d848", tag: "STACK" },
    { label: "Contact", color: "#70c020", tag: "LINK" },
] as const;
const IconAbout = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>);
const IconProjects = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <path d="M17.5 14v6M14.5 17h6"/>
  </svg>);
const IconSkills = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>);
const IconContact = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6
      A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0
      01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7
      A2 2 0 0122 16.9z"/>
  </svg>);
const ZONE_ICONS = [IconAbout, IconProjects, IconSkills, IconContact];
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');

  @keyframes flicker {
    0%,100% { opacity:1 }
    91%  { opacity:1    }
    92%  { opacity:0.82 }
    93%  { opacity:1    }
    95%  { opacity:0.91 }
    96%  { opacity:1    }
  }
  @keyframes tubeGlow {
    0%,100% { box-shadow: 0 0 60px 20px rgba(90,190,60,0.07),  0 0 120px 50px rgba(60,150,30,0.04),  inset 0 0 80px rgba(0,0,0,0.65) }
    50%     { box-shadow: 0 0 80px 30px rgba(110,210,70,0.11), 0 0 160px 70px rgba(70,170,40,0.07),  inset 0 0 80px rgba(0,0,0,0.65) }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(14px) }
    to   { opacity:1; transform:translateY(0)    }
  }
  @keyframes revealChar {
    from { opacity:0; transform:translateY(-8px) scale(0.85) }
    to   { opacity:1; transform:translateY(0)    scale(1)    }
  }
  @keyframes glitchShift {
    0%   { transform:translate(0)     skewX(0deg)   }
    20%  { transform:translate(-4px,1px) skewX(-1deg) }
    40%  { transform:translate(4px,-1px) skewX(1deg)  }
    60%  { transform:translate(-2px,2px) skewX(-0.5deg) }
    80%  { transform:translate(2px,-2px) skewX(0.5deg)  }
    100% { transform:translate(0)     skewX(0deg)   }
  }
  @keyframes rgbSplit {
    0%   { text-shadow: 2px 0 rgba(255,0,60,0.7),  -2px 0 rgba(0,255,200,0.7), 0 0 20px rgba(180,240,80,0.5) }
    33%  { text-shadow: -3px 0 rgba(255,0,60,0.7),  3px 0 rgba(0,255,200,0.7), 0 0 20px rgba(180,240,80,0.5) }
    66%  { text-shadow: 1px 0 rgba(255,0,60,0.7),  -1px 0 rgba(0,255,200,0.7), 0 0 20px rgba(180,240,80,0.5) }
    100% { text-shadow: 2px 0 rgba(255,0,60,0.7),  -2px 0 rgba(0,255,200,0.7), 0 0 20px rgba(180,240,80,0.5) }
  }
  @keyframes btnPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(140,220,60,0.3) }
    50%     { box-shadow: 0 0 18px 5px rgba(140,220,60,0.12) }
  }
  @keyframes orbPulse {
    0%,100% { opacity:0.6; transform:scale(1)   }
    50%     { opacity:1;   transform:scale(1.3) }
  }
  @keyframes zoneFloat {
    0%,100% { transform:translateY(0)  }
    50%     { transform:translateY(-4px) }
  }
  /* CSS scanline beam — replaces JS setInterval state ─────────────────────── */
  @keyframes scanBeam {
    from { top: -1% }
    to   { top: 101% }
  }
  /* Rolling scanline texture */
  @keyframes rollLines {
    from { background-position: 0 0    }
    to   { background-position: 0 100px }
  }
  @keyframes ambientPulse {
    0%,100% { opacity:0.5 }
    50%     { opacity:0.8 }
  }
  @keyframes enterZoom {
    0%   { transform: scale(1); filter: brightness(1) contrast(1) }
    55%  { transform: scale(1.08); filter: brightness(1.2) contrast(1.15) }
    100% { transform: scale(1.24); filter: brightness(1.45) contrast(1.35) }
  }
  @keyframes warpTunnel {
    0%   { transform: scale(0.2); opacity: 0 }
    25%  { opacity: 0.65 }
    100% { transform: scale(3.4); opacity: 0 }
  }
  @keyframes igniteFlash {
    0%   { opacity: 0 }
    40%  { opacity: 0.7 }
    100% { opacity: 0 }
  }
  .start-btn:hover {
    background: rgba(140,220,60,0.12) !important;
    color: #d4f57a !important;
    border-color: rgba(180,240,80,0.9) !important;
  }
  .start-btn:active { transform: scale(0.97) !important; }
  .zone-card:hover {
    background: rgba(120,200,40,0.08) !important;
    border-color: rgba(140,220,60,0.45) !important;
    transform: translateY(-3px) !important;
  }
  .zone-card:hover .zone-bar  { width: 100% !important; }
  .zone-card:hover .zone-icon { filter: drop-shadow(0 0 5px currentColor) !important; transform: scale(1.1) !important; }
`;
interface ZoneCardProps {
    label: string;
    color: string;
    tag: string;
    index: number;
    Icon: () => ReactNode;
}
const ZoneCard = ({ label, color, tag, index, Icon }: ZoneCardProps) => (<div className="zone-card" style={{
        padding: "0.45rem 0.25rem",
        border: "1px solid rgba(90,160,30,0.2)",
        borderRadius: "2px",
        textAlign: "center",
        cursor: "default",
        transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
        background: "rgba(70,140,20,0.05)",
        position: "relative",
        overflow: "hidden",
        animation: `fadeUp 0.4s ease ${0.4 + index * 0.07}s both, zoneFloat ${3 + index * 0.5}s ease-in-out ${index * 0.3}s infinite`,
    }}>
    <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.9,
    }}/>
    <div className="zone-icon" style={{ color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "3px", transition: "transform 0.3s ease" }}>
      <Icon />
    </div>
    <div style={{ fontSize: "0.38rem", color: "rgba(130,190,50,0.85)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
      {label}
    </div>
    <div style={{
        display: "inline-block", fontSize: "0.32rem", letterSpacing: "0.08em",
        color, border: `1px solid ${color}44`, borderRadius: "1px",
        padding: "1px 3px", background: `${color}10`, textShadow: `0 0 5px ${color}`,
    }}>
      {tag}
    </div>
    <div className="zone-bar" style={{ position: "absolute", bottom: 0, left: 0, height: "1px", width: "0%", background: color, transition: "width 0.3s ease" }}/>
  </div>);
interface WelcomeScreenProps {
    onStart: () => void;
}
export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  type Phase = "static" | "boot" | "glitch" | "reveal" | "ready" | "entering" | "leaving";
    const [phase, setPhase] = useState<Phase>("static");
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [titleLen, setTitleLen] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [staticOpacity, setStaticOpacity] = useState(1);
    const [staticBurstOpacity, setStaticBurstOpacity] = useState(0);
    const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
    const noiseFrameRef = useRef<number>(0);
    const cssInjected = useRef(false);
    useEffect(() => {
        if (cssInjected.current)
            return;
        cssInjected.current = true;
        const el = document.createElement("style");
        el.textContent = GLOBAL_CSS;
        document.head.appendChild(el);
        return () => { document.head.removeChild(el); };
    }, []);
    useEffect(() => {
        const canvas = noiseCanvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d")!;
        canvas.width = 320;
        canvas.height = 240;
        const img = ctx.createImageData(320, 240);
        const drawStatic = () => {
            const d = img.data;
            for (let i = 0; i < d.length; i += 4) {
                const v = (Math.random() * 255) | 0;
                d[i] = d[i + 1] = d[i + 2] = v;
                d[i + 3] = 255;
            }
            ctx.putImageData(img, 0, 0);
            noiseFrameRef.current = requestAnimationFrame(drawStatic);
        };
        drawStatic();
        return () => cancelAnimationFrame(noiseFrameRef.current);
    }, []);
    useEffect(() => {
        if (staticOpacity === 0) {
            cancelAnimationFrame(noiseFrameRef.current);
        }
    }, [staticOpacity]);
    useEffect(() => {
        const t1 = setTimeout(() => setStaticOpacity(0), 1200);
        const t2 = setTimeout(() => setPhase("boot"), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);
    useEffect(() => {
        if (phase !== "boot")
            return;
        let lineIdx = 0, charIdx = 0, current = "";
        let timer: ReturnType<typeof setTimeout>;
        const type = () => {
            if (lineIdx >= BOOT_SEQUENCE.length) {
                timer = setTimeout(() => setPhase("glitch"), 400);
                return;
            }
            const target = BOOT_SEQUENCE[lineIdx];
            if (charIdx < target.length) {
                current += target[charIdx++];
                setBootLines(prev => {
                    const next = [...prev];
                    next[lineIdx] = current;
                    return next;
                });
                timer = setTimeout(type, lineIdx < 5 ? 16 : lineIdx === 5 ? 35 : 50);
            }
            else {
                lineIdx++;
                charIdx = 0;
                current = "";
                timer = setTimeout(type, 55);
            }
        };
        timer = setTimeout(type, 200);
        return () => clearTimeout(timer);
    }, [phase]);
    useEffect(() => {
        if (phase !== "glitch")
            return;
        setGlitchActive(true);
        const t1 = setTimeout(() => setGlitchActive(false), 150);
        const t2 = setTimeout(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 90);
        }, 280);
        const t3 = setTimeout(() => setPhase("reveal"), 550);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [phase]);
    useEffect(() => {
        if (phase !== "reveal")
            return;
        let i = 0;
        let timer: ReturnType<typeof setTimeout>;
        const reveal = () => {
            if (i < TITLE.length) {
                i++;
                setTitleLen(i);
                timer = setTimeout(reveal, 65);
            }
            else {
                timer = setTimeout(() => setPhase("ready"), 300);
            }
        };
        reveal();
        return () => clearTimeout(timer);
    }, [phase]);
    useEffect(() => {
        const t = setInterval(() => setCursorVisible(v => !v), 530);
        return () => clearInterval(t);
    }, []);
    useEffect(() => {
      if (phase === "leaving" || phase === "entering")
        return;
      const interval = setInterval(() => {
        if (Math.random() < 0.26) {
          const burst = 0.24 + Math.random() * 0.24;
          setStaticBurstOpacity(burst);
          const duration = 120 + Math.random() * 120;
          setTimeout(() => setStaticBurstOpacity(0), duration);
          if (Math.random() < 0.12) {
            setTimeout(() => {
              setStaticBurstOpacity(0.2 + Math.random() * 0.2);
              setTimeout(() => setStaticBurstOpacity(0), 70 + Math.random() * 90);
            }, 90 + Math.random() * 160);
          }
        }
      }, 1400);
      return () => clearInterval(interval);
    }, [phase]);
    useEffect(() => {
      if (phase !== "entering")
        return;
      setGlitchActive(true);
      setStaticBurstOpacity(1);
      const t1 = setTimeout(() => setStaticBurstOpacity(0.75), 120);
      const t2 = setTimeout(() => setStaticBurstOpacity(0.45), 260);
      const t3 = setTimeout(() => setPhase("leaving"), 760);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, [phase]);
    const handleStart = useCallback(() => {
        setPhase("entering");
        setTimeout(onStart, 1450);
    }, [onStart]);
    const visibleTitle = useMemo(() => TITLE.slice(0, titleLen).split(""), [titleLen]);
    const isLeaving = phase === "leaving";
    const isEntering = phase === "entering";
    return (<div style={{
            position: "absolute", inset: 0, zIndex: 200,
            background: "radial-gradient(ellipse at 50% 55%, #0d0d0a 0%, #000 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "opacity 0.7s ease",
            opacity: isLeaving ? 0 : 1,
            overflow: "hidden",
        }}>
      
      <div style={{
            position: "absolute", width: "80vw", height: "70vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(70,150,30,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
            animation: "ambientPulse 4s ease-in-out infinite",
        }}/>

      
      <div style={{
        position: "relative", width: "min(88vw, 780px)", aspectRatio: "4/3.4", marginBottom: "6%",
        animation: isEntering ? "enterZoom 0.78s cubic-bezier(0.22,0.86,0.24,1) forwards" : "none",
        transformOrigin: "50% 55%",
        }}>

        
        <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(155deg, #2e2820 0%, #1c1810 45%, #0e0c09 100%)",
            borderRadius: "28px 28px 22px 22px",
            boxShadow: `0 0 0 2px #3e3828, 0 0 0 4px #090704,
            10px 10px 0 4px #090704, 16px 16px 50px rgba(0,0,0,0.95),
            -2px -2px 0 1px #4a4030,
            inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -2px 10px rgba(0,0,0,0.7)`,
        }}>

          
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
            {Array.from({ length: 7 }, (_, i) => (<div key={i} style={{ width: 28, height: 3, background: "#090704", borderRadius: 2, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)" }}/>))}
          </div>

          
          <div style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.65rem",
            letterSpacing: "0.45em", color: "rgba(180,155,80,0.4)", whiteSpace: "nowrap",
        }}>
            PORTFOLIO · SYSTEMS
          </div>

          
          <div style={{
            position: "absolute", top: "15%", right: 14, width: 20, height: "65%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly",
        }}>
            
            <div style={{
            width: 16, height: 16, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #3a3025, #1a1510)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 4px rgba(100,180,40,0.3)",
            border: "1px solid #0a0804", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
              <div style={{ width: 2, height: 5, background: "rgba(100,180,40,0.6)", borderRadius: 1 }}/>
            </div>

            
            {([0, 45, 90] as const).map((rot, i) => (<div key={i} style={{
                width: 13, height: 13, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #4a4030, #1a1510)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
                border: "1px solid #090704", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <div style={{ width: 1, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 1, transform: `rotate(${rot}deg)` }}/>
              </div>))}

            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 3, marginTop: 6 }}>
              {Array.from({ length: 8 }, (_, i) => (<div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#090704" }}/>))}
            </div>
          </div>

          
          <div style={{
            position: "absolute", top: "7%", left: "5%", right: "14%", bottom: "13%",
            background: "#050302", borderRadius: "14px",
            boxShadow: "inset 0 0 0 3px #0a0804, inset 0 0 20px rgba(0,0,0,0.9)",
            padding: "3px",
        }}>

            
            <div style={{
            position: "relative", width: "100%", height: "100%",
            borderRadius: "12px", overflow: "hidden",
            animation: "tubeGlow 4s ease-in-out infinite",
        }}>
              
              <div style={{ position: "absolute", inset: 0, background: "#020a02" }}/>

              
              <div style={{
            position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 1px, transparent 1px, transparent 3px)",
            animation: "rollLines 2.5s linear infinite",
        }}/>

              
              <div style={{
            position: "absolute", left: 0, right: 0, height: "4px",
            background: "linear-gradient(transparent, rgba(130,210,70,0.06), transparent)",
            zIndex: 11, pointerEvents: "none",
            animation: "scanBeam 3s linear infinite",
        }}/>

              
              <div style={{
            position: "absolute", inset: 0, zIndex: 12, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.75) 100%)",
            borderRadius: "12px",
        }}/>

              
              {(["0% 0%", "100% 0%", "0% 100%", "100% 100%"] as const).map((pos, i) => (<div key={i} style={{
                position: "absolute", inset: 0, zIndex: 13, pointerEvents: "none",
                background: `radial-gradient(circle at ${pos}, rgba(0,0,0,0.6) 0%, transparent 40%)`,
            }}/>))}

              
              <div style={{
            position: "absolute", top: 0, left: "8%", width: "32%", height: "38%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 55%)",
            zIndex: 14, pointerEvents: "none", borderRadius: "0 0 50% 0",
        }}/>

              
              <div style={{
            position: "absolute", inset: 0, zIndex: 9, pointerEvents: "none",
            background: "linear-gradient(90deg, rgba(255,0,0,0.012) 0%, transparent 15%, transparent 85%, rgba(0,0,255,0.012) 100%)",
        }}/>

              
              <div style={{
            position: "absolute", inset: 0, zIndex: 20,
            opacity: staticOpacity, transition: "opacity 0.6s ease",
            pointerEvents: "none",
            willChange: staticOpacity > 0 ? "opacity" : "auto",
        }}>
                <canvas ref={noiseCanvasRef} style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}/>
                <div style={{ position: "absolute", inset: 0, background: "rgba(50,110,10,0.18)" }}/>
              </div>

              <div style={{
            position: "absolute", inset: 0, zIndex: 19,
            opacity: staticBurstOpacity,
            transition: "opacity 0.06s linear",
            pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, rgba(240,255,230,0.5) 0px, rgba(240,255,230,0.5) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 2px), repeating-linear-gradient(90deg, rgba(230,255,210,0.22) 0px, rgba(230,255,210,0.22) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 2px)",
            animation: staticBurstOpacity > 0 ? "glitchShift 0.07s steps(1) infinite, rgbSplit 0.12s steps(1) infinite" : "none",
            filter: staticBurstOpacity > 0 ? "contrast(1.35) saturate(1.25)" : "none",
        }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(150,235,90,0.28)" }}/>
              </div>

              {isEntering && (<>
                  <div style={{
            position: "absolute", inset: "-20%", zIndex: 21, pointerEvents: "none",
            background: "repeating-radial-gradient(circle at 50% 50%, rgba(180,250,110,0.34) 0px, rgba(180,250,110,0.34) 3px, rgba(0,0,0,0) 11px, rgba(0,0,0,0) 24px)",
            animation: "warpTunnel 0.72s linear forwards",
            mixBlendMode: "screen",
        }}/>
                  <div style={{
            position: "absolute", inset: 0, zIndex: 22, pointerEvents: "none",
            background: "radial-gradient(circle at center, rgba(210,255,170,0.6) 0%, rgba(120,220,60,0.18) 30%, rgba(0,0,0,0) 70%)",
            animation: "igniteFlash 0.42s ease-out forwards",
        }}/>
                  <div style={{
            position: "absolute", left: "50%", top: "72%", transform: "translateX(-50%)",
            zIndex: 23,
            color: "#b8f068",
            letterSpacing: "0.24em",
            fontSize: "clamp(0.38rem,0.8vw,0.52rem)",
            textShadow: "0 0 12px rgba(170,230,80,0.85)",
            animation: "fadeUp 0.24s ease",
            pointerEvents: "none",
        }}>
                    ENTERING WORLD...
                  </div>
                </>)}

              
              <div style={{
            position: "absolute", inset: 0, zIndex: 15,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "3% 4%",
            animation: "flicker 9s infinite",
            fontFamily: "'Share Tech Mono', monospace",
        }}>

                
                {(phase === "boot" || phase === "glitch") && (<div style={{
                fontSize: "clamp(0.42rem, 1vw, 0.65rem)",
                lineHeight: 2, textAlign: "left",
                width: "92%", maxWidth: "440px",
                animation: glitchActive ? "glitchShift 0.08s steps(1) infinite" : "none",
            }}>
                    {bootLines.map((line, i) => (<div key={i} style={{
                    color: i >= 5 ? "#a8d860" : "#4a9820",
                    opacity: i === bootLines.length - 1 ? 1 : 0.65,
                    textShadow: i >= 5 ? "0 0 10px rgba(168,216,96,0.9)" : "0 0 5px rgba(74,152,32,0.6)",
                }}>
                        {i === 0 && <span style={{ color: "#2a5810", marginRight: 6 }}>$</span>}
                        {line}
                        {i === bootLines.length - 1 && cursorVisible && "█"}
                      </div>))}
                  </div>)}

                
                {(phase === "reveal" || phase === "ready") && (<div style={{ textAlign: "center", width: "100%" }}>

                    
                    <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                marginBottom: "0.7rem", animation: "fadeUp 0.4s ease both",
            }}>
                      <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#78d830", boxShadow: "0 0 8px #78d830",
                display: "inline-block", animation: "orbPulse 1.8s ease-in-out infinite",
            }}/>
                      <span style={{
                fontSize: "clamp(0.4rem, 0.9vw, 0.55rem)",
                letterSpacing: "0.3em", color: "#78d830",
                textShadow: "0 0 8px rgba(120,216,48,0.9)",
            }}>SYSTEM ONLINE</span>
                    </div>

                    
                    <h1 style={{
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  fontSize: "clamp(1.45rem, min(7vw, 7.2vh), 4.8rem)",
                  fontWeight: 900, letterSpacing: "0.06em",
                color: "#c0e870", margin: "0 0 0.1rem", lineHeight: 1,
                display: "flex", justifyContent: "center", gap: "0.02em",
                textTransform: "uppercase",
                textShadow: "0 0 22px rgba(170,230,80,0.72), 0 0 46px rgba(130,210,50,0.34)",
                animation: glitchActive ? "glitchShift 0.1s steps(1) infinite" : "none",
                  maxWidth: "100%",
                  overflow: "hidden",
            }}>
                      {visibleTitle.map((char, i) => (<span key={i} style={{
                    display: "inline-block",
                    animation: `revealChar 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 22}ms both`,
                    color: char === " " ? "transparent" : "#c0e870",
                    willChange: "transform, opacity",
                }}>
                          {char === " " ? "\u00A0" : char}
                        </span>))}
                      {phase === "reveal" && cursorVisible && titleLen < TITLE.length && (<span style={{ color: "#78d830" }}>█</span>)}
                    </h1>

                    {phase === "ready" && (<>
                        
                        <div style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    justifyContent: "center", marginBottom: "0.4rem",
                    animation: "fadeUp 0.5s ease 0.1s both",
                }}>
                          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(120,210,48,0.5))", maxWidth: 50 }}/>
                          <p style={{
                    fontSize: "clamp(0.42rem, 1vw, 0.58rem)", letterSpacing: "0.28em",
                    color: "#78c030", margin: 0,
                    textShadow: "0 0 8px rgba(120,192,48,0.7)", textTransform: "uppercase",
                }}>
                            {SUBTITLE}
                          </p>
                          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(120,210,48,0.5))", maxWidth: 50 }}/>
                        </div>

                        <p style={{
                    fontSize: "clamp(0.35rem, 0.8vw, 0.48rem)",
                    color: "rgba(90,150,40,0.7)", margin: "0 0 1rem",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    animation: "fadeUp 0.5s ease 0.2s both",
                }}>
                          DRIVE THROUGH THE CITY — EXPLORE THE SECTORS
                        </p>


                        <div style={{ animation: "fadeUp 0.5s ease 0.65s both" }}>
                          <button className="start-btn" onClick={handleStart} style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "clamp(0.42rem, 0.95vw, 0.58rem)",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#98d050", background: "rgba(90,170,30,0.07)",
                    border: "1px solid rgba(130,210,50,0.45)", borderRadius: "1px",
                    padding: "8px 28px", cursor: "pointer",
                    transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    textShadow: "0 0 10px rgba(150,208,80,0.8)",
                    animation: "btnPulse 2.5s ease-in-out infinite",
                }}>
                            [ IGNITE ENGINE ]
                          </button>
                          <div style={{
                    marginTop: "0.5rem",
                    fontSize: "clamp(0.32rem, 0.7vw, 0.44rem)",
                    color: "rgba(70,130,25,0.65)", letterSpacing: "0.18em",
                    textShadow: "0 0 5px rgba(70,130,25,0.5)",
                }}>
                            USE W·A·S·D OR ARROW KEYS TO DRIVE
                          </div>
                        </div>
                      </>)}
                  </div>)}

              </div>
            </div>
          </div>
        </div>

        
      </div>

      
    </div>);
}
