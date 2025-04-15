import mongoose from 'mongoose';

const ItemBreadthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: true });

export default mongoose.models.ItemBreadth || mongoose.model('ItemBreadth', ItemBreadthSchema);
