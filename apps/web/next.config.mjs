import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ignora os erros de lint na Vercel (evita a falha do eslint-config-next)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Força o Webpack a resolver o React em apenas um único lugar
  webpack: (config) => {
    config.resolve.alias['react'] = require.resolve('react');
    config.resolve.alias['react-dom'] = require.resolve('react-dom');
    return config;
  },
};

export default nextConfig;