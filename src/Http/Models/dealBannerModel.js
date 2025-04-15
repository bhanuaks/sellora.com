import mongoose from 'mongoose';

const { Schema } = mongoose;  

// Define the category schema
const dealBannerSchema = new Schema(
  {
    
    title: {
      type: String,
       // 'name' is a required field
    },
    subtitle: {
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
       // Default l => left and 2 => right
    },
    
  
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Export the model, creating it if it doesn't exist already
export const DealBanner = mongoose.models.DealBanner || mongoose.model('DealBanner', dealBannerSchema);