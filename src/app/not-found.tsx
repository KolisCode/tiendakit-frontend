import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-28 text-center">
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9B99A] mb-6">Error 404</p>
      <h1 className="text-5xl font-light text-[#111111] mb-4">
        Página no<br />
        <span className="italic">encontrada.</span>
      </h1>
      <p className="text-sm text-[#8A847C] mt-6 mb-12 leading-relaxed">
        La página que buscas no existe o fue movida.<br />
        Vuelve a la colección para seguir explorando.
      </p>
      <Link
        href="/productos"
        className="inline-block bg-[#111111] text-white px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-[#2D2D2D] transition-colors"
      >
        Ver colección
      </Link>
    </div>
  );
}
