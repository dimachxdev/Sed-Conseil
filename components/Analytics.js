import Script from 'next/script';

// Google tag avec Consent Mode v2 : tout est refusé par défaut, puis mis à jour par le bandeau.
// Ne charge rien si aucun identifiant n'est configuré.
export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ads = (process.env.NEXT_PUBLIC_ADS_CONVERSION || '').split('/')[0];
  const main = ga || ads;
  if (!main) return null;
  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
          analytics_storage: 'denied', wait_for_update: 500
        });
        try {
          var c = localStorage.getItem('sead-consent');
          if (c === 'granted') gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
        } catch (e) {}
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${main}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        gtag('js', new Date());
        ${ga ? `gtag('config', '${ga}');` : ''}
        ${ads ? `gtag('config', '${ads}');` : ''}
      `}</Script>
    </>
  );
}
