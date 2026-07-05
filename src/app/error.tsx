'use client';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-6 py-28 text-center">
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9B99A] mb-6">Error</p>
      <h1 className="text-4xl font-light text-[#111111] mb-4">
        Algo salió<br />
        <span className="italic">mal.</span>
      </h1>
      <p className="text-sm text-[#8A847C] mt-6 mb-12 leading-relaxed">
        Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-block bg-[#111111] text-white px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="inline-block border border-[#E2DDD6] px-10 py-3.5 text-xs tracking-widest uppercase text-[#8A847C] hover:border-[#111111] hover:text-[#111111] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
