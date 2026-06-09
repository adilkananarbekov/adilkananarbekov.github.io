export function ScrollStoryRail({ sections, activeId, reduceMotion, visible, ariaLabel }) {
  if (!visible || !sections?.length) return null;

  return (
    <nav className="story-scroll-rail" aria-label={ariaLabel}>
      <ol className="story-scroll-rail-list">
        {sections.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                className={`story-scroll-rail-dot ${isActive ? "is-active" : ""}`}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                title={item.label}
                style={
                  reduceMotion ? undefined : { "--rail-delay": `${Math.min(index, 8) * 40}ms` }
                }
              >
                <span className="visually-hidden">{item.label}</span>
                <span className="story-scroll-rail-hit" />
                <span className="story-scroll-rail-ping" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
