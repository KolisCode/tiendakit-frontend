export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="h-8 w-48 bg-[#E2DDD6] animate-pulse mb-10" />
      <div className="flex gap-10">
        <div className="w-52 shrink-0 space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-4 bg-[#E2DDD6] animate-pulse rounded" />)}
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-[#E2DDD6]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#F7F5F1] aspect-[3/4] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
