import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto — TiendaKit',
  description: 'Ponete en contacto con TiendaKit para consultas, pedidos o soporte.',
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <nav className="text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-10 flex gap-2">
        <Link href="/" className="hover:text-[#111111] transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-[#8A847C]">Contacto</span>
      </nav>

      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-2">Hablemos</p>
      <h1 className="text-3xl font-light text-[#111111] mb-4">Contacto</h1>
      <p className="text-sm text-[#8A847C] mb-12 leading-relaxed">
        Respondemos todas las consultas dentro de las 24 horas hábiles.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E2DDD6] mb-12">
        {[
          { label: 'WhatsApp', value: '+57 300 000 0000', href: 'https://wa.me/573000000000' },
          { label: 'Email', value: 'hola@tiendakit.com', href: 'mailto:hola@tiendakit.com' },
          { label: 'Instagram', value: '@tiendakit', href: 'https://instagram.com/tiendakit' },
          { label: 'Horario', value: 'Lun–Vie 9–18 h', href: undefined },
        ].map(({ label, value, href }) => (
          <div key={label} className="bg-white p-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">{label}</p>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer"
                className="text-sm text-[#111111] hover:text-[#C9B99A] transition-colors">
                {value}
              </a>
            ) : (
              <p className="text-sm text-[#111111]">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[#E2DDD6] pt-8">
        <p className="text-xs text-[#B5AFA8] leading-relaxed">
          Para consultas sobre órdenes, incluí tu número de orden (#) en el mensaje para que podamos ayudarte más rápido.
        </p>
      </div>
    </div>
  );
}
