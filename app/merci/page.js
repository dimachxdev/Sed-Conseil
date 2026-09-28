import Link from 'next/link';
import LeadConversion from '@/components/LeadConversion';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Merci, votre demande est bien arrivée | SEAD CONSEIL', description: 'Votre demande a bien été reçue.', path: '/merci', noindex: true });

export default function Page() {
  return (
    <section className="container-sead py-20">
      <LeadConversion />
      <div className="mx-auto max-w-2xl text-center">
        <p aria-hidden="true" className="text-5xl">✓</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy">Merci, votre demande est bien arrivée.</h1>
        <p className="mt-4 text-lg">Baba Touré vous répond sous 24 h ouvrées. Un email de confirmation vient de partir vers votre boîte (pensez à vérifier les indésirables).</p>
        <p className="mt-8 font-semibold text-navy">En attendant, deux lectures utiles :</p>
        <ul className="mt-3 space-y-2">
          <li><Link href="/blog/audit-ia-claude-acquisition" className="text-brand-700 underline">Comment nous pré-auditons vos comptes avec l’IA</Link></li>
          <li><Link href="/cas-clients/anox" className="text-brand-700 underline">Cas client : AnoX</Link></li>
        </ul>
        <Link href="/" className="btn-secondary mt-10">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
