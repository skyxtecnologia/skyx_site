import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.figma.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Redireciona o tráfego do 'www' para o domínio principal.
        // Resolve perdas de cookie e unifica o SEO (evita conteúdo duplicado no Google).
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.skyxtecnologia.com.br',
          },
        ],
        destination: 'https://skyxtecnologia.com.br/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    // Pega a URL do backend nas variáveis (Vercel) ou usa localhost
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const backendUrl = apiUrl.replace(/\/$/, '');

    return [
      {
        // Quando o site chamar /api/...
        source: '/api/:path*',
        // A Vercel repassa a chamada invisivelmente para o Render (bypassa bloqueio de cookies)
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
