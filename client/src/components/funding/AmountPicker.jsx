import { FUND_AMOUNTS, CONVERSION } from '../../lib/constants.js';
import { formatArea } from '../../lib/formatters.js';

export default function AmountPicker({
  amount,
  onChange,
  costPerSqMeter = CONVERSION.CREDIT_COST_PER_SQM,
}) {
  const sqm = amount / costPerSqMeter;

  return (
    <div>
      <label className="label">Choose amount (USD)</label>
      <div className="flex flex-wrap gap-2">
        {FUND_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`rounded-pill border px-4 py-2 text-sm font-medium transition ${
              amount === preset
                ? 'border-sage/40 bg-sage/10 text-sage'
                : 'border-white/10 bg-forest hover:border-sage/30'
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>
      <input
        type="number"
        min="1"
        className="input-field mt-3"
        placeholder="Custom amount"
        value={amount || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      {amount > 0 && (
        <p className="mt-2 text-sm text-sage">
          ${amount} restores {formatArea(sqm)} of degraded land
        </p>
      )}
    </div>
  );
}
