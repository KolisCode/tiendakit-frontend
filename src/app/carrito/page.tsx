'use client';
import { useState, useEffect } from 'react';
import { useCarrito } from '@/store/carrito';
import { formatCOP } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';

function CartImage({ src, slug, alt }: { src: string | null; slug: string; alt: string }) {
  const [error, setError] = useState(false);
  const imgSrc = !error ? (src || `/productos/${slug}.jpg`) : null;

  if (!imgSrc) {
    return <div className="h-full flex items-center justify-center text-[#C9B99A] text-2xl">◈</div>;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={112}
      height={144}
      className="h-full w-full object-cover"
      onError={() => setError(true)}
    />
  );
}

export default function CarritoPage() {
  const { items, quitar, actualizar, total, vaciar } = useCarrito();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Antes del mount: evitar flash SSR vs localStorage
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-28 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8A847C] mb-6">Bolsa de compras</p>
        <h1 className="text-2xl font-light text-[#111111] mb-6">Tu bolsa está vacía</h1>
        <Link
          href="/productos"
          className="inline-block border border-[#111111] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-colors"
        >
          Explorar colección
        </Link>
      </div>
    );
  }

  const totalFmt = formatCOP(total());

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-xs tracking-[0.3em] uppercase text-[#8A847C] mb-2">Bolsa de compras</p>
      <h1 className="text-2xl font-light text-[#111111] mb-10">
        {(() => { const n = items.reduce((s, i) => s + i.cantidad, 0); return `${n} ${n === 1 ? 'artículo' : 'artículos'}`; })()}
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-0 divide-y divide-[#E2DDD6]">
          {items.map(({ producto, cantidad }) => {
            const precio = formatCOP(producto.precio);
            return (
              <div key={producto.id} className="flex gap-5 py-6">
                <div className="h-36 w-28 shrink-0 bg-[#F0EDE7] overflow-hidden">
                  <CartImage
                    src={producto.imagenes?.[0] ?? null}
                    slug={producto.slug}
                    alt={producto.nombre}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">
                    {producto.categoria.nombre}
                  </span>
                  <h3 className="text-sm font-medium text-[#111111]">{producto.nombre}</h3>
                  <p className="text-sm font-semibold text-[#111111] mt-1">{precio}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => quitar(producto.id)}
                    className="text-xs text-[#B5AFA8] hover:text-[#111111] transition-colors"
                  >
                    Quitar
                  </button>
                  <div className="flex items-center border border-[#E2DDD6] text-sm">
                    <button
                      onClick={() => actualizar(producto.id, cantidad - 1)}
                      className="px-3 py-1.5 hover:bg-[#F0EDE7] transition-colors"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 min-w-[2rem] text-center text-[#111111]">{cantidad}</span>
                    <button
                      onClick={() => actualizar(producto.id, cantidad + 1)}
                      className="px-3 py-1.5 hover:bg-[#F0EDE7] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="pt-4">
            <button
              onClick={vaciar}
              className="text-xs text-[#B5AFA8] hover:text-[#111111] transition-colors tracking-wide"
            >
              Vaciar bolsa
            </button>
          </div>
        </div>

        {/* Resumen */}
        <div className="space-y-6">
          <div className="border border-[#E2DDD6] bg-white p-6">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8A847C] mb-5">Resumen</p>
            <div className="flex justify-between text-sm text-[#8A847C] mb-3">
              <span>Subtotal</span>
              <span>{totalFmt}</span>
            </div>
            <div className="border-t border-[#E2DDD6] pt-4 flex justify-between font-semibold text-[#111111]">
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
