# Site SEAD CONSEIL — seadconsulting.fr (v2)

Refonte complète du site : Next.js 14 (App Router), Tailwind CSS, pages générées en HTML statique (lisibles par Google et les IA), formulaire branché, consentement cookies.

## Démarrer
```bash
npm install
cp .env.example .env.local   # puis remplir les variables
npm run dev                  # http://localhost:3000
npm run build && npm start   # version production
```

## Déployer (recommandé : Vercel)
1. Pousser ce dossier sur un dépôt GitHub, l’importer dans Vercel.
2. Renseigner les variables d’environnement (voir `.env.example`).
3. Rattacher le domaine `www.seadconsulting.fr` (et rediriger `seadconsulting.fr` vers `www`).
4. Dans la Search Console : soumettre `https://www.seadconsulting.fr/sitemap.xml`, puis surveiller le rapport « Pages » pendant 4 semaines.

## À faire AVANT la mise en ligne
- [ ] **Recevoir les demandes** : renseigner `RESEND_API_KEY` + `LEAD_TO_EMAIL` + `LEAD_FROM_EMAIL` (domaine d’envoi vérifié chez Resend) et/ou `LEAD_WEBHOOK_URL`. Sans cela, le formulaire affiche un message invitant à écrire par email.
- [ ] **Mentions légales** : SIREN, RCS et TVA renseignés (TVA calculée à partir du SIREN : à confirmer sur une facture ou le Kbis). Compléter la forme juridique et le capital dans `LEGAL` (`content/site.js`). Faire relire les pages légales par un juriste.
- [ ] **Image « Qui sommes-nous »** : déposer `Illustration page QSN.jpg` sous `public/images/qui-sommes-nous.jpg` et changer `IMAGES.qsn.src` dans `content/site.js`.
- [ ] **Citation de Baba** (page Qui sommes-nous) : valider ou remplacer.
- [ ] **Mesure** : renseigner `NEXT_PUBLIC_GA_ID` et `NEXT_PUBLIC_ADS_CONVERSION` (chargés uniquement après consentement ; conversion déclenchée sur `/merci`).
- [ ] **Prise de RDV** (facultatif) : `NEXT_PUBLIC_BOOKING_URL`.

## Où modifier quoi
| Élément | Fichier |
|---|---|
| Coordonnées, villes, clients, images, menu, mentions légales | `content/site.js` |
| Pages services (Google Ads, Social Ads, Copywriting, Direction créative) | `content/services.js` |
| Cas clients | `content/cases.js` |
| Articles du blog | `content/articles-a.js` à `articles-d.js` (index : `content/articles.js`) |
| Redirections des anciennes URL | `next.config.mjs` |

Format des contenus : blocs `{ t: 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'table' | 'cta' | 'baba' | 'faq' | 'note' | 'img', ... }`. Dans les textes : `**gras**` et `[lien](/url)`.

## Correctifs apportés par rapport à la v1
- Vraies URL par page (fini la navigation par état interne) ; Méthode et Blog ne plantent plus ; menu mobile fonctionnel.
- HTML pré-rendu : title, meta description, canonical et Open Graph propres à chaque page ; un seul H1 par page.
- Vraie page 404 (code HTTP 404) ; redirections permanentes des anciennes URL WordPress.
- Formulaire d’audit réellement envoyé (email et/ou webhook), anti-spam, consentement RGPD, accusé de réception, page `/merci`.
- Chatbot et « Labo créatif » supprimés (clé API vide, et l’IA parlait au nom de Baba).
- Données structurées : ProfessionalService, WebSite, Service, Person, BreadcrumbList, BlogPosting, FAQPage.
- Bandeau cookies avec Consent Mode v2 ; pages Mentions légales, Confidentialité, Cookies, Plan du site.
- Lisibilité : casse normale, tailles de texte ≥ 14 px, contrastes renforcés, lien d’évitement, focus visibles.
- Illustrations générées par IA signalées comme telles.
- 8 articles de blog complets, 3 études de cas clients détaillées + 1 étude de cas en article.

## Anonymisation des clients (v2)
- Études de cas et articles : clients renommés de façon séquentielle — **AnoW** (DNVB TikTok), **AnoX**, **AnoY**, **AnoZ**. URL : `/cas-clients/anox`, `/cas-clients/anoy`, `/cas-clients/anoz`.
- AnoX : montants et volumes (euros, clics, nombre de produits) multipliés par 10 ; ratios (ROAS, %) inchangés. Une note l’indique sur les pages concernées.
- Les vrais noms n’apparaissent que dans le bandeau de références de l’accueil (`SITE.clients` dans `content/site.js`), avec leurs logos à déposer dans `public/images/logos/`.
- Pas de redirection des anciennes URL de cas clients : elles n’ont jamais été publiées, et une redirection révélerait la correspondance nom réel / pseudonyme.
