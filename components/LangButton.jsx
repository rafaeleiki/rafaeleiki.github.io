export default function LangButton({ label, ariaLabel, lang, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className={`border border-white/20 transition-colors hover:border-accent-2 hover:text-paper ${className}`}
    >
      <span lang={lang}>{label}</span>
    </button>
  );
}
