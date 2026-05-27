'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminGetOrdenes, adminActualizarEstadoOrden, adminEstadisticas } from '@/lib/api';
import { Orden } from '@/types';

const ESTADOS = ['PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO'] as const;
const ESTADO_COLOR: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  PAGADO: 'bg-green-100 text-green-700',
  ENVIADO: 'bg-blue-100 text-blue-700',
  CANCELADO: 'bg-red-100 text-red-600',
};

export default function AdminOrdenesPage() {
  const qc = useQueryClient();
  const { data: ordenes = [], isLoading } = useQuery<Orden[]>({
    queryKey: ['admin-ordenes'],
    queryFn: adminGetOrdenes,
  });

  const { data: stats = [] } = useQuery({
    queryKey: ['admin-estadisticas'],
    queryFn: adminEstadisticas,
  });

  const actualizarEstado = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: string }) =>
      adminActualizarEstadoOrden(id, estado),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-ordenes'] }),
  });

  const totalPagado = ordenes
    .filter((o) => o.estado === 'PAGADO' || o.estado === 'ENVIADO')
    .reduce((s, o) => s + Number(o.total), 0);

  if (isLoading) return <p className="text-gray-400">Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Órdenes</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-gray-100 p-5 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total órdenes</p>
          <p className="text-3xl font-bold mt-1">{ordenes.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-5 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-3xl font-bold mt-1">
            {totalPagado.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-5 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Pendientes</p>
          <p className="text-3xl font-bold mt-1 text-yellow-600">
            {ordenes.filter((o) => o.estado === 'PENDIENTE').length}
          </p>
        </div>
      </div>

      {/* Tabla */}
      {ordenes.length === 0 ? (
        <p className="text-gray-400">Sin órdenes aún.</p>
      ) : (
        <div className="overflow-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Comprador</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-right">Cambiar estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordenes.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">#{o.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div>{o.nombreComprador}</div>
                    <div className="text-xs text-gray-400">{o.emailComprador}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {Number(o.total).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTADO_COLOR[o.estado]}`}>
                      {o.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(o.createdAt).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={o.estado}
                      onChange={(e) => actualizarEstado.mutate({ id: o.id, estado: e.target.value })}
                      className="rounded-lg border border-gray-200 px-2 py-1 text-xs focus:border-indigo-400 focus:outline-none"
                    >
                      {ESTADOS.map((est) => (
                        <option key={est} value={est}>{est}</option>
                      ))}
                    </select>
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
