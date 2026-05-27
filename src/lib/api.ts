import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/api';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('tk_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProductos = (params?: Record<string, string>) =>
  api.get('/productos', { params }).then((r) => r.data);

export const getProducto = (slug: string) =>
  api.get(`/productos/${slug}`).then((r) => r.data);

export const getCategorias = () =>
  api.get('/categorias').then((r) => r.data);

export const crearOrden = (data: unknown) =>
  api.post('/ordenes', data).then((r) => r.data);

export const getOrden = (id: number) =>
  api.get(`/ordenes/${id}`).then((r) => r.data);

export const adminLogin = (email: string, password: string) =>
  api.post('/auth/login', { email, password }).then((r) => r.data);

export const adminGetProductos = () =>
  api.get('/productos?activo=all').then((r) => r.data);

export const adminGetOrdenes = () =>
  api.get('/ordenes').then((r) => r.data);

export const adminCrearProducto = (data: unknown) =>
  api.post('/productos', data).then((r) => r.data);

export const adminActualizarProducto = (id: number, data: unknown) =>
  api.put(`/productos/${id}`, data).then((r) => r.data);

export const adminEliminarProducto = (id: number) =>
  api.delete(`/productos/${id}`).then((r) => r.data);

export const adminActualizarEstadoOrden = (id: number, estado: string) =>
  api.patch(`/ordenes/${id}/estado`, { estado }).then((r) => r.data);

export const adminEstadisticas = () =>
  api.get('/ordenes/estadisticas').then((r) => r.data);

export const subirImagen = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/upload/imagen', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};
