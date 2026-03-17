import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
const BUILDING_DATA = [
    { pos: [-60, 0, -55], w: 8, h: 28, d: 8, color: "#0f1f3d" },
    { pos: [-46, 0, -60], w: 6, h: 20, d: 6, color: "#0a1628" },
    { pos: [-70, 0, -46], w: 9, h: 24, d: 9, color: "#0d1e3a" },
    { pos: [-55, 0, -70], w: 7, h: 18, d: 7, color: "#0a1628" },
    { pos: [60, 0, -55], w: 8, h: 33, d: 8, color: "#1a0f3d" },
    { pos: [46, 0, -60], w: 6, h: 22, d: 6, color: "#12092a" },
    { pos: [70, 0, -46], w: 9, h: 27, d: 9, color: "#160c35" },
    { pos: [55, 0, -70], w: 7, h: 16, d: 7, color: "#12092a" },
    { pos: [-60, 0, 55], w: 8, h: 25, d: 8, color: "#0a2030" },
    { pos: [-46, 0, 62], w: 6, h: 18, d: 6, color: "#051520" },
    { pos: [-70, 0, 46], w: 9, h: 22, d: 9, color: "#081e2e" },
    { pos: [-55, 0, 70], w: 7, h: 15, d: 7, color: "#051520" },
    { pos: [60, 0, 55], w: 8, h: 24, d: 8, color: "#092018" },
    { pos: [46, 0, 62], w: 6, h: 16, d: 6, color: "#051510" },
    { pos: [70, 0, 46], w: 9, h: 20, d: 9, color: "#061a12" },
    { pos: [55, 0, 70], w: 7, h: 14, d: 7, color: "#051510" },
    { pos: [-80, 0, 15], w: 11, h: 38, d: 11, color: "#0a1628" },
    { pos: [80, 0, -18], w: 11, h: 42, d: 11, color: "#0a1628" },
    { pos: [0, 0, -82], w: 13, h: 45, d: 13, color: "#0a1628" },
    { pos: [0, 0, 82], w: 13, h: 35, d: 13, color: "#0a1628" },
    { pos: [-82, 0, -18], w: 10, h: 30, d: 10, color: "#0a1628" },
    { pos: [82, 0, 18], w: 10, h: 28, d: 10, color: "#0a1628" },
];
const EMISSIVE_COLORS = [
    "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6",
    "#8b5cf6", "#8b5cf6", "#8b5cf6", "#8b5cf6",
    "#06b6d4", "#06b6d4", "#06b6d4", "#06b6d4",
    "#10b981", "#10b981", "#10b981", "#10b981",
    "#1e40af", "#6d28d9", "#0e7490", "#065f46", "#1e3a8a", "#4c1d95",
];
export function Buildings() {
    const meshes = useMemo(() => {
        return BUILDING_DATA.map((b, i) => {
            const mat = new THREE.MeshLambertMaterial({
                color: b.color,
                emissive: EMISSIVE_COLORS[i] ?? "#1e3a5f",
                emissiveIntensity: 0.4,
            });
            return { ...b, mat, i };
        });
    }, []);
    return (<group>
      {meshes.map((b, i) => (<mesh key={i} position={[b.pos[0], b.h / 2, b.pos[2]]} material={b.mat}>
          <boxGeometry args={[b.w, b.h, b.d]}/>
        </mesh>))}
      
      <WindowGlows />
    </group>);
}
const WINDOW_STRIP_DATA = [
    { pos: [-60, 14, -55 + 4.05], w: 5, color: "#3b82f6" },
    { pos: [60, 16.5, -55 + 4.05], w: 5, color: "#8b5cf6" },
    { pos: [-60, 12.5, 55 - 4.05], w: 5, color: "#06b6d4" },
    { pos: [60, 12, 55 - 4.05], w: 5, color: "#10b981" },
    { pos: [-80, 19, 15 + 5.55], w: 8, color: "#1e40af" },
    { pos: [80, 21, -18 + 5.55], w: 8, color: "#6d28d9" },
];
function WindowGlows() {
    return (<>
      {WINDOW_STRIP_DATA.map((s, i) => {
            const mat = new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.7 });
            return (<mesh key={i} position={[s.pos[0], s.pos[1], s.pos[2]]} material={mat}>
            <planeGeometry args={[s.w, 0.8]}/>
          </mesh>);
        })}
    </>);
}
