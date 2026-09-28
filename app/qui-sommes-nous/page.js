import Image from 'next/image';
import PageHero from '@/components/PageHero';
import CtaBlock from '@/components/CtaBlock';
import JsonLd from '@/components/JsonLd';
import { SITE, IMAGES } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Qui sommes-nous : Baba Touré et l’équipe SEAD CONSEIL',
  description: 'SEAD CONSEIL, agence conseil en acquisition fondée par Baba Touré, consultant et formateur Google Ads. Paris, Dublin, Dakar.',
  path: '/qui-sommes-nous',
});

const VALUES = [
  ['Transparence', 'Vous savez ce que nous faisons, pourquoi, et ce que ça rapporte.'],
  ['Pédagogie', 'Nous expliquons nos choix, pour que vous puissiez les challenger.'],
  ['Exigence', 'Nous visons votre rentabilité, pas des indicateurs flatteurs.'],
  ['Réactivité', 'Une question posée le matin a sa réponse dans la journée.'],
];

export default function Page() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Person', name: SITE.founder.name, jobTitle: SITE.founder.role,
        worksFor: { '@id': `${SITE.url}/#organisation` }, image: SITE.url + IMAGES.portrait.src,
        knowsAbout: ['Google Ads', 'Performance Max', 'Meta Ads', 'TikTok Ads'],
        ...(SITE.linkedin ? { sameAs: [SITE.linkedin] } : {}),
      }} />
      <PageHero crumbs={[{ label: 'Qui sommes-nous', href: '/qui-sommes-nous' }]} title="L’humain derrière vos campagnes"
        intro="SEAD CONSEIL est une agence conseil en acquisition fondée par Baba Touré. Notre conviction est simple : l’IA a changé la façon de faire de la publicité, pas la nécessité d’avoir quelqu’un qui comprend votre métier et qui répond de chaque euro dépensé." />
      <section className="container-sead grid items-start gap-12 py-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Image src={IMAGES.qsn.src} width={IMAGES.qsn.w} height={IMAGES.qsn.h} alt={IMAGES.qsn.alt} sizes="(min-width: 1024px) 440px, 90vw" className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-xl" />
        </div>
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-bold tracking-tight text-navy">Baba Touré, fondateur</h2>
          <div className="mt-4 space-y-4 text-lg">
            <p>Baba pilote des comptes Google Ads et Social Ads pour des e-commerçants et des entreprises B2B, en France et à l’international : de la PME qui démarre au compte qui investit plusieurs millions d’euros par an.</p>
            <p>Il est aussi formateur Google Ads : ateliers de création de campagnes Search, masterclasses sur Performance Max, accompagnement d’équipes marketing. Cette double casquette, praticien et pédagogue, se retrouve dans chaque mission : on fait, et on explique ce qu’on fait.</p>
            <p>Il a fondé SEAD CONSEIL avec une idée : utiliser l’IA pour aller plus vite, sans jamais lui déléguer les décisions qui engagent le budget d’un client.</p>
          </div>
          <blockquote className="mt-8 border-l-4 border-brand-600 pl-6 text-xl italic text-navy">
            « L’IA sait très bien exécuter ce qu’on lui demande. Mon métier, c’est de lui demander la bonne chose, et de vérifier qu’elle l’a vraiment fait. »
          </blockquote>
        </div>
      </section>
      <section className="bg-slate-50 py-14">
        <div className="container-sead">
          <h2 className="text-3xl font-bold tracking-tight text-navy">Nos valeurs</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([t, d]) => <li key={t} className="card"><h3 className="text-xl font-bold text-navy">{t}</h3><p className="mt-2">{d}</p></li>)}
          </ul>
        </div>
      </section>
      <section className="container-sead grid items-center gap-12 py-14 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy">Nos implantations</h2>
          <ul className="mt-6 space-y-4">
            {SITE.locations.map((l) => (
              <li key={l.city} className="card"><p className="text-xl font-bold text-navy">{l.city} <span className="text-base font-medium text-brand-700">· {l.label}</span></p><p className="mt-1">{l.detail}</p></li>
            ))}
          </ul>
        </div>
        <figure className="mx-auto max-w-md">
          <Image src={IMAGES.dakar.src} width={IMAGES.dakar.w} height={IMAGES.dakar.h} alt={IMAGES.dakar.alt} sizes="(min-width: 1024px) 440px, 90vw" className="rounded-3xl object-cover shadow-xl" />
          <figcaption className="mt-2 text-center text-sm text-slate-500">Illustration réalisée avec l’IA</figcaption>
        </figure>
      </section>
      <CtaBlock />
    </>
  );
}
