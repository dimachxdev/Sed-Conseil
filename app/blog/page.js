import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ArticleCard from '@/components/ArticleCard';
import CtaBlock from '@/components/CtaBlock';
import { ARTICLES, CATEGORIES, formatDate } from '@/content/articles';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'L’œil de Baba : le blog Google Ads, Social Ads et IA | SEAD CONSEIL',
  description: 'Analyses, méthodes et retours de terrain sur Google Ads, Meta Ads, TikTok, les contenus et l’IA publicitaire, par Baba Touré.',
  path: '/blog',
});

export default function Page() {
  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => a !== featured);
  return (
    <>
      <PageHero crumbs={[{ label: 'Blog', href: '/blog' }]} eyebrow="L’œil de Baba" title="Le blog de la publicité pilotée par le profit"
        intro="Des analyses concrètes sur Google Ads, les réseaux sociaux et l’IA publicitaire. Pas de promesses miracles : ce qui marche, ce qui ne marche pas, et comment le vérifier." />
      <section className="container-sead py-12">
        <p className="text-sm text-slate-500">Thèmes : {CATEGORIES.join(' · ')}</p>
        {featured && (
          <article className="relative mt-8 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg md:grid-cols-2">
            <div aria-hidden="true" className="min-h-40 bg-gradient-to-br from-blue-900 via-brand-600 to-blue-400" />
            <div className="p-8">
              <p className="flex items-center gap-3 text-sm"><span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">{featured.category}</span><time dateTime={featured.date} className="text-slate-500">{formatDate(featured.date)}</time></p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy"><Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">{featured.title}</Link></h2>
              <p className="mt-4 text-lg text-slate-600">{featured.excerpt}</p>
              <p aria-hidden="true" className="mt-6 font-semibold text-brand-700">Lire l’article →</p>
            </div>
          </article>
        )}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => <ArticleCard key={a.slug} a={a} headingLevel="h2" />)}
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
