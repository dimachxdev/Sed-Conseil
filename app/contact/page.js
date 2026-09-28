import PageHero from '@/components/PageHero';
import LeadForm from '@/components/LeadForm';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact | SEAD CONSEIL — Paris, Dublin, Dakar',
  description: 'Contactez SEAD CONSEIL par email ou via le formulaire. Agence conseil Google Ads et Social Ads basée à Paris, avec des hubs à Dublin et Dakar.',
  path: '/contact',
});

export default function Page() {
  const mapQ = encodeURIComponent(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`);
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact SEAD CONSEIL', url: `${SITE.url}/contact`, about: { '@id': `${SITE.url}/#organisation` } }} />
      <PageHero crumbs={[{ label: 'Contact', href: '/contact' }]} title="Nous contacter"
        intro={`Une question, un projet, un compte à reprendre ? Écrivez-nous à [${SITE.email}](mailto:${SITE.email}) ou utilisez le formulaire : réponse sous 24 h ouvrées.`} />
      <section className="container-sead grid gap-12 py-12 lg:grid-cols-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
          <h2 className="mb-6 text-2xl font-bold text-navy">Votre message</h2>
          <LeadForm source="contact" withOther />
        </div>
        <div id="implantations" className="scroll-mt-28 lg:col-span-5">
          <h2 className="text-2xl font-bold text-navy">Nos implantations</h2>
          <ul className="mt-4 space-y-4">
            {SITE.locations.map((l) => (
              <li key={l.city} className="card"><p className="text-lg font-bold text-navy">{l.city} <span className="text-base font-medium text-brand-700">· {l.label}</span></p><p className="mt-1">{l.detail}</p></li>
            ))}
          </ul>
          <p className="mt-6">
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQ}`} className="font-semibold text-brand-700 underline" rel="noopener noreferrer">Voir le siège sur Google Maps</a>
          </p>
        </div>
      </section>
    </>
  );
}
