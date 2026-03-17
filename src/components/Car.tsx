import * as THREE from "three";
const bodyMat = new THREE.MeshLambertMaterial({ color: "#b91c1c" });
const bodyAccentMat = new THREE.MeshLambertMaterial({ color: "#991b1b" });
const darkMat = new THREE.MeshLambertMaterial({ color: "#111827" });
const glassMat = new THREE.MeshLambertMaterial({ color: "#7dd3fc", transparent: true, opacity: 0.3 });
const headlightMat = new THREE.MeshBasicMaterial({ color: "#fef9c3" });
const taillightMat = new THREE.MeshBasicMaterial({ color: "#dc2626" });
const tireMat = new THREE.MeshLambertMaterial({ color: "#1f2937" });
const rimMat = new THREE.MeshLambertMaterial({ color: "#d1d5db" });
const rimAccentMat = new THREE.MeshLambertMaterial({ color: "#ef4444", emissive: "#ef4444", emissiveIntensity: 0.3 });
const spoilerMat = new THREE.MeshLambertMaterial({ color: "#7f1d1d" });
const diffuserMat = new THREE.MeshLambertMaterial({ color: "#0f172a" });
const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 12);
const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.28, 6);
const rimCenterGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 6);
const wheelRot: [
    number,
    number,
    number
] = [0, 0, Math.PI / 2];
interface CarProps {
    groupRef: React.RefObject<THREE.Group | null>;
    wheelFRef: React.RefObject<THREE.Group | null>;
    wheelBRef: React.RefObject<THREE.Group | null>;
    lightweight?: boolean;
}
export function Car({ groupRef, wheelFRef, wheelBRef }: CarProps) {
    return (<group ref={groupRef}>

      
      
      <mesh position={[0, 0.28, 0]} material={bodyMat}>
        <boxGeometry args={[2.3, 0.28, 4.8]}/>
      </mesh>

      
      <mesh position={[1.2, 0.22, 0]} material={bodyAccentMat}>
        <boxGeometry args={[0.08, 0.2, 4.4]}/>
      </mesh>
      <mesh position={[-1.2, 0.22, 0]} material={bodyAccentMat}>
        <boxGeometry args={[0.08, 0.2, 4.4]}/>
      </mesh>

      
      <mesh position={[0, 0.52, -0.3]} material={bodyMat}>
        <boxGeometry args={[2.1, 0.22, 3.8]}/>
      </mesh>

      
      
      <mesh position={[1.1, 0.46, 1.55]} material={bodyMat}>
        <boxGeometry args={[0.18, 0.5, 0.8]}/>
      </mesh>
      <mesh position={[-1.1, 0.46, 1.55]} material={bodyMat}>
        <boxGeometry args={[0.18, 0.5, 0.8]}/>
      </mesh>
      
      <mesh position={[1.1, 0.46, -1.55]} material={bodyMat}>
        <boxGeometry args={[0.18, 0.5, 0.8]}/>
      </mesh>
      <mesh position={[-1.1, 0.46, -1.55]} material={bodyMat}>
        <boxGeometry args={[0.18, 0.5, 0.8]}/>
      </mesh>

      
      <mesh position={[0, 0.25, 2.1]} rotation={[0.18, 0, 0]} material={bodyMat}>
        <boxGeometry args={[2.0, 0.22, 0.9]}/>
      </mesh>
      <mesh position={[0, 0.42, 1.3]} rotation={[-0.12, 0, 0]} material={bodyMat}>
        <boxGeometry args={[1.95, 0.18, 1.2]}/>
      </mesh>

      
      
      <mesh position={[0, 0.82, 0.75]} rotation={[-0.55, 0, 0]} material={darkMat}>
        <boxGeometry args={[1.82, 0.06, 0.85]}/>
      </mesh>
      
      <mesh position={[0, 0.82, 0.72]} rotation={[-0.55, 0, 0]} material={glassMat}>
        <boxGeometry args={[1.68, 0.04, 0.72]}/>
      </mesh>

      
      <mesh position={[0, 1.05, -0.1]} material={bodyMat}>
        <boxGeometry args={[1.78, 0.1, 1.55]}/>
      </mesh>

      
      <mesh position={[0.9, 0.78, 0.55]} rotation={[-0.55, 0, 0.08]} material={bodyMat}>
        <boxGeometry args={[0.12, 0.06, 0.75]}/>
      </mesh>
      <mesh position={[-0.9, 0.78, 0.55]} rotation={[-0.55, 0, -0.08]} material={bodyMat}>
        <boxGeometry args={[0.12, 0.06, 0.75]}/>
      </mesh>

      
      <mesh position={[0, 0.9, -0.92]} rotation={[0.52, 0, 0]} material={glassMat}>
        <boxGeometry args={[1.65, 0.04, 0.65]}/>
      </mesh>
      <mesh position={[0, 0.9, -0.92]} rotation={[0.52, 0, 0]} material={darkMat}>
        <boxGeometry args={[1.8, 0.06, 0.7]}/>
      </mesh>

      
      <mesh position={[0.92, 0.85, 0.0]} material={glassMat}>
        <boxGeometry args={[0.04, 0.35, 1.3]}/>
      </mesh>
      <mesh position={[-0.92, 0.85, 0.0]} material={glassMat}>
        <boxGeometry args={[0.04, 0.35, 1.3]}/>
      </mesh>

      
      <mesh position={[0, 0.62, -1.55]} rotation={[0.32, 0, 0]} material={bodyMat}>
        <boxGeometry args={[1.95, 0.18, 1.1]}/>
      </mesh>

      
      <mesh position={[0, 0.32, -2.1]} material={bodyMat}>
        <boxGeometry args={[2.1, 0.3, 0.85]}/>
      </mesh>

      
      <mesh position={[0.55, 1.2, -2.0]} material={spoilerMat}>
        <boxGeometry args={[0.08, 0.35, 0.12]}/>
      </mesh>
      <mesh position={[-0.55, 1.2, -2.0]} material={spoilerMat}>
        <boxGeometry args={[0.08, 0.35, 0.12]}/>
      </mesh>
      <mesh position={[0, 1.42, -2.02]} rotation={[-0.08, 0, 0]} material={spoilerMat}>
        <boxGeometry args={[1.55, 0.07, 0.38]}/>
      </mesh>

      
      <mesh position={[0, 0.16, -2.5]} rotation={[0.2, 0, 0]} material={diffuserMat}>
        <boxGeometry args={[1.8, 0.12, 0.35]}/>
      </mesh>

      
      <mesh position={[0, 0.15, 2.45]} rotation={[-0.15, 0, 0]} material={darkMat}>
        <boxGeometry args={[2.05, 0.1, 0.35]}/>
      </mesh>
      <mesh position={[0, 0.1, 2.58]} material={darkMat}>
        <boxGeometry args={[1.85, 0.06, 0.1]}/>
      </mesh>

      
      <mesh position={[0.72, 0.32, 2.42]} material={headlightMat}>
        <boxGeometry args={[0.5, 0.1, 0.06]}/>
      </mesh>
      <mesh position={[-0.72, 0.32, 2.42]} material={headlightMat}>
        <boxGeometry args={[0.5, 0.1, 0.06]}/>
      </mesh>
      <mesh position={[0.72, 0.25, 2.42]} material={headlightMat}>
        <boxGeometry args={[0.6, 0.04, 0.06]}/>
      </mesh>
      <mesh position={[-0.72, 0.25, 2.42]} material={headlightMat}>
        <boxGeometry args={[0.6, 0.04, 0.06]}/>
      </mesh>
      <pointLight position={[0.7, 0.3, 2.7]} intensity={4} distance={12} color="#fffbeb" decay={2}/>
      <pointLight position={[-0.7, 0.3, 2.7]} intensity={4} distance={12} color="#fffbeb" decay={2}/>

      
      <mesh position={[0, 0.35, -2.45]} material={taillightMat}>
        <boxGeometry args={[1.9, 0.1, 0.05]}/>
      </mesh>
      <mesh position={[0.9, 0.38, -2.44]} material={taillightMat}>
        <boxGeometry args={[0.2, 0.18, 0.06]}/>
      </mesh>
      <mesh position={[-0.9, 0.38, -2.44]} material={taillightMat}>
        <boxGeometry args={[0.2, 0.18, 0.06]}/>
      </mesh>

      
      
      <group ref={wheelFRef} position={[0, 0.36, 1.55]}>
        
        <group position={[1.18, 0, 0]}>
          <mesh rotation={wheelRot} geometry={tireGeo} material={tireMat}/>
          <mesh rotation={wheelRot} geometry={rimGeo} material={rimMat}/>
          <mesh rotation={wheelRot} geometry={rimCenterGeo} material={rimAccentMat}/>
        </group>
        
        <group position={[-1.18, 0, 0]}>
          <mesh rotation={wheelRot} geometry={tireGeo} material={tireMat}/>
          <mesh rotation={wheelRot} geometry={rimGeo} material={rimMat}/>
          <mesh rotation={wheelRot} geometry={rimCenterGeo} material={rimAccentMat}/>
        </group>
      </group>

      
      <group ref={wheelBRef} position={[0, 0.36, -1.55]}>
        
        <group position={[1.18, 0, 0]}>
          <mesh rotation={wheelRot} geometry={tireGeo} material={tireMat}/>
          <mesh rotation={wheelRot} geometry={rimGeo} material={rimMat}/>
          <mesh rotation={wheelRot} geometry={rimCenterGeo} material={rimAccentMat}/>
        </group>
        
        <group position={[-1.18, 0, 0]}>
          <mesh rotation={wheelRot} geometry={tireGeo} material={tireMat}/>
          <mesh rotation={wheelRot} geometry={rimGeo} material={rimMat}/>
          <mesh rotation={wheelRot} geometry={rimCenterGeo} material={rimAccentMat}/>
        </group>
      </group>

      
      <pointLight position={[0, -0.05, 0]} intensity={2} distance={6} color="#ef4444" decay={2}/>
    </group>);
}
