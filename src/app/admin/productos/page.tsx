'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminGetProductos, adminEliminarProducto } from '@/lib/api';
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

  if (isLoading) return <p className="text-gray-400">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          + Nuevo
        </Link>
      </div>
      {productos.length === 0 ? (
        <p className="text-gray-400">Sin productos.</p>
      ) : (
        <div className="overflow-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-right">Precio</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.nombre}</td>
                  <td className="px-4 py-3 text-gray-500">{p.categoria?.nombre}</td>
                  <td className="px-4 py-3 text-right">
                    {Number(p.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${p.stock === 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-3">
                    <Link href={`/admin/productos/${p.id}/editar`} className="text-indigo-500 hover:underline">
                      Editar
                    </Link>
                    <button
                      onClick={() => confirm('¿Eliminar?') && eliminar.mutate(p.id)}
                      className="text-red-400 hover:underline"
                    >
                      Eliminar
                    </button>
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
