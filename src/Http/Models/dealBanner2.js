import mongoose from 'mongoose';

const { Schema } = mongoose;  

// Define the category schema
const dealBanner2Schema = new Schema(
  { 
    url: {
      type: String,
    },
    
    photo: {
      type: String,  
       
    }, 
  },
  { timestamps: true }  
);

 
export const DealBanner2 = mongoose.models.DealBanner2 || mongoose.model('DealBanner2', dealBanner2Schema);