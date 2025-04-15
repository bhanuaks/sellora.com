import mongoose from 'mongoose';

const childCategorySchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subCategory',
    required: true
  },
  childCategoryName: {
    type: String,
    required: true
  },
  slug: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'Deactive'],
    default: 'Active'
  }
}, { timestamps: true });

const ChildCategory = mongoose.models.ChildCategory || mongoose.model('ChildCategory', childCategorySchema);

export default ChildCategory;
