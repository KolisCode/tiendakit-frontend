import { create } from 'zustand';

interface Toast {
  id: string;
  nombre: string;
  imagen: string | null;
}

interface ToastState {
  toasts: Toast[];
  agregar: (nombre: string, imagen: string | null) => void;
  quitar: (id: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],

  agregar: (nombre, imagen) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, nombre, imagen }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },

  quitar: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
