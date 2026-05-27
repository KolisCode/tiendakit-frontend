import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Providers from '@/components/layout/Providers';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'TiendaKit — Tienda Online',
  description: 'Demo de tienda e-commerce con Next.js 15, NestJS y MercadoPago',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TiendaKit · Demo por{' '}
            <a href="https://github.com/KolisCode" className="underline hover:text-gray-700">
              KolisCode
            </a>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
