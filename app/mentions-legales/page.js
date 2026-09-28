import PageHero from '@/components/PageHero';
import { SITE, LEGAL } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Mentions légales | SEAD CONSEIL', description: 'Mentions légales du site seadconsulting.fr.', path: '/mentions-legales' });

export default function Page() {
  const rows = [
    ['Raison sociale', LEGAL.raisonSociale], ['Forme juridique', LEGAL.formeJuridique], ['Capital social', LEGAL.capital],
    ['Siège social', `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`],
    ['SIREN', LEGAL.siren], ['RCS', LEGAL.rcs], ['N° de TVA intracommunautaire', LEGAL.tva],
    ['Directeur de la publication', LEGAL.directeurPublication], ['Contact', SITE.email],
    ['Hébergeur', `${LEGAL.hebergeur.nom}, ${LEGAL.hebergeur.adresse} (${LEGAL.hebergeur.site})`],
  ];
  return (
    <>
      <PageHero crumbs={[{ label: 'Mentions légales', href: '/mentions-legales' }]} title="Mentions légales" />
      <section className="container-sead py-12">
        <dl className="max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 p-4 sm:grid-cols-3"><dt className="font-semibold text-navy">{k}</dt><dd className="sm:col-span-2">{v}</dd></div>
          ))}
        </dl>
        <div className="prose-sead mt-10">
          <h2>Propriété intellectuelle</h2>
          <p>L’ensemble des contenus de ce site (textes, visuels, logo) est la propriété de SEAD CONSEIL, sauf mention contraire. Toute reproduction sans autorisation est interdite. Les noms de clients cités le sont avec leur accord.</p>
          <h2>Illustrations</h2>
          <p>Certaines illustrations du site ont été réalisées avec des outils d’intelligence artificielle ; elles sont signalées comme telles.</p>
        </div>
      </section>
    </>
  );
}
