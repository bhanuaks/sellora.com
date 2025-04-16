import mongoose from 'mongoose';

const { Schema } = mongoose;  

// Define the category schema
const featureBannerSchema = new Schema(
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
    title_r: {
      type: String,
       // 'name' is a required field
    },
    
    url_r: {
      type: String,
    },
    
    photo_r: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
       // Optional field
    },
    title_m1: {
      type: String,
       // 'name' is a required field
    },
    
    url_m1: {
      type: String,
    },
    
    photo_m1: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
       // Optional field
    },
    title_m2: {
      type: String,
       // 'name' is a required field
    },
    
    url_m2: {
      type: String,
    },
    
    photo_m2: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
       // Optional field
    },
    title_m3: {
      type: String,
       // 'name' is a required field
    },
    
    url_m3: {
      type: String,
    },
    
    photo_m3: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
       // Optional field
    },
    title_m4: {
      type: String,
       // 'name' is a required field
    },
    
    url_m4: {
      type: String,
    },
    
    photo_m4: {
      type: String, // 'photo' will hold a string (e.g., URL or file path)
       // Optional field
    },
  
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Export the model, creating it if it doesn't exist already
export const FeatureBanner = mongoose.models.FeatureBanner || mongoose.model('FeatureBanner', featureBannerSchema);