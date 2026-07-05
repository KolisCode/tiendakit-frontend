import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Envíos y devoluciones — TiendaKit',
  description: 'Política de envíos y devoluciones de TiendaKit.',
};

const SECCIONES = [
  {
    titulo: 'Envíos',
    items: [
      'Despachamos a todo Colombia a través de Servientrega y Coordinadora.',
      'El tiempo estimado de entrega es de 3 a 7 días hábiles según la ciudad de destino.',
      'Envío gratis en pedidos superiores a $150.000 COP.',
      'Para Bogotá, Medellín y Cali el despacho se realiza dentro de las 48 horas hábiles siguientes al pago confirmado.',
    ],
  },
  {
    titulo: 'Devoluciones',
    items: [
      'Aceptamos devoluciones dentro de los 15 días calendario posteriores a la recepción del pedido.',
      'El producto debe estar sin uso, con todas sus etiquetas originales y en su empaque original.',
      'Para iniciar una devolución escríbenos al correo de contacto indicando el número de orden.',
      'Una vez recibido y verificado el producto, procesamos el reembolso en un plazo de 5 días hábiles.',
    ],
  },
  {
    titulo: 'Cambios',
    items: [
      'Los cambios por talla o color están disponibles sujetos al stock existente.',
      'El costo de envío del cambio corre por cuenta del comprador, salvo que el error sea nuestro.',
    ],
  },
];

export default function EnviosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <nav className="text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-10 flex gap-2">
        <Link href="/" className="hover:text-[#111111] transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-[#8A847C]">Envíos y devoluciones</span>
      </nav>

      <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A847C] mb-2">Información</p>
      <h1 className="text-3xl font-light text-[#111111] mb-12">Envíos y devoluciones</h1>

      <div className="space-y-10">
        {SECCIONES.map(({ titulo, items }) => (
          <div key={titulo}>
            <h2 className="text-sm font-semibold tracking-[0.1em] uppercase text-[#111111] mb-4 pb-3 border-b border-[#E2DDD6]">
              {titulo}
            </h2>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#8A847C] leading-relaxed">
                  <span className="text-[#C9B99A] mt-0.5 shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
