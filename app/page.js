import Link from 'next/link';
import Image from 'next/image';
import { SITE, IMAGES } from '@/content/site';
import { SERVICE_LIST } from '@/content/services';
import { ARTICLES } from '@/content/articles';
import { CASES } from '@/content/cases';
import ArticleCard from '@/components/ArticleCard';
import CtaBlock from '@/components/CtaBlock';
import Faq, { faqJsonLd } from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Consultant Google Ads & Social Ads piloté par le profit | SEAD CONSEIL',
  description: 'Google Ads, Meta Ads, copywriting et contenus : l’IA accélère, un expert humain décide. Audit de vos campagnes offert, réponse sous 24 h.',
  path: '/',
});

const FAQ = [
  ['Travaillez-vous avec les petites entreprises ?', 'Oui. Nous accompagnons aussi bien des PME que des e-commerçants établis, avec des budgets allant de quelques milliers à plusieurs millions d’euros par an. Le format (conseil ou gestion) s’adapte à votre budget publicitaire.'],
  ['Combien de temps avant de voir des résultats ?', 'Les premières corrections (budget gaspillé, suivi des conversions, structure) produisent souvent leurs effets en quelques semaines. Les stratégies de fond (flux produits, créas, contenus) se mesurent sur deux à trois mois.'],
  ['Faut-il vous donner accès à nos comptes ?', 'Pour l’audit, un accès en lecture suffit. Vous restez propriétaire de vos comptes et de vos données, à tout moment.'],
  ['Utilisez-vous l’IA pour gérer nos campagnes ?', 'Oui, pour analyser plus vite et produire plus de variantes. Mais chaque décision qui engage votre budget est prise et vérifiée par un expert.'],
];

const STEPS = [
  ['Écouter', 'Vos marges, vos contraintes, vos priorités commerciales.'],
  ['Analyser', 'L’IA passe vos données au crible ; nous interprétons.'],
  ['Décider', 'Un plan d’action priorisé, validé avec vous.'],
  ['Piloter', 'Exécution, tests, reporting hebdomadaire.'],
];

