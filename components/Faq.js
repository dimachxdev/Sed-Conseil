import Inline from './Inline';

export default function Faq({ items, title = 'Les questions qu’on nous pose souvent' }) {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{title}</h2>
      <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {items.map(([q, a], i) => (
          <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-navy">
              <h3 className="!m-0 !text-base">{q}</h3>
              <span aria-hidden="true" className="mt-0.5 text-brand-600 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-slate-700"><Inline text={a} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

export const faqJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') },
  })),
});
