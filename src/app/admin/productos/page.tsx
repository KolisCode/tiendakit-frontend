'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminGetProductos, adminEliminarProducto } from '@/lib/api';
import { formatCOP } from '@/lib/format';
import { Producto } from '@/types';
import Link from 'next/link';

export default function AdminProductosPage() {
  const qc = useQueryClient();
  const { data: productos = [], isLoading } = useQuery<Producto[]>({
    queryKey: ['admin-productos'],
    queryFn: adminGetProductos,
  });

  const eliminar = useMutation({
    mutationFn: adminEliminarProducto,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-productos'] }),
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Inventario</p>
          <h1 className="text-xl font-light text-[#111111]">Productos</h1>
        </div>
        <Link href="/admin/productos/nuevo"
          className="bg-[#111111] text-white px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] transition-colors">
          + Nuevo
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#8A847C]">Cargando...</p>
      ) : productos.length === 0 ? (
        <p className="text-sm text-[#B5AFA8]">Sin productos aún.</p>
      ) : (
        <div className="border border-[#E2DDD6] overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#E2DDD6] bg-[#F7F5F1]">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Nombre</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Categoría</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Precio</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Stock</th>
                <th className="px-4 py-3 text-center text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Estado</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD6] bg-white">
              {productos.map((p) => (
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
                    <span className={`inline-block px-2 py-0.5 text-[10px] tracking-widest uppercase ${
                      p.activo
                        ? 'bg-[#F0EDE7] text-[#8A847C]'
                        : 'bg-red-50 text-red-400'
                    }`}>
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
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
