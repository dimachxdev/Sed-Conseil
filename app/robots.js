import { SITE } from '@/content/site';

export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/merci'] }], sitemap: `${SITE.url}/sitemap.xml`, host: SITE.url };
}
