export default function AnimatedText({
  as = "span",
  className = "",
  text,
  split = "words"
}) {
  const Tag = as;
  const chunks = split === "chars" ? [...text] : text.split(" ");

  return (
    <Tag className={`animated-text ${className}`.trim()} aria-label={text}>
      {chunks.map((chunk, index) => (
        <span
          key={`${chunk}-${index}`}
          className={`animated-text__chunk ${
            chunk === " " ? "animated-text__chunk--space" : ""
          }`}
          style={{ "--word-index": index }}
          aria-hidden="true"
        >
          <span className="animated-text__inner">
            {chunk === " " ? "\u00A0" : chunk}
            {split === "words" && index < chunks.length - 1 ? "\u00A0" : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
