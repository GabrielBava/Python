const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const brlPrecise = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
});

export function formatCurrency(value, { precise = false } = {}) {
  if (!Number.isFinite(value)) return precise ? brlPrecise.format(0) : brl.format(0);
  return precise ? brlPrecise.format(value) : brl.format(value);
}

// Converte input de moeda (ex.: "12.500,90" ou "12500.9") em número.
export function parseCurrency(input) {
  if (typeof input === 'number') return input;
  if (!input) return 0;
  const normalized = input
    .toString()
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(,|$))/g, '')
    .replace(',', '.');
  const value = parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(value || 0));
}
