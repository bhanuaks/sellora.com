import mongoose from 'mongoose';

const { Schema } = mongoose;  

// Define the category schema
const otherBannerSchema = new Schema(
  {
    
    title: {
      type: String,
       // 'name' is a required field
    },
    url: {
      type: String,
    },
    
    photo: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
       // Optional field
    },
    pid: {
      type: Number,
       // Default to 'Active' if not specified
    },
    
  
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Export the model, creating it if it doesn't exist already
export const OtherBanner = mongoose.models.OtherBanner || mongoose.model('OtherBanner', otherBannerSchema);