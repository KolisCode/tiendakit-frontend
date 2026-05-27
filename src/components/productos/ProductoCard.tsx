'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Producto } from '@/types';
import { useCarrito } from '@/store/carrito';

interface Props { producto: Producto }

export default function ProductoCard({ producto }: Props) {
  const agregar = useCarrito((s) => s.agregar);
  const imagen = producto.imagenes[0] ?? null;
  const precio = Number(producto.precio).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <Link href={`/productos/${producto.slug}`} className="block aspect-square bg-gray-50 overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={producto.nombre}
            width={400}
            height={400}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl text-gray-200">
            🛍️
          </div>
        )}
      </Link>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/productos/${producto.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">
            {producto.nombre}
          </h3>
        </Link>
        <span className="text-xs text-gray-400">{producto.categoria.nombre}</span>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-gray-900">{precio}</span>
          <button
            onClick={() => agregar(producto)}
            disabled={producto.stock === 0}
            className="rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {producto.stock === 0 ? 'Agotado' : '+ Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}
