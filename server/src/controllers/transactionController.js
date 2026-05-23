import Transaction from '../models/Transaction.js';
import Project from '../models/Project.js';
import { CONVERSION } from '../lib/constants.js';

export async function getTransactions(req, res) {
  const { type, buyerName } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (buyerName) filter.buyerName = new RegExp(buyerName, 'i');

  const transactions = await Transaction.find(filter)
    .populate('projectId', 'name location category')
    .sort({ createdAt: -1 })
    .limit(100);
  res.json(transactions);
}

export async function createCorporatePurchase(req, res) {
  const {
    buyerName,
    amount,
    creditsOrArea,
    projectIds,
    packageTier,
    debtSummary,
  } = req.body;

  if (!buyerName?.trim() || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Valid purchase details required' });
  }
  if (!projectIds?.length) {
    return res.status(400).json({ message: 'At least one project must be selected' });
  }

  const projects = await Project.find({ _id: { $in: projectIds } });
  if (projects.length !== projectIds.length) {
    return res.status(400).json({ message: 'One or more projects not found' });
  }

  const amountPerProject = amount / projects.length;
  const areaPerProject = creditsOrArea / projects.length;
  const transactions = [];

  for (const project of projects) {
    project.fundingRaised += amountPerProject;
    project.backers += 1;
    project.restoredArea = Math.min(
      project.targetArea,
      project.restoredArea + areaPerProject
    );
    if (project.fundingRaised >= project.fundingGoal && project.status === 'funding') {
      project.status = 'in-progress';
    }
    await project.save();

    const tx = await Transaction.create({
      type: 'corporate-purchase',
      amount: amountPerProject,
      creditsOrArea: areaPerProject,
      projectId: project._id,
      buyerName: buyerName.trim(),
      status: 'verified',
      metadata: { packageTier, debtSummary },
    });
    transactions.push(tx);
  }

  res.status(201).json({
    transactions,
    totalCredits: Math.ceil(creditsOrArea / CONVERSION.SQM_PER_CREDIT),
    totalArea: creditsOrArea,
    totalAmount: amount,
  });
}
