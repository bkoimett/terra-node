const categoryColors = {
  agricultural: 'bg-terra/15 text-terra border-terra/20',
  wetland: 'bg-sage/10 text-sage border-sage/20',
  forest: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  'urban-green': 'bg-sage/15 text-sage-dim border-sage/25',
  riparian: 'bg-amber-warm/15 text-amber-warm border-amber-warm/20',
};

const statusColors = {
  funding: 'bg-amber-warm/15 text-amber-warm border-amber-warm/20',
  'in-progress': 'bg-sage/10 text-sage border-sage/20',
  verified: 'bg-sage/20 text-sage border-sage/30',
  completed: 'bg-white/5 text-canvas-muted border-white/10',
};

export default function Badge({ children, variant = 'category', type }) {
  const colors =
    variant === 'status'
      ? statusColors[type]
      : categoryColors[type] || categoryColors.agricultural;

  return (
    <span
      className={`inline-flex rounded-pill border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${colors}`}
    >
      {children}
    </span>
  );
}
