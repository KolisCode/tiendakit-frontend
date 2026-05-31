'use client';
import { useState } from 'react';
import { Producto } from '@/types';
import { useCarrito } from '@/store/carrito';
import { useToast } from '@/store/toast';

export default function AgregarAlCarrito({ producto }: { producto: Producto }) {
  const [cantidad, setCantidad] = useState(1);
  const agregar = useCarrito((s) => s.agregar);
  const toast = useToast((s) => s.agregar);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center border border-[#E2DDD6] w-fit">
        <button
          onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          className="px-4 py-3 text-[#111111] hover:bg-[#F0EDE7] transition-colors"
        >
          −
        </button>
        <span className="px-5 py-3 text-sm min-w-[3rem] text-center text-[#111111]">{cantidad}</span>
        <button
          onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
          className="px-4 py-3 text-[#111111] hover:bg-[#F0EDE7] transition-colors"
        >
          +
        </button>
      </div>
      <button
        onClick={() => { agregar(producto, cantidad); toast(producto.nombre, producto.imagenes[0] ?? null); }}
        disabled={producto.stock === 0}
        className="w-full bg-[#111111] py-4 text-xs tracking-widest uppercase text-white hover:bg-[#2D2D2D] disabled:bg-[#E2DDD6] disabled:text-[#B5AFA8] disabled:cursor-not-allowed transition-colors"
      >
        {producto.stock === 0 ? 'Sin stock' : 'Agregar a la bolsa'}
      </button>
    </div>
  );
}
