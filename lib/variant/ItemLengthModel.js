import mongoose from 'mongoose';

const ItemLengthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
}, { timestamps: true });

export default mongoose.models.ItemLength || mongoose.model('ItemLength', ItemLengthSchema);
