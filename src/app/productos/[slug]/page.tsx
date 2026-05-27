import { getProducto } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AgregarAlCarrito from '@/components/productos/AgregarAlCarrito';

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 60;

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  let producto;
  try {
    producto = await getProducto(slug);
  } catch {
    notFound();
  }

  const precio = Number(producto.precio).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

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
        <div className="space-y-2">
          {producto.imagenes.length > 0 ? (
            producto.imagenes.map((img: string, i: number) => (
              <div key={i} className="aspect-[3/4] overflow-hidden bg-[#F0EDE7]">
                <Image
                  src={img}
                  alt={producto.nombre}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="aspect-[3/4] flex items-center justify-center bg-[#F0EDE7] text-[#C9B99A] text-6xl">
              ◈
            </div>
          )}
        </div>

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
