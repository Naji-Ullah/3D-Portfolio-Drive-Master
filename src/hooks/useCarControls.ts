import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mobileKeys } from "./mobileInput";
const ACCEL = 32;
const BRAKE_DECEL = 72;
const TURN_SPEED = 2.0;
const COAST_RETENTION_PER_SECOND = 0.14;
const THROTTLE_RESPONSE = 14;
const MAX_SPEED = 55;
const REVERSE_MAX = 18;
const BOUNDS = 85;
export function useCarControls() {
    const keys = useRef<Record<string, boolean>>({});
    const position = useRef(new THREE.Vector3(0, 0.4, 0));
    const rotation = useRef(0);
    const velocity = useRef(0);
    const throttle = useRef(0);
    const direction = useRef(new THREE.Vector3());
    useEffect(() => {
        const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
        const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        return () => {
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);
    const update = (delta: number) => {
        const k = keys.current;
        const acceleratePressed = k["arrowup"] || k["w"] || mobileKeys.w;
        const brakePressed = k["arrowdown"] || k["s"] || mobileKeys.s;
        const turn = k["arrowleft"] || k["a"] || mobileKeys.a ? 1 : k["arrowright"] || k["d"] || mobileKeys.d ? -1 : 0;
        const forward = acceleratePressed ? 1 : brakePressed && velocity.current <= 0.8 ? -1 : 0;
        const throttleAlpha = 1 - Math.exp(-THROTTLE_RESPONSE * delta);
        throttle.current += (forward - throttle.current) * throttleAlpha;
        if (brakePressed && velocity.current > 0) {
            velocity.current = Math.max(0, velocity.current - BRAKE_DECEL * delta);
        }
        else if (Math.abs(throttle.current) > 0.02) {
            velocity.current += throttle.current * ACCEL * delta;
        }
        else {
            const damping = Math.pow(COAST_RETENTION_PER_SECOND, delta);
            velocity.current *= damping;
            if (Math.abs(velocity.current) < 0.03) {
                velocity.current = 0;
            }
        }
        velocity.current = Math.max(-REVERSE_MAX, Math.min(MAX_SPEED, velocity.current));
        if (Math.abs(velocity.current) > 0.5) {
            const turnFactor = Math.min(Math.abs(velocity.current) / 10, 1.0);
            rotation.current += turn * TURN_SPEED * delta * Math.sign(velocity.current) * turnFactor;
        }
        direction.current.set(Math.sin(rotation.current), 0, Math.cos(rotation.current));
        position.current.addScaledVector(direction.current, velocity.current * delta);
        position.current.x = Math.max(-BOUNDS, Math.min(BOUNDS, position.current.x));
        position.current.z = Math.max(-BOUNDS, Math.min(BOUNDS, position.current.z));
        return { position: position.current, rotation: rotation.current, speed: velocity.current };
    };
    return { update, position, rotation };
}
