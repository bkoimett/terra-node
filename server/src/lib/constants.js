export const CONVERSION = {
  LAND_PER_GPU_RACK: 12.5,
  WATER_PER_GPU_HOUR: {
    air: 3.7,
    liquid: 1.2,
    hybrid: 2.4,
  },
  CREDIT_COST_PER_SQM: 8.5,
  SQM_PER_CREDIT: 100,
  FACILITY_OVERHEAD: 2.3,
};

export const GPU_SPECS = {
  A100: { powerDraw: 400, rackDensity: 1.0 },
  H100: { powerDraw: 700, rackDensity: 1.1 },
  H200: { powerDraw: 750, rackDensity: 1.15 },
  B200: { powerDraw: 1000, rackDensity: 1.2 },
  Custom: { powerDraw: 500, rackDensity: 1.0 },
};
