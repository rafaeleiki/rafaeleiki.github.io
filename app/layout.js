import { Suspense } from 'react';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import Navbar from '../components/navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rafael Eiki',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Suspense>
          <Navbar />
          {children}
        </Suspense>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z9LJLZLN67"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z9LJLZLN67', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
