import Link from 'next/link';
import Image from 'next/image';
import Inline from './Inline';
import Faq from './Faq';

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Rendu des contenus structurés (pages, services, articles).
export default function Blocks({ blocks }) {
  return (
    <div className="prose-sead">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h2': return <h2 key={i} id={slug(b.x)}>{b.x}</h2>;
          case 'h3': return <h3 key={i}>{b.x}</h3>;
          case 'p': return <p key={i}><Inline text={b.x} /></p>;
          case 'lead': return <p key={i} className="lead"><Inline text={b.x} /></p>;
          case 'ul': return <ul key={i}>{b.items.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ul>;
          case 'ol': return <ol key={i}>{b.items.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ol>;
          case 'table':
            return (
              <div key={i} className="my-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy text-white">
                    <tr>{b.head.map((h, j) => <th key={j} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-slate-200 even:bg-slate-50">
                        {r.map((c, n) => <td key={n} className="px-4 py-3 align-top text-slate-700"><Inline text={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'baba':
            return (
              <aside key={i} className="my-8 rounded-2xl border-l-4 border-brand-600 bg-brand-50 p-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">L’avis de Baba</p>
                <p className="text-slate-800"><Inline text={b.x} /></p>
              </aside>
            );
          case 'cta':
            return (
              <aside key={i} className="my-8 rounded-2xl bg-navy p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
                <p className="text-slate-100"><Inline text={b.x} /></p>
                <Link href={b.href || '/audit-offert'} className="mt-4 inline-flex shrink-0 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700 sm:mt-0">
                  {b.label}
                </Link>
              </aside>
            );
          case 'note':
            return <p key={i} className="my-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600"><Inline text={b.x} /></p>;
          case 'quote':
            return (
              <figure key={i} className="my-8 border-l-4 border-slate-300 pl-6">
                <blockquote className="text-lg italic text-slate-800">« {b.x} »</blockquote>
                {b.by && <figcaption className="mt-2 text-sm text-slate-600">— {b.by}</figcaption>}
              </figure>
            );
          case 'img':
            return (
              <figure key={i} className="my-8">
                <Image src={b.img.src} width={b.img.w} height={b.img.h} alt={b.img.alt} className="w-full rounded-2xl object-cover" sizes="(min-width: 768px) 720px, 100vw" />
                {(b.caption || b.img.ai) && (
                  <figcaption className="mt-2 text-sm text-slate-500">
                    {b.caption}{b.img.ai ? `${b.caption ? ' · ' : ''}Illustration réalisée avec l’IA` : ''}
                  </figcaption>
                )}
              </figure>
            );
          case 'faq': return <Faq key={i} items={b.items} title={b.title} />;
          default: return null;
        }
      })}
    </div>
  );
}
