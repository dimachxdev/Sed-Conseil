/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // Anciennes URL (WordPress puis SPA) -> nouvelles pages. 301 permanentes.
  async redirects() {
    return [
      { source: '/a-propos', destination: '/qui-sommes-nous', permanent: true },
      { source: '/a-propos/', destination: '/qui-sommes-nous', permanent: true },
      { source: '/2024/09/12/les-evolutions-google-pour-la-publicite-avec-lia', destination: '/blog/google-ads-ia-evolutions', permanent: true },
      { source: '/2024/09/12/les-evolutions-google-pour-la-publicite-avec-lia/', destination: '/blog/google-ads-ia-evolutions', permanent: true },
      { source: '/2024/09/12/comment-lia-change-la-gestion-des-creas-en-publicite', destination: '/blog/ia-creas-publicitaires', permanent: true },
      { source: '/2024/09/12/comment-lia-change-la-gestion-des-creas-en-publicite/', destination: '/blog/ia-creas-publicitaires', permanent: true },
      // Anciennes « pages » de la SPA (état interne), au cas où des liens circulent
      { source: '/audit', destination: '/audit-offert', permanent: true },
      { source: '/about', destination: '/qui-sommes-nous', permanent: true },
      { source: '/crea', destination: '/direction-creative-ia', permanent: true },
      { source: '/direction-crea', destination: '/direction-creative-ia', permanent: true },
      // Anciennes archives WordPress éventuelles
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/qui-sommes-nous', permanent: true },
    ];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ],
    }];
  },
};
export default nextConfig;
