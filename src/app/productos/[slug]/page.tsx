import { getProducto, getProductos } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import AgregarAlCarrito from '@/components/productos/AgregarAlCarrito';
import GaleriaProducto from '@/components/productos/GaleriaProducto';
import { formatCOP } from '@/lib/format';

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const productos = await getProductos();
    return (productos as { slug: string }[]).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await getProducto(slug);
    const descripcion = p.descripcion ?? `${p.nombre} disponible en TiendaKit.`;
    return {
      title: `${p.nombre} — TiendaKit`,
      description: descripcion,
      openGraph: {
        title: p.nombre,
        description: descripcion,
        images: p.imagenes[0] ? [{ url: p.imagenes[0], width: 600, height: 800 }] : [],
      },
    };
  } catch {
    return { title: 'Producto — TiendaKit' };
  }
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  let producto;
  try {
    producto = await getProducto(slug);
  } catch {
    notFound();
  }

  const precio = formatCOP(producto.precio);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-10">
        <Link href="/" className="hover:text-[#111111] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-[#111111] transition-colors">Colección</Link>
        <span>/</span>
        <span className="text-[#8A847C]">{producto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Galería */}
        <GaleriaProducto imagenes={producto.imagenes} nombre={producto.nombre} />

        {/* Info — sticky en desktop */}
        <div className="flex flex-col gap-6 md:sticky md:top-24 md:self-start">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C]">
              {producto.categoria.nombre}
            </span>
            <h1 className="mt-2 text-2xl font-light text-[#111111] leading-snug">
              {producto.nombre}
            </h1>
          </div>

          <p className="text-xl font-semibold text-[#111111]">{precio}</p>

          {producto.descripcion && (
            <p className="text-sm text-[#8A847C] leading-relaxed border-t border-[#E2DDD6] pt-5">
              {producto.descripcion}
            </p>
          )}

          <p className="text-xs text-[#B5AFA8] tracking-wide">
            {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Sin stock'}
          </p>

          <AgregarAlCarrito producto={producto} />

          <Link
            href="/productos"
            className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors mt-2"
          >
            ← Volver a la colección
          </Link>
        </div>
      </div>
    </div>
  );
}
