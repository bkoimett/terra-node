export default function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="card-hover flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-canvas-muted">{label}</span>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/10">
            <Icon className="h-4 w-4 text-sage" />
          </span>
        )}
      </div>
      <p className="font-mono text-2xl font-semibold text-sage">{value}</p>
      {sub && <p className="text-xs leading-relaxed text-canvas-subtle">{sub}</p>}
    </div>
  );
}
