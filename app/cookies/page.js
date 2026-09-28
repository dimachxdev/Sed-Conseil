import PageHero from '@/components/PageHero';
import Blocks from '@/components/Blocks';
import { ReopenConsentButton } from '@/components/ConsentBanner';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Gestion des cookies | SEAD CONSEIL', description: 'Les cookies utilisés sur seadconsulting.fr et comment modifier vos choix.', path: '/cookies' });

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Gestion des cookies', href: '/cookies' }]} title="Gestion des cookies" intro="Aucun cookie de mesure ou de publicité n’est déposé sans votre accord." />
      <section className="container-sead py-12">
        <Blocks blocks={[
          { t: 'h2', x: 'Les cookies que nous utilisons' },
          { t: 'table', head: ['Type', 'Outil', 'Finalité', 'Dépôt'], rows: [
            ['Nécessaire', 'Stockage local du navigateur', 'Mémoriser votre choix concernant les cookies', 'Toujours'],
            ['Mesure d’audience', 'Google Analytics', 'Savoir quelles pages sont consultées et utiles', 'Uniquement si vous acceptez'],
            ['Publicité', 'Google Ads', 'Mesurer l’efficacité de nos campagnes publicitaires', 'Uniquement si vous acceptez'],
          ] },
          { t: 'p', x: 'Nous utilisons le mode consentement de Google : tant que vous n’avez pas accepté, aucun cookie Google n’est déposé.' },
          { t: 'h2', x: 'Modifier vos choix' },
          { t: 'p', x: 'Vous pouvez changer d’avis à tout moment :' },
        ]} />
        <div className="mt-4"><ReopenConsentButton /></div>
      </section>
    </>
  );
}
