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
    // API offline — show empty state
  }

  const destacados = productos.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#111111] text-white px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9B99A] mb-6">
            Nueva colección
          </p>
          <h1 className="text-5xl sm:text-7xl font-light leading-[1.05] tracking-tight">
            Estilo que<br />
            <span className="italic">habla por ti.</span>
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-sm">
            Ropa y accesorios seleccionados. Pago seguro con MercadoPago.
          </p>
          <Link
            href="/productos"
            className="mt-10 inline-block border border-white/30 px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
          >
            Ver colección
          </Link>
        </div>
      </section>

      {/* Categorías */}
      {categorias.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8A847C] mb-5">Categorías</p>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <Link
                key={cat.id}
                href={`/productos?categoria=${cat.slug}`}
                className="border border-[#E2DDD6] px-5 py-2 text-xs tracking-widest uppercase text-[#8A847C] hover:border-[#111111] hover:text-[#111111] transition-colors"
              >
                {cat.nombre}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Productos destacados */}
      <section className="mx-auto max-w-6xl px-6 py-12 pb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8A847C] mb-8">Destacados</p>
        {destacados.length === 0 ? (
          <p className="text-[#B5AFA8] text-center py-20 text-sm">
            Los productos aparecerán aquí cuando la API esté activa.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-px bg-[#E2DDD6] sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )}
        {productos.length > 4 && (
          <div className="mt-12 text-center">
            <Link
              href="/productos"
              className="inline-block border border-[#111111] px-10 py-3 text-xs tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors"
            >
              Ver todo
            </Link>
          </div>
        )}
      </section>

      {/* Banner editorial */}
      <section className="bg-[#F0EDE7] px-6 py-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8A847C] mb-4">Envío incluido</p>
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
          Pago 100% seguro.<br />
          <span className="italic">Siempre.</span>
        </h2>
        <p className="mt-4 text-sm text-[#8A847C]">
          Procesamos tu compra con MercadoPago — el método más usado en LATAM.
        </p>
      </section>
    </div>
  );
}
