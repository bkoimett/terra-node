export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatArea(sqm) {
  if (sqm >= 1_000_000) return `${formatNumber(sqm / 1_000_000, 2)} km²`;
  if (sqm >= 10_000) return `${formatNumber(sqm / 10_000, 1)} ha`;
  return `${formatNumber(sqm, 0)} m²`;
}

export function fundingPercent(raised, goal) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}
