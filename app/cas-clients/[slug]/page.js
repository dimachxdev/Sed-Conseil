import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Blocks from '@/components/Blocks';
import CtaBlock from '@/components/CtaBlock';
import JsonLd from '@/components/JsonLd';
import { CASES, getCase } from '@/content/cases';
import { SITE } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return CASES.filter((c) => c.blocks).map((c) => ({ slug: c.slug })); }
export function generateMetadata({ params }) {
  const c = getCase(params.slug);
  return c ? buildMetadata({ title: c.metaTitle, description: c.description, path: `/cas-clients/${c.slug}`, type: 'article' }) : {};
}

export default function Page({ params }) {
  const c = getCase(params.slug);
  if (!c) notFound();
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: c.title, description: c.description, author: { '@type': 'Person', name: SITE.founder.name }, publisher: { '@id': `${SITE.url}/#organisation` }, mainEntityOfPage: `${SITE.url}/cas-clients/${c.slug}`, inLanguage: 'fr-FR' }} />
      <PageHero crumbs={[{ label: 'Cas clients', href: '/cas-clients' }, { label: c.client, href: `/cas-clients/${c.slug}` }]} eyebrow={`Cas client · ${c.sector}`} title={c.title}>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {c.kpis.map(([v, l]) => (
            <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <dt className="text-sm text-slate-500">{l}</dt><dd className="mt-1 text-2xl font-extrabold text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>
      <div className="container-sead py-12"><Blocks blocks={c.blocks} /></div>
      <CtaBlock title="Vous voulez le même regard sur votre compte ?" />
    </>
  );
}
