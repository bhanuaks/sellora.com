import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colorMap: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
}, { timestamps: true });

export default mongoose.models.Color || mongoose.model('Color', ColorSchema);
