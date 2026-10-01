import Breadcrumbs from './Breadcrumbs';
import Inline from './Inline';

export default function PageHero({ crumbs, eyebrow, title, intro, children }) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-700">{eyebrow}</p>}
        <h1 className={`${eyebrow ? 'mt-3' : 'mt-8'} max-w-4xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl`}>{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg text-slate-700 sm:text-xl"><Inline text={intro} /></p>}
        {children}
      </div>
    </section>
  );
}
