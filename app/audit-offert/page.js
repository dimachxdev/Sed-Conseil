import Image from 'next/image';
import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import { SITE, IMAGES } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Audit Google Ads et Social Ads offert | SEAD CONSEIL',
  description: 'Faites auditer gratuitement vos campagnes par un expert : 30 minutes, 3 pistes d’amélioration concrètes, réponse sous 24 h ouvrées.',
  path: '/audit-offert',
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Audit offert', href: '/audit-offert' }]} title="Votre audit offert, par un expert en chair et en os"
        intro="Dites-nous en quelques mots où vous en êtes. Baba Touré lit chaque demande personnellement et vous répond sous 24 h ouvrées." />
      <section className="container-sead grid gap-12 py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-navy">Votre demande</h2>
            <LeadForm source="audit" />
          </div>
        </div>
        <aside className="space-y-8 lg:col-span-5">
          <div className="flex items-center gap-4 rounded-3xl bg-brand-50 p-6">
            <Image src={IMAGES.portrait.src} width={96} height={96} alt="" className="h-20 w-20 rounded-full object-cover object-top" />
            <p className="text-navy"><strong>C’est moi qui lirai votre demande.</strong><br /><span className="text-slate-600">{SITE.founder.name}, fondateur</span></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy">Ce que vous recevez</h2>
            <ul className="mt-4 space-y-3">
              {['Un échange de 30 minutes en visio.', 'Une lecture de vos comptes (accès en lecture seule).', '3 pistes d’amélioration concrètes et priorisées, que vous pouvez appliquer seul.'].map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true" className="font-bold text-brand-600">✓</span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="font-semibold text-navy">Vous préférez écrire directement ?</p>
            <p className="mt-1"><a href={`mailto:${SITE.email}?subject=Demande%20d%E2%80%99audit`} className="font-medium text-brand-700 underline">{SITE.email}</a></p>
            {SITE.bookingUrl && (
              <p className="mt-4"><a href={SITE.bookingUrl} className="inline-flex rounded-xl border border-navy px-5 py-3 font-semibold text-navy hover:bg-navy hover:text-white" rel="noopener noreferrer">Choisir un créneau directement</a></p>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
