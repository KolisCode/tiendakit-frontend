'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminGetProductos, adminActualizarProducto, adminEliminarProducto } from '@/lib/api';
import { formatCOP } from '@/lib/format';
import { Producto } from '@/types';
import Link from 'next/link';

export default function AdminProductosPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState('');

  const { data: productos = [], isLoading } = useQuery<Producto[]>({
    queryKey: ['admin-productos'],
    queryFn: adminGetProductos,
  });

  const toggleActivo = useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      adminActualizarProducto(id, { activo }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-productos'] }),
  });

  const eliminar = useMutation({
    mutationFn: adminEliminarProducto,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-productos'] }),
  });

  const filtrados = q.trim()
    ? productos.filter((p) =>
        p.nombre.toLowerCase().includes(q.toLowerCase()) ||
        p.categoria?.nombre.toLowerCase().includes(q.toLowerCase()),
      )
    : productos;

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Inventario</p>
          <h1 className="text-xl font-light text-[#111111]">Productos</h1>
        </div>
        <Link href="/admin/productos/nuevo"
          className="bg-[#111111] text-white px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] transition-colors">
          + Nuevo
        </Link>
      </div>

      {/* Búsqueda inline */}
      <div className="mb-5">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o categoría..."
          className="w-full max-w-sm border-b border-[#E2DDD6] bg-transparent py-2 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none transition-colors"
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-[#8A847C]">Cargando...</p>
      ) : filtrados.length === 0 ? (
        <p className="text-sm text-[#B5AFA8]">{q ? 'Sin resultados.' : 'Sin productos aún.'}</p>
      ) : (
        <div className="border border-[#E2DDD6] overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#E2DDD6] bg-[#F7F5F1]">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Nombre</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Categoría</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Precio</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Stock</th>
                <th className="px-4 py-3 text-center text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Activo</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD6] bg-white">
              {filtrados.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5F1] transition-colors">
                  <td className="px-4 py-3 font-medium text-[#111111]">{p.nombre}</td>
                  <td className="px-4 py-3 text-[#8A847C] text-xs">{p.categoria?.nombre}</td>
                  <td className="px-4 py-3 text-right text-[#111111]">{formatCOP(p.precio)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${p.stock === 0 ? 'text-red-500' : 'text-[#111111]'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActivo.mutate({ id: p.id, activo: !p.activo })}
                      disabled={toggleActivo.isPending && toggleActivo.variables?.id === p.id}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors disabled:opacity-50 ${
                        p.activo ? 'bg-[#111111]' : 'bg-[#E2DDD6]'
                      }`}
                      title={p.activo ? 'Desactivar' : 'Activar'}
                    >
                      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                        p.activo ? 'translate-x-4' : 'translate-x-1'
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/productos/${p.id}/editar`}
                        className="text-xs text-[#8A847C] hover:text-[#111111] transition-colors">
                        Editar
                      </Link>
                      <button
                        onClick={() => confirm('¿Eliminar este producto?') && eliminar.mutate(p.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
