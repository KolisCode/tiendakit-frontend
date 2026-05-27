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
    <div className="group bg-[#F7F5F1] flex flex-col overflow-hidden">
      <Link href={`/productos/${producto.slug}`} className="block aspect-[3/4] bg-[#F0EDE7] overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={producto.nombre}
            width={400}
            height={530}
            className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-[#C9B99A]">
            <span className="text-4xl">◈</span>
          </div>
        )}
      </Link>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">
            {producto.categoria.nombre}
          </span>
          <Link href={`/productos/${producto.slug}`}>
            <h3 className="mt-0.5 text-sm font-medium text-[#111111] hover:text-[#2D2D2D] line-clamp-2 leading-snug">
              {producto.nombre}
            </h3>
          </Link>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-[#111111]">{precio}</span>
          <button
            onClick={() => agregar(producto)}
            disabled={producto.stock === 0}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white disabled:border-[#E2DDD6] disabled:text-[#B5AFA8] disabled:cursor-not-allowed transition-colors"
          >
            {producto.stock === 0 ? 'Agotado' : '+ Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
