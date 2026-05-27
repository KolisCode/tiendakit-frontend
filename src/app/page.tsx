import Link from 'next/link';
import { getCategorias, getProductos } from '@/lib/api';
import ProductoCard from '@/components/productos/ProductoCard';
import { Producto, Categoria } from '@/types';

export const revalidate = 60;

export default async function Home() {
  let productos: Producto[] = [];
  let categorias: Categoria[] = [];

  try {
    [productos, categorias] = await Promise.all([getProductos(), getCategorias()]);
  } catch {
    // API not running yet — show empty state
  }

  const destacados = productos.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Bienvenido a TiendaKit
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Productos de calidad con pago fácil y seguro vía MercadoPago.
          </p>
          <Link
            href="/productos"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-indigo-600 shadow hover:bg-indigo-50 transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* Categorías */}
      {categorias.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {categorias.map((cat) => (
              <Link
                key={cat.id}
                href={`/productos?categoria=${cat.slug}`}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                {cat.nombre}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Productos destacados */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Productos destacados</h2>
        {destacados.length === 0 ? (
          <p className="text-gray-400 text-center py-16">
            Los productos aparecerán aquí cuando la API esté activa.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )}
        {productos.length > 4 && (
          <div className="mt-8 text-center">
            <Link
              href="/productos"
              className="inline-block rounded-full border border-gray-300 px-8 py-3 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
