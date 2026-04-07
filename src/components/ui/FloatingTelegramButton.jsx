import AnimatedText from "./AnimatedText";
import AnimatedIcon from "./AnimatedIcon";

export default function FloatingTelegramButton({ content, href, language }) {
  return (
    <a
      className="floating-telegram"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`${content.telegramFloatTitle} Telegram`}
    >
      <span className="floating-telegram__glow" aria-hidden="true" />
      <span className="floating-telegram__icon-shell" aria-hidden="true">
        <AnimatedIcon className="floating-telegram__motion" name="chat" />
        <span className="floating-telegram__brand icon icon--telegram" />
      </span>
      <span className="floating-telegram__copy">
        <span className="floating-telegram__eyebrow">Telegram</span>
        <AnimatedText
          key={`${language}-telegram`}
          as="span"
          className="floating-telegram__title"
          text={content.telegramFloatTitle}
        />
        <span className="floating-telegram__text">{content.telegramFloatText}</span>
      </span>
    </a>
  );
}
