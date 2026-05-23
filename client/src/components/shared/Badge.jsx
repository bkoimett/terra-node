const categoryColors = {
  agricultural: 'bg-accent-earth/20 text-accent-earth',
  wetland: 'bg-blue-500/20 text-blue-300',
  forest: 'bg-emerald-500/20 text-emerald-300',
  'urban-green': 'bg-accent-green/20 text-accent-green',
  riparian: 'bg-cyan-500/20 text-cyan-300',
};

const statusColors = {
  funding: 'bg-accent-amber/20 text-accent-amber',
  'in-progress': 'bg-blue-500/20 text-blue-300',
  verified: 'bg-accent-green/20 text-accent-green',
  completed: 'bg-text-muted/20 text-text-muted',
};

export default function Badge({ children, variant = 'category', type }) {
  const colors =
    variant === 'status' ? statusColors[type] : categoryColors[type] || categoryColors.agricultural;

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colors}`}>
      {children}
    </span>
  );
}
