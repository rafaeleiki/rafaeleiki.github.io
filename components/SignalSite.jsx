'use client';

import { useState } from 'react';
import ContactSection from './ContactSection';
import DemoDialog from './DemoDialog';
import Hero from './Hero';
import MentorshipSection from './MentorshipSection';
import ProjectsSection from './ProjectsSection';
import RecognitionSection from './RecognitionSection';
import ResearchSection from './ResearchSection';
import SiteBackground from './SiteBackground';
import SiteHeader from './SiteHeader';
import WorkSection from './WorkSection';
import useDocumentMeta from './hooks/useDocumentMeta';
import useLang from './hooks/useLang';
import { DATA } from './site-data';

export default function SignalSite() {
  const { lang, toggleLang } = useLang();
  const [activeDemo, setActiveDemo] = useState(null);
  const t = DATA[lang];

  useDocumentMeta(t.meta);

  return (
    <div data-site className="relative min-h-screen overflow-hidden bg-ink text-paper">
      <SiteBackground />

      <a href="#main-content" className="skip-link">
        {t.ui.skip}
      </a>

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <SiteHeader t={t} lang={lang} onToggleLang={toggleLang} />

        <main id="main-content">
          <Hero t={t} />
          <WorkSection t={t} />
          <ProjectsSection t={t} onOpenDemo={setActiveDemo} />
          <ResearchSection t={t} />
          <RecognitionSection t={t} />
          <MentorshipSection t={t} />
        </main>

        <ContactSection t={t} />
      </div>

      <DemoDialog demo={activeDemo} onDismiss={() => setActiveDemo(null)} closeLabel={t.ui.close} />
    </div>
  );
}
