import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pagos seguros — TiendaKit',
  description: 'Información sobre los métodos de pago seguros en TiendaKit.',
};

const METODOS = [
  { nombre: 'Tarjeta de crédito y débito', desc: 'Visa, Mastercard, American Express. Hasta 36 cuotas sin interés según tu banco.' },
  { nombre: 'PSE', desc: 'Pago directo desde tu cuenta bancaria en tiempo real.' },
  { nombre: 'Efecty y Baloto', desc: 'Pago en efectivo en puntos autorizados a nivel nacional.' },
  { nombre: 'Nequi y Daviplata', desc: 'Billeteras digitales con confirmación inmediata.' },
];

export default function PagosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <nav className="text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-10 flex gap-2">
        <Link href="/" className="hover:text-[#111111] transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-[#8A847C]">Pagos seguros</span>
      </nav>

      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-2">Información</p>
      <h1 className="text-3xl font-light text-[#111111] mb-4">Pagos seguros</h1>
      <p className="text-sm text-[#8A847C] mb-12 leading-relaxed">
        Todos los pagos son procesados por <strong className="text-[#111111] font-medium">MercadoPago</strong>, el procesador de pagos más utilizado en Latinoamérica. Tu información financiera nunca llega a nuestros servidores.
      </p>

      <div className="mb-10">
        <h2 className="text-sm font-semibold tracking-[0.1em] uppercase text-[#111111] mb-4 pb-3 border-b border-[#E2DDD6]">
          Métodos de pago disponibles
        </h2>
        <div className="space-y-4">
          {METODOS.map(({ nombre, desc }) => (
            <div key={nombre} className="flex gap-4 border border-[#E2DDD6] bg-white p-4">
              <span className="text-[#C9B99A] mt-0.5 shrink-0">✦</span>
              <div>
                <p className="text-sm font-medium text-[#111111] mb-1">{nombre}</p>
                <p className="text-xs text-[#8A847C] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] text-white p-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Seguridad</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Todas las transacciones están cifradas con SSL de 256 bits. MercadoPago cuenta con certificación PCI-DSS nivel 1 — el estándar más alto de seguridad en pagos electrónicos.
        </p>
      </div>
    </div>
  );
}
