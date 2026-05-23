import { CONVERSION } from './constants.js';

export function calculateDebt(profile) {
  const { gpuCount, uptimeHoursPerDay, coolingType } = profile;

  const rackCount = Math.ceil(gpuCount / 8);
  const directLand = rackCount * CONVERSION.LAND_PER_GPU_RACK;
  const totalLand = directLand * CONVERSION.FACILITY_OVERHEAD;

  const dailyWater =
    gpuCount * uptimeHoursPerDay * CONVERSION.WATER_PER_GPU_HOUR[coolingType];
  const annualWater = dailyWater * 365;

  const waterLandEquivalent = annualWater / 1000;
  const arableLandDebt = totalLand + waterLandEquivalent;

  const creditsToPurchase = Math.ceil(arableLandDebt / CONVERSION.SQM_PER_CREDIT);
  const estimatedCost = arableLandDebt * CONVERSION.CREDIT_COST_PER_SQM;

  return {
    landFootprint: Math.round(totalLand * 100) / 100,
    waterConsumption: Math.round(annualWater),
    arableLandDebt: Math.round(arableLandDebt * 100) / 100,
    estimatedCost: Math.round(estimatedCost * 100) / 100,
    creditsToPurchase,
  };
}
