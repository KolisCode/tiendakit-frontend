'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';
import { useAdmin } from '@/store/admin';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setToken = useAdmin((s) => s.setToken);
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      setToken(data.access_token);
      router.push('/admin/productos');
    } catch {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const fieldCls = 'w-full border border-[#E2DDD6] bg-white px-3 py-2.5 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none transition-colors';

  return (
    <div className="min-h-screen bg-[#F7F5F1] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-lg font-semibold tracking-[0.15em] uppercase text-[#111111]">TiendaKit</p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mt-1">Panel de administración</p>
        </div>
        <form onSubmit={login} className="border border-[#E2DDD6] bg-white p-8 space-y-4">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" className={fieldCls} />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña" className={fieldCls} />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#111111] text-white py-3 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] disabled:opacity-50 transition-colors">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
