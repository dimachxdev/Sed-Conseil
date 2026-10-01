'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SITE } from '@/content/site';

const NEEDS = ['Google Ads', 'Social Ads', 'Copywriting / contenus', 'Je ne sais pas encore'];
const BUDGETS = ['Moins de 5 k€', '5 à 20 k€', '20 à 50 k€', 'Plus de 50 k€', 'Je préfère en parler'];

export default function LeadForm({ source = 'audit', withOther = false }) {
  const router = useRouter();
  const started = useRef(Date.now());
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  useEffect(() => { started.current = Date.now(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.source = source;
    data.elapsed = Date.now() - started.current;
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'Envoi impossible');
      router.push('/merci');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20';
  const label = 'block text-sm font-semibold text-navy';

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Prénom et nom *</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email professionnel *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="website" className={label}>Site web *</label>
        <input id="website" name="website" type="text" inputMode="url" required placeholder="votre-site.fr" className={field} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="need" className={label}>Votre besoin *</label>
          <select id="need" name="need" required defaultValue="" className={field}>
            <option value="" disabled>Choisir…</option>
            {[...NEEDS, ...(withOther ? ['Autre demande'] : [])].map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={label}>Budget publicitaire mensuel <span className="font-normal text-slate-500">(facultatif)</span></label>
          <select id="budget" name="budget" defaultValue="" className={field}>
            <option value="">—</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>Un mot sur votre situation <span className="font-normal text-slate-500">(facultatif)</span></label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>
      {/* Piège à robots : champ invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_site">Ne pas remplir</label>
        <input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" required value="yes" className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-600" />
        <label htmlFor="consent" className="text-sm text-slate-700">
          J’accepte que mes données soient utilisées pour répondre à ma demande. <Link href="/confidentialite" className="font-medium text-brand-700 underline">Politique de confidentialité</Link> *
        </label>
      </div>
      <button type="submit" disabled={status === 'sending'} className="w-full rounded-xl bg-brand-600 px-6 py-4 text-lg font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto">
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>
      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
          Oups, l’envoi n’a pas fonctionné ({error}). Écrivez-nous directement à <a className="font-semibold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> : nous vous répondons sous 24 h ouvrées.
        </p>
      )}
      <p className="text-sm text-slate-500">Réponse sous 24 h ouvrées · Sans engagement · Vos informations ne sont jamais revendues.</p>
    </form>
  );
}
