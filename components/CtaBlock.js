import Link from 'next/link';

export default function CtaBlock({
  title = 'Parlons de vos campagnes, simplement.',
  text = '30 minutes avec Baba Touré pour faire le point sur vos comptes publicitaires. Vous repartez avec 3 pistes concrètes, que vous travailliez ensuite avec nous ou non.',
}) {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-slate-300">{text}</p>
          </div>
          <div className="lg:justify-self-end">
            <ul className="mb-6 space-y-2 text-slate-200">
              {['Réponse sous 24 h ouvrées, par un humain.', 'Sans engagement.', 'Vos accès et vos données restent confidentiels.'].map((x) => (
                <li key={x} className="flex gap-2"><span aria-hidden="true" className="text-brand-100">✓</span>{x}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/audit-offert" className="rounded-xl bg-brand-600 px-6 py-4 text-lg font-semibold text-white hover:bg-brand-700">Réserver mon échange</Link>
              <Link href="/contact" className="font-medium text-white underline underline-offset-4 hover:text-brand-100">ou écrivez-nous</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
