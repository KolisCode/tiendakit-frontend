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
    <form onSubmit={pagar} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
      <h2 className="font-bold text-lg">Datos del comprador</h2>
      <input
        required
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre completo"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
      />
      <input
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono (opcional)"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
      >
        {loading ? 'Redirigiendo...' : 'Pagar con MercadoPago'}
      </button>
    </form>
  );
}
