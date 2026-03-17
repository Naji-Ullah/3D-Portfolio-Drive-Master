import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Ground } from "./world/Ground";
import { Buildings } from "./world/Buildings";
import { Car } from "./Car";
import { ZoneObjects } from "./world/ZoneObjects";
import { useCarControls } from "../hooks/useCarControls";
export type Zone = "none" | "about" | "projects" | "skills" | "contact";
const ZONES = [
    { id: "about" as Zone, center: new THREE.Vector3(-50, 0, -40), radius: 15 },
    { id: "projects" as Zone, center: new THREE.Vector3(50, 0, -40), radius: 15 },
    { id: "skills" as Zone, center: new THREE.Vector3(-50, 0, 40), radius: 15 },
    { id: "contact" as Zone, center: new THREE.Vector3(50, 0, 40), radius: 15 },
];
interface GameSceneProps {
    onZoneChange: (zone: Zone) => void;
    onSpeedChange: (speed: number) => void;
    currentZone: Zone;
}
export function GameScene({ onZoneChange, onSpeedChange, currentZone }: GameSceneProps) {
    const { camera } = useThree();
    const { update } = useCarControls();
    const useLowDetailCar = useRef(window.innerWidth < 900 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    const carGroupRef = useRef<THREE.Group>(null);
    const wheelFRef = useRef<THREE.Group>(null);
    const wheelBRef = useRef<THREE.Group>(null);
    const lastZone = useRef<Zone>("none");
    const smoothCamPos = useRef(new THREE.Vector3(0, 8, -16));
    const smoothLookAt = useRef(new THREE.Vector3(0, 1.8, 0));
    const camTargetRef = useRef(new THREE.Vector3());
    const lookTargetRef = useRef(new THREE.Vector3());
    const speedUpdateTimer = useRef(0);
    const physicsAccumulator = useRef(0);
    const lastSpeed = useRef(0);
    const prevPhysicsPos = useRef(new THREE.Vector3(0, 0.35, 0));
    const currPhysicsPos = useRef(new THREE.Vector3(0, 0.35, 0));
    const renderPos = useRef(new THREE.Vector3(0, 0.35, 0));
    const prevPhysicsRot = useRef(0);
    const currPhysicsRot = useRef(0);
    const renderRot = useRef(0);
    const carSpeedRef = useRef(0);
    const carPosRef = useRef(new THREE.Vector3(0, 0.35, 0));
    const carRotRef = useRef(0);
    useFrame((_, delta) => {
        const frameDelta = Math.min(delta, 0.1);
        const fixedStep = 1 / 120;
        physicsAccumulator.current = Math.min(physicsAccumulator.current + frameDelta, 0.25);
        let state = {
            position: currPhysicsPos.current,
            rotation: currPhysicsRot.current,
            speed: lastSpeed.current,
        };
        while (physicsAccumulator.current >= fixedStep) {
            prevPhysicsPos.current.copy(currPhysicsPos.current);
            prevPhysicsRot.current = currPhysicsRot.current;
            state = update(fixedStep);
            currPhysicsPos.current.copy(state.position);
            currPhysicsRot.current = state.rotation;
            physicsAccumulator.current -= fixedStep;
        }
        const alpha = physicsAccumulator.current / fixedStep;
        renderPos.current.copy(prevPhysicsPos.current).lerp(currPhysicsPos.current, alpha);
        const angleDelta = Math.atan2(Math.sin(currPhysicsRot.current - prevPhysicsRot.current), Math.cos(currPhysicsRot.current - prevPhysicsRot.current));
        renderRot.current = prevPhysicsRot.current + angleDelta * alpha;
        carPosRef.current.copy(renderPos.current);
        carRotRef.current = renderRot.current;
        carSpeedRef.current = state.speed;
        lastSpeed.current = state.speed;
        if (carGroupRef.current) {
            carGroupRef.current.position.copy(carPosRef.current);
            carGroupRef.current.rotation.y = carRotRef.current;
        }
        const wheelRadius = 0.36;
        const spin = (carSpeedRef.current / wheelRadius) * frameDelta;
        if (wheelFRef.current)
            wheelFRef.current.rotation.x += spin;
        if (wheelBRef.current)
            wheelBRef.current.rotation.x += spin;
        speedUpdateTimer.current += frameDelta;
        if (speedUpdateTimer.current > 0.15) {
            onSpeedChange(state.speed);
            speedUpdateTimer.current = 0;
        }
        const sinR = Math.sin(renderRot.current);
        const cosR = Math.cos(renderRot.current);
        camTargetRef.current.set(renderPos.current.x - sinR * 16, renderPos.current.y + 8, renderPos.current.z - cosR * 16);
        lookTargetRef.current.set(renderPos.current.x, renderPos.current.y + 1.5, renderPos.current.z);
        const camAlpha = 1 - Math.exp(-6 * frameDelta);
        const lookAlpha = 1 - Math.exp(-8 * frameDelta);
        smoothCamPos.current.lerp(camTargetRef.current, camAlpha);
        smoothLookAt.current.lerp(lookTargetRef.current, lookAlpha);
        camera.position.copy(smoothCamPos.current);
        camera.lookAt(smoothLookAt.current);
        const px = currPhysicsPos.current.x;
        const pz = currPhysicsPos.current.z;
        let detected: Zone = "none";
        for (const zone of ZONES) {
            const dx = px - zone.center.x;
            const dz = pz - zone.center.z;
            if (dx * dx + dz * dz < zone.radius * zone.radius) {
                detected = zone.id;
                break;
            }
        }
        if (detected !== lastZone.current) {
            lastZone.current = detected;
            onZoneChange(detected);
        }
    });
    return (<>
      
      <ambientLight intensity={0.6} color="#1a2a4a"/>
      <directionalLight position={[30, 60, 20]} intensity={0.8} color="#c7d2fe"/>

      
      <pointLight position={[-50, 10, -40]} intensity={4} distance={25} color="#3b82f6" decay={2}/>
      <pointLight position={[50, 10, -40]} intensity={4} distance={25} color="#8b5cf6" decay={2}/>
      <pointLight position={[-50, 10, 40]} intensity={4} distance={25} color="#06b6d4" decay={2}/>
      <pointLight position={[50, 10, 40]} intensity={4} distance={25} color="#10b981" decay={2}/>

      <Ground />
      <Buildings />
      <ZoneObjects />
      <Car groupRef={carGroupRef} wheelFRef={wheelFRef} wheelBRef={wheelBRef} lightweight={useLowDetailCar.current}/>

      <fog attach="fog" args={["#020817", 50, 130]}/>
    </>);
}
