import PageHero from '@/components/PageHero';
import Blocks from '@/components/Blocks';
import { SITE } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Politique de confidentialité | SEAD CONSEIL', description: 'Comment SEAD CONSEIL collecte et utilise vos données personnelles.', path: '/confidentialite' });

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Politique de confidentialité', href: '/confidentialite' }]} title="Politique de confidentialité" intro="Nous collectons le minimum de données, uniquement pour vous répondre, et nous ne les revendons jamais." />
      <section className="container-sead py-12">
        <Blocks blocks={[
          { t: 'h2', x: 'Responsable du traitement' },
          { t: 'p', x: `SEAD CONSEIL, ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}. Contact : [${SITE.email}](mailto:${SITE.email}).` },
          { t: 'h2', x: 'Données collectées' },
          { t: 'p', x: 'Via les formulaires d’audit et de contact : nom, adresse email professionnelle, site web, besoin exprimé, budget indicatif (facultatif) et message (facultatif). Si vous acceptez les cookies, des données de navigation sont également collectées (voir la [page cookies](/cookies)).' },
          { t: 'h2', x: 'Finalités et bases légales' },
          { t: 'ul', items: ['**Répondre à votre demande et vous proposer un échange** : mesures précontractuelles prises à votre demande et consentement exprimé dans le formulaire.', '**Mesurer l’audience et l’efficacité de nos campagnes** : uniquement avec votre consentement.'] },
          { t: 'h2', x: 'Destinataires' },
          { t: 'p', x: 'Vos données sont destinées à l’équipe SEAD CONSEIL. Elles transitent par nos prestataires techniques : hébergeur du site, service d’envoi d’emails et, le cas échéant, outil de gestion des contacts. Si vous acceptez les cookies, Google (Analytics, Ads) reçoit des données de navigation. Certains de ces prestataires peuvent traiter des données hors de l’Union européenne, dans le cadre des garanties prévues par le RGPD.' },
          { t: 'h2', x: 'Durée de conservation' },
          { t: 'p', x: 'Les données des prospects sont conservées 3 ans à compter du dernier contact, puis supprimées. Les données des clients sont conservées pendant la durée de la relation contractuelle et des obligations légales qui en découlent.' },
          { t: 'h2', x: 'Vos droits' },
          { t: 'p', x: `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement à tout moment. Écrivez-nous à [${SITE.email}](mailto:${SITE.email}). Vous pouvez également introduire une réclamation auprès de la CNIL ([cnil.fr](https://www.cnil.fr)).` },
          { t: 'h2', x: 'Utilisation de l’IA' },
          { t: 'p', x: 'Lorsque nous utilisons des outils d’IA pour analyser des données publicitaires dans le cadre d’un audit, nous limitons les données transmises à ce qui est nécessaire à l’analyse et n’y incluons pas de données personnelles de vos clients.' },
        ]} />
      </section>
    </>
  );
}
