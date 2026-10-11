import { Sora, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Exposed as CSS variables so the palette/typography live in globals.css @theme
// instead of being injected via a <style> element in <body>.
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const SITE_URL = 'https://rafaeleiki.com';
const TITLE = 'Rafael Eiki — Engineer · Inventor';
const DESCRIPTION =
  'Full-stack software engineer and founder building technology for education. Rails, React and Java, with published HCI research and a co-founded startup.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico', apple: '/favicon.ico' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Rafael Eiki',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafael Eiki — engineer, inventor. Portfolio hero.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
  authors: [{ name: 'Rafael Eiki', url: SITE_URL }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050509',
  colorScheme: 'dark',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rafael Eiki',
  url: SITE_URL,
  jobTitle: 'Software Engineer',
  description: DESCRIPTION,
  knowsAbout: ['Software Engineering', 'Human-Computer Interaction', 'EdTech'],
  sameAs: ['https://github.com/rafaeleiki', 'https://www.linkedin.com/in/rafaeleiki/'],
};

export default function RootLayout({ children }) {
  return (
    // lang="en" matches the server-rendered content. When the client switches to
    // Portuguese, SignalSite updates document lang/title/description, so the
    // declared language always matches what is actually on screen (WCAG 3.1.1).
    <html lang="en" className={`${sora.variable} ${mono.variable}`}>
      <body className="antialiased">
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z9LJLZLN67" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z9LJLZLN67', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
