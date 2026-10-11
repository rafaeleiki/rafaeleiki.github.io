import { Sora, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });

export const metadata = {
  title: 'Rafael Eiki — Engineer · Inventor',
  description: 'Full-stack software engineer and founder building technology for education.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sora.className}>
      <body className="antialiased">
        <style>{`
          :root {
            --font-signal: ${sora.style.fontFamily};
            --font-mono: ${mono.style.fontFamily};
          }
        `}</style>
        {children}

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
