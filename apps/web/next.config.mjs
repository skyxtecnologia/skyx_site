import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ignora os erros de lint na Vercel (evita a falha do eslint-config-next)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Força o Webpack a resolver o React em apenas um único lugar
  webpack: (config) => {
    // Usamos o path.dirname para mapear a pasta raiz do pacote, 
    // garantindo que sub-caminhos como 'react/jsx-runtime' funcionem.
    config.resolve.alias['react'] = path.dirname(require.resolve('react'));
    config.resolve.alias['react-dom'] = path.dirname(require.resolve('react-dom'));
    return config;
  },
};

export default nextConfig;