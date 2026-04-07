const particleItems = Array.from({ length: 14 }, (_, index) => ({
  left: `${6 + (index * 5.2) % 88}%`,
  top: `${8 + (index * 11.7) % 78}%`,
  size: `${3 + (index % 5) * 2}px`,
  duration: `${16 + (index % 7) * 3}s`,
  delay: `${index * -1.3}s`,
  driftX: `${((index % 2 === 0 ? 1 : -1) * (18 + (index % 4) * 8)).toFixed(0)}px`,
  driftY: `${(-90 - (index % 6) * 18).toFixed(0)}px`,
  opacity: (0.08 + (index % 5) * 0.05).toFixed(2),
  scale: (0.84 + (index % 4) * 0.08).toFixed(2)
}));

export default function ParticleField({
  reduceMotion,
  isTouchDevice = false,
  lowPowerMode = false
}) {
  const activeParticles = lowPowerMode
    ? particleItems.slice(0, 4)
    : isTouchDevice
      ? particleItems.slice(0, 9)
      : particleItems;
  const isStatic = reduceMotion || lowPowerMode;

  return (
    <div className={`particle-field ${isStatic ? "is-static" : ""}`} aria-hidden="true">
      {activeParticles.map((item, index) => (
        <span
          key={`${item.left}-${item.top}`}
          className={`particle particle--${index % 3}`}
          style={{
            "--particle-left": item.left,
            "--particle-top": item.top,
            "--particle-size": item.size,
            "--particle-duration": item.duration,
            "--particle-delay": item.delay,
            "--particle-drift-x": item.driftX,
            "--particle-drift-y": item.driftY,
            "--particle-opacity": item.opacity,
            "--particle-scale": item.scale
          }}
        />
      ))}
    </div>
  );
}
