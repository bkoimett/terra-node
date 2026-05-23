import { Droplets, LandPlot, DollarSign, Award } from 'lucide-react';
import AnimatedCounter from '../shared/AnimatedCounter.jsx';
import StatCard from '../shared/StatCard.jsx';
import { formatArea, formatCurrency, formatNumber } from '../../lib/formatters.js';

export default function DebtDisplay({ debt, comparisons }) {
  if (!debt) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Land Footprint"
          value={<AnimatedCounter value={debt.landFootprint} suffix=" m²" />}
          sub={comparisons ? `≈ ${comparisons.footballFields} football fields` : null}
          icon={LandPlot}
        />
        <StatCard
          label="Annual Water Use"
          value={<AnimatedCounter value={debt.waterConsumption} suffix=" L" />}
          sub="Cooling + facility impact"
          icon={Droplets}
        />
        <StatCard
          label="Arable Land Debt"
          value={formatArea(debt.arableLandDebt)}
          sub="Total offset required"
          icon={LandPlot}
        />
        <StatCard
          label="Estimated Offset Cost"
          value={formatCurrency(debt.estimatedCost)}
          sub={`${debt.creditsToPurchase} restoration credits`}
          icon={DollarSign}
        />
      </div>
      <div className="card flex items-center gap-4 border-accent-green/30 bg-accent-green/5">
        <Award className="h-10 w-10 shrink-0 text-accent-green" />
        <div>
          <p className="font-heading font-semibold">
            {formatNumber(debt.creditsToPurchase)} credits needed to fully offset
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Each credit represents 100 m² of verified restored land at $
            {8.5}/m²
          </p>
        </div>
      </div>
    </div>
  );
}
