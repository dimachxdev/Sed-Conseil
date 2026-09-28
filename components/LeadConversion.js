'use client';
import { useEffect } from 'react';

// Déclare la conversion (GA4 + Google Ads) une seule fois par session, si la balise est chargée.
export default function LeadConversion() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('sead-lead-tracked')) return;
      sessionStorage.setItem('sead-lead-tracked', '1');
    } catch (e) { /* ignore */ }
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'generate_lead', { currency: 'EUR' });
    const ads = process.env.NEXT_PUBLIC_ADS_CONVERSION;
    if (ads) window.gtag('event', 'conversion', { send_to: ads });
  }, []);
  return null;
}
