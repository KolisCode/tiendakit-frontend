'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminGetProductoById, adminActualizarProducto } from '@/lib/api';
import { Producto } from '@/types';
import ProductoForm, { ProductoFormData } from '@/components/admin/ProductoForm';

export default function EditarProductoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetProductoById(Number(id))
      .then(setProducto)
      .catch(() => setProducto(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form: ProductoFormData) => {
    await adminActualizarProducto(Number(id), {
      nombre: form.nombre,
      slug: form.slug,
      descripcion: form.descripcion || null,
      precio: Number(form.precio),
      stock: Number(form.stock),
      categoriaId: Number(form.categoriaId),
      activo: form.activo,
      imagenes: form.imagenes,
    });
    router.push('/admin/productos');
  };

  if (loading) {
    return <p className="text-sm text-[#8A847C]">Cargando producto...</p>;
  }
  if (!producto) {
    return (
      <div>
        <p className="text-sm text-[#8A847C] mb-4">Producto no encontrado.</p>
        <Link href="/admin/productos" className="text-[10px] tracking-widest uppercase text-[#111111] underline">
          Volver
        </Link>
      </div>
    );
  }

  const defaultValues: ProductoFormData = {
    nombre: producto.nombre,
    slug: producto.slug,
    descripcion: producto.descripcion ?? '',
    precio: String(producto.precio),
    stock: String(producto.stock),
    categoriaId: String(producto.categoria.id),
    activo: producto.activo,
    imagenes: producto.imagenes,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/productos"
          className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors">
          ← Productos
        </Link>
        <span className="text-[#E2DDD6]">/</span>
        <span className="text-[10px] tracking-widest uppercase text-[#111111]">Editar</span>
      </div>
      <h1 className="text-xl font-light text-[#111111] mb-8">{producto.nombre}</h1>
      <ProductoForm defaultValues={defaultValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </div>
  );
}
