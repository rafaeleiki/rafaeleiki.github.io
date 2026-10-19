import LangButton from './LangButton';
import SignalDot from './SignalDot';
import { ACCENT_2 } from '../lib/tokens';

const NAV_KEYS = ['work', 'research', 'recognition', 'contact'];

export default function SiteHeader({ t, lang, onToggleLang }) {
  const targetLang = lang === 'en' ? 'pt' : 'en';
  const langLabel = t.contact.label.lang;
  const langAriaLabel = `${t.ui.switchTo} ${langLabel}`;

  return (
    <header className="flex items-center justify-between py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
      <div className="flex items-center gap-2.5">
        <SignalDot color={ACCENT_2} size="h-2 w-2" />
        {t.ui.identity} <span className="text-muted-dim">{t.ui.status}</span>
      </div>

      <nav className="hidden items-center gap-5 sm:flex">
        {NAV_KEYS.map((key) => (
          <a
            key={key}
            href={`#${key}`}
            className={`${
              key === 'recognition' ? 'hidden lg:inline-flex' : 'inline-flex'
            } min-h-6 items-center transition-colors hover:text-paper`}
          >
            {t.nav[key]}
          </a>
        ))}
        <LangButton
          label={langLabel}
          ariaLabel={langAriaLabel}
          lang={targetLang}
          onToggle={onToggleLang}
          className="px-2.5 py-1"
        />
      </nav>

      <div className="sm:hidden">
        <LangButton
          label={langLabel}
          ariaLabel={langAriaLabel}
          lang={targetLang}
          onToggle={onToggleLang}
          className="px-2.5 py-2"
        />
      </div>
    </header>
  );
}
