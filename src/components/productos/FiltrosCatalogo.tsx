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
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-6">
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Categoría</h3>
        <ul className="space-y-1.5 text-sm">
          <li>
            <button
              onClick={() => setParam('categoria', '')}
              className={`w-full text-left px-2 py-1 rounded hover:bg-indigo-50 ${!sp.get('categoria') ? 'font-semibold text-indigo-600' : 'text-gray-600'}`}
            >
              Todas
            </button>
          </li>
          {categorias.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setParam('categoria', c.slug)}
                className={`w-full text-left px-2 py-1 rounded hover:bg-indigo-50 ${sp.get('categoria') === c.slug ? 'font-semibold text-indigo-600' : 'text-gray-600'}`}
              >
                {c.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Precio</h3>
        <div className="space-y-2 text-sm">
          <input
            type="number"
            placeholder="Mínimo"
            defaultValue={sp.get('minPrecio') ?? ''}
            onBlur={(e) => setParam('minPrecio', e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-400 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Máximo"
            defaultValue={sp.get('maxPrecio') ?? ''}
            onBlur={(e) => setParam('maxPrecio', e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-indigo-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
