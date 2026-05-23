import Project from '../models/Project.js';
import Transaction from '../models/Transaction.js';
import { CONVERSION } from '../lib/constants.js';

export async function getStats(req, res) {
  const [projects, transactions] = await Promise.all([
    Project.find(),
    Transaction.find(),
  ]);

  const totalFundsRaised = projects.reduce((sum, p) => sum + p.fundingRaised, 0);
  const totalAreaRestored = projects.reduce((sum, p) => sum + p.restoredArea, 0);
  const totalBackers = projects.reduce((sum, p) => sum + p.backers, 0);
  const totalCreditsIssued = Math.floor(totalAreaRestored / CONVERSION.SQM_PER_CREDIT);

  res.json({
    projectCount: projects.length,
    transactionCount: transactions.length,
    totalFundsRaised: Math.round(totalFundsRaised),
    totalAreaRestored: Math.round(totalAreaRestored),
    totalBackers,
    totalCreditsIssued,
    globalLandDisplaced: 2_400_000,
  });
}
