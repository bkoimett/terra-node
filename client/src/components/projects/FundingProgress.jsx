import { motion } from 'framer-motion';
import { formatCurrency, fundingPercent } from '../../lib/formatters.js';
import { progressEase } from '../../lib/motion.js';

export default function FundingProgress({ raised, goal, showLabels = true }) {
  const percent = fundingPercent(raised, goal);

  return (
    <div>
      {showLabels && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-sage">{percent}% funded</span>
          <span className="font-mono text-xs text-canvas-muted">
            {formatCurrency(raised)} / {formatCurrency(goal)}
          </span>
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-pill bg-forest">
        <motion.div
          className="h-full rounded-pill bg-gradient-to-r from-sage-dim to-sage"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={progressEase}
        />
      </div>
    </div>
  );
}
