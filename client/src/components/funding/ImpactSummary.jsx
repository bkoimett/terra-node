import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { formatArea } from '../../lib/formatters.js';

export default function ImpactSummary({ sqm, region, totalContributed }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="card text-center"
    >
      <Sprout className="mx-auto h-12 w-12 text-accent-green" />
      <p className="mt-4 font-heading text-xl font-semibold">
        You restored {formatArea(sqm)} of land
      </p>
      <p className="mt-2 text-text-secondary">
        in {region}, Kenya. Every square meter counts toward verified restoration.
      </p>
      {totalContributed > 0 && (
        <p className="mt-4 text-sm text-accent-amber">
          Your lifetime impact: {formatArea(totalContributed)} restored
        </p>
      )}
    </motion.div>
  );
}
