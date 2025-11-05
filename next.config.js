/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      // Evitar problemas com acentos em rotas de API no filesystem
      { source: '/api/músicas/:path*', destination: '/api/songs/:path*' },
      { source: '/api/musicas/:path*', destination: '/api/songs/:path*' },
    ];
  },
};

module.exports = nextConfig;

