import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Imágenes subidas por admin desde la API local
      { protocol: 'http', hostname: 'localhost', port: '3002', pathname: '/uploads/**' },
      // Producción (actualizar con el dominio real al desplegar)
      { protocol: 'https', hostname: '*.railway.app', pathname: '/uploads/**' },
    ],
  },
};

export default nextConfig;
