import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Section ids must match scroll-spy `activeSection` (hero = "top").
 * Replace placeholder meshes with <primitive object={useGLTF(url).scene} /> when you have assets.
 */
const STORY_SCENE_KEYS = ["top", "motion", "experience", "about", "services", "ops", "contact"];

const COL = {
  a: "#5a9dff",
  b: "#11a36b",
  c: "#ff7a59",
  d: "#e8eef8",
  wire: "#7aa8ff"
};

function storyMat(color, emissive, emissiveIntensity = 0.25, metalness = 0.35, roughness = 0.42) {
  const m = new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity,
    metalness,
    roughness,
    transparent: true,
    opacity: 0,
    depthWrite: true
  });
  m.userData.storyMat = true;
  m.userData.baseOpacity = 0.88;
  return m;
}

function SceneTop({ reduceMotion }) {
  const geo = useMemo(() => new THREE.OctahedronGeometry(1.05, 0), []);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.85, 0.03, 12, 96), []);
  const mat = useMemo(() => storyMat(COL.a, COL.a, 0.32), []);
  const ringMat = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      color: COL.wire,
      transparent: true,
      opacity: 0,
      wireframe: false
    });
    m.userData.storyMat = true;
    m.userData.baseOpacity = 0.45;
    return m;
  }, []);

  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!ref.current || reduceMotion) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x += delta * 0.08;
  });

  return (
    <group>
      <mesh ref={ref} geometry={geo} material={mat} />
      <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI / 2.3, 0.4, 0.2]} scale={0.82} />
      {!reduceMotion ? <Sparkles count={32} scale={5} size={2} speed={0.12} color={COL.d} /> : null}
    </group>
  );
}

function SceneMotion({ reduceMotion }) {
  const n = 8;
  const boxes = useMemo(() => {
    return Array.from({ length: n }, (_, i) => {
      const t = (i / (n - 1)) * Math.PI * 1.1;
      return {
        position: [Math.cos(t) * 2.1, Math.sin(t * 1.4) * 0.65, Math.sin(t) * 0.9],
        s: 0.28 + (i % 3) * 0.06
      };
    });
  }, [n]);

  const group = useRef(null);
  useFrame((_, delta) => {
    if (!group.current || reduceMotion) return;
    group.current.rotation.y += delta * 0.18;
  });

  const mat = useMemo(() => storyMat(COL.b, COL.b, 0.28), []);

  return (
    <group ref={group}>
      {boxes.map((b, i) => (
        <Float key={i} speed={1.4 + i * 0.08} rotationIntensity={0.4} floatIntensity={0.85}>
          <mesh position={b.position} scale={b.s} material={mat}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function StoryLineSeg({ a, b }) {
  const geom = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(a[0], a[1], a[2]),
        new THREE.Vector3(b[0], b[1], b[2])
      ]),
    [a, b]
  );
  const mat = useMemo(() => {
    const m = new THREE.LineBasicMaterial({
      color: COL.wire,
      transparent: true,
      opacity: 0
    });
    m.userData.storyMat = true;
    m.userData.baseOpacity = 0.52;
    return m;
  }, []);

  return <lineSegments geometry={geom} material={mat} />;
}

function SceneExperience() {
  const nodes = useMemo(
    () => [
      [0, 0.6, 0],
      [-1.4, -0.2, 0.4],
      [1.2, -0.5, -0.3],
      [0.2, -1.1, 0.8],
      [-0.6, 0.9, -0.6]
    ],
    []
  );
  const pairs = useMemo(
    () => [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 4]
    ],
    []
  );

  const mat = useMemo(() => storyMat(COL.a, COL.c, 0.22, 0.45, 0.38), []);

  const group = useRef(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p} material={mat}>
          <sphereGeometry args={[0.32, 24, 24]} />
        </mesh>
      ))}
      {pairs.map(([i, j], k) => (
        <StoryLineSeg key={k} a={nodes[i]} b={nodes[j]} />
      ))}
    </group>
  );
}

function SceneAbout() {
  const mat = useMemo(() => storyMat(COL.c, COL.c, 0.26), []);
  const frame = useMemo(() => storyMat(COL.d, COL.a, 0.12, 0.6, 0.35), []);
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.14;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <group>
      <mesh ref={ref} material={mat}>
        <torusKnotGeometry args={[0.85, 0.22, 96, 16]} />
      </mesh>
      <mesh position={[0, 0, -0.6]} scale={[2.4, 2.4, 0.12]} material={frame}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </group>
  );
}

