import { SITE } from '@/content/site';

// Métadonnées par page : title, description, canonical, Open Graph.
export function buildMetadata({ title, description, path = '/', noindex = false, type = 'website', image }) {
  const url = SITE.url + (path === '/' ? '' : path);
  const img = image || '/og-image.jpg';
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title, description, url, type, siteName: SITE.name, locale: 'fr_FR',
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

export const abs = (path) => SITE.url + path;
