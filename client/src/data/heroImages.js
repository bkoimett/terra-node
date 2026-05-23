/** Tana Delta Wetland Revival — wetland panoramic (golden hour / soft overcast) */
export const TANA_DELTA_HERO =
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=85&auto=format&fit=crop';

export function getTanaDeltaHeroUrl(projects = []) {
  const tana = projects.find((p) =>
    p.name?.toLowerCase().includes('tana delta')
  );
  if (!tana?.imageUrl) return TANA_DELTA_HERO;
  return tana.imageUrl.replace(/w=\d+/, 'w=1200');
}
