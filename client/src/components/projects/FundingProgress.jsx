import { motion } from 'framer-motion';
import { formatCurrency, fundingPercent } from '../../lib/formatters.js';

export default function FundingProgress({ raised, goal, showLabels = true }) {
  const percent = fundingPercent(raised, goal);

  return (
    <div>
      {showLabels && (
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="font-medium text-accent-green">{percent}% funded</span>
          <span className="text-text-secondary">
            {formatCurrency(raised)} / {formatCurrency(goal)}
          </span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-bg-primary">
        <motion.div
          className="h-full rounded-full bg-accent-green"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
