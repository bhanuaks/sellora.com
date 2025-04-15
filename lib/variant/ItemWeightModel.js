import mongoose from 'mongoose';

const ItemWeightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: true });

export default mongoose.models.ItemWeight || mongoose.model('ItemWeight', ItemWeightSchema);
