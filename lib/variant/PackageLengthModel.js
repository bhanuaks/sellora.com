import mongoose from 'mongoose';

const PackageLengthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
}, { timestamps: true });

export default mongoose.models.PackageLength || mongoose.model('PackageLength', PackageLengthSchema);
