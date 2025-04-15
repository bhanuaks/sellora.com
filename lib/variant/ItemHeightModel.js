import mongoose from 'mongoose';

const ItemHeightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: true });

export default mongoose.models.ItemHeight || mongoose.model('ItemHeight', ItemHeightSchema);
