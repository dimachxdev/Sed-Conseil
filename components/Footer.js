import Link from 'next/link';
import Logo from './Logo';
import { SITE } from '@/content/site';

const cols = [
  { title: 'Expertises', links: [
    ['Google Ads', '/expertises/google-ads'], ['Social Ads', '/expertises/social-ads'],
    ['Copywriting & contenus IA', '/expertises/copywriting-contenus-ia'], ['Direction créative IA', '/direction-creative-ia'],
    ['Audit offert', '/audit-offert'],
  ] },
  { title: 'Agence', links: [
    ['Méthode', '/methode'], ['Cas clients', '/cas-clients'], ['Qui sommes-nous', '/qui-sommes-nous'],
    ['Blog « L’œil de Baba »', '/blog'], ['Contact', '/contact'],
  ] },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <span className="text-xl font-extrabold tracking-tight text-brand-700">SEAD <span className="font-light text-navy">CONSEIL</span></span>
          </Link>
          <p className="mt-4 max-w-sm text-slate-600">
            L’agence conseil qui met l’humain aux commandes de l’IA publicitaire. Google Ads, Social Ads, copywriting et contenus. Depuis Paris, Dublin et Dakar.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="md:col-span-2">
            <p className="font-semibold text-navy">{c.title}</p>
            <ul className="mt-3 space-y-2 text-slate-600">
              {c.links.map(([l, h]) => <li key={h}><Link href={h} className="hover:text-brand-700">{l}</Link></li>)}
            </ul>
          </div>
        ))}
        <div className="md:col-span-3">
          <p className="font-semibold text-navy">Contact</p>
          <address className="mt-3 space-y-2 not-italic text-slate-600">
            <p>{SITE.address.street}<br />{SITE.address.postalCode} {SITE.address.city}</p>
            <p><a href={`mailto:${SITE.email}`} className="font-medium text-brand-700 hover:underline">{SITE.email}</a></p>
            {SITE.linkedin && <p><a href={SITE.linkedin} className="hover:text-brand-700" rel="noopener noreferrer">LinkedIn de Baba Touré</a></p>}
          </address>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} SEAD CONSEIL</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/mentions-legales" className="hover:text-navy">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-navy">Politique de confidentialité</Link></li>
            <li><Link href="/cookies" className="hover:text-navy">Gestion des cookies</Link></li>
            <li><Link href="/plan-du-site" className="hover:text-navy">Plan du site</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
