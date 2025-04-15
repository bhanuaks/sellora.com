import mongoose from 'mongoose';

const locationsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Location name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Location name must be less than 100 characters"],
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
  },
  { timestamps: true, collection: "locations" } // Explicitly set collection name
);

// Ensure the model isn't redefined when hot-reloading
const Locations = mongoose.models.Locations || mongoose.model("Locations", locationsSchema);

export default Locations;
