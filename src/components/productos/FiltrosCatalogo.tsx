'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { Categoria } from '@/types';

interface Props { categorias: Categoria[] }

const SORT_OPTIONS = [
  { value: '', label: 'Más recientes' },
  { value: 'precio_asc', label: 'Precio: menor a mayor' },
  { value: 'precio_desc', label: 'Precio: mayor a menor' },
];

export default function FiltrosCatalogo({ categorias }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/productos?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParam('q', searchRef.current?.value.trim() ?? '');
  };

  const activeLinkCls = 'font-semibold text-[#111111]';
  const inactiveLinkCls = 'text-[#8A847C] hover:text-[#111111]';

  return (
    <div className="space-y-8">
      {/* Búsqueda */}
      <form onSubmit={handleSearch}>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Buscar</p>
        <div className="flex border-b border-[#E2DDD6] focus-within:border-[#111111] transition-colors">
          <input
            ref={searchRef}
            type="text"
            defaultValue={sp.get('q') ?? ''}
            placeholder="Nombre o descripción..."
            className="flex-1 bg-transparent py-2 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:outline-none"
          />
          <button type="submit" className="pl-2 text-[#8A847C] hover:text-[#111111] transition-colors text-xs">
            →
          </button>
        </div>
      </form>
      {/* Categoría */}
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Categoría</p>
        <ul className="space-y-0.5 text-sm">
          <li>
            <button onClick={() => setParam('categoria', '')}
              className={`w-full text-left py-1.5 transition-colors ${!sp.get('categoria') ? activeLinkCls : inactiveLinkCls}`}>
              Todas
            </button>
          </li>
          {categorias.map((c) => (
            <li key={c.id}>
              <button onClick={() => setParam('categoria', c.slug)}
                className={`w-full text-left py-1.5 transition-colors ${sp.get('categoria') === c.slug ? activeLinkCls : inactiveLinkCls}`}>
                {c.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Precio</p>
        <div className="space-y-2">
          <input key={`min-${sp.get('minPrecio')}`} type="number" placeholder="Mínimo"
            defaultValue={sp.get('minPrecio') ?? ''}
            onBlur={(e) => setParam('minPrecio', e.target.value)}
            className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none" />
          <input key={`max-${sp.get('maxPrecio')}`} type="number" placeholder="Máximo"
            defaultValue={sp.get('maxPrecio') ?? ''}
            onBlur={(e) => setParam('maxPrecio', e.target.value)}
            className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none" />
        </div>
      </div>

      {/* Ordenar */}
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Ordenar</p>
        <ul className="space-y-0.5 text-sm">
          {SORT_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button onClick={() => setParam('sort', opt.value)}
                className={`w-full text-left py-1.5 transition-colors ${(sp.get('sort') ?? '') === opt.value ? activeLinkCls : inactiveLinkCls}`}>
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
