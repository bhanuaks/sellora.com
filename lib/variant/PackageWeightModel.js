import mongoose from 'mongoose';

const PackageWeightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
}, { timestamps: true });

export default mongoose.models.PackageWeight || mongoose.model('PackageWeight', PackageWeightSchema);
