import Project from '../models/Project.js';
import Transaction from '../models/Transaction.js';
export async function getProjects(req, res) {
  const { category, status, search, region } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (status) filter.status = status;
  if (region) filter['location.region'] = new RegExp(region, 'i');
  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
  }

  const projects = await Project.find(filter).sort({ createdAt: -1 });
  res.json(projects);
}

export async function getProjectById(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
}

export async function fundProject(req, res) {
  const { amount, buyerName, type = 'micro-fund', metadata = {} } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Valid amount is required' });
  }
  if (!buyerName?.trim()) {
    return res.status(400).json({ message: 'Buyer name is required' });
  }

  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const sqmFunded = amount / project.costPerSqMeter;

  project.fundingRaised += amount;
  project.backers += 1;
  project.restoredArea = Math.min(
    project.targetArea,
    project.restoredArea + sqmFunded
  );

  if (project.fundingRaised >= project.fundingGoal && project.status === 'funding') {
    project.status = 'in-progress';
  }

  await project.save();

  const transaction = await Transaction.create({
    type,
    amount,
    creditsOrArea: Math.round(sqmFunded * 100) / 100,
    projectId: project._id,
    buyerName: buyerName.trim(),
    status: 'confirmed',
    metadata,
  });

  res.status(201).json({ project, transaction });
}

export async function getProjectTransactions(req, res) {
  const transactions = await Transaction.find({ projectId: req.params.id })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(transactions);
}
