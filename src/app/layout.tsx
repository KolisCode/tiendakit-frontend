import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Providers from '@/components/layout/Providers';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'TiendaKit — Moda & Estilo',
  description: 'Tienda de ropa y accesorios con pago seguro vía MercadoPago.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F7F5F1] text-[#111111]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[#E2DDD6] bg-[#111111] py-8 text-center text-xs tracking-widest uppercase text-white/40">
            © {new Date().getFullYear()} TiendaKit &nbsp;·&nbsp;{' '}
            <a href="https://github.com/KolisCode" className="hover:text-white/70 transition-colors">
              KolisCode
            </a>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