export default function HomePage() {
  const featuredCase = CASES[0]; // cas mis en avant (AnoX)
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url, inLanguage: 'fr-FR' }} />
      <JsonLd data={faqJsonLd(FAQ)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-sead grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-600" />
              Consultant et formateur Google Ads
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-6xl">
              L’IA traite la donnée.<br /><span className="text-brand-600">Nous pilotons votre profit.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">
              SEAD CONSEIL accompagne les entreprises sur Google Ads, les réseaux sociaux et la création de contenus. Les outils d’IA nous font gagner du temps ; c’est notre expérience qui décide où va votre budget, et pourquoi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/audit-offert" className="btn-primary">Réserver mon audit offert</Link>
              <Link href="/cas-clients" className="btn-secondary">Voir nos cas clients</Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
              <li>✓ Réponse sous 24 h ouvrées</li><li>✓ Sans engagement</li><li>✓ Un humain lit votre demande</li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <Image src={IMAGES.portrait.src} width={IMAGES.portrait.w} height={IMAGES.portrait.h} alt={IMAGES.portrait.alt} priority sizes="(min-width: 1024px) 380px, 80vw" className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-2xl" />
              <p className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-white p-4 text-sm shadow-xl">
                <span className="block font-semibold text-navy">{SITE.founder.name}</span>
                <span className="text-slate-600">« C’est moi qui lis chaque demande d’audit. »</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preuve */}
      <section aria-labelledby="preuve" className="border-y border-slate-200 bg-white">
        <div className="container-sead flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
          <h2 id="preuve" className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ils nous confient leurs campagnes</h2>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {SITE.clients.map((c) => (
              <li key={c.name} className="flex h-12 items-center">
                {c.logo
                  ? <Image src={c.logo} alt={c.name} width={160} height={48} className="h-10 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                  : <span className="text-lg font-bold text-slate-700">{c.name}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Problème */}
      <section className="container-sead py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Les plateformes publicitaires n’ont jamais été aussi automatisées. Ni aussi faciles à mal piloter.</h2>
          <div className="space-y-4 text-lg">
            <p>Performance Max, enchères automatiques, créas générées en un clic : Google et Meta promettent que l’algorithme s’occupe de tout. Dans les faits, un algorithme optimise ce qu’on lui donne à optimiser. S’il vise le chiffre d’affaires au lieu de la marge, s’il manque de données fiables ou s’il pousse les mauvais produits, il dépense très efficacement… dans la mauvaise direction.</p>
            <p>Notre rôle est de fixer le cap : quels objectifs, quels produits, quels messages, quel niveau de rentabilité. <strong className="text-navy">L’IA exécute, nous vérifions et nous corrigeons.</strong></p>
          </div>
        </div>
      </section>

      {/* Expertises */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container-sead">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Nos expertises</h2>
          <p className="mt-3 max-w-2xl text-lg">Quatre métiers, une même logique : chaque euro investi doit pouvoir se justifier en marge.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_LIST.map((s) => (
              <article key={s.key} className="card relative flex flex-col">
                <h3 className="text-xl font-bold text-navy"><Link href={s.path} className="after:absolute after:inset-0">{s.short}</Link></h3>
                <p className="mt-3 flex-1 text-slate-600">{s.card}</p>
                <p aria-hidden="true" className="mt-4 font-semibold text-brand-700">En savoir plus →</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cas client */}
      <section className="container-sead py-16 lg:py-24">
        <div className="grid items-center gap-10 rounded-3xl bg-navy p-8 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">Cas client · {featuredCase.client}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">{featuredCase.title}</h2>
            <p className="mt-4 text-slate-300">Un compte Google Ads sur 5 marchés, piloté chaque semaine produit par produit.</p>
            <Link href={`/cas-clients/${featuredCase.slug}`} className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-navy hover:bg-brand-50">Lire le cas complet</Link>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {featuredCase.kpis.map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 p-5">
                <dt className="text-sm text-slate-300">{l}</dt>
                <dd className="mt-1 text-3xl font-extrabold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Conseil ou gestion */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container-sead grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Vous gardez la main, ou vous nous la confiez.</h2>
            <div className="mt-8 space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-navy">Accompagnement conseil</h3>
                <p className="mt-2">Vous avez une équipe interne ou un freelance. Nous auditons, nous fixons la stratégie, nous formons et nous faisons un point régulier. Idéal pour monter en compétence sans perdre le contrôle.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-navy">Gestion opérationnelle</h3>
                <p className="mt-2">Nous prenons en charge vos campagnes au quotidien : structure, enchères, flux produits, créas, reporting. Vous recevez un point hebdomadaire clair : ce qui a été fait, ce que ça a donné, ce qu’on fait ensuite.</p>
              </div>
            </div>
          </div>
          <figure className="mx-auto max-w-md">
            <Image src={IMAGES.conseil.src} width={IMAGES.conseil.w} height={IMAGES.conseil.h} alt={IMAGES.conseil.alt} sizes="(min-width: 1024px) 440px, 90vw" className="rounded-3xl object-cover shadow-xl" />
            <figcaption className="mt-2 text-center text-sm text-slate-500">Illustration réalisée avec l’IA</figcaption>
          </figure>
        </div>
      </section>

      {/* Méthode */}
      <section className="container-sead py-16 lg:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Notre méthode en 4 étapes</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="card">
              <span className="text-sm font-bold text-brand-600">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold text-navy">{t}</h3>
              <p className="mt-2 text-slate-600">{d}</p>
            </li>
          ))}
        </ol>
        <Link href="/methode" className="mt-8 inline-block font-semibold text-brand-700 hover:underline">Découvrir la méthode →</Link>
      </section>

      {/* Blog */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container-sead">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">L’œil de Baba : derniers articles</h2>
            <Link href="/blog" className="font-semibold text-brand-700 hover:underline">Tous les articles →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-sead py-16">
        <div className="max-w-3xl"><Faq items={FAQ} title="Vos questions, nos réponses" /></div>
      </section>

      <CtaBlock />
    </>
  );
}
