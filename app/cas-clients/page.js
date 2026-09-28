import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBlock from '@/components/CtaBlock';
import { CASES } from '@/content/cases';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Cas clients Google Ads et Social Ads | SEAD CONSEIL',
  description: 'Google Ads multi-pays, Performance Max, SEO croisé, TikTok Ads : ce que nous avons fait pour nos clients, et ce que ça a donné.',
  path: '/cas-clients',
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Cas clients', href: '/cas-clients' }]} title="Cas clients : ce que nous avons fait, et ce que ça a donné"
        intro="Des résultats présentés avec l’accord de nos clients, qui restent anonymes. Quand un résultat n’est pas encore mesurable, nous décrivons la mission plutôt que d’inventer un chiffre." />
      <section className="container-sead py-14">
        <div className="grid gap-8 md:grid-cols-2">
          {CASES.map((c) => (
            <article key={c.slug} className="card relative flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{c.client}</p>
              <h2 className="mt-2 text-2xl font-bold text-navy">
                <Link href={c.href || `/cas-clients/${c.slug}`} className="after:absolute after:inset-0">{c.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-slate-500">{c.sector}</p>
              <p className="mt-4 flex-1">{c.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{c.levers.map((l) => <li key={l} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{l}</li>)}</ul>
              <p aria-hidden="true" className="mt-5 font-semibold text-brand-700">Lire le cas →</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBlock title="Et si votre entreprise était le prochain cas client ?" />
    </>
  );
}
