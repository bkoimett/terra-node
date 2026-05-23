import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['corporate-purchase', 'micro-fund'],
      required: true,
    },
    amount: { type: Number, required: true },
    creditsOrArea: { type: Number, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    buyerName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'verified'],
      default: 'confirmed',
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
