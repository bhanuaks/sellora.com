import mongoose from 'mongoose';

const careerJobSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerCategory", 
      required: [true, "Category is required"],
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations",
        required: [true, "Location is required"],
      },
    jobTitle: {
    type: String,
    required: [true, "Job Title name is required"],
    trim: true,
    },
    slug: {
      type: String,
      trim: true,
      },
    jobDescription: {
        type: String,
        // required: [true, "Description is required"],
        trim: true,
        },
        skills: {
            type: String,
            // required: [true, "Skills  is required"],
            trim: true,
            },
        jobRole: {
                type: String,
                // required: [true, "Role  is required"],
                trim: true,
                },
        location: {
                type: String,
                // required: [true, "location  is required"],
                trim: true,
                },
        aboutTheRole: {
                    type: String,
                    // required: [true, "about is required"],
                    trim: true,
                    },
        aboutTheTeam: {
                    type: String,
                    // required: [true, "About The Team is required"],
                    trim: true,
                    },
        toSucceedInThisRole: {
                        type: String,
                        // required: [true, "To Succeed In This Role  is required"],
                        trim: true,
                        },
        whyWorkWithUs: {
                    type: String,
                    // required: [true, "Why Work With Us  is required"],
                    trim: true,
                    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
  },
  { timestamps: true, collection: "careerjobs" } // Explicitly set collection name
);

// Ensure the model isn't redefined when hot-reloading
const CareerJob = mongoose.models.CareerJob || mongoose.model("CareerJob", careerJobSchema);

export default CareerJob;
