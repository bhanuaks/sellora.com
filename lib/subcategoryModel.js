const mongoose = require('mongoose');
const { Schema } = mongoose; 

const subCategorySchema = new Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', 
      required: true, 
    },
    subCategoryName: {
      type: String,
      required: true,
      trim: true, 
    },
    slug: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'], 
      default: 'Active',
    },
  },
  {
    timestamps: true, 
  }
);

// Export the model, creating it if it doesn't exist already
export const subCategory = mongoose.models.subCategory || mongoose.model('subCategory', subCategorySchema);
