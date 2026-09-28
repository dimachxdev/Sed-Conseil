import Link from 'next/link';

export const metadata = { title: 'Page introuvable | SEAD CONSEIL', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-sead py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Erreur 404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy">Cette page n’existe pas (ou plus).</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg">Le site a changé récemment : certaines anciennes adresses ont été déplacées. Voici où aller :</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {[['Accueil', '/'], ['Expertises', '/expertises'], ['Blog', '/blog'], ['Audit offert', '/audit-offert']].map(([l, h]) => (
          <li key={h}><Link href={h} className="btn-secondary !py-3 !text-base">{l}</Link></li>
        ))}
      </ul>
    </section>
  );
}
