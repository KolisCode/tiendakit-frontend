import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getCategorias, getProductos } from '@/lib/api';
import { Producto, Categoria } from '@/types';
import ProductoCard from '@/components/productos/ProductoCard';
import FiltrosCatalogo from '@/components/productos/FiltrosCatalogo';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ categoria?: string; minPrecio?: string; maxPrecio?: string; sort?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  if (params.q) {
    return { title: `"${params.q}" — TiendaKit`, description: `Resultados para "${params.q}" en TiendaKit.` };
  }
  if (params.categoria) {
    const nombre = params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1);
    return { title: `${nombre} — TiendaKit`, description: `Colección de ${nombre.toLowerCase()} disponible en TiendaKit.` };
  }
  return {
    title: 'Colección — TiendaKit',
    description: 'Ropa y accesorios seleccionados con criterio editorial. Pago seguro con MercadoPago.',
  };
}

export default async function CatalogoPage({ searchParams }: Props) {
  const params = await searchParams;
  let productos: Producto[] = [];
  let categorias: Categoria[] = [];

  try {
    [productos, categorias] = await Promise.all([
      getProductos({
        ...(params.categoria && { categoria: params.categoria }),
        ...(params.minPrecio && { minPrecio: params.minPrecio }),
        ...(params.maxPrecio && { maxPrecio: params.maxPrecio }),
        ...(params.sort     && { sort: params.sort }),
        ...(params.q        && { q: params.q }),
      }),
      getCategorias(),
    ]);
  } catch {
    /* API offline */
  }

  const totalProductos = productos.length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between mb-10 border-b border-[#E2DDD6] pb-8">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-2">Colección</p>
          <h1 className="text-2xl font-light text-[#111111]">
            {params.q
              ? `Resultados para "${params.q}"`
              : params.categoria
              ? categorias.find((c) => c.slug === params.categoria)?.nombre ?? 'Productos'
              : 'Todos los productos'}
          </h1>
        </div>
        {totalProductos > 0 && (
          <span className="text-xs text-[#B5AFA8] tracking-wide">
            {totalProductos} {totalProductos === 1 ? 'pieza' : 'piezas'}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="w-full lg:w-52 shrink-0">
          <Suspense>
            <FiltrosCatalogo categorias={categorias} />
          </Suspense>
        </aside>
        <div className="flex-1">
          {productos.length === 0 ? (
            <p className="text-[#B5AFA8] text-center py-20 text-sm">Sin productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 border-t border-l border-[#E2DDD6]">
              {productos.map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
