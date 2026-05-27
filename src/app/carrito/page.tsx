'use client';
import { useCarrito } from '@/store/carrito';
import Image from 'next/image';
import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CarritoPage() {
  const { items, quitar, actualizar, total, vaciar } = useCarrito();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h1>
        <Link href="/productos" className="mt-4 inline-block text-indigo-600 hover:underline">
          Ver productos
        </Link>
      </div>
    );
  }

  const totalFmt = total().toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ producto, cantidad }) => {
            const precio = Number(producto.precio).toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
            });
            return (
              <div key={producto.id} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-50 overflow-hidden">
                  {producto.imagenes[0] ? (
                    <Image
                      src={producto.imagenes[0]}
                      alt={producto.nombre}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-2xl text-gray-200">🛍️</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="font-semibold text-gray-900">{producto.nombre}</h3>
                  <p className="text-sm text-gray-400">{producto.categoria.nombre}</p>
                  <p className="font-bold text-gray-900">{precio}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => quitar(producto.id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
                  <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden text-sm">
                    <button onClick={() => actualizar(producto.id, cantidad - 1)} className="px-2 py-1 hover:bg-gray-50">−</button>
                    <span className="px-3 py-1">{cantidad}</span>
                    <button onClick={() => actualizar(producto.id, cantidad + 1)} className="px-2 py-1 hover:bg-gray-50">+</button>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={vaciar} className="text-sm text-gray-400 hover:text-red-500">
            Vaciar carrito
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4">Resumen</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>{totalFmt}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>{totalFmt}</span>
            </div>
          </div>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
