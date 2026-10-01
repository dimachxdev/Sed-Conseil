import Link from 'next/link';
import { formatDate } from '@/content/articles';

const tones = {
  'Creative Strategy': 'from-violet-700 to-violet-400', 'IA & Automation': 'from-cyan-800 to-cyan-400',
  'Meta Ads': 'from-blue-900 to-blue-500', 'Stratégie': 'from-emerald-800 to-emerald-400',
  'Case Study': 'from-rose-800 to-rose-400', 'Google Ads': 'from-slate-900 to-blue-600', 'Créa & contenus': 'from-amber-700 to-amber-400',
};

export default function ArticleCard({ a, headingLevel = 'h3' }) {
  const H = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className={`h-28 bg-gradient-to-br ${tones[a.category] || 'from-navy to-brand-600'}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">{a.category}</span>
          <span className="text-slate-500">{a.readTime} min</span>
        </p>
        <H className="mt-4 text-xl font-bold leading-snug text-navy">
          <Link href={`/blog/${a.slug}`} className="after:absolute after:inset-0 focus:outline-none">{a.title}</Link>
        </H>
        <p className="mt-3 flex-1 text-slate-600">{a.excerpt}</p>
        <p className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <time dateTime={a.date}>{formatDate(a.date)}</time>
          <span aria-hidden="true" className="text-brand-600 transition group-hover:translate-x-1">Lire →</span>
        </p>
      </div>
    </article>
  );
}
