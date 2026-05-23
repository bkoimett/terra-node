import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    region: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: { type: [Number], required: true },
  },
  { _id: false }
);

const timelineSchema = new mongoose.Schema(
  {
    startDate: { type: String, required: true },
    estimatedCompletion: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: locationSchema, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['agricultural', 'wetland', 'forest', 'urban-green', 'riparian'],
      required: true,
    },
    targetArea: { type: Number, required: true },
    restoredArea: { type: Number, default: 0 },
    fundingGoal: { type: Number, required: true },
    fundingRaised: { type: Number, default: 0 },
    costPerSqMeter: { type: Number, required: true },
    status: {
      type: String,
      enum: ['funding', 'in-progress', 'verified', 'completed'],
      default: 'funding',
    },
    imageUrl: { type: String, required: true },
    timeline: { type: timelineSchema, required: true },
    backers: { type: Number, default: 0 },
    verificationScore: { type: Number, min: 0, max: 100 },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
