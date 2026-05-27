import { getCategorias, getProductos } from '@/lib/api';
import { Producto, Categoria } from '@/types';
import ProductoCard from '@/components/productos/ProductoCard';
import FiltrosCatalogo from '@/components/productos/FiltrosCatalogo';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ categoria?: string; minPrecio?: string; maxPrecio?: string }>;
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
      }),
      getCategorias(),
    ]);
  } catch {
    /* API offline */
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs tracking-[0.3em] uppercase text-[#8A847C] mb-2">Colección</p>
      <h1 className="text-2xl font-light text-[#111111] mb-10">
        {params.categoria
          ? categorias.find((c) => c.slug === params.categoria)?.nombre ?? 'Productos'
          : 'Todos los productos'}
      </h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="w-full lg:w-52 shrink-0">
          <FiltrosCatalogo categorias={categorias} />
        </aside>
        <div className="flex-1">
          {productos.length === 0 ? (
            <p className="text-[#B5AFA8] text-center py-20 text-sm">Sin productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 gap-px bg-[#E2DDD6] sm:grid-cols-2 xl:grid-cols-3">
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
