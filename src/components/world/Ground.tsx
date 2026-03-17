import { useMemo } from "react";
import * as THREE from "three";
const groundMat = new THREE.MeshLambertMaterial({ color: "#0a1628" });
const roadMat = new THREE.MeshLambertMaterial({ color: "#111827" });
const dashMat = new THREE.MeshBasicMaterial({ color: "#f59e0b" });
const edgeMat = new THREE.MeshBasicMaterial({ color: "#1e40af" });
export function Ground() {
    return (<group>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={groundMat}>
        <planeGeometry args={[200, 200]}/>
      </mesh>

      
      <gridHelper args={[180, 30, "#0d2137", "#0d2137"]} position={[0, 0.01, 0]}/>

      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={roadMat}>
        <planeGeometry args={[180, 11]}/>
      </mesh>

      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={roadMat}>
        <planeGeometry args={[11, 180]}/>
      </mesh>

      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 5.8]} material={edgeMat}>
        <planeGeometry args={[180, 0.25]}/>
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -5.8]} material={edgeMat}>
        <planeGeometry args={[180, 0.25]}/>
      </mesh>

      
      <DashLines />

      
      <ZoneCircles />
    </group>);
}
function DashLines() {
    const count = 16;
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const ref = useMemo(() => {
        const mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(5, 0.4), dashMat, count);
        const d = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
            d.position.set(-78 + i * 10.4, 0.03, 0);
            d.rotation.x = -Math.PI / 2;
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        return mesh;
    }, []);
    return <primitive object={ref}/>;
}
const zoneCircleData = [
    { pos: [-50, 0, -40] as [
            number,
            number,
            number
        ], color: "#1d4ed8" },
    { pos: [50, 0, -40] as [
            number,
            number,
            number
        ], color: "#7c3aed" },
    { pos: [-50, 0, 40] as [
            number,
            number,
            number
        ], color: "#0891b2" },
    { pos: [50, 0, 40] as [
            number,
            number,
            number
        ], color: "#059669" },
];
function ZoneCircles() {
    return (<>
      {zoneCircleData.map((z, i) => {
            const mat = new THREE.MeshBasicMaterial({
                color: z.color,
                transparent: true,
                opacity: 0.25,
                side: THREE.DoubleSide,
            });
            const ringMat = new THREE.MeshBasicMaterial({ color: z.color });
            return (<group key={i} position={z.pos}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} material={mat}>
              <circleGeometry args={[15, 24]}/>
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]} material={ringMat}>
              <ringGeometry args={[14.6, 15.4, 40]}/>
            </mesh>
          </group>);
        })}
    </>);
}
