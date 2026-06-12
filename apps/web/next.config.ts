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
};

export default nextConfig;
