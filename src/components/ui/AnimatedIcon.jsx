import { useId } from "react";
import cellphoneTwotone from "../../assets/animated-icons/cellphone-twotone.svg?raw";
import chatRoundDots from "../../assets/animated-icons/chat-round-dots.svg?raw";
import compassLoop from "../../assets/animated-icons/compass-loop.svg?raw";
import documentCode from "../../assets/animated-icons/document-code.svg?raw";
import emailOpened from "../../assets/animated-icons/email-opened.svg?raw";
import githubLoop from "../../assets/animated-icons/github-loop.svg?raw";
import phoneCallLoop from "../../assets/animated-icons/phone-call-loop.svg?raw";

const iconMarkup = {
  cellphone: cellphoneTwotone,
  chat: chatRoundDots,
  compass: compassLoop,
  document: documentCode,
  email: emailOpened,
  github: githubLoop,
  phone: phoneCallLoop
};

function scopeSvgIds(svg, scope) {
  return svg
    .replace(/\sid="([^"]+)"/g, (_, id) => ` id="${id}-${scope}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${id}-${scope})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${id}-${scope}"`)
    .replace(/xlink:href="#([^"]+)"/g, (_, id) => `xlink:href="#${id}-${scope}"`);
}

export default function AnimatedIcon({
  name,
  className = "",
  decorative = true,
  label
}) {
  const scope = useId().replace(/:/g, "");
  const markup = iconMarkup[name];

  if (!markup) return null;

  return (
    <span
      className={`animated-icon ${className}`.trim()}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : "img"}
      dangerouslySetInnerHTML={{ __html: scopeSvgIds(markup, scope) }}
    />
  );
}
