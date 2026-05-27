'use client';
import Link from 'next/link';
import { useCarrito } from '@/store/carrito';

export default function Navbar() {
  const conteo = useCarrito((s) => s.conteo());

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Tienda<span className="text-indigo-600">Kit</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/productos" className="hover:text-indigo-600 transition-colors">
            Productos
          </Link>
          <Link
            href="/carrito"
            className="relative flex items-center gap-1 hover:text-indigo-600 transition-colors"
          >
            🛒
            {conteo > 0 && (
              <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                {conteo}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
