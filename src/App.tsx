import { useState, Suspense, Component, useEffect, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { GameScene, Zone } from "./components/GameScene";
import { HUD } from "./components/ui/HUD";
import { PortfolioPanel } from "./components/ui/PortfolioPanel";
import { WelcomeScreen } from "./components/ui/WelcomeScreen";
import { Stars } from "./components/Skybox";
import { WebGLFallback } from "./components/WebGLFallback";
function detectWebGL(): boolean {
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("webgl2") ||
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
        return !!ctx;
    }
    catch {
        return false;
    }
}
class WebGLErrorBoundary extends Component<{
    children: ReactNode;
    fallback: ReactNode;
}, {
    hasError: boolean;
}> {
    constructor(props: {
        children: ReactNode;
        fallback: ReactNode;
    }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError)
            return this.props.fallback;
        return this.props.children;
    }
}
function GameWrapper() {
    const [currentZone, setCurrentZone] = useState<Zone>("none");
    const [speed, setSpeed] = useState(0);
    const isMobile = window.innerWidth < 900;
    return (<div style={{ width: "100%", height: "100dvh", minHeight: "100svh", position: "relative" }}>
      <Canvas camera={{
            position: [0, 8, -16],
            fov: 65,
            near: 0.5,
            far: 150,
        }} style={{ background: "#020817" }} gl={{
            antialias: false,
            failIfMajorPerformanceCaveat: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
        }} dpr={Math.min(window.devicePixelRatio, isMobile ? 1 : 1.3)} performance={{ min: 0.5 }}>
        <color attach="background" args={["#020817"]}/>
        <Suspense fallback={null}>
          <Stars />
          <GameScene onZoneChange={setCurrentZone} onSpeedChange={setSpeed} currentZone={currentZone}/>
        </Suspense>
      </Canvas>

      <HUD zone={currentZone} speed={speed}/>
      <PortfolioPanel zone={currentZone}/>
    </div>);
}
export default function App() {
    const [started, setStarted] = useState(false);
    const [webglSupported] = useState(() => detectWebGL());
    if (!webglSupported) {
        return <WebGLFallback />;
    }
    return (<WebGLErrorBoundary fallback={<WebGLFallback />}>
      <div style={{ width: "100%", height: "100dvh", minHeight: "100svh", overflow: "hidden" }}>
        {!started && <WelcomeScreen onStart={() => setStarted(true)}/>}
        <GameWrapper />
      </div>
    </WebGLErrorBoundary>);
}