function SceneServices({ reduceMotion }) {
  const mat = useMemo(() => storyMat(COL.a, COL.b, 0.18), []);
  const ref = useRef(null);
  const meshes = useMemo(() => {
    const g = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        g.push({ x: x * 0.72, y: y * 0.72, k: x + y + 3 });
      }
    }
    return g;
  }, []);

  useFrame((state) => {
    if (!ref.current || reduceMotion) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((ch, i) => {
      const o = meshes[i];
      if (!ch || !o) return;
      ch.position.z = Math.sin(t * 0.9 + o.k) * 0.14;
    });
  });

  return (
    <group ref={ref}>
      {meshes.map((m, i) => (
        <mesh key={i} position={[m.x, m.y, 0]} material={mat} scale={0.38}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
    </group>
  );
}

function SceneOps() {
  const mat = useMemo(() => storyMat(COL.b, COL.a, 0.24), []);
  const positions = useMemo(
    () => [
      [0, 1.1, 0],
      [0, 0.35, 0],
      [0, -0.4, 0],
      [0, -1.15, 0]
    ],
    []
  );

  const group = useRef(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
    group.current.rotation.z += delta * 0.03;
  });

  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={p} material={mat} scale={[0.95, 0.22, 0.95]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 28]} />
        </mesh>
      ))}
      {positions.slice(0, -1).map((p, i) => (
        <StoryLineSeg key={`l-${i}`} a={p} b={positions[i + 1]} />
      ))}
    </group>
  );
}

function SceneContact() {
  const mat = useMemo(() => storyMat(COL.a, COL.b, 0.3), []);
  const flap = useMemo(() => storyMat(COL.d, COL.c, 0.15), []);
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, -0.15, 0]} material={mat} scale={[2.1, 0.08, 1.35]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <mesh position={[0, 0.35, -0.62]} rotation={[0.85, 0, 0]} material={flap} scale={[2.05, 0.06, 1.32]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <mesh position={[0, 0.05, 0.02]} material={mat} scale={[1.85, 0.55, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </group>
  );
}

function StoryWorld({ activeSection, reduceMotion }) {
  const groupRefs = useRef([]);
  const weights = useRef(STORY_SCENE_KEYS.map(() => 0));
  const rootRef = useRef(null);

  const targetIndex = useMemo(() => {
    const key = activeSection && STORY_SCENE_KEYS.includes(activeSection) ? activeSection : "top";
    return STORY_SCENE_KEYS.indexOf(key);
  }, [activeSection]);

  useFrame((state, delta) => {
    const sp = parseFloat(
      document.documentElement.style.getPropertyValue("--scroll-progress")?.trim() || "0"
    );
    const scroll = Number.isFinite(sp) ? sp : 0;

    if (rootRef.current) {
      rootRef.current.rotation.y = scroll * Math.PI * 1.35;
      rootRef.current.position.y = Math.sin(scroll * Math.PI * 2) * 0.15;
    }

    const speed = reduceMotion ? 6.5 : 2.8;
    for (let i = 0; i < STORY_SCENE_KEYS.length; i++) {
      const target = i === targetIndex ? 1 : 0;
      weights.current[i] = THREE.MathUtils.lerp(weights.current[i], target, 1 - Math.exp(-delta * speed));
    }

    groupRefs.current.forEach((g, i) => {
      const w = weights.current[i];
      if (!g) return;
      g.visible = w > 0.02;
      const opFactor = Math.pow(Math.max(w, 0), 1.05);
      g.scale.setScalar(0.78 + 0.22 * opFactor);
      g.traverse((obj) => {
        if (!obj.isMesh) return;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          if (m?.userData?.storyMat) {
            m.opacity = opFactor * (m.userData.baseOpacity ?? 0.9);
            m.transparent = true;
          }
        });
      });
    });

  });

  const setRef = (index) => (node) => {
    groupRefs.current[index] = node;
  };

  return (
    <group ref={rootRef}>
      <group ref={setRef(0)}>
        <SceneTop reduceMotion={reduceMotion} />
      </group>
      <group ref={setRef(1)}>
        <SceneMotion reduceMotion={reduceMotion} />
      </group>
      <group ref={setRef(2)}>
        <SceneExperience />
      </group>
      <group ref={setRef(3)}>
        <SceneAbout />
      </group>
      <group ref={setRef(4)}>
        <SceneServices reduceMotion={reduceMotion} />
      </group>
      <group ref={setRef(5)}>
        <SceneOps />
      </group>
      <group ref={setRef(6)}>
        <SceneContact />
      </group>
    </group>
  );
}

function StoryCanvas({ activeSection, reduceMotion, isTouchDevice }) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 9.2], fov: 38 }}
      dpr={isTouchDevice ? [1, 1.2] : [1, 1.45]}
      gl={{
        alpha: true,
        antialias: !isTouchDevice,
        powerPreference: isTouchDevice ? "low-power" : "high-performance"
      }}
      frameloop={reduceMotion ? "always" : "always"}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 6, 5]} intensity={0.85} color="#cfe0ff" />
      <directionalLight position={[-5, -2, -3]} intensity={0.35} color={COL.b} />
      <pointLight position={[0, 2, 4]} intensity={0.55} color={COL.a} />
      <StoryWorld activeSection={activeSection} reduceMotion={reduceMotion} />
    </Canvas>
  );
}

export default function StoryScrollStage({ activeSection, reduceMotion, isTouchDevice, visible }) {
  if (!visible) return null;

  return (
    <div className="story-scroll-stage" aria-hidden="true" data-story-stage="">
      <StoryCanvas activeSection={activeSection} reduceMotion={reduceMotion} isTouchDevice={isTouchDevice} />
    </div>
  );
}
