import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const clean = (v, max = 2000) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function sendEmail({ to, subject, html, replyTo }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL, to, subject, html, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Requête invalide' }, { status: 400 }); }

  // Anti-spam : champ piège rempli ou formulaire envoyé en moins de 3 secondes
  if (body.company_site || Number(body.elapsed) < 3000) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 120), email: clean(body.email, 200), website: clean(body.website, 300),
    need: clean(body.need, 80), budget: clean(body.budget, 80), message: clean(body.message, 3000),
    source: clean(body.source, 40), consent: body.consent === 'yes', date: new Date().toISOString(),
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.website || !lead.need) {
    return NextResponse.json({ ok: false, error: 'Merci de remplir les champs obligatoires' }, { status: 422 });
  }
  if (!lead.consent) return NextResponse.json({ ok: false, error: 'Le consentement est requis' }, { status: 422 });

  const hasEmail = process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL;
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL);
  if (!hasEmail && !hasWebhook) {
    console.error('[lead] Aucun canal configuré (RESEND_API_KEY ou LEAD_WEBHOOK_URL)', lead);
    return NextResponse.json({ ok: false, error: 'service temporairement indisponible' }, { status: 503 });
  }

  const results = await Promise.allSettled([
    hasWebhook && fetch(process.env.LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      .then((r) => { if (!r.ok) throw new Error(`Webhook ${r.status}`); }),
    hasEmail && sendEmail({
      to: process.env.LEAD_TO_EMAIL,
      replyTo: lead.email,
      subject: `Nouvelle demande (${lead.source}) : ${lead.name} — ${lead.need}`,
      html: `<h2>Nouvelle demande depuis le site</h2><ul>${Object.entries(lead).map(([k, v]) => `<li><b>${k}</b> : ${esc(String(v))}</li>`).join('')}</ul>`,
    }),
  ].filter(Boolean));

  const delivered = results.some((r) => r.status === 'fulfilled');
  results.filter((r) => r.status === 'rejected').forEach((r) => console.error('[lead]', r.reason));
  if (!delivered) return NextResponse.json({ ok: false, error: 'service temporairement indisponible' }, { status: 502 });

  // Accusé de réception au prospect (non bloquant)
  if (hasEmail) {
    sendEmail({
      to: lead.email,
      subject: 'Votre demande a bien été reçue — SEAD CONSEIL',
      html: `<p>Bonjour ${esc(lead.name)},</p><p>Merci pour votre message. Nous l’avons bien reçu et Baba Touré vous répond personnellement sous 24 h ouvrées.</p><p>À très vite,<br>L’équipe SEAD CONSEIL</p>`,
    }).catch((e) => console.error('[lead] accusé', e));
  }
  return NextResponse.json({ ok: true });
}
