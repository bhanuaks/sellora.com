import mongoose from 'mongoose';

const applyjobSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerCategory', // Reference to Category model
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerJob', // Reference to Job model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerUser', // Assuming a user applies for a job
      required: true,
    },
    uploadResume: {
      type: String,
    },
    name: {
        type: String,
      },
      email: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      totalExperience: {
        type: String,
      },
      gender: {
        type: String,
      },
      currentLocation: {
        type: String,
      },
      qualification: {
        type: String,
      },
      collegeName: {
        type: String,
      },
      yearOfPassing: {
        type: String,
      },
      currentIndustry: {
        type: String,
      },
      currentCompanyName: {
        type: String,
      },
      roleAppliedfor: {
        type: String,
      },
      fixedCompensation: {
        type: String,
      },
      variableCompensation: {
        type: String,
      },
      categorySlug: {
        type: String,
      },
      jobSlug: {
        type: String,
      },
                                
  },
  { timestamps: true, collection: 'applyjobs' } // Explicitly set collection name
);

// Ensure the model isn't redefined when hot-reloading
const ApplyJob = mongoose.models.ApplyJob || mongoose.model('ApplyJob', applyjobSchema);

export default ApplyJob;
