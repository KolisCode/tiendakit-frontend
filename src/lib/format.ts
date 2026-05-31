export function formatCOP(valor: number | string): string {
  const num = Math.round(Number(valor));
  // Formato colombiano manual: separador de miles con punto, sin decimales
  // Ej: 45000 → "$ 45.000"
  return '$ ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
