import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
const cubeMatBlue = new THREE.MeshLambertMaterial({ color: "#3b82f6", emissive: "#3b82f6", emissiveIntensity: 0.5 });
const cubeMatPurple = new THREE.MeshLambertMaterial({ color: "#8b5cf6", emissive: "#8b5cf6", emissiveIntensity: 0.5 });
const cubeMatCyan = new THREE.MeshLambertMaterial({ color: "#06b6d4", emissive: "#06b6d4", emissiveIntensity: 0.5 });
const cubeMatGreen = new THREE.MeshLambertMaterial({ color: "#10b981", emissive: "#10b981", emissiveIntensity: 0.5 });
const ringMat1 = new THREE.MeshBasicMaterial({ color: "#3b82f6" });
const ringMat2 = new THREE.MeshBasicMaterial({ color: "#8b5cf6" });
const cubeGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
const sphereGeo = new THREE.SphereGeometry(1, 8, 8);
function AnimatedCube({ position, material, offset = 0 }: {
    position: [
        number,
        number,
        number
    ];
    material: THREE.Material;
    offset?: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    const t = useRef(offset);
    useFrame((_, delta) => {
        t.current += delta * 0.7;
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(t.current) * 0.5;
            ref.current.rotation.y += delta * 0.8;
        }
    });
    return (<mesh ref={ref} position={position} geometry={cubeGeo} material={material}/>);
}
function AnimatedSphere({ position, material, offset = 0 }: {
    position: [
        number,
        number,
        number
    ];
    material: THREE.Material;
    offset?: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    const t = useRef(offset);
    useFrame((_, delta) => {
        t.current += delta * 0.6;
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(t.current * 1.2) * 0.7;
        }
    });
    return (<mesh ref={ref} position={position} geometry={sphereGeo} material={material}/>);
}
export function ZoneObjects() {
    return (<group>
  <ZoneAirWall center={[-50, 0, -40]} color="#3b82f6" radius={15} height={8.2}/>
  <ZoneAirWall center={[50, 0, -40]} color="#8b5cf6" radius={15} height={8.2}/>
  <ZoneAirWall center={[-50, 0, 40]} color="#06b6d4" radius={15} height={8.2}/>
  <ZoneAirWall center={[50, 0, 40]} color="#10b981" radius={15} height={8.2}/>

      
      <AnimatedCube position={[-52, 4, -42]} material={cubeMatBlue} offset={0}/>
      <AnimatedSphere position={[-46, 4.5, -37]} material={cubeMatBlue} offset={1.5}/>

      
      <AnimatedCube position={[52, 4, -42]} material={cubeMatPurple} offset={0.5}/>
      <AnimatedSphere position={[46, 4.5, -37]} material={cubeMatPurple} offset={2}/>

      
      <AnimatedCube position={[-52, 4, 42]} material={cubeMatCyan} offset={1}/>
      <AnimatedSphere position={[-46, 4.5, 37]} material={cubeMatCyan} offset={2.5}/>

      
      <AnimatedCube position={[52, 4, 42]} material={cubeMatGreen} offset={1.5}/>
      <AnimatedSphere position={[46, 4.5, 37]} material={cubeMatGreen} offset={3}/>

      
      <ZoneLabel position={[-50, 3.8, -40]} color="#3b82f6" title="ABOUT ME" subtitle="Who I am"/>
      <ZoneLabel position={[50, 3.8, -40]} color="#8b5cf6" title="PROJECTS" subtitle="What I built"/>
      <ZoneLabel position={[-50, 3.8, 40]} color="#06b6d4" title="SKILLS" subtitle="How I work"/>
      <ZoneLabel position={[50, 3.8, 40]} color="#10b981" title="CONTACT" subtitle="Let’s talk"/>

      
      <CenterRings />
    </group>);
}
function ZoneAirWall({
    center,
    color,
    radius,
    height,
}: {
    center: [number, number, number];
    color: string;
    radius: number;
    height: number;
}) {
    const shellRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);
    const sweepA = useRef<THREE.Mesh>(null);
    const sweepB = useRef<THREE.Mesh>(null);
    const phase = useMemo(() => Math.random() * Math.PI * 2, []);
    useFrame(({ clock }, delta) => {
        const t = clock.elapsedTime + phase;
        const pulse = (Math.sin(t * 2.1) + 1) * 0.5;
        if (shellRef.current) {
            const mat = shellRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.08 + pulse * 0.08;
            shellRef.current.scale.set(1 + pulse * 0.015, 1, 1 + pulse * 0.015);
        }
        if (wireRef.current) {
            const mat = wireRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.08 + (1 - pulse) * 0.1;
            wireRef.current.rotation.y += delta * 0.18;
        }
        const sweep1 = (((t * 0.75) % 1) - 0.5) * height;
        const sweep2 = ((((t * 0.75) + 0.5) % 1) - 0.5) * height;
        if (sweepA.current) {
            const mat = sweepA.current.material as THREE.MeshBasicMaterial;
            sweepA.current.position.y = sweep1 + height * 0.5;
            mat.opacity = 0.2 + pulse * 0.2;
            sweepA.current.scale.setScalar(1 + pulse * 0.03);
        }
        if (sweepB.current) {
            const mat = sweepB.current.material as THREE.MeshBasicMaterial;
            sweepB.current.position.y = sweep2 + height * 0.5;
            mat.opacity = 0.16 + (1 - pulse) * 0.16;
            sweepB.current.scale.setScalar(1 + (1 - pulse) * 0.04);
        }
    });
    return (<group position={center}>
      <mesh ref={shellRef} position={[0, height * 0.5, 0]}>
        <cylinderGeometry args={[radius, radius, height, 64, 1, true]}/>
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending}/>
      </mesh>

      <mesh ref={wireRef} position={[0, height * 0.5, 0]}>
        <cylinderGeometry args={[radius, radius, height, 40, 1, true]}/>
        <meshBasicMaterial color={color} transparent opacity={0.14} side={THREE.DoubleSide} wireframe depthWrite={false} blending={THREE.AdditiveBlending}/>
      </mesh>

      <mesh ref={sweepA} position={[0, height * 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.09, 8, 96]}/>
        <meshBasicMaterial color={color} transparent opacity={0.26} depthWrite={false} blending={THREE.AdditiveBlending}/>
      </mesh>

      <mesh ref={sweepB} position={[0, height * 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.08, 8, 96]}/>
        <meshBasicMaterial color={color} transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending}/>
      </mesh>
    </group>);
}
function ZoneLabel({ position, color, title, subtitle, }: {
    position: [
        number,
        number,
        number
    ];
    color: string;
    title: string;
    subtitle: string;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const spark1 = useRef<THREE.Mesh>(null);
    const spark2 = useRef<THREE.Mesh>(null);
    const spark3 = useRef<THREE.Mesh>(null);
    const phase = useMemo(() => Math.random() * Math.PI * 2, []);
    useFrame(({ clock }, delta) => {
        const t = clock.elapsedTime + phase;
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.25;
            groupRef.current.rotation.y += delta * 0.16;
        }
        const pulse = 0.65 + (Math.sin(t * 5.4) + 1) * 0.17;
        if (spark1.current)
            spark1.current.scale.setScalar(pulse);
        if (spark2.current)
            spark2.current.scale.setScalar(0.45 + (Math.sin(t * 6.2 + 1.3) + 1) * 0.16);
        if (spark3.current)
            spark3.current.scale.setScalar(0.4 + (Math.sin(t * 5.7 + 2.2) + 1) * 0.15);
    });
    return (<Billboard follow lockX={false} lockY={false} lockZ={false} position={position}>
      <group ref={groupRef}>
        <Text position={[0, 0.62, 0]} fontSize={2.1} fontWeight={900} letterSpacing={0.095} color={color} anchorX="center" anchorY="middle" outlineWidth={0.1} outlineColor="#020617">
          {title}
        </Text>
        <Text position={[0, -0.62, 0]} fontSize={0.82} fontWeight={800} color="#e2e8f0" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#020817">
          {subtitle}
        </Text>

        <mesh ref={spark1} position={[-3.5, 0.2, 0]}>
          <sphereGeometry args={[0.14, 8, 8]}/>
          <meshBasicMaterial color={color} transparent opacity={0.95}/>
        </mesh>
        <mesh ref={spark2} position={[3.5, 0.3, 0]}>
          <sphereGeometry args={[0.12, 8, 8]}/>
          <meshBasicMaterial color={color} transparent opacity={0.9}/>
        </mesh>
        <mesh ref={spark3} position={[0, 1.75, 0]}>
          <sphereGeometry args={[0.1, 8, 8]}/>
          <meshBasicMaterial color={color} transparent opacity={0.9}/>
        </mesh>

      </group>
    </Billboard>);
}
function CenterRings() {
    const ring1 = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => {
        if (ring1.current) {
            ring1.current.rotation.y += delta * 0.5;
            ring1.current.rotation.x = 0.8;
        }
        if (ring2.current) {
            ring2.current.rotation.y -= delta * 0.35;
            ring2.current.rotation.z = 1.0;
        }
    });
    return (<group position={[0, 6, 0]}>
      <mesh ref={ring1} material={ringMat1}>
        <torusGeometry args={[3, 0.12, 8, 40]}/>
      </mesh>
      <mesh ref={ring2} material={ringMat2}>
        <torusGeometry args={[2.3, 0.09, 8, 32]}/>
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={4} distance={18} color="#6366f1" decay={2}/>
    </group>);
}
