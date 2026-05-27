'use client';
import { useState } from 'react';
import { useCarrito } from '@/store/carrito';
import { crearOrden } from '@/lib/api';

export default function CheckoutForm() {
  const { items } = useCarrito();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pagar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await crearOrden({
        nombreComprador: nombre,
        emailComprador: email,
        ...(telefono && { telefonoComprador: telefono }),
        items: items.map((i) => ({ productoId: i.producto.id, cantidad: i.cantidad })),
      });
      window.location.href = data.initPoint;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al procesar el pago';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={pagar} className="border border-[#E2DDD6] bg-white p-6 space-y-5">
      <p className="text-xs tracking-[0.25em] uppercase text-[#8A847C]">Datos de contacto</p>
      <div className="space-y-4">
        <input
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none"
        />
        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono (opcional)"
          className="w-full border-b border-[#E2DDD6] bg-transparent py-2 text-sm placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#111111] py-3.5 text-xs tracking-widest uppercase text-white hover:bg-[#2D2D2D] disabled:opacity-50 transition-colors"
      >
        {loading ? 'Redirigiendo...' : 'Pagar con MercadoPago'}
      </button>
    </form>
  );
}
