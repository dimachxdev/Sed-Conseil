'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEY = 'sead-consent';
const hasTracking = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_ADS_CONVERSION);

function apply(value) {
  try { localStorage.setItem(KEY, value); } catch (e) { /* stockage indisponible */ }
  if (typeof window.gtag === 'function') {
    const v = value === 'granted' ? 'granted' : 'denied';
    window.gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  }
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!hasTracking) return undefined;
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { /* ignore */ }
    if (!stored) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener('sead:open-consent', reopen);
    return () => window.removeEventListener('sead:open-consent', reopen);
  }, []);
  if (!show) return null;
  const choose = (v) => { apply(v); setShow(false); };
  return (
    <div role="dialog" aria-live="polite" aria-label="Gestion des cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:inset-x-6">
      <p className="text-slate-700">
        Nous utilisons des cookies de mesure d’audience et de publicité uniquement si vous l’acceptez. Ils nous aident à savoir quelles pages sont utiles et quelles campagnes fonctionnent.{' '}
        <Link href="/cookies" className="font-medium text-brand-700 underline">En savoir plus</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose('granted')} className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">Accepter</button>
        <button type="button" onClick={() => choose('denied')} className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-navy hover:bg-slate-50">Refuser</button>
      </div>
    </div>
  );
}

export function ReopenConsentButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event('sead:open-consent'))} className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-navy hover:bg-slate-50">
      Modifier mes choix
    </button>
  );
}
