import { notFound } from 'next/navigation';
import ServicePage from '@/components/ServicePage';
import { SERVICES } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

const KEYS = ['google-ads', 'social-ads', 'copywriting-contenus-ia'];
export const dynamicParams = false;
export function generateStaticParams() { return KEYS.map((slug) => ({ slug })); }

export function generateMetadata({ params }) {
  const s = SERVICES[params.slug];
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.description, path: s.path });
}

export default function Page({ params }) {
  const s = KEYS.includes(params.slug) && SERVICES[params.slug];
  if (!s) notFound();
  return <ServicePage s={s} crumbs={[{ label: 'Expertises', href: '/expertises' }, { label: s.short, href: s.path }]} />;
}
