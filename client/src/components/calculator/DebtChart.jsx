import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#34d399', '#60a5fa'];

export default function DebtChart({ debt }) {
  if (!debt) return null;

  const physical = debt.landFootprint;
  const waterEquiv = Math.max(0, debt.arableLandDebt - physical);

  const data = [
    { name: 'Physical footprint', value: physical },
    { name: 'Water impact equivalent', value: waterEquiv },
  ];

  return (
    <div className="card h-80">
      <h3 className="mb-4 font-heading font-semibold">Debt Breakdown</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => [`${Math.round(v).toLocaleString()} m²`, '']}
            contentStyle={{
              background: '#141f1a',
              border: '1px solid #1e3a2f',
              borderRadius: 8,
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
