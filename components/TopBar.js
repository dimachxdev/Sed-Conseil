import Link from 'next/link';
import { SITE } from '@/content/site';

export default function TopBar() {
  return (
    <div className="bg-navy text-sm text-slate-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <p className="flex flex-wrap items-center gap-x-3">
          {SITE.locations.map((l, i) => (
            <span key={l.city}>
              {i > 0 && <span aria-hidden="true" className="mr-3 text-slate-600">·</span>}
              <Link href="/contact#implantations" className="hover:text-white">
                {l.city}{i === 0 ? ' (siège)' : ''}
              </Link>
            </span>
          ))}
        </p>
        <a href={`mailto:${SITE.email}`} className="hidden font-medium text-white hover:text-brand-100 sm:inline">
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
