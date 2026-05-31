'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { adminGetOrdenById, adminActualizarEstadoOrden } from '@/lib/api';
import { formatCOP } from '@/lib/format';
import { Orden } from '@/types';

const ESTADOS = ['PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO'] as const;

const ESTADO_STYLE: Record<string, string> = {
  PENDIENTE: 'bg-amber-50 text-amber-600',
  PAGADO:    'bg-emerald-50 text-emerald-600',
  ENVIADO:   'bg-sky-50 text-sky-600',
  CANCELADO: 'bg-red-50 text-red-500',
};

export default function OrdenDetallePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();

  const { data: orden, isLoading } = useQuery<Orden>({
    queryKey: ['admin-orden', id],
    queryFn: () => adminGetOrdenById(Number(id)),
  });

  const actualizarEstado = useMutation({
    mutationFn: (estado: string) => adminActualizarEstadoOrden(Number(id), estado),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-orden', id] });
      qc.invalidateQueries({ queryKey: ['admin-ordenes'] });
    },
  });

  if (isLoading) return <p className="text-sm text-[#8A847C]">Cargando...</p>;
  if (!orden) return (
    <div>
      <p className="text-sm text-[#8A847C] mb-4">Orden no encontrada.</p>
      <Link href="/admin/ordenes" className="text-xs tracking-widest uppercase text-[#8A847C] hover:text-[#111111]">
        ← Volver
      </Link>
    </div>
  );

  const fecha = new Date(orden.createdAt);

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/ordenes" className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors">
          ← Órdenes
        </Link>
        <span className="text-[#E2DDD6]">/</span>
        <span className="text-[10px] tracking-widest uppercase text-[#111111]">#{orden.id}</span>
      </div>

      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Orden</p>
          <h1 className="text-xl font-light text-[#111111]">#{orden.id}</h1>
          <p className="text-xs text-[#B5AFA8] mt-1">
            {fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()} — {fecha.getHours().toString().padStart(2,'0')}:{fecha.getMinutes().toString().padStart(2,'0')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-[10px] tracking-widest uppercase ${ESTADO_STYLE[orden.estado]}`}>
            {orden.estado}
          </span>
          <select
            value={orden.estado}
            onChange={(e) => actualizarEstado.mutate(e.target.value)}
            disabled={actualizarEstado.isPending}
            className="border border-[#E2DDD6] bg-white px-2 py-1.5 text-xs text-[#111111] focus:border-[#111111] focus:outline-none disabled:opacity-50"
          >
            {ESTADOS.map((est) => <option key={est} value={est}>{est}</option>)}
          </select>
        </div>
      </div>

      {/* Comprador */}
      <div className="border border-[#E2DDD6] bg-white p-5 mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-4">Comprador</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-[10px] text-[#B5AFA8] mb-1">Nombre</p>
            <p className="text-[#111111] font-medium">{orden.nombreComprador}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#B5AFA8] mb-1">Email</p>
            <p className="text-[#111111]">{orden.emailComprador}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#B5AFA8] mb-1">Teléfono</p>
            <p className="text-[#111111]">{orden.telefonoComprador ?? '—'}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="border border-[#E2DDD6] overflow-auto mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-[#E2DDD6] bg-[#F7F5F1]">
            <tr>
              {['Producto', 'Precio unit.', 'Cant.', 'Subtotal'].map((h, i) => (
                <th key={h} className={`px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-[#8A847C] ${i === 0 ? 'text-left' : 'text-right'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DDD6] bg-white">
            {orden.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#111111]">{item.producto.nombre}</p>
                  <p className="text-[10px] text-[#B5AFA8]">{item.producto.categoria?.nombre}</p>
                </td>
                <td className="px-4 py-3 text-right text-[#8A847C]">{formatCOP(item.precio)}</td>
                <td className="px-4 py-3 text-right text-[#111111]">{item.cantidad}</td>
                <td className="px-4 py-3 text-right font-medium text-[#111111]">
                  {formatCOP(Number(item.precio) * item.cantidad)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-[#E2DDD6] bg-[#F7F5F1]">
            <tr>
              <td colSpan={3} className="px-4 py-3 text-right text-xs uppercase tracking-widest text-[#8A847C]">Total</td>
              <td className="px-4 py-3 text-right font-semibold text-[#111111]">{formatCOP(orden.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        onClick={() => router.back()}
        className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors"
      >
        ← Volver a órdenes
      </button>
    </div>
  );
}
