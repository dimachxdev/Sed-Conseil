import Link from 'next/link';
import JsonLd from './JsonLd';
import { abs } from '@/lib/seo';

export default function Breadcrumbs({ items }) {
  const all = [{ label: 'Accueil', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Fil d’Ariane" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((it, i) => (
            <li key={it.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < all.length - 1
                ? <Link href={it.href} className="hover:text-brand-700">{it.label}</Link>
                : <span aria-current="page" className="text-slate-700">{it.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: abs(it.href === '/' ? '' : it.href) })),
      }} />
    </>
  );
}
