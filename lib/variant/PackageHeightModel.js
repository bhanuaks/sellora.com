import mongoose from 'mongoose';

const PackageHeightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
}, { timestamps: true });

export default mongoose.models.PackageHeight || mongoose.model('PackageHeight', PackageHeightSchema);
