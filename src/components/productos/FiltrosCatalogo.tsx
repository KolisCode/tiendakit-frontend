'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Categoria } from '@/types';

interface Props { categorias: Categoria[] }

export default function FiltrosCatalogo({ categorias }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/productos?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Categoría</p>
        <ul className="space-y-1 text-sm">
          <li>
            <button
              onClick={() => setParam('categoria', '')}
              className={`w-full text-left py-1.5 transition-colors ${
                !sp.get('categoria')
                  ? 'font-semibold text-[#111111]'
                  : 'text-[#8A847C] hover:text-[#111111]'
              }`}
            >
              Todas
            </button>
          </li>
          {categorias.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setParam('categoria', c.slug)}
                className={`w-full text-left py-1.5 transition-colors ${
                  sp.get('categoria') === c.slug
                    ? 'font-semibold text-[#111111]'
                    : 'text-[#8A847C] hover:text-[#111111]'
                }`}
              >
                {c.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Precio</p>
        <div className="space-y-2 text-sm">
          <input
            type="number"
            placeholder="Mínimo"
            defaultValue={sp.get('minPrecio') ?? ''}
            onBlur={(e) => setParam('minPrecio', e.target.value)}
            className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none"
          />
          <input
            type="number"
            placeholder="Máximo"
            defaultValue={sp.get('maxPrecio') ?? ''}
            onBlur={(e) => setParam('maxPrecio', e.target.value)}
            className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
