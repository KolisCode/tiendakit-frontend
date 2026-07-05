import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guía de tallas — TiendaKit',
  description: 'Guía de tallas para ropa y accesorios de TiendaKit.',
};

const TALLAS_ROPA = [
  { talla: 'XS', pecho: '80–84', cintura: '60–64', cadera: '86–90' },
  { talla: 'S',  pecho: '84–88', cintura: '64–68', cadera: '90–94' },
  { talla: 'M',  pecho: '88–92', cintura: '68–72', cadera: '94–98' },
  { talla: 'L',  pecho: '92–96', cintura: '72–76', cadera: '98–102' },
  { talla: 'XL', pecho: '96–100', cintura: '76–80', cadera: '102–106' },
];

export default function TallasPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <nav className="text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-10 flex gap-2">
        <Link href="/" className="hover:text-[#111111] transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-[#8A847C]">Guía de tallas</span>
      </nav>

      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-2">Información</p>
      <h1 className="text-3xl font-light text-[#111111] mb-4">Guía de tallas</h1>
      <p className="text-sm text-[#8A847C] mb-12 leading-relaxed">
        Todas las medidas están en centímetros. Si estás entre dos tallas, te recomendamos la más grande para mayor comodidad.
      </p>

      <div className="mb-10">
        <h2 className="text-sm font-semibold tracking-[0.1em] uppercase text-[#111111] mb-4 pb-3 border-b border-[#E2DDD6]">
          Ropa — medidas del cuerpo (cm)
        </h2>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F7F5F1] border-b border-[#E2DDD6]">
              <tr>
                {['Talla', 'Pecho', 'Cintura', 'Cadera'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-[#8A847C]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD6] bg-white">
              {TALLAS_ROPA.map((row) => (
                <tr key={row.talla} className="hover:bg-[#F7F5F1]">
                  <td className="px-4 py-3 font-semibold text-[#111111]">{row.talla}</td>
                  <td className="px-4 py-3 text-[#8A847C]">{row.pecho}</td>
                  <td className="px-4 py-3 text-[#8A847C]">{row.cintura}</td>
                  <td className="px-4 py-3 text-[#8A847C]">{row.cadera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#F7F5F1] border border-[#E2DDD6] p-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">¿Dudas con tu talla?</p>
        <p className="text-sm text-[#111111]">
          Escríbenos por WhatsApp o al correo de contacto y te ayudamos a elegir la talla ideal.
        </p>
      </div>
    </div>
  );
}
