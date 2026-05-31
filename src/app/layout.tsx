import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Providers from '@/components/layout/Providers';
import Toaster from '@/components/ui/Toaster';
import Link from 'next/link';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'TiendaKit — Moda & Estilo',
  description: 'Tienda de ropa y accesorios con pago seguro vía MercadoPago.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#F7F5F1] text-[#111111]" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster />

          <footer className="bg-[#111111] text-white">
            {/* Main footer grid */}
            <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div className="lg:col-span-2">
                <span className="text-lg font-semibold tracking-[0.15em] uppercase">TiendaKit</span>
                <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
                  Ropa y accesorios seleccionados con criterio editorial. Calidad que se siente, estilo que permanece.
                </p>
                <p className="mt-6 text-[10px] tracking-[0.2em] uppercase text-[#C9B99A]">
                  Colombia · LATAM
                </p>
              </div>

              {/* Tienda */}
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5">Tienda</p>
                <ul className="space-y-3 text-sm text-white/60">
                  <li><Link href="/productos" className="hover:text-white transition-colors">Colección</Link></li>
                  <li><Link href="/productos?categoria=ropa" className="hover:text-white transition-colors">Ropa</Link></li>
                  <li><Link href="/productos?categoria=accesorios" className="hover:text-white transition-colors">Accesorios</Link></li>
                  <li><Link href="/carrito" className="hover:text-white transition-colors">Mi bolsa</Link></li>
                </ul>
              </div>

              {/* Información */}
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5">Información</p>
                <ul className="space-y-3 text-sm text-white/60">
                  <li><span className="cursor-default">Envíos y devoluciones</span></li>
                  <li><span className="cursor-default">Guía de tallas</span></li>
                  <li><span className="cursor-default">Pagos seguros</span></li>
                  <li><span className="cursor-default">Contacto</span></li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10">
              <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-widest uppercase text-white/25">
                <span>© {new Date().getFullYear()} TiendaKit · Todos los derechos reservados</span>
                <a
                  href="https://github.com/KolisCode"
                  className="hover:text-white/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KolisCode
                </a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
