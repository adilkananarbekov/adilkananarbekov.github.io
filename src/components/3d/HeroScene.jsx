import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function SignalTorus() {
    const ref = useRef(null);
    const geometry = useMemo(() => new THREE.SphereGeometry(0.8, 48, 48), []);
    const wireframe = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);
    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta * 0.25;
        ref.current.rotation.y += delta * 0.35;
    });
    return (
        <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.8}>
            <group ref={ref} position={[0, 0.2, 0]}>
                <mesh geometry={geometry}>
                    <meshStandardMaterial
                        color="#0a0d12"
                        emissive="#1f3c2f"
                        emissiveIntensity={0.12}
                        roughness={0.48}
                        metalness={0.25}
                    />
                </mesh>
                <lineSegments geometry={wireframe}>
                    <lineBasicMaterial color="#f5f7ff" transparent opacity={0.3} />
                </lineSegments>
            </group>
        </Float>
    );
}

function DataOrb({ position, size }) {
    const ref = useRef(null);
    const geometry = useMemo(() => new THREE.SphereGeometry(size, 18, 18), [size]);
    const wireframe = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);
    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y += delta * 0.4;
    });
    return (
        <Float speed={2.1} rotationIntensity={1.4} floatIntensity={2.2}>
            <group ref={ref} position={position}>
                <mesh geometry={geometry}>
                    <meshStandardMaterial
                        color="#07090d"
                        emissive="#11151a"
                        emissiveIntensity={0.1}
                        roughness={0.65}
                        metalness={0.2}
                    />
                </mesh>
                <lineSegments geometry={wireframe}>
                    <lineBasicMaterial color="#f5f7ff" transparent opacity={0.75} />
                </lineSegments>
            </group>
        </Float>
    );
}

function Prism({ position }) {
    const ref = useRef(null);
    const geometry = useMemo(() => new THREE.BoxGeometry(0.85, 0.85, 0.85), []);
    const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta * 0.2;
        ref.current.rotation.z += delta * 0.3;
    });
    return (
        <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.6}>
            <group ref={ref} position={position}>
                <mesh geometry={geometry}>
                    <meshStandardMaterial
                        color="#12161c"
                        emissive="#141b22"
                        emissiveIntensity={0.08}
                        roughness={0.6}
                        metalness={0.25}
                    />
                </mesh>
                <lineSegments geometry={edges}>
                    <lineBasicMaterial color="#f5f7ff" transparent opacity={0.8} />
                </lineSegments>
            </group>
        </Float>
    );
}

function PulseRing() {
    const ref = useRef(null);
    useFrame((state) => {
        if (!ref.current) return;
        const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
        ref.current.scale.set(scale, scale, scale);
    });
    return (
        <mesh ref={ref} position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.3, 1.7, 64]} />
            <meshBasicMaterial color="#6bf7ff" transparent opacity={0.18} />
        </mesh>
    );
}

export default function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0.4, 5.5], fov: 50 }}
            dpr={[1, 1.6]}
            eventSource={document.body}
            style={{ touchAction: "pan-y" }}
        >
            <color attach="background" args={["#050608"]} />
            <ambientLight intensity={0.35} />
            <pointLight position={[3, 2, 3]} intensity={0.85} color="#36f5ff" />
            <pointLight position={[-3, -2, 2]} intensity={0.6} color="#7bff9e" />
            <spotLight position={[0, 4, 2]} intensity={0.55} angle={0.4} penumbra={0.4} />
            <Sparkles count={42} speed={0.3} scale={[6, 4, 6]} size={2} color="#36f5ff" />
            <SignalTorus />
            <DataOrb position={[-1.8, 0.6, -0.4]} size={0.35} />
            <DataOrb position={[1.6, -0.3, 0.2]} size={0.3} />
            <Prism position={[0.8, 1.2, -0.6]} />
            <PulseRing />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.6}
                touches={{
                    ONE: THREE.TOUCH.PAN,
                    TWO: THREE.TOUCH.ROTATE,
                }}
            />
        </Canvas>
    );
}
