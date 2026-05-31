'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategorias, adminCrearCategoria, adminActualizarCategoria, adminEliminarCategoria } from '@/lib/api';
import { Categoria } from '@/types';

function slugify(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminCategoriasPage() {
  const qc = useQueryClient();
  const { data: categorias = [], isLoading } = useQuery<Categoria[]>({
    queryKey: ['admin-categorias'],
    queryFn: getCategorias,
  });

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoSlug, setNuevoSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [errorCrear, setErrorCrear] = useState('');

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editSlugManual, setEditSlugManual] = useState(false);

  const invalidar = () => {
    qc.invalidateQueries({ queryKey: ['admin-categorias'] });
    qc.invalidateQueries({ queryKey: ['admin-productos'] });
  };

  const crear = useMutation({
    mutationFn: adminCrearCategoria,
    onSuccess: () => {
      invalidar();
      setNuevoNombre('');
      setNuevoSlug('');
      setSlugManual(false);
      setErrorCrear('');
    },
    onError: (err: any) => {
      const msg = Array.isArray(err?.response?.data?.message)
        ? err.response.data.message.join(', ')
        : (err?.response?.data?.message ?? 'Error al crear');
      setErrorCrear(msg);
    },
  });

  const actualizar = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { nombre: string; slug: string } }) =>
      adminActualizarCategoria(id, data),
    onSuccess: () => { invalidar(); setEditandoId(null); },
  });

  const eliminar = useMutation({
    mutationFn: adminEliminarCategoria,
    onSuccess: invalidar,
  });

  const handleNuevoNombre = (nombre: string) => {
    setNuevoNombre(nombre);
    if (!slugManual) setNuevoSlug(slugify(nombre));
  };

  const handleEditNombre = (nombre: string) => {
    setEditNombre(nombre);
    if (!editSlugManual) setEditSlug(slugify(nombre));
  };

  const iniciarEdicion = (cat: Categoria) => {
    setEditandoId(cat.id);
    setEditNombre(cat.nombre);
    setEditSlug(cat.slug);
    setEditSlugManual(true);
  };

  const cancelarEdicion = () => { setEditandoId(null); setEditSlugManual(false); };

  const inputCls = 'border border-[#E2DDD6] bg-white px-2.5 py-1.5 text-sm text-[#111111] placeholder:text-[#B5AFA8] focus:border-[#111111] focus:outline-none transition-colors';

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C] mb-1">Inventario</p>
        <h1 className="text-xl font-light text-[#111111]">Categorías</h1>
      </div>

      {/* Formulario crear */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!nuevoNombre.trim() || !nuevoSlug.trim()) return;
          crear.mutate({ nombre: nuevoNombre.trim(), slug: nuevoSlug.trim() });
        }}
        className="border border-[#E2DDD6] bg-white p-5 mb-8 space-y-4 max-w-lg"
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8A847C]">Nueva categoría</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-1.5">Nombre</label>
            <input
              required
              value={nuevoNombre}
              onChange={(e) => handleNuevoNombre(e.target.value)}
              placeholder="Ej: Ropa"
              className={`${inputCls} w-full`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-widest uppercase text-[#B5AFA8] mb-1.5">Slug</label>
            <input
              required
              value={nuevoSlug}
              onChange={(e) => { setSlugManual(true); setNuevoSlug(e.target.value); }}
              placeholder="Ej: ropa"
              className={`${inputCls} w-full`}
            />
          </div>
        </div>
        {errorCrear && <p className="text-xs text-red-500">{errorCrear}</p>}
        <button
          type="submit"
          disabled={crear.isPending}
          className="bg-[#111111] text-white px-5 py-2 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] disabled:opacity-50 transition-colors"
        >
          {crear.isPending ? 'Creando...' : '+ Crear'}
        </button>
      </form>

      {/* Tabla */}
      {isLoading ? (
        <p className="text-sm text-[#8A847C]">Cargando...</p>
      ) : categorias.length === 0 ? (
        <p className="text-sm text-[#B5AFA8]">Sin categorías aún.</p>
      ) : (
        <div className="border border-[#E2DDD6] overflow-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#E2DDD6] bg-[#F7F5F1]">
              <tr>
                {['#', 'Nombre', 'Slug', 'Acciones'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-[#8A847C] ${i === 0 ? 'text-left w-12' : i < 3 ? 'text-left' : 'text-right'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD6] bg-white">
              {categorias.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#F7F5F1] transition-colors">
                  <td className="px-4 py-3 text-[#B5AFA8] text-xs">{cat.id}</td>

                  {editandoId === cat.id ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          value={editNombre}
                          onChange={(e) => handleEditNombre(e.target.value)}
                          className={`${inputCls} w-full`}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={editSlug}
                          onChange={(e) => { setEditSlugManual(true); setEditSlug(e.target.value); }}
                          className={`${inputCls} w-full`}
                        />
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => actualizar.mutate({ id: cat.id, data: { nombre: editNombre, slug: editSlug } })}
                            disabled={actualizar.isPending}
                            className="text-xs text-[#111111] hover:underline disabled:opacity-50"
                          >
                            Guardar
                          </button>
                          <button onClick={cancelarEdicion} className="text-xs text-[#8A847C] hover:text-[#111111]">
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-[#111111]">{cat.nombre}</td>
                      <td className="px-4 py-3 text-[#8A847C] text-xs font-mono">{cat.slug}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => iniciarEdicion(cat)}
                            className="text-xs text-[#8A847C] hover:text-[#111111] transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => confirm(`¿Eliminar "${cat.nombre}"?`) && eliminar.mutate(cat.id)}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
