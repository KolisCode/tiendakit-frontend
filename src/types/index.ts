export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  precio: string;
  stock: number;
  imagenes: string[];
  activo: boolean;
  categoria: Categoria;
  createdAt: string;
  updatedAt: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface ItemOrden {
  id: number;
  productoId: number;
  producto: Producto;
  cantidad: number;
  precio: string;
}

export interface Orden {
  id: number;
  estado: 'PENDIENTE' | 'PAGADO' | 'ENVIADO' | 'CANCELADO';
  total: string;
  nombreComprador: string;
  emailComprador: string;
  telefonoComprador: string | null;
  items: ItemOrden[];
  createdAt: string;
}
