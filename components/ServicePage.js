import Image from 'next/image';
import Link from 'next/link';
import PageHero from './PageHero';
import Blocks from './Blocks';
import CtaBlock from './CtaBlock';
import JsonLd from './JsonLd';
import { faqJsonLd } from './Faq';
import { SITE } from '@/content/site';
import { SERVICE_LIST } from '@/content/services';

export default function ServicePage({ s, crumbs }) {
  const faq = s.blocks.find((b) => b.t === 'faq');
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Service', name: s.short, description: s.description,
        serviceType: s.short, url: SITE.url + s.path, areaServed: 'FR',
        provider: { '@id': `${SITE.url}/#organisation` },
      }} />
      {faq && <JsonLd data={faqJsonLd(faq.items)} />}
      <PageHero crumbs={crumbs} eyebrow="Expertise" title={s.h1} intro={s.intro}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/audit-offert" className="btn-primary">Réserver mon audit offert</Link>
          <Link href="/cas-clients" className="btn-secondary">Voir nos cas clients</Link>
        </div>
      </PageHero>
      <div className="container-sead grid gap-12 py-12 lg:grid-cols-12">
        <div className="lg:col-span-8"><Blocks blocks={s.blocks} /></div>
        <aside className="space-y-6 lg:col-span-4">
          {s.image && (
            <figure className="hidden lg:block">
              <Image src={s.image.src} width={s.image.w} height={s.image.h} alt={s.image.alt} sizes="360px" className="rounded-3xl object-cover shadow-lg" />
              {s.image.ai && <figcaption className="mt-2 text-sm text-slate-500">Illustration réalisée avec l’IA</figcaption>}
            </figure>
          )}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-28">
            <p className="font-semibold text-navy">Nos autres expertises</p>
            <ul className="mt-3 space-y-2">
              {SERVICE_LIST.filter((x) => x.path !== s.path).map((x) => (
                <li key={x.path}><Link href={x.path} className="text-brand-700 hover:underline">{x.short}</Link></li>
              ))}
            </ul>
            <Link href="/audit-offert" className="mt-6 block rounded-xl bg-brand-600 px-5 py-3 text-center font-semibold text-white hover:bg-brand-700">Audit offert</Link>
          </div>
        </aside>
      </div>
      <CtaBlock />
    </>
  );
}
