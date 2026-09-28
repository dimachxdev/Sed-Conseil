import PageHero from '@/components/PageHero';
import CtaBlock from '@/components/CtaBlock';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Notre méthode : l’IA analyse, l’expert décide | SEAD CONSEIL',
  description: 'Écouter, analyser, décider, piloter : comment nous combinons les outils d’IA et l’expérience humaine pour rentabiliser vos campagnes.',
  path: '/methode',
});

const STEPS = [
  { t: 'Écouter', d: 'Avant de regarder un seul chiffre, nous voulons comprendre votre entreprise : vos marges par produit, vos stocks, votre saisonnalité, ce qui compte vraiment pour vous ce trimestre. Ces informations ne sont dans aucun compte publicitaire, et ce sont elles qui fixent le cap.', ia: 'Aucun.', human: 'Tout.' },
  { t: 'Analyser', d: 'Nous croisons les données de vos plateformes publicitaires, de votre site et de vos ventes. Les outils d’IA nous permettent de passer au crible des milliers de termes de recherche, de produits ou de créas en quelques heures au lieu de plusieurs jours.', ia: 'Trier, calculer, repérer les anomalies.', human: 'Vérifier, interpréter, séparer le signal du bruit.' },
  { t: 'Décider', d: 'Nous vous présentons un plan d’action court et priorisé. Pour chaque action : ce qu’elle coûte, ce qu’elle doit rapporter, comment on saura si elle a marché. Vous validez, nous ajustons.', ia: 'Aucun.', human: 'Arbitrer, avec vous.' },
  { t: 'Piloter', d: 'Mise en œuvre, tests, ajustements. Chaque semaine, un point clair : ce qui a été fait, ce que ça a donné, ce qu’on fait ensuite. Pas de jargon, pas de tableau de bord illisible.', ia: 'Automatiser les enchères, produire des variantes, alerter.', human: 'Contrôler, corriger, expliquer.' },
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Méthode', href: '/methode' }]} title="Notre méthode : l’IA analyse, l’expert décide"
        intro="L’intelligence artificielle est au cœur de notre façon de travailler. Elle n’en est pas le chef. Voici, étape par étape, qui fait quoi." />
      <section className="container-sead py-14">
        <ol className="space-y-8">
          {STEPS.map((s, i) => (
            <li key={s.t} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-bold text-navy"><span className="mr-3 text-brand-600">{i + 1}.</span>{s.t}</h2>
                <p className="mt-3 text-lg">{s.d}</p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
                <div className="rounded-2xl bg-slate-50 p-5"><dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">Rôle de l’IA</dt><dd className="mt-2 text-navy">{s.ia}</dd></div>
                <div className="rounded-2xl bg-brand-50 p-5"><dt className="text-sm font-semibold uppercase tracking-wide text-brand-700">Rôle de l’expert</dt><dd className="mt-2 text-navy">{s.human}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
        <h2 className="mt-16 text-3xl font-bold tracking-tight text-navy">Nos engagements</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {['Vous restez propriétaire de vos comptes et de vos données.', 'Chaque décision qui engage votre budget est prise par un humain.', 'Nous vous disons quand un levier ne vaut pas la peine d’être activé.', 'Un reporting compréhensible, avec des recommandations, pas seulement des chiffres.'].map((x) => (
            <li key={x} className="flex gap-3 rounded-2xl border border-slate-200 p-5"><span aria-hidden="true" className="font-bold text-brand-600">✓</span>{x}</li>
          ))}
        </ul>
      </section>
      <CtaBlock />
    </>
  );
}
