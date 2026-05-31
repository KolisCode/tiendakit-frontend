'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminCrearProducto } from '@/lib/api';
import ProductoForm, { ProductoFormData } from '@/components/admin/ProductoForm';

export default function NuevoProductoPage() {
  const router = useRouter();

  const handleSubmit = async (form: ProductoFormData) => {
    await adminCrearProducto({
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

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/productos"
          className="text-[10px] tracking-widest uppercase text-[#8A847C] hover:text-[#111111] transition-colors">
          ← Productos
        </Link>
        <span className="text-[#E2DDD6]">/</span>
        <span className="text-[10px] tracking-widest uppercase text-[#111111]">Nuevo</span>
      </div>
      <h1 className="text-xl font-light text-[#111111] mb-8">Nuevo producto</h1>
      <ProductoForm onSubmit={handleSubmit} submitLabel="Crear producto" />
    </div>
  );
}
