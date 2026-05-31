'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCarrito } from '@/store/carrito';

export default function Navbar() {
  const conteo = useCarrito((s) => s.conteo());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-[#C9B99A] py-2 text-center text-[9px] tracking-[0.25em] uppercase text-[#111111] font-medium">
        Envío gratis en compras superiores a $150.000 &nbsp;·&nbsp; Pago seguro con MercadoPago
      </div>

      {/* Main nav */}
      <nav className="bg-[#111111]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-[0.15em] uppercase text-white">
            TiendaKit
          </Link>

          <div className="flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-white/70">
            <Link href="/productos" className="hover:text-white transition-colors">
              Colección
            </Link>
            <Link
              href="/carrito"
              className="relative hover:text-white transition-colors"
            >
              Bolsa
              {mounted && conteo > 0 && (
                <span className="absolute -top-2.5 -right-4 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9B99A] text-[9px] font-bold text-[#111111]">
                  {conteo}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
