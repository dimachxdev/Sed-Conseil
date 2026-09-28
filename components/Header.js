'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { NAV, SITE } from '@/content/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="SEAD CONSEIL, retour à l’accueil">
          <Logo className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-brand-700">SEAD <span className="font-light text-navy">CONSEIL</span></span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">L’humain aux commandes de l’IA</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`rounded-lg px-3 py-2 text-[15px] font-medium transition ${isActive(item.href) ? 'text-brand-700' : 'text-slate-700 hover:text-brand-700'}`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full w-64 translate-y-1 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/audit-offert" className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 sm:px-5">
            <span className="sm:hidden">Audit offert</span>
            <span className="hidden sm:inline">Réserver un échange</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-slate-100 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 overflow-y-auto bg-white px-4 pb-10 pt-3 lg:hidden">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
            <Link href="/" className="flex items-center gap-3"><Logo className="h-10 w-10" /><span className="text-lg font-extrabold tracking-tight text-brand-700">SEAD <span className="font-light text-navy">CONSEIL</span></span></Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-slate-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <nav aria-label="Navigation mobile">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-lg px-3 py-3 text-lg font-semibold text-navy hover:bg-slate-50">{item.label}</Link>
                  {item.children && (
                    <ul className="mb-2 ml-3 border-l border-slate-200 pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href} className="block px-3 py-2 text-slate-700">{c.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li><Link href="/contact" className="block rounded-lg px-3 py-3 text-lg font-semibold text-navy hover:bg-slate-50">Contact</Link></li>
            </ul>
          </nav>
          <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
            <Link href="/audit-offert" className="block rounded-xl bg-brand-600 px-5 py-4 text-center font-semibold text-white">Réserver mon audit offert</Link>
            <a href={`mailto:${SITE.email}`} className="block text-center font-medium text-brand-700">{SITE.email}</a>
          </div>
        </div>
      )}
    </header>
  );
}
