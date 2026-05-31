import Link from 'next/link';
import { getCategorias, getProductos } from '@/lib/api';
import ProductoCard from '@/components/productos/ProductoCard';
import { Producto, Categoria } from '@/types';

export const revalidate = 60;

const MARQUEE_ITEMS = [
  'Nueva Colección',
  'Envío Gratis',
  'Pago Seguro',
  'Calidad Premium',
  'Moda Editorial',
  'Hecho para Durar',
];

export default async function Home() {
  let productos: Producto[] = [];
  let categorias: Categoria[] = [];

  try {
    [productos, categorias] = await Promise.all([getProductos(), getCategorias()]);
  } catch {
    // API offline
  }

  const destacados = productos.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#111111] text-white px-6 pt-28 pb-0 sm:pt-36 overflow-hidden">
        <div className="mx-auto max-w-4xl pb-24 sm:pb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9B99A] mb-6 animate-fade-up">
            Nueva colección
          </p>
          <h1 className="text-5xl sm:text-7xl font-light leading-[1.05] tracking-tight">
            Estilo que<br />
            <span className="italic text-[#C9B99A]">habla por ti.</span>
          </h1>
          <p className="mt-6 text-base text-white/40 max-w-sm leading-relaxed">
            Ropa y accesorios seleccionados. Pago seguro con MercadoPago.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/productos"
              className="inline-block bg-white text-[#111111] px-8 py-3.5 text-xs tracking-widest uppercase font-medium hover:bg-[#F0EDE7] transition-colors"
            >
              Ver colección
            </Link>
            <Link
              href="/productos?categoria=ropa"
              className="inline-block border border-white/20 px-8 py-3.5 text-xs tracking-widest uppercase text-white/70 hover:border-white hover:text-white transition-colors"
            >
              Solo ropa
            </Link>
          </div>
        </div>

        {/* Marquee strip at bottom of hero */}
        <div className="border-t border-white/10 py-4 overflow-hidden">
          <div className="flex w-max animate-marquee gap-0">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="text-[10px] tracking-[0.3em] uppercase text-white/30 px-10 whitespace-nowrap"
              >
                {item}
                <span className="ml-10 text-[#C9B99A]/50">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Brand values strip */}
      <section className="border-b border-[#E2DDD6] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E2DDD6]">
          {[
            { label: 'Calidad premium', desc: 'Materiales seleccionados con criterio editorial.' },
            { label: 'Envío garantizado', desc: 'Gratis en compras superiores a $150.000.' },
            { label: 'Pago 100% seguro', desc: 'Procesado por MercadoPago, el más usado en LATAM.' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex flex-col gap-1.5 px-6 py-6 sm:py-0 first:pl-0 last:pr-0">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C]">{label}</span>
              <p className="text-sm text-[#111111] leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías editoriales */}
      {categorias.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-1">Explorar por</p>
              <h2 className="text-2xl font-light text-[#111111]">Categorías</h2>
            </div>
            <Link
              href="/productos"
              className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors"
            >
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px bg-[#E2DDD6] sm:grid-cols-2">
            {categorias.map((cat) => (
              <Link
                key={cat.id}
                href={`/productos?categoria=${cat.slug}`}
                className="group bg-[#F7F5F1] hover:bg-[#111111] transition-colors duration-300 p-10 flex flex-col justify-between gap-8"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] group-hover:text-white/40 transition-colors">
                  Categoría
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-light text-[#111111] group-hover:text-white transition-colors">
                    {cat.nombre}
                  </h3>
                  <span className="text-[#E2DDD6] group-hover:text-white/30 text-xl transition-colors leading-none mb-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Productos destacados */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-1">Selección</p>
            <h2 className="text-2xl font-light text-[#111111]">Destacados</h2>
          </div>
          {productos.length > 4 && (
            <Link
              href="/productos"
              className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors"
            >
              Ver todo →
            </Link>
          )}
        </div>
        {destacados.length === 0 ? (
          <p className="text-[#B5AFA8] text-center py-20 text-sm">
            Los productos aparecerán aquí cuando la API esté activa.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E2DDD6]">
            {destacados.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>

      {/* Manifesto editorial */}
      <section className="bg-[#111111] text-white px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9B99A] mb-8">Nuestra filosofía</p>
          <blockquote className="text-3xl sm:text-4xl font-light leading-[1.3] tracking-tight">
            "La moda no es solo lo que vistes —
            <br />
            <span className="italic text-[#C9B99A]">es cómo te presentas al mundo."</span>
          </blockquote>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/productos"
              className="inline-block border border-white/20 px-10 py-3.5 text-xs tracking-widest uppercase text-white/70 hover:border-white hover:text-white transition-colors"
            >
              Explorar colección
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
