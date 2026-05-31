'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from '@/store/admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cerrarSesion, estaAutenticado } = useAdmin();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !estaAutenticado() && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [mounted, pathname]);

  const salir = () => {
    cerrarSesion();
    router.push('/admin/login');
  };

  // Antes del mount: servidor y cliente renderizan lo mismo → sin mismatch
  if (!mounted) return null;

  if (pathname === '/admin/login') return <>{children}</>;

  if (!estaAutenticado()) return null;

  const navLink = (href: string, label: string) => {
    const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={`block px-4 py-2.5 text-xs tracking-widest uppercase transition-colors ${
          active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
        }`}
      >
        {active && <span className="inline-block w-1.5 h-1.5 bg-[#C9B99A] rounded-full mr-2 align-middle" />}
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F7F5F1]">
      <aside className="w-52 shrink-0 bg-[#111111] flex flex-col">
        <div className="px-4 py-5 border-b border-white/10">
          <Link href="/" className="text-sm font-semibold tracking-[0.15em] uppercase text-white">
            TiendaKit
          </Link>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {navLink('/admin', 'Inicio')}
          {navLink('/admin/productos', 'Productos')}
          {navLink('/admin/categorias', 'Categorías')}
          {navLink('/admin/ordenes', 'Órdenes')}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={salir}
            className="w-full text-left text-xs tracking-widest uppercase text-white/30 hover:text-red-400 transition-colors">
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 p-10 min-w-0">{children}</main>
    </div>
  );
}
