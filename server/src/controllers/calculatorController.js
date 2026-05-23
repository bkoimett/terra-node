import { calculateDebt } from '../lib/calculator.js';
import { GPU_SPECS } from '../lib/constants.js';

export function postCalculateDebt(req, res) {
  const { gpuType, gpuCount, uptimeHoursPerDay, coolingType, facilityLocation } =
    req.body;

  if (!gpuType || !gpuCount || gpuCount < 1) {
    return res.status(400).json({ message: 'Valid GPU type and count required' });
  }
  if (!['air', 'liquid', 'hybrid'].includes(coolingType)) {
    return res.status(400).json({ message: 'Valid cooling type required' });
  }

  const profile = {
    gpuType,
    gpuCount: Number(gpuCount),
    uptimeHoursPerDay: Number(uptimeHoursPerDay) ?? 20,
    coolingType,
    facilityLocation: facilityLocation || 'Unknown',
  };

  const result = calculateDebt(profile);
  const gpuSpec = GPU_SPECS[gpuType] || GPU_SPECS.Custom;

  res.json({
    profile,
    result,
    comparisons: {
      footballFields: Math.round((result.landFootprint / 7140) * 10) / 10,
      householdsWater:
        Math.round(result.waterConsumption / (150000 * 365)) || 1,
    },
    gpuSpec,
  });
}
