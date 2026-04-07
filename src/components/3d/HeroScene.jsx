import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const scenePalettes = {
  plain: {
    background: "#14181d",
    accentA: "#9db8ff",
    accentB: "#f1b467",
    accentC: "#f3ede2",
    core: "#1b2530",
    coreEmissive: "#30465d",
    orb: "#131a22",
    orbEmissive: "#244264",
    prism: "#1f1e23",
    prismEmissive: "#62422a"
  },
  light: {
    background: "#f2ede4",
    accentA: "#4f8df3",
    accentB: "#d08b2d",
    accentC: "#5d4b34",
    core: "#f9f4ea",
    coreEmissive: "#b7d6ff",
    orb: "#fffaf0",
    orbEmissive: "#c6e1ff",
    prism: "#f2e4d3",
    prismEmissive: "#efb171"
  }
};

function SceneRig({ reduceMotion, isTouchDevice, children }) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current || reduceMotion) return;

    const time = state.clock.elapsedTime;
    const motionScale = isTouchDevice ? 0.72 : 1;
    ref.current.rotation.y = Math.sin(time * 0.26) * 0.12 * motionScale;
    ref.current.rotation.x = Math.cos(time * 0.18) * 0.04 * motionScale;
    ref.current.position.y = Math.sin(time * 0.42) * 0.1 * motionScale;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      Math.sin(time * 0.22) * 0.18 * motionScale,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      0.35 + Math.cos(time * 0.24) * 0.08 * motionScale,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref}>{children}</group>;
}

function SignalCore({ palette }) {
  const ref = useRef(null);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.92, 1), []);
  const wireframe = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <group ref={ref} position={[0, 0.12, 0]}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color={palette.core}
            emissive={palette.coreEmissive}
            emissiveIntensity={0.32}
            roughness={0.46}
            metalness={0.28}
          />
        </mesh>
        <lineSegments geometry={wireframe}>
          <lineBasicMaterial color={palette.accentB} transparent opacity={0.42} />
        </lineSegments>
      </group>
    </Float>
  );
}

function DataOrb({ palette, position, size }) {
  const ref = useRef(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(size, 18, 18), [size]);
  const wireframe = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.24;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.6}>
      <group ref={ref} position={position}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color={palette.orb}
            emissive={palette.orbEmissive}
            emissiveIntensity={0.18}
            roughness={0.62}
            metalness={0.18}
          />
        </mesh>
        <lineSegments geometry={wireframe}>
          <lineBasicMaterial color={palette.accentA} transparent opacity={0.5} />
        </lineSegments>
      </group>
    </Float>
  );
}

function Prism({ palette, position }) {
  const ref = useRef(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.78, 0.78, 0.78), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.16;
    ref.current.rotation.z += delta * 0.18;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.7} floatIntensity={1.3}>
      <group ref={ref} position={position}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color={palette.prism}
            emissive={palette.prismEmissive}
            emissiveIntensity={0.12}
            roughness={0.58}
            metalness={0.2}
          />
        </mesh>
        <lineSegments geometry={edges}>
          <lineBasicMaterial color={palette.accentC} transparent opacity={0.56} />
        </lineSegments>
      </group>
    </Float>
  );
}

function HaloRing({ color, scale, rotation, speed }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
    ref.current.rotation.x += delta * speed * 0.25;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8 + scale) * 0.04;
    ref.current.scale.setScalar(scale * pulse);
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[1.56, 0.028, 18, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function PulseRing({ color }) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.05;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={ref} position={[0, -1.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.26, 1.72, 72]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </mesh>
  );
}

function Satellite({ position, color }) {
  return (
    <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.8}>
      <mesh position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.34} />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ reduceMotion = false, theme = "plain", isTouchDevice = false }) {
  const palette = scenePalettes[theme] ?? scenePalettes.plain;
  const sparkleCount = reduceMotion ? 10 : isTouchDevice ? 16 : 28;
  const sparkleSpeed = reduceMotion ? 0 : isTouchDevice ? 0.12 : 0.18;

  return (
    <Canvas
      camera={{ position: [0, 0.35, 5.6], fov: 48 }}
      dpr={isTouchDevice ? [0.9, 1.2] : [1, 1.6]}
      eventSource={document.body}
      style={{ touchAction: "pan-y" }}
      frameloop={reduceMotion ? "demand" : "always"}
      gl={{ antialias: !isTouchDevice, powerPreference: isTouchDevice ? "low-power" : "high-performance" }}
    >
      <color attach="background" args={[palette.background]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[3.4, 2.2, 3]} intensity={0.84} color={palette.accentA} />
      <pointLight position={[-3.2, -1.2, 2]} intensity={0.56} color={palette.accentB} />
      <spotLight position={[0, 4, 2]} intensity={0.42} angle={0.42} penumbra={0.5} />

      <SceneRig reduceMotion={reduceMotion} isTouchDevice={isTouchDevice}>
        <Sparkles
          count={sparkleCount}
          speed={sparkleSpeed}
          scale={[6, 4, 6]}
          size={2.4}
          color={palette.accentC}
        />
        <SignalCore palette={palette} />
        <HaloRing color={palette.accentA} scale={1} rotation={[Math.PI / 2, 0, 0]} speed={0.12} />
        <HaloRing
          color={palette.accentB}
          scale={0.88}
          rotation={[Math.PI / 2.4, Math.PI / 4, 0]}
          speed={-0.16}
        />
        <DataOrb palette={palette} position={[-1.95, 0.64, -0.38]} size={0.35} />
        <DataOrb palette={palette} position={[1.62, -0.26, 0.18]} size={0.3} />
        <Prism palette={palette} position={[0.92, 1.04, -0.62]} />
        <PulseRing color={palette.accentA} />
        <Satellite position={[-1.14, -1.22, 0.42]} color={palette.accentA} />
        <Satellite position={[1.32, 1.38, -0.16]} color={palette.accentB} />
      </SceneRig>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!reduceMotion && !isTouchDevice}
        autoRotate={!reduceMotion}
        autoRotateSpeed={isTouchDevice ? 0.14 : 0.22}
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.ROTATE
        }}
      />
    </Canvas>
  );
}
