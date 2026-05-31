'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { adminEstadisticas, adminGetOrdenes } from '@/lib/api';
import { formatCOP } from '@/lib/format';
import { Orden } from '@/types';

interface StatDia {
  dia: string;
  total_ordenes: number;
  ingresos: string;
}

function BarChart({ data }: { data: StatDia[] }) {
  const ordenado = [...data].reverse(); // API devuelve DESC, el gráfico va ASC
  const maxIngresos = Math.max(...ordenado.map((d) => Number(d.ingresos)), 1);

  if (ordenado.length === 0) {
    return (
      <p className="text-sm text-[#B5AFA8] text-center py-10">
        Sin ventas registradas en los últimos 30 días.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-end gap-[3px] h-36 px-1">
        {ordenado.map((d) => {
          const pct = (Number(d.ingresos) / maxIngresos) * 100;
          const fecha = new Date(d.dia);
          const label = `${fecha.getDate()}/${fecha.getMonth() + 1}`;
          return (
            <div
              key={d.dia}
              className="flex-1 flex flex-col items-center gap-1 group"
              title={`${label}: ${formatCOP(d.ingresos)} · ${d.total_ordenes} ${d.total_ordenes === 1 ? 'orden' : 'órdenes'}`}
            >
              <div className="w-full flex items-end" style={{ height: '128px' }}>
                <div
                  className="w-full bg-[#111111] group-hover:bg-[#C9B99A] transition-colors"
                  style={{ height: `${Math.max(pct, 2)}%` }}
                />
              </div>
              {ordenado.length <= 15 && (
                <span className="text-[8px] text-[#B5AFA8] leading-none">{label}</span>
              )}
            </div>
          );
        })}
      </div>
      {ordenado.length > 15 && (
        <div className="flex justify-between mt-2 text-[10px] text-[#B5AFA8]">
          <span>
            {(() => { const d = new Date(ordenado[0].dia); return `${d.getDate()}/${d.getMonth() + 1}`; })()}
          </span>
          <span>
            {(() => { const d = new Date(ordenado[ordenado.length - 1].dia); return `${d.getDate()}/${d.getMonth() + 1}`; })()}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const { data: stats = [], isLoading: loadingStats } = useQuery<StatDia[]>({
    queryKey: ['admin-estadisticas'],
    queryFn: adminEstadisticas,
  });

  const { data: ordenes = [], isLoading: loadingOrdenes } = useQuery<Orden[]>({
    queryKey: ['admin-ordenes'],
    queryFn: adminGetOrdenes,
  });

  const totalIngresos = stats.reduce((s, d) => s + Number(d.ingresos), 0);
  const totalOrdenes = stats.reduce((s, d) => s + d.total_ordenes, 0);
  const promedioOrden = totalOrdenes > 0 ? totalIngresos / totalOrdenes : 0;

  const pendientes = ordenes.filter((o) => o.estado === 'PENDIENTE').length;
  const enviados = ordenes.filter((o) => o.estado === 'ENVIADO').length;

  const CARDS = [
    { label: 'Ingresos (30 d)', value: loadingStats ? '—' : formatCOP(totalIngresos) },
    { label: 'Órdenes pagadas (30 d)', value: loadingStats ? '—' : String(totalOrdenes) },
    { label: 'Ticket promedio', value: loadingStats ? '—' : formatCOP(promedioOrden) },
    { label: 'Pendientes de pago', value: loadingOrdenes ? '—' : String(pendientes), highlight: pendientes > 0 },
    { label: 'Por enviar', value: loadingOrdenes ? '—' : String(enviados), highlight: enviados > 0 },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Panel</p>
        <h1 className="text-xl font-light text-[#111111]">Inicio</h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-10">
        {CARDS.map(({ label, value, highlight }) => (
          <div key={label} className="border border-[#E2DDD6] bg-white p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2 leading-snug">{label}</p>
            <p className={`text-xl font-light ${highlight ? 'text-amber-600' : 'text-[#111111]'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Gráfico ingresos */}
      <div className="border border-[#E2DDD6] bg-white p-6 mb-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Ventas</p>
            <h2 className="text-sm font-light text-[#111111]">Ingresos diarios — últimos 30 días</h2>
          </div>
          {!loadingStats && stats.length > 0 && (
            <span className="text-[10px] text-[#B5AFA8]">{stats.length} días con ventas</span>
          )}
        </div>
        {loadingStats ? (
          <div className="h-36 flex items-center justify-center">
            <p className="text-sm text-[#8A847C]">Cargando...</p>
          </div>
        ) : (
          <BarChart data={stats} />
        )}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 gap-px bg-[#E2DDD6] sm:grid-cols-3">
        {[
          { href: '/admin/productos', label: 'Productos', desc: 'Gestionar inventario' },
          { href: '/admin/categorias', label: 'Categorías', desc: 'Organizar catálogo' },
          { href: '/admin/ordenes', label: 'Órdenes', desc: 'Ver y gestionar pedidos' },
        ].map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="bg-white hover:bg-[#F7F5F1] transition-colors p-6 flex flex-col gap-1"
          >
            <span className="text-sm font-medium text-[#111111]">{label}</span>
            <span className="text-xs text-[#8A847C]">{desc}</span>
            <span className="text-[10px] tracking-widest uppercase text-[#C9B99A] mt-2">Ir →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
