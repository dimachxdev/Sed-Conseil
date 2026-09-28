import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Blocks from '@/components/Blocks';
import CtaBlock from '@/components/CtaBlock';
import ArticleCard from '@/components/ArticleCard';
import JsonLd from '@/components/JsonLd';
import { faqJsonLd } from '@/components/Faq';
import { ARTICLES, getArticle, formatDate } from '@/content/articles';
import { SITE, IMAGES } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return ARTICLES.map((a) => ({ slug: a.slug })); }
export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  const m = buildMetadata({ title: a.metaTitle, description: a.description, path: `/blog/${a.slug}`, type: 'article' });
  m.openGraph.publishedTime = a.date;
  m.openGraph.authors = [SITE.founder.name];
  return m;
}

const LABELS = {
  '/direction-creative-ia': 'Direction créative IA', '/expertises/social-ads': 'Social Ads', '/expertises/google-ads': 'Google Ads',
  '/expertises/copywriting-contenus-ia': 'Copywriting & contenus IA', '/methode': 'Notre méthode', '/cas-clients/anox': 'Cas client : AnoX',
};

export default function Page({ params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const faq = a.blocks.find((b) => b.t === 'faq');
  const toc = a.blocks.filter((b) => b.t === 'h2');
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title, description: a.description,
        datePublished: a.date, dateModified: a.updated || a.date, inLanguage: 'fr-FR', articleSection: a.category,
        image: `${SITE.url}/og-image.jpg`, mainEntityOfPage: `${SITE.url}/blog/${a.slug}`,
        author: { '@type': 'Person', name: SITE.founder.name, url: `${SITE.url}/qui-sommes-nous` },
        publisher: { '@id': `${SITE.url}/#organisation` },
      }} />
      {faq && <JsonLd data={faqJsonLd(faq.items)} />}
      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
          <div className="container-sead pb-10 pt-8">
            <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: a.category, href: `/blog/${a.slug}` }]} />
            <p className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-white px-3 py-1 font-semibold text-brand-700 shadow-sm">{a.category}</span>
              <span className="text-slate-500">{a.readTime} min de lecture</span>
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{a.title}</h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-700 sm:text-xl">{a.lead}</p>
            <div className="mt-8 flex items-center gap-4">
              <Image src={IMAGES.portrait.src} width={56} height={56} alt="" className="h-14 w-14 rounded-full object-cover object-top" />
              <p className="text-sm">
                <Link href="/qui-sommes-nous" className="font-semibold text-navy hover:underline">{SITE.founder.name}</Link><br />
                <span className="text-slate-500">Publié le <time dateTime={a.date}>{formatDate(a.date)}</time>{a.updated ? <> · mis à jour le <time dateTime={a.updated}>{formatDate(a.updated)}</time></> : null}</span>
              </p>
            </div>
          </div>
        </header>
        <div className="container-sead grid gap-12 py-12 lg:grid-cols-12">
          <div className="lg:col-span-8"><Blocks blocks={a.blocks} /></div>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              {toc.length > 3 && (
                <nav aria-label="Sommaire" className="rounded-2xl border border-slate-200 p-6">
                  <p className="font-semibold text-navy">Sommaire</p>
                  <ol className="mt-3 space-y-2 text-sm">
                    {toc.map((h) => {
                      const id = h.x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <li key={id}><a href={`#${id}`} className="text-slate-600 hover:text-brand-700">{h.x}</a></li>;
                    })}
                  </ol>
                </nav>
              )}
              <div className="rounded-2xl bg-navy p-6 text-white">
                <p className="text-lg font-bold">Un regard expert sur vos campagnes ?</p>
                <p className="mt-2 text-slate-300">30 minutes, 3 pistes concrètes, sans engagement.</p>
                <Link href="/audit-offert" className="mt-4 block rounded-xl bg-brand-600 px-5 py-3 text-center font-semibold hover:bg-brand-700">Réserver mon audit offert</Link>
              </div>
              {a.related?.length > 0 && (
                <div className="rounded-2xl border border-slate-200 p-6">
                  <p className="font-semibold text-navy">Pour aller plus loin</p>
                  <ul className="mt-3 space-y-2">
                    {a.related.map((r) => {
                      const art = r.startsWith('/blog/') && getArticle(r.slice(6));
                      return <li key={r}><Link href={r} className="text-brand-700 hover:underline">{art ? art.title : LABELS[r] || r}</Link></li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
      <CtaBlock title={a.endCta.title} text={a.endCta.text} />
      <section className="container-sead py-14">
        <h2 className="text-2xl font-bold text-navy">À lire aussi</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">{others.map((x) => <ArticleCard key={x.slug} a={x} />)}</div>
      </section>
    </>
  );
}
