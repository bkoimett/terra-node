export const CONVERSION = {
  CREDIT_COST_PER_SQM: 8.5,
  SQM_PER_CREDIT: 100,
};

export const GPU_TYPES = ['A100', 'H100', 'H200', 'B200', 'Custom'];
export const COOLING_TYPES = ['air', 'liquid', 'hybrid'];

export const CREDIT_PACKAGES = [
  { id: 'bronze', label: 'Bronze', percent: 25, color: '#E07A5F' },
  { id: 'silver', label: 'Silver', percent: 50, color: '#A8B5A8' },
  { id: 'gold', label: 'Gold', percent: 75, color: '#F59E0B' },
  { id: 'platinum', label: 'Platinum', percent: 100, color: '#86EFAC' },
];

export const FUND_AMOUNTS = [5, 10, 25, 50, 100];

export const CATEGORY_LABELS = {
  agricultural: 'Agricultural',
  wetland: 'Wetland',
  forest: 'Forest',
  'urban-green': 'Urban Green',
  riparian: 'Riparian',
};

export const STATUS_LABELS = {
  funding: 'Funding',
  'in-progress': 'In Progress',
  verified: 'Verified',
  completed: 'Completed',
};
