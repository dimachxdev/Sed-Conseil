import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBlock from '@/components/CtaBlock';
import { SERVICE_LIST } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Nos expertises : Google Ads, Social Ads, contenus IA | SEAD CONSEIL',
  description: 'Pilotage Google Ads, Meta et TikTok Ads, copywriting et direction créative assistés par l’IA. En conseil ou en gestion complète.',
  path: '/expertises',
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Expertises', href: '/expertises' }]} title="Nos expertises en acquisition et en contenus"
        intro="Quatre métiers, une même logique : chaque euro investi doit pouvoir se justifier en marge. Choisissez votre levier, ou laissez-nous vous dire lequel activer en premier." />
      <section className="container-sead py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_LIST.map((s) => (
            <article key={s.key} className="card relative">
              <h2 className="text-2xl font-bold text-navy"><Link href={s.path} className="after:absolute after:inset-0">{s.short}</Link></h2>
              <p className="mt-3 text-slate-600">{s.card}</p>
              <p className="mt-2 text-slate-600">{s.intro}</p>
              <p aria-hidden="true" className="mt-4 font-semibold text-brand-700">En savoir plus →</p>
            </article>
          ))}
        </div>
        <h2 className="mt-16 text-3xl font-bold tracking-tight text-navy">Vous gardez la main, ou vous nous la confiez.</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="card"><h3 className="text-xl font-bold text-navy">Accompagnement conseil</h3><p className="mt-2">Vous avez une équipe interne ou un freelance. Nous auditons, nous fixons la stratégie, nous formons et nous faisons un point régulier. Idéal pour monter en compétence sans perdre le contrôle.</p></div>
          <div className="card"><h3 className="text-xl font-bold text-navy">Gestion opérationnelle</h3><p className="mt-2">Nous prenons en charge vos campagnes au quotidien : structure, enchères, flux produits, créas, reporting. Vous recevez un point hebdomadaire clair : ce qui a été fait, ce que ça a donné, ce qu’on fait ensuite.</p></div>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
