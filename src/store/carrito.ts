import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Producto, ItemCarrito } from '@/types';

interface CarritoState {
  items: ItemCarrito[];
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (productoId: number) => void;
  actualizar: (productoId: number, cantidad: number) => void;
  vaciar: () => void;
  total: () => number;
  conteo: () => number;
}

export const useCarrito = create<CarritoState>()(
  persist(
    (set, get) => ({
      items: [],

      agregar: (producto, cantidad = 1) =>
        set((state) => {
          const existe = state.items.find((i) => i.producto.id === producto.id);
          if (existe) {
            return {
              items: state.items.map((i) =>
                i.producto.id === producto.id
                  ? { ...i, cantidad: Math.min(i.cantidad + cantidad, producto.stock) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { producto, cantidad }] };
        }),

      quitar: (productoId) =>
        set((state) => ({
          items: state.items.filter((i) => i.producto.id !== productoId),
        })),

      actualizar: (productoId, cantidad) =>
        set((state) => ({
          items:
            cantidad <= 0
              ? state.items.filter((i) => i.producto.id !== productoId)
              : state.items.map((i) =>
                  i.producto.id === productoId
                    ? { ...i, cantidad: Math.min(cantidad, i.producto.stock) }
                    : i,
                ),
        })),

      vaciar: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, i) => sum + Number(i.producto.precio) * i.cantidad,
          0,
        ),

      conteo: () => get().items.reduce((sum, i) => sum + i.cantidad, 0),
    }),
    { name: 'tiendakit-carrito' },
  ),
);
