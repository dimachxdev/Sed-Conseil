import './globals.css';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentBanner from '@/components/ConsentBanner';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/content/site';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'SEAD CONSEIL — Consultant Google Ads & Social Ads', template: '%s | SEAD CONSEIL' },
  description: SITE.description,
  icons: { icon: '/favicon.svg' },
  authors: [{ name: SITE.founder.name }],
};

export const viewport = { themeColor: '#0f172a', width: 'device-width', initialScale: 1 };

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organisation`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/favicon.svg`,
  image: `${SITE.url}/og-image.jpg`,
  email: SITE.email,
  description: SITE.description,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, postalCode: SITE.address.postalCode, addressLocality: SITE.address.city, addressCountry: SITE.address.country },
  areaServed: ['FR', 'IE', 'SN', 'ES', 'IT', 'BE', 'NL'],
  founder: { '@type': 'Person', name: SITE.founder.name },
  knowsAbout: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Copywriting', 'Direction créative publicitaire'],
  ...(SITE.linkedin ? { sameAs: [SITE.linkedin] } : {}),
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">
          Aller au contenu
        </a>
        <Analytics />
        <JsonLd data={orgLd} />
        <TopBar />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
