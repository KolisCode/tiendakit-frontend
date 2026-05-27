import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  token: string | null;
  setToken: (token: string) => void;
  cerrarSesion: () => void;
  estaAutenticado: () => boolean;
}

export const useAdmin = create<AdminState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => {
        set({ token });
        if (typeof window !== 'undefined') localStorage.setItem('tk_token', token);
      },
      cerrarSesion: () => {
        set({ token: null });
        if (typeof window !== 'undefined') localStorage.removeItem('tk_token');
      },
      estaAutenticado: () => !!get().token,
    }),
    { name: 'tiendakit-admin' },
  ),
);
