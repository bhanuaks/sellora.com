import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the category schema
const couponSchema = new Schema(
    {

        coupon_code: {
            type: String,
            required: [true, "Coupon code is required"],
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "subCategory",
            
        },
        childcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "ChildCategory",
            
        },
        coupon_type:{
            type:Number,  // 1=>Amount, 2=> Percentage
            required:true
        },
        coupon_value:{
            type:Number,  
            required:true
        },
        min_amount:{
            type:Number, 
            
        },
        valid_from:{
            type:Date,  
            required:true
        },
        valid_to:{
            type:Date,  
            required:true
        },
        description:{
            type:String,  
            
        },
        status: {
            type: String,
            enum: ['Active', 'Deactive'], // Only these values are allowed
            default: 'Active', // Default to 'Active' if not specified
        },


    },
    { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Export the model, creating it if it doesn't exist already
export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);