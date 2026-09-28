import ServicePage from '@/components/ServicePage';
import { SERVICES } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

const s = SERVICES['direction-creative-ia'];
export const metadata = buildMetadata({ title: s.title, description: s.description, path: s.path });

export default function Page() {
  return <ServicePage s={s} crumbs={[{ label: 'Expertises', href: '/expertises' }, { label: s.short, href: s.path }]} />;
}
