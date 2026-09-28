import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { ARTICLES } from '@/content/articles';
import { CASES } from '@/content/cases';
import { SERVICE_LIST } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Plan du site | SEAD CONSEIL', description: 'Toutes les pages du site SEAD CONSEIL.', path: '/plan-du-site' });

export default function Page() {
  const groups = [
    ['Pages principales', [['Accueil', '/'], ['Expertises', '/expertises'], ['Méthode', '/methode'], ['Cas clients', '/cas-clients'], ['Qui sommes-nous', '/qui-sommes-nous'], ['Blog', '/blog'], ['Audit offert', '/audit-offert'], ['Contact', '/contact']]],
    ['Expertises', SERVICE_LIST.map((s) => [s.short, s.path])],
    ['Cas clients', CASES.map((c) => [c.title, c.href || `/cas-clients/${c.slug}`])],
    ['Articles', ARTICLES.map((a) => [a.title, `/blog/${a.slug}`])],
    ['Informations', [['Mentions légales', '/mentions-legales'], ['Politique de confidentialité', '/confidentialite'], ['Gestion des cookies', '/cookies']]],
  ];
  return (
    <>
      <PageHero crumbs={[{ label: 'Plan du site', href: '/plan-du-site' }]} title="Plan du site" />
      <section className="container-sead grid gap-10 py-12 md:grid-cols-2">
        {groups.map(([t, links]) => (
          <div key={t}>
            <h2 className="text-xl font-bold text-navy">{t}</h2>
            <ul className="mt-3 space-y-2">{links.map(([l, h]) => <li key={h}><Link href={h} className="text-brand-700 hover:underline">{l}</Link></li>)}</ul>
          </div>
        ))}
      </section>
    </>
  );
}
