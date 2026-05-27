'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCarrito } from '@/store/carrito';
import { Suspense } from 'react';

function ConfirmacionContent() {
  const sp = useSearchParams();
  const estado = sp.get('estado');
  const ordenId = sp.get('ordenId');
  const vaciar = useCarrito((s) => s.vaciar);

  useEffect(() => {
    if (estado === 'pagado') vaciar();
  }, [estado, vaciar]);

  const ok = estado === 'pagado';

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-6xl mb-6">{ok ? '✅' : estado === 'pendiente' ? '⏳' : '❌'}</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        {ok ? '¡Pago exitoso!' : estado === 'pendiente' ? 'Pago pendiente' : 'Pago cancelado'}
      </h1>
      <p className="text-gray-500 mb-2">
        {ok
          ? `Tu orden #${ordenId} fue procesada correctamente.`
          : estado === 'pendiente'
          ? `Tu orden #${ordenId} está pendiente de confirmación.`
          : 'El pago no fue completado. Tu carrito sigue guardado.'}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/productos"
          className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          Seguir comprando
        </Link>
        {!ok && (
          <Link
            href="/carrito"
            className="rounded-full border border-gray-300 px-8 py-3 font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            Volver al carrito
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
