import Link from 'next/link';

// Mini-parseur : **gras** et [texte](/lien) dans les contenus.
export default function Inline({ text }) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0; let m; let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('**')) {
      parts.push(<strong key={k++} className="font-semibold text-navy">{t.slice(2, -2)}</strong>);
    } else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const cls = 'font-medium text-brand-700 underline decoration-brand-600/30 underline-offset-2 hover:decoration-brand-600';
      parts.push(href.startsWith('/')
        ? <Link key={k++} href={href} className={cls}>{label}</Link>
        : <a key={k++} href={href} className={cls} rel="noopener noreferrer">{label}</a>);
    }
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
