'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/store/admin';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cerrarSesion, estaAutenticado } = useAdmin();
  const router = useRouter();

  const salir = () => {
    cerrarSesion();
    router.push('/admin/login');
  };

  if (!estaAutenticado() && pathname !== '/admin/login') {
    if (typeof window !== 'undefined') router.replace('/admin/login');
    return null;
  }

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r bg-gray-50 flex flex-col">
        <div className="px-5 py-4 font-bold text-indigo-600 border-b">Admin</div>
        <nav className="flex-1 py-4 space-y-1 px-3 text-sm font-medium">
          <Link href="/admin/productos" className={`block rounded-lg px-3 py-2 hover:bg-white transition-colors ${pathname.startsWith('/admin/productos') ? 'bg-white text-indigo-600' : 'text-gray-600'}`}>
            Productos
          </Link>
          <Link href="/admin/ordenes" className={`block rounded-lg px-3 py-2 hover:bg-white transition-colors ${pathname.startsWith('/admin/ordenes') ? 'bg-white text-indigo-600' : 'text-gray-600'}`}>
            Órdenes
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button onClick={salir} className="w-full text-sm text-gray-400 hover:text-red-500 text-left">
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-white">{children}</main>
    </div>
  );
}
