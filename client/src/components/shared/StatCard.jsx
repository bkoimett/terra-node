export default function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        {Icon && <Icon className="h-5 w-5 text-accent-green" />}
      </div>
      <p className="font-mono text-2xl font-semibold text-text-primary">{value}</p>
      {sub && <p className="text-xs text-text-muted">{sub}</p>}
    </div>
  );
}
