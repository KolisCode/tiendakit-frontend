'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Producto } from '@/types';
import { useCarrito } from '@/store/carrito';
import { useToast } from '@/store/toast';
import { formatCOP } from '@/lib/format';

interface Props { producto: Producto }

export default function ProductoCard({ producto }: Props) {
  const agregar = useCarrito((s) => s.agregar);
  const toast = useToast((s) => s.agregar);
  const imagen = producto.imagenes[0] ?? null;
  const precio = formatCOP(producto.precio);

  return (
    <div className="group bg-[#F7F5F1] flex flex-col overflow-hidden border-b border-r border-[#E2DDD6]">
      {/* Imagen con overlay */}
      <Link href={`/productos/${producto.slug}`} className="relative block aspect-[3/4] bg-[#F0EDE7] overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={producto.nombre}
            width={400}
            height={530}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-[#C9B99A]">
            <span className="text-4xl">◈</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/30 transition-all duration-300 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white border border-white/60 px-6 py-2.5 backdrop-blur-sm">
            Ver producto
          </span>
        </div>

        {/* Badge sin stock */}
        {producto.stock === 0 && (
          <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] tracking-widest uppercase px-2.5 py-1">
            Agotado
          </div>
        )}
      </Link>

      {/* Info */}
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
            onClick={() => { agregar(producto); toast(producto.nombre, producto.imagenes[0] ?? null); }}
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
