'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { adminGetOrdenes, adminActualizarEstadoOrden } from '@/lib/api';
import { formatCOP } from '@/lib/format';
import { Orden } from '@/types';

const ESTADOS = ['PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO'] as const;

const ESTADO_STYLE: Record<string, string> = {
  PENDIENTE: 'bg-amber-50 text-amber-600',
  PAGADO:    'bg-emerald-50 text-emerald-600',
  ENVIADO:   'bg-sky-50 text-sky-600',
  CANCELADO: 'bg-red-50 text-red-500',
};

export default function AdminOrdenesPage() {
  const qc = useQueryClient();
  const { data: ordenes = [], isLoading } = useQuery<Orden[]>({
    queryKey: ['admin-ordenes'],
    queryFn: adminGetOrdenes,
  });

  const actualizarEstado = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: string }) =>
      adminActualizarEstadoOrden(id, estado),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-ordenes'] }),
  });

  const totalPagado = ordenes
    .filter((o) => o.estado === 'PAGADO' || o.estado === 'ENVIADO')
    .reduce((s, o) => s + Number(o.total), 0);

  const pendientes = ordenes.filter((o) => o.estado === 'PENDIENTE').length;

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Gestión</p>
        <h1 className="text-xl font-light text-[#111111]">Órdenes</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total órdenes', value: ordenes.length, className: '' },
          { label: 'Ingresos', value: formatCOP(totalPagado), className: '' },
          { label: 'Pendientes', value: pendientes, className: pendientes > 0 ? 'text-amber-600' : '' },
        ].map(({ label, value, className }) => (
          <div key={label} className="border border-[#E2DDD6] bg-white p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">{label}</p>
            <p className={`text-2xl font-light ${className || 'text-[#111111]'}`}>{value}</p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-[#8A847C]">Cargando...</p>
      ) : ordenes.length === 0 ? (
        <p className="text-sm text-[#B5AFA8]">Sin órdenes aún.</p>
      ) : (
        <div className="border border-[#E2DDD6] overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#E2DDD6] bg-[#F7F5F1]">
              <tr>
                {['#', 'Comprador', 'Total', 'Estado', 'Fecha', 'Cambiar estado'].map((h, i) => (
                  <th key={h} className={`px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-[#8A847C] ${i > 1 ? 'text-center' : 'text-left'} last:text-right`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD6] bg-white">
              {ordenes.map((o) => (
                <tr key={o.id} className="hover:bg-[#F7F5F1] transition-colors">
                  <td className="px-4 py-3 text-[#B5AFA8] text-xs">#{o.id}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/ordenes/${o.id}`} className="hover:underline">
                      <p className="font-medium text-[#111111]">{o.nombreComprador}</p>
                    </Link>
                    <p className="text-xs text-[#8A847C]">{o.emailComprador}</p>
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-[#111111]">
                    {formatCOP(o.total)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] tracking-widest uppercase ${ESTADO_STYLE[o.estado]}`}>
                      {o.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-[#8A847C]">
                    {(() => { const d = new Date(o.createdAt); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; })()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={o.estado}
                      onChange={(e) => actualizarEstado.mutate({ id: o.id, estado: e.target.value })}
                      className="border border-[#E2DDD6] bg-white px-2 py-1 text-xs text-[#111111] focus:border-[#111111] focus:outline-none">
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
