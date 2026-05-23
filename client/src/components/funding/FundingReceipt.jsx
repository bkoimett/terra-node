import { CheckCircle2, Copy } from 'lucide-react';
import { formatArea, formatCurrency } from '../../lib/formatters.js';

export default function FundingReceipt({ transaction, project, onCopy }) {
  if (!transaction) return null;

  return (
    <div className="card-hover border-sage/20 bg-sage/5">
      <div className="flex items-center gap-2 text-sage">
        <CheckCircle2 className="h-6 w-6" />
        <h3 className="font-heading text-lg font-semibold">Funding confirmed</h3>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-secondary">Transaction ID</dt>
          <dd className="font-mono text-xs">{transaction._id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">Amount</dt>
          <dd>{formatCurrency(transaction.amount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">Land restored</dt>
          <dd>{formatArea(transaction.creditsOrArea)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">Project</dt>
          <dd>{project?.name}</dd>
        </div>
      </dl>
      <button type="button" onClick={onCopy} className="btn-secondary mt-4 w-full text-sm">
        <Copy className="h-4 w-4" />
        Copy receipt link
      </button>
    </div>
  );
}
