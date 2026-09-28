import { SITE } from '@/content/site';
import { ARTICLES } from '@/content/articles';
import { CASES } from '@/content/cases';
import { SERVICE_LIST } from '@/content/services';

export default function sitemap() {
  const now = new Date();
  const page = (path, priority = 0.7, lastModified = now) => ({ url: SITE.url + path, lastModified, changeFrequency: 'monthly', priority });
  return [
    page('', 1), page('/expertises', 0.9), ...SERVICE_LIST.map((s) => page(s.path, 0.9)),
    page('/methode'), page('/cas-clients', 0.8), ...CASES.filter((c) => c.blocks).map((c) => page(`/cas-clients/${c.slug}`, 0.7)),
    page('/qui-sommes-nous'), page('/audit-offert', 0.9), page('/contact', 0.6), page('/blog', 0.8),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.6, new Date(a.updated || a.date))),
    page('/mentions-legales', 0.2), page('/confidentialite', 0.2), page('/cookies', 0.2), page('/plan-du-site', 0.3),
  ];
}
