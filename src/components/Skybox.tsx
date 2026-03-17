import { useMemo } from "react";
import * as THREE from "three";
export function Stars() {
    const [positions, colors] = useMemo(() => {
        const count = 600;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 80 + Math.random() * 35;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta));
            pos[i * 3 + 2] = r * Math.cos(phi);
            const t = Math.random();
            col[i * 3] = 0.6 + t * 0.4;
            col[i * 3 + 1] = 0.6 + t * 0.2;
            col[i * 3 + 2] = 0.8 + t * 0.2;
        }
        return [pos, col];
    }, []);
    const mat = useMemo(() => new THREE.PointsMaterial({
        size: 0.35,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
    }), []);
    return (<points material={mat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]}/>
        <bufferAttribute attach="attributes-color" args={[colors, 3]}/>
      </bufferGeometry>
    </points>);
}
