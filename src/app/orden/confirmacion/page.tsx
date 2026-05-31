'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCarrito } from '@/store/carrito';

function ConfirmacionContent() {
  const sp = useSearchParams();
  const estado = sp.get('estado');
  const ordenId = sp.get('ordenId');
  const vaciar = useCarrito((s) => s.vaciar);

  useEffect(() => {
    if (estado === 'pagado') vaciar();
  }, [estado, vaciar]);

  const ok = estado === 'pagado';
  const pendiente = estado === 'pendiente';

  return (
    <div className="mx-auto max-w-lg px-6 py-28 text-center">
      {/* Indicador visual */}
      <div className="mb-8 flex justify-center">
        <div
          className={`flex h-16 w-16 items-center justify-center border ${
            ok
              ? 'border-[#111111] text-[#111111]'
              : pendiente
              ? 'border-[#C9B99A] text-[#C9B99A]'
              : 'border-[#B5AFA8] text-[#B5AFA8]'
          }`}
        >
          <span className="text-2xl">
            {ok ? '✓' : pendiente ? '◌' : '✕'}
          </span>
        </div>
      </div>

      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-3">
        {ok ? 'Pago exitoso' : pendiente ? 'En proceso' : 'Pago cancelado'}
      </p>

      <h1 className="text-2xl font-light text-[#111111] mb-4">
        {ok
          ? 'Tu orden fue confirmada.'
          : pendiente
          ? 'Pago pendiente de confirmación.'
          : 'El pago no fue completado.'}
      </h1>

      <p className="text-sm text-[#8A847C] leading-relaxed">
        {ok
          ? `Orden #${ordenId} procesada correctamente. Recibirás tu pedido pronto.`
          : pendiente
          ? `Orden #${ordenId} — estamos esperando la confirmación del pago.`
          : 'No se realizó ningún cargo. Tu bolsa sigue guardada.'}
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/productos"
          className="inline-block bg-[#111111] text-white px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] transition-colors"
        >
          Seguir comprando
        </Link>
        {!ok && (
          <Link
            href="/carrito"
            className="inline-block border border-[#E2DDD6] px-10 py-3.5 text-xs tracking-widest uppercase text-[#8A847C] hover:border-[#111111] hover:text-[#111111] transition-colors"
          >
            Volver a la bolsa
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense>
      <ConfirmacionContent />
    </Suspense>
  );
}
