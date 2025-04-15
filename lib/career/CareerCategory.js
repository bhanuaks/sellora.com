import mongoose from 'mongoose';

const careerCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Category name must be less than 100 characters"],
    },
    slug: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
  },
  { timestamps: true, collection: "careercategories" } // Explicitly set collection name
);

// Ensure the model isn't redefined when hot-reloading
const CareerCategory = mongoose.models.CareerCategory || mongoose.model("CareerCategory", careerCategorySchema);

export default CareerCategory;
