'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getCategorias, subirImagen } from '@/lib/api';
import { Categoria } from '@/types';

function slugify(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface ProductoFormData {
  nombre: string;
  slug: string;
  descripcion: string;
  precio: string;
  stock: string;
  categoriaId: string;
  activo: boolean;
  imagenes: string[];
}

interface Props {
  defaultValues?: Partial<ProductoFormData>;
  onSubmit: (data: ProductoFormData) => Promise<void>;
  submitLabel: string;
}

const field = 'w-full border border-[#E2DDD6] bg-white px-3 py-2.5 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none transition-colors';

export default function ProductoForm({ defaultValues, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<ProductoFormData>({
    nombre: '', slug: '', descripcion: '', precio: '', stock: '0',
    categoriaId: '', activo: true, imagenes: [],
    ...defaultValues,
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const slugManual = useRef(!!defaultValues?.slug);

  useEffect(() => {
    getCategorias().then(setCategorias).catch(() => {});
  }, []);

  const set = <K extends keyof ProductoFormData>(key: K, value: ProductoFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleNombre = (nombre: string) => {
    set('nombre', nombre);
    if (!slugManual.current) set('slug', slugify(nombre));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await subirImagen(file);
      setForm((f) => ({ ...f, imagenes: [...f.imagenes, url] }));
    } catch {
      setError('Error al subir la imagen');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSubmit(form);
    } catch (err: any) {
      const msg = Array.isArray(err?.response?.data?.message)
        ? err.response.data.message.join(', ')
        : (err?.response?.data?.message ?? 'Error al guardar');
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7 max-w-2xl">
      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">Nombre *</label>
        <input required type="text" value={form.nombre}
          onChange={(e) => handleNombre(e.target.value)} className={field} />
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">Slug *</label>
        <input required type="text" value={form.slug}
          onChange={(e) => { slugManual.current = true; set('slug', e.target.value); }}
          className={field} />
        <p className="mt-1.5 text-[11px] text-[#B5AFA8]">
          URL pública: /productos/{form.slug || '...'}
        </p>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">Descripción</label>
        <textarea rows={3} value={form.descripcion}
          onChange={(e) => set('descripcion', e.target.value)}
          className={field + ' resize-none'} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">Precio (COP) *</label>
          <input required type="number" min="0" value={form.precio}
            onChange={(e) => set('precio', e.target.value)} className={field} />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">Stock *</label>
          <input required type="number" min="0" value={form.stock}
            onChange={(e) => set('stock', e.target.value)} className={field} />
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-2">Categoría *</label>
        <select required value={form.categoriaId}
          onChange={(e) => set('categoriaId', e.target.value)} className={field}>
          <option value="">Seleccionar categoría...</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="activo" checked={form.activo}
          onChange={(e) => set('activo', e.target.checked)}
          className="h-4 w-4 accent-[#111111]" />
        <label htmlFor="activo" className="text-sm text-[#111111]">
          Producto activo (visible en la tienda)
        </label>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#8A847C] mb-3">Imágenes</label>
        <div className="flex flex-wrap gap-3">
          {form.imagenes.map((url, i) => (
            <div key={i} className="relative h-28 w-24 bg-[#F0EDE7] overflow-hidden group flex-shrink-0">
              <Image src={url} alt="" width={96} height={112} className="h-full w-full object-cover" unoptimized />
              <button type="button"
                onClick={() => setForm((f) => ({ ...f, imagenes: f.imagenes.filter((_, j) => j !== i) }))}
                className="absolute inset-0 bg-[#111111]/60 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                ×
              </button>
            </div>
          ))}
          <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()}
            className="h-28 w-24 border border-dashed border-[#E2DDD6] flex flex-col items-center justify-center gap-1 text-[#B5AFA8] hover:border-[#111111] hover:text-[#111111] transition-colors text-xs flex-shrink-0">
            <span className="text-lg">{uploading ? '↑' : '+'}</span>
            <span>{uploading ? 'Subiendo' : 'Foto'}</span>
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={saving}
        className="bg-[#111111] text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] disabled:opacity-50 transition-colors">
        {saving ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
}
