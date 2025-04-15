import mongoose from 'mongoose';

const PackageBreadthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
}, { timestamps: true });

export default mongoose.models.PackageBreadth || mongoose.model('PackageBreadth', PackageBreadthSchema);
