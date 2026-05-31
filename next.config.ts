import type { NextConfig } from 'next';

function apiRemotePattern(): { protocol: 'http' | 'https'; hostname: string; port?: string; pathname: string } | null {
  const raw = process.env.NEXT_PUBLIC_API_URL ?? '';
  try {
    const url = new URL(raw);
    if (url.hostname === 'localhost') return null; // already covered by the static entry
    return {
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: '/uploads/**',
    };
  } catch {
    return null;
  }
}

const extra = apiRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3002', pathname: '/uploads/**' },
      { protocol: 'https', hostname: '*.railway.app', pathname: '/uploads/**' },
      ...(extra ? [extra] : []),
    ],
  },
};

export default nextConfig;
