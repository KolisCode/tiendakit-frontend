import { getProducto } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Galería */}
        <div className="space-y-3">
          {producto.imagenes.length > 0 ? (
            producto.imagenes.map((img: string, i: number) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-gray-50">
                <Image
                  src={img}
                  alt={producto.nombre}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="aspect-square flex items-center justify-center rounded-2xl bg-gray-50 text-8xl text-gray-200">
              🛍️
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-sm text-indigo-600 font-medium">{producto.categoria.nombre}</span>
            <h1 className="mt-1 text-3xl font-extrabold text-gray-900">{producto.nombre}</h1>
          </div>
          <p className="text-3xl font-bold text-gray-900">{precio}</p>
          {producto.descripcion && (
            <p className="text-gray-600 leading-relaxed">{producto.descripcion}</p>
          )}
          <p className="text-sm text-gray-400">
            {producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}
          </p>
          <AgregarAlCarrito producto={producto} />
        </div>
      </div>
    </div>
  );
}
