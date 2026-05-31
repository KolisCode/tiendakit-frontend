'use client';
import Image from 'next/image';
import { useToast } from '@/store/toast';

export default function Toaster() {
  const { toasts, quitar } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-4 bg-[#111111] text-white px-4 py-3 shadow-xl min-w-[260px] max-w-[320px] animate-fade-up"
        >
          {/* Thumbnail */}
          <div className="h-12 w-10 shrink-0 bg-[#2D2D2D] overflow-hidden">
            {t.imagen ? (
              <Image
                src={t.imagen}
                alt={t.nombre}
                width={40}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-[#C9B99A] text-xs">◈</div>
            )}
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9B99A] mb-0.5">
              Agregado a la bolsa
            </p>
            <p className="text-xs text-white truncate">{t.nombre}</p>
          </div>

          {/* Cerrar */}
          <button
            onClick={() => quitar(t.id)}
            className="text-white/30 hover:text-white transition-colors text-base leading-none ml-1 shrink-0"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
