'use client';
import Link from 'next/link';
import { useCarrito } from '@/store/carrito';

export default function Navbar() {
  const conteo = useCarrito((s) => s.conteo());

  return (
    <header className="sticky top-0 z-50 bg-[#111111]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.15em] uppercase text-white">
          TiendaKit
        </Link>
        <div className="flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-white/80">
          <Link href="/productos" className="hover:text-white transition-colors">
            Productos
          </Link>
          <Link
            href="/carrito"
            className="relative hover:text-white transition-colors"
          >
            Bolsa
            {conteo > 0 && (
              <span className="absolute -top-2.5 -right-4 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9B99A] text-[9px] font-bold text-[#111111]">
                {conteo}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
