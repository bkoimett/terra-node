import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#86EFAC', '#E07A5F'];

export default function DebtChart({ debt }) {
  if (!debt) return null;

  const physical = debt.landFootprint;
  const waterEquiv = Math.max(0, debt.arableLandDebt - physical);

  const data = [
    { name: 'Physical footprint', value: physical },
    { name: 'Water impact equivalent', value: waterEquiv },
  ];

  return (
    <div className="card-hover h-80">
      <h3 className="font-display text-lg font-semibold">Debt breakdown</h3>
      <ResponsiveContainer width="100%" height="88%" className="mt-4">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={64}
            outerRadius={92}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => [`${Math.round(v).toLocaleString()} m²`, '']}
            contentStyle={{
              background: '#141F1A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              fontFamily: 'DM Sans, sans-serif',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 13, color: '#A8B5A8' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
