'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  imagenes: string[];
  nombre: string;
}

const Placeholder = ({ small }: { small?: boolean }) => (
  <div className={`h-full w-full flex items-center justify-center bg-[#F0EDE7] text-[#C9B99A] ${small ? 'text-base' : 'text-6xl'}`}>
    ◈
  </div>
);

export default function GaleriaProducto({ imagenes, nombre }: Props) {
  const [activa, setActiva] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());

  const addError = (i: number) => setErrors((prev) => new Set(prev).add(i));

  if (imagenes.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[#F0EDE7]">
        <Placeholder />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE7] relative">
        {errors.has(activa) ? (
          <Placeholder />
        ) : (
          <Image
            src={imagenes[activa]}
            alt={nombre}
            width={600}
            height={800}
            className="h-full w-full object-cover transition-opacity duration-300"
            priority
            onError={() => addError(activa)}
          />
        )}
      </div>

      {/* Thumbnails — solo si hay más de una imagen */}
      {imagenes.length > 1 && (
        <div className="flex gap-2">
          {imagenes.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiva(i)}
              className={`h-20 w-16 shrink-0 overflow-hidden bg-[#F0EDE7] transition-all ${
                i === activa
                  ? 'ring-1 ring-[#111111] ring-offset-1'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              {errors.has(i) ? (
                <Placeholder small />
              ) : (
                <Image
                  src={img}
                  alt={`${nombre} ${i + 1}`}
                  width={64}
                  height={80}
                  className="h-full w-full object-cover"
                  onError={() => addError(i)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
