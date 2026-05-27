'use client';
import { useState } from 'react';
import { Producto } from '@/types';
import { useCarrito } from '@/store/carrito';

export default function AgregarAlCarrito({ producto }: { producto: Producto }) {
  const [cantidad, setCantidad] = useState(1);
  const agregar = useCarrito((s) => s.agregar);

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          className="px-4 py-2 text-lg hover:bg-gray-50 transition-colors"
        >
          −
        </button>
        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{cantidad}</span>
        <button
          onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
          className="px-4 py-2 text-lg hover:bg-gray-50 transition-colors"
        >
          +
        </button>
      </div>
      <button
        onClick={() => agregar(producto, cantidad)}
        disabled={producto.stock === 0}
        className="flex-1 rounded-full bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
